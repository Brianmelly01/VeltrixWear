import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { notifyMellyOS } from "@/lib/mellyos";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("[WEBHOOK SIGNATURE ERROR]", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customer = {
      name: session.customer_details?.name || "Unknown",
      email: session.customer_details?.email || "Unknown",
      address: session.shipping_details?.address
        ? `${session.shipping_details.address.line1}, ${session.shipping_details.address.city}, ${session.shipping_details.address.country}`
        : "N/A",
    };

    const rawItems = session.metadata?.items;
    const items = rawItems ? JSON.parse(rawItems) : [];
    const totalAmount = (session.amount_total || 0) / 100;

    console.log("[ORDER COMPLETE]", {
      sessionId: session.id,
      customer,
      items,
      total: totalAmount,
    });

    // Notify MellyOS
    try {
      await notifyMellyOS({
        event: "order.completed",
        sessionId: session.id,
        customer,
        items,
        total: totalAmount,
        currency: session.currency?.toUpperCase() || "USD",
        timestamp: new Date().toISOString(),
      });
    } catch (notifyErr) {
      console.error("[MELLYOS NOTIFY ERROR]", notifyErr);
      // Non-blocking — don't fail the webhook
    }
  }

  return NextResponse.json({ received: true });
}
