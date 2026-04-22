export interface MellyOSPayload {
  event: string;
  sessionId: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: Array<{
    name: string;
    size: string;
    qty: number;
    price: number;
  }>;
  total: number;
  currency: string;
  timestamp: string;
}

/**
 * Sends order data to MellyOS via POST /api/notify
 * Includes the MellyOS API key for authentication.
 */
export async function notifyMellyOS(payload: MellyOSPayload): Promise<void> {
  const apiUrl = process.env.MELLYOS_API_URL;
  const apiKey = process.env.MELLYOS_API_KEY;

  if (!apiUrl) {
    console.warn("[MELLYOS] MELLYOS_API_URL not configured, skipping notify.");
    return;
  }

  const endpoint = `${apiUrl}/api/notify`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      "X-Source": "veltrixwear",
    },
    body: JSON.stringify({
      event: payload.event,
      source: "veltrixwear",
      data: {
        sessionId: payload.sessionId,
        customer: payload.customer,
        products: payload.items.map((i) => ({
          name: i.name,
          size: i.size,
          quantity: i.qty,
          price: i.price,
          lineTotal: i.price * i.qty,
        })),
        orderTotal: payload.total,
        currency: payload.currency,
        timestamp: payload.timestamp,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MellyOS responded ${res.status}: ${text}`);
  }

  const result = await res.json().catch(() => ({}));
  console.log("[MELLYOS] Notification delivered:", result);
}
