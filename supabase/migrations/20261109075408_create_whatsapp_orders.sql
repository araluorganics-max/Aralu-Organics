/*
# Create WhatsApp order tables

Adds the storage behind the automated WhatsApp order assistant.

1. New Tables
- `orders`: one row per confirmed order. Holds the order code, customer phone, product, quantity, delivery address, payment method (UPI or COD), status and creation time.
- `whatsapp_sessions`: one row per customer phone number while an order is in progress. Holds the current question step and the answers collected so far, plus the last processed WhatsApp message id to ignore duplicate deliveries.

2. Security
- Row level security is enabled on both tables.
- No access is granted to the public (anon) or signed-in (authenticated) roles, because the tables hold customer phone numbers and addresses.
- Only the server-side service role is granted access, used by the WhatsApp webhook function.

3. Notes
- Orders are read from the Supabase dashboard until an admin view is added.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code text NOT NULL UNIQUE,
  customer_phone text NOT NULL,
  product text NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0 AND quantity <= 50),
  delivery_address text NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN ('UPI', 'COD')),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_customer_phone_idx ON orders (customer_phone);

CREATE TABLE IF NOT EXISTS whatsapp_sessions (
  phone text PRIMARY KEY,
  step text NOT NULL DEFAULT 'idle',
  product_key text,
  quantity integer,
  delivery_address text,
  payment_method text,
  last_message_id text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_sessions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON orders TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON whatsapp_sessions TO service_role;
