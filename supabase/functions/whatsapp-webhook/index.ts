import { createClient } from "npm:@supabase/supabase-js@2";
import { requireEnv } from "./env.ts";
import { handleInboundText } from "./flow.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type WebhookMessage = { id?: string; from?: string; type?: string; text?: { body?: string } };
type WebhookPayload = { entry?: { changes?: { value?: { messages?: WebhookMessage[] } }[] }[] };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function extractTextMessages(payload: WebhookPayload) {
  const messages: { id: string; from: string; text: string }[] = [];
  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      for (const message of change.value?.messages ?? []) {
        if (message.type === "text" && message.id && message.from && typeof message.text?.body === "string") {
          messages.push({ id: message.id, from: message.from, text: message.text.body.slice(0, 1000) });
        }
      }
    }
  }
  return messages;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i++) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return difference === 0;
}

async function hasValidSignature(rawBody: string, signatureHeader: string | null, appSecret: string): Promise<boolean> {
  if (!signatureHeader?.startsWith("sha256=")) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const expected = "sha256=" + Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return safeEqual(expected, signatureHeader);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method === "GET") {
      const url = new URL(req.url);
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (mode === "subscribe" && token === requireEnv("WHATSAPP_VERIFY_TOKEN") && challenge) {
        return new Response(challenge, { status: 200, headers: corsHeaders });
      }
      return json({ error: "Verification failed" }, 403);
    }

    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const rawBody = await req.text();
    const validSignature = await hasValidSignature(
      rawBody,
      req.headers.get("x-hub-signature-256"),
      requireEnv("WHATSAPP_APP_SECRET"),
    );
    if (!validSignature) {
      return json({ error: "Invalid signature" }, 401);
    }

    const db = createClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), {
      auth: { persistSession: false },
    });

    for (const message of extractTextMessages(JSON.parse(rawBody) as WebhookPayload)) {
      await handleInboundText(db, message.from, message.text, message.id);
    }

    return json({ received: true });
  } catch (err) {
    console.error("WhatsApp webhook error", err);
    return json({ error: "Internal error" }, 500);
  }
});
