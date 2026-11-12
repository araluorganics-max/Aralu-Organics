import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { sendText } from "./whatsapp-api.ts";

// [UPI_ID] replace with the UPI ID customers should pay to
const UPI_ID = "[UPI_ID]";
const MAX_QUANTITY = 50;
const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRESS_LENGTH = 500;
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const PRODUCTS = [
  { key: "castor-oil", label: "Pure Cold-Pressed Castor Oil (200 ml)", match: /castor/i },
  { key: "rosemary-powder", label: "Rosemary Powder (100 g)", match: /rosemary/i },
  { key: "shikakai-powder", label: "Shikakai Powder (100 g)", match: /shikakai/i },
  { key: "hair-care-trio", label: "Hair care trio (castor oil + rosemary + shikakai)", match: /trio|combo/i },
];

type Step = "idle" | "choose_product" | "ask_quantity" | "ask_address" | "ask_payment" | "confirm";

export type OrderDraft = {
  step: Step;
  product_key: string | null;
  quantity: number | null;
  delivery_address: string | null;
  payment_method: "UPI" | "COD" | null;
};

type Transition = { reply: string; draft: OrderDraft };

const EMPTY_DRAFT: OrderDraft = {
  step: "idle",
  product_key: null,
  quantity: null,
  delivery_address: null,
  payment_method: null,
};

const MENU =
  "Thank you for contacting Aralu Organics. Which product would you like to order?\n\n" +
  "1. Pure Cold-Pressed Castor Oil (200 ml) - ₹150\n" +
  "2. Rosemary Powder (100 g) - ₹100\n" +
  "3. Shikakai Powder (100 g) - ₹80\n" +
  "4. Hair care trio (castor oil + rosemary + shikakai) - ₹299\n\n" +
  "Reply with a number.";

const CANCELLED = "Your order has been cancelled. Message us any time to start a new order.";

function productLabel(key: string | null): string {
  return PRODUCTS.find((product) => product.key === key)?.label ?? "your selected product";
}

function detectProduct(text: string) {
  const trio = PRODUCTS.find((product) => product.key === "hair-care-trio");
  if (trio?.match.test(text)) return trio;
  return PRODUCTS.find((product) => product.match.test(text)) ?? null;
}

function parseQuantity(text: string): number | null {
  const match = text.trim().match(/^(\d{1,2})$/);
  if (!match) return null;
  const value = Number(match[1]);
  return value >= 1 && value <= MAX_QUANTITY ? value : null;
}

function parsePaymentMethod(text: string): "UPI" | "COD" | null {
  const trimmed = text.trim();
  if (/^1\b|upi/i.test(trimmed)) return "UPI";
  if (/^2\b|cod|cash/i.test(trimmed)) return "COD";
  return null;
}

function startOrder(text: string): Transition {
  const product = detectProduct(text);
  if (!product) {
    return { reply: MENU, draft: { ...EMPTY_DRAFT, step: "choose_product" } };
  }

  const quantityMatch = text.match(/\bqty\.?\s*:?\s*(\d{1,2})\b/i);
  const quantity = quantityMatch ? parseQuantity(quantityMatch[1]) : null;
  if (!quantity) {
    return {
      reply: `Thank you for contacting Aralu Organics. How many packs of ${product.label} would you like? Reply with a number, for example 2.`,
      draft: { ...EMPTY_DRAFT, step: "ask_quantity", product_key: product.key },
    };
  }

  return {
    reply: `Thank you for contacting Aralu Organics. We have ${quantity} x ${product.label}. What is your full delivery address, including the PIN code?`,
    draft: { ...EMPTY_DRAFT, step: "ask_address", product_key: product.key, quantity },
  };
}

function summary(draft: OrderDraft, paymentMethod: "UPI" | "COD"): string {
  const payment = paymentMethod === "UPI" ? "UPI" : "Cash on delivery";
  return (
    "Please check your order:\n\n" +
    `Item: ${productLabel(draft.product_key)}\n` +
    `Quantity: ${draft.quantity}\n` +
    `Delivery address: ${draft.delivery_address}\n` +
    `Payment: ${payment}\n\n` +
    "Reply YES to place your order or NO to cancel."
  );
}

function randomCode(length: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => CODE_ALPHABET[byte % CODE_ALPHABET.length]).join("");
}

async function placeOrder(db: SupabaseClient, phone: string, draft: OrderDraft): Promise<string> {
  if (!draft.product_key || draft.quantity === null || !draft.delivery_address || !draft.payment_method) {
    throw new Error("Order draft is incomplete at confirmation");
  }

  const orderCode = `ARA-${randomCode(5)}`;
  const { error } = await db.from("orders").insert({
    order_code: orderCode,
    customer_phone: phone,
    product: productLabel(draft.product_key),
    quantity: draft.quantity,
    delivery_address: draft.delivery_address,
    payment_method: draft.payment_method,
    status: "new",
  });
  if (error) throw new Error(`Order insert failed: ${error.message}`);

  return orderCode;
}

function orderPlaced(orderCode: string, draft: OrderDraft): string {
  const paymentNote =
    draft.payment_method === "UPI"
      ? `We will message you the total amount here shortly. Pay to UPI ID ${UPI_ID} and send the payment screenshot in this chat.`
      : "Keep the amount ready in cash when your order arrives.";

  return (
    "Thank you for ordering from Aralu Organics!\n\n" +
    `Order code: ${orderCode}\n` +
    `Item: ${productLabel(draft.product_key)}\n` +
    `Quantity: ${draft.quantity}\n` +
    `Delivery address: ${draft.delivery_address}\n` +
    `Payment: ${draft.payment_method === "UPI" ? "UPI" : "Cash on delivery"}\n\n` +
    `${paymentNote}\n\n` +
    "Keep your order code for reference. We will send dispatch updates here."
  );
}

async function nextTransition(
  db: SupabaseClient,
  phone: string,
  draft: OrderDraft,
  text: string,
): Promise<Transition> {
  switch (draft.step) {
    case "idle":
      return startOrder(text);

    case "choose_product": {
      const trimmed = text.trim();
      const product = /^[1-4]$/.test(trimmed) ? PRODUCTS[Number(trimmed) - 1] : detectProduct(text);
      if (!product) {
        return { reply: `Please reply with a number from 1 to 4.\n\n${MENU}`, draft };
      }
      return {
        reply: `How many packs of ${product.label} would you like? Reply with a number, for example 2.`,
        draft: { ...draft, step: "ask_quantity", product_key: product.key },
      };
    }

    case "ask_quantity": {
      const quantity = parseQuantity(text);
      if (!quantity) {
        return { reply: `Please reply with a number between 1 and ${MAX_QUANTITY}.`, draft };
      }
      return {
        reply: "What is your full delivery address, including the PIN code?",
        draft: { ...draft, step: "ask_address", quantity },
      };
    }

    case "ask_address": {
      const address = text.trim();
      if (address.length < MIN_ADDRESS_LENGTH) {
        return { reply: "Please send your full delivery address, including the PIN code.", draft };
      }
      return {
        reply: "How would you like to pay?\n\n1. UPI\n2. Cash on delivery (COD)\n\nReply 1 or 2.",
        draft: { ...draft, step: "ask_payment", delivery_address: address.slice(0, MAX_ADDRESS_LENGTH) },
      };
    }

    case "ask_payment": {
      const paymentMethod = parsePaymentMethod(text);
      if (!paymentMethod) {
        return { reply: "Please reply 1 for UPI or 2 for Cash on delivery.", draft };
      }
      const confirmed = { ...draft, step: "confirm" as const, payment_method: paymentMethod };
      return { reply: summary(confirmed, paymentMethod), draft: confirmed };
    }

    case "confirm": {
      if (/^(no|n|cancel)\b/i.test(text.trim())) {
        return { reply: CANCELLED, draft: EMPTY_DRAFT };
      }
      if (!/^(yes|y|confirm|ok)\b/i.test(text.trim())) {
        return { reply: "Reply YES to place your order or NO to cancel.", draft };
      }
      const orderCode = await placeOrder(db, phone, draft);
      return { reply: orderPlaced(orderCode, draft), draft: EMPTY_DRAFT };
    }
  }
}

async function loadDraft(db: SupabaseClient, phone: string): Promise<{ draft: OrderDraft; lastMessageId: string | null }> {
  const { data, error } = await db
    .from("whatsapp_sessions")
    .select("step, product_key, quantity, delivery_address, payment_method, last_message_id")
    .eq("phone", phone)
    .maybeSingle();
  if (error) throw new Error(`Session load failed: ${error.message}`);
  if (!data) return { draft: EMPTY_DRAFT, lastMessageId: null };

  return {
    draft: {
      step: data.step as Step,
      product_key: data.product_key,
      quantity: data.quantity,
      delivery_address: data.delivery_address,
      payment_method: data.payment_method as OrderDraft["payment_method"],
    },
    lastMessageId: data.last_message_id,
  };
}

async function saveDraft(db: SupabaseClient, phone: string, draft: OrderDraft, messageId: string): Promise<void> {
  const { error } = await db.from("whatsapp_sessions").upsert({
    phone,
    step: draft.step,
    product_key: draft.product_key,
    quantity: draft.quantity,
    delivery_address: draft.delivery_address,
    payment_method: draft.payment_method,
    last_message_id: messageId,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(`Session save failed: ${error.message}`);
}

export async function handleInboundText(
  db: SupabaseClient,
  phone: string,
  text: string,
  messageId: string,
): Promise<void> {
  const { draft, lastMessageId } = await loadDraft(db, phone);
  if (lastMessageId === messageId) return;

  const transition = /^cancel\b/i.test(text.trim())
    ? { reply: CANCELLED, draft: EMPTY_DRAFT }
    : await nextTransition(db, phone, draft, text);

  await saveDraft(db, phone, transition.draft, messageId);
  await sendText(phone, transition.reply);
}
