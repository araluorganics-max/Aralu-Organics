import { BRAND, type Product } from '@/data/siteData';

export type OrderFormDetails = {
  productName: string;
  productSize: string;
  quantity: number;
  totalPrice?: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'UPI' | 'COD';
  freeGiftNote?: string;
};

export function cleanWhatsAppNumber(number: string): string {
  return number.replace(/[^0-9]/g, '');
}

export function buildWhatsAppUrl(message: string) {
  const digitsOnly = cleanWhatsAppNumber(BRAND.whatsappNumber);
  const target = digitsOnly ? `https://wa.me/${digitsOnly}` : `https://wa.me/`;
  return `${target}?text=${encodeURIComponent(message)}`;
}

export function buildOrderUrl(product: Product, quantity: number) {
  return buildWhatsAppUrl(
    `Hi Aralu Organics, I want to order ${product.name} (${product.size}), qty ${quantity}.`,
  );
}

export function buildComboOrderUrl() {
  return buildWhatsAppUrl('Hi Aralu Organics, I want to order the Hair care trio (castor oil + rosemary + shikakai).');
}

export function buildDetailedOrderMessage(details: OrderFormDetails): string {
  const paymentLabel = details.paymentMethod === 'UPI' ? 'UPI (GPay / PhonePe / Paytm)' : 'Cash on Delivery (COD)';
  const totalLine = details.totalPrice ? `• Total: ₹${details.totalPrice}\n` : '';
  const giftLine = details.freeGiftNote ? `\n${details.freeGiftNote}\n` : '';

  return (
    `Hi Aralu Organics, I would like to place an order:\n\n` +
    `📦 *Order Item:*\n` +
    `• ${details.productName} (${details.productSize})\n` +
    `• Quantity: qty ${details.quantity}\n` +
    totalLine +
    giftLine +
    `\n📍 *Delivery Details:*\n` +
    `• Name: ${details.customerName}\n` +
    `• Phone: ${details.customerPhone}\n` +
    `• Address: ${details.address}\n` +
    `• City & PIN: ${details.city} - ${details.pincode}\n\n` +
    `💳 *Payment Method:*\n` +
    `• ${paymentLabel}\n\n` +
    `Please confirm my order and share updates. Thank you!`
  );
}

export function buildDetailedOrderUrl(details: OrderFormDetails): string {
  return buildWhatsAppUrl(buildDetailedOrderMessage(details));
}
