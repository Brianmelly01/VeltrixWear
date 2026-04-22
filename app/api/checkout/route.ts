import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map(
        (item: {
          name: string;
          price: number;
          quantity: number;
          size: string;
          image: string;
        }) => ({
          price_data: {
            currency: "usd",
            unit_amount: Math.round(item.price * 100),
            product_data: {
              name: `${item.name} — Size: ${item.size}`,
              images: [item.image],
            },
          },
          quantity: item.quantity,
        })
      );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "GB", "CA", "AU", "KE", "NG", "GH", "ZA"],
      },
      metadata: {
        source: "veltrixwear",
        items: JSON.stringify(
          items.map((i: { name: string; price: number; quantity: number; size: string }) => ({
            name: i.name,
            size: i.size,
            qty: i.quantity,
            price: i.price,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("[CHECKOUT ERROR]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
