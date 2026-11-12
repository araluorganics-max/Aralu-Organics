import { useState, useEffect, useId, type FormEvent } from 'react';
import {
  X,
  Minus,
  Plus,
  MessageCircle,
  MapPin,
  CreditCard,
  Truck,
  User,
  Phone,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Gift,
} from 'lucide-react';
import { useOrderModal } from '@/context/OrderModalContext';
import { buildDetailedOrderUrl, buildDetailedOrderMessage, buildOrderUrl } from '@/lib/whatsapp';
import type { Product } from '@/data/siteData';
import { CASTOR_OIL_OFFER } from '@/data/siteData';

const MIN_QTY = 1;
const MAX_QTY = 20;

export default function OrderModal() {
  const { isOpen, orderItem, initialQuantity, closeOrderModal } = useOrderModal();

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');
  const [showPreview, setShowPreview] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const nameId = useId();
  const phoneId = useId();
  const addressId = useId();
  const cityId = useId();
  const pincodeId = useId();

  // Reset or sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(initialQuantity || 1);
      setFormErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialQuantity]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeOrderModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOrderModal]);

  if (!isOpen || !orderItem) return null;

  // Price calculations
  const numericPriceMatch = orderItem.price.match(/\d+/);
  const unitPriceNumber = numericPriceMatch ? parseInt(numericPriceMatch[0], 10) : null;
  const totalPriceDisplay = unitPriceNumber ? (unitPriceNumber * quantity).toString() : undefined;

  // Free gift offer logic
  const offerApplies =
    orderItem.id === CASTOR_OIL_OFFER.triggerProductId &&
    quantity >= CASTOR_OIL_OFFER.triggerQty;

  const orderDetails = {
    productName: orderItem.name,
    productSize: orderItem.size,
    quantity,
    totalPrice: totalPriceDisplay,
    customerName: name.trim() || '[Your Name]',
    customerPhone: phone.trim() || '[Your Phone]',
    address: address.trim() || '[Your Address]',
    city: city.trim() || '[City]',
    pincode: pincode.trim() || '[PIN Code]',
    paymentMethod,
    freeGiftNote: offerApplies ? CASTOR_OIL_OFFER.whatsappLine : undefined,
  };

  const previewMessage = buildDetailedOrderMessage(orderDetails);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'Please enter your name';
    if (!phone.trim()) errors.phone = 'Please enter your WhatsApp/phone number';
    if (!address.trim() || address.trim().length < 5) errors.address = 'Please enter your full delivery address';
    if (!city.trim()) errors.city = 'Please enter your city';
    if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim())) errors.pincode = 'Please enter a valid 6-digit PIN code';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const whatsappUrl = buildDetailedOrderUrl({
      productName: orderItem.name,
      productSize: orderItem.size,
      quantity,
      totalPrice: totalPriceDisplay,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      paymentMethod,
      freeGiftNote: offerApplies ? CASTOR_OIL_OFFER.whatsappLine : undefined,
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    closeOrderModal();
  };

  const handleSkipDirectly = () => {
    const fallbackUrl = buildOrderUrl(orderItem as Product, quantity);
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    closeOrderModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-green-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeOrderModal}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-green/20 bg-cream shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-green/10 bg-cream-50 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green text-amber-light">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 id="order-modal-title" className="font-display text-xl font-semibold text-green">
                Order via WhatsApp
              </h2>
              <p className="text-xs text-ink-muted">Enter details below for quick 1-click confirmation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeOrderModal}
            className="rounded-full p-2 text-ink-muted hover:bg-green/10 hover:text-green focus-visible:outline-2 focus-visible:outline-green"
            aria-label="Close order dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Item summary banner */}
          <div className="flex flex-col gap-4 rounded-2xl border border-green/15 bg-cream-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">{orderItem.size}</p>
              <h3 className="font-display text-lg font-semibold text-green">{orderItem.name}</h3>
              <p className="text-sm font-semibold text-ink">
                ₹{orderItem.price} <span className="font-normal text-ink-muted">each</span>
                {totalPriceDisplay && (
                  <span className="ml-2 rounded bg-green/10 px-2 py-0.5 text-xs font-bold text-green">
                    Total: ₹{totalPriceDisplay}
                  </span>
                )}
              </p>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-1 self-start sm:self-center rounded-full border border-green/20 bg-cream">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(MIN_QTY, q - 1))}
                disabled={quantity <= MIN_QTY}
                aria-label="Decrease quantity"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-green hover:bg-green/10 disabled:opacity-30"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-green" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
                disabled={quantity >= MAX_QTY}
                aria-label="Increase quantity"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-green hover:bg-green/10 disabled:opacity-30"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Free gift callout — only for Castor Oil when qty ≥ 2 */}
          {orderItem.id === CASTOR_OIL_OFFER.triggerProductId && (
            <div
              className={`flex items-start gap-3 rounded-2xl border p-3.5 transition-all duration-500 ${offerApplies
                  ? 'border-amber-dark/40 bg-amber-light/20'
                  : 'border-dashed border-amber-dark/25 bg-amber-light/10'
                }`}
            >
              <Gift
                className={`mt-0.5 h-5 w-5 shrink-0 ${offerApplies ? 'text-amber-dark' : 'text-amber-dark/50'}`}
              />
              <div>
                {offerApplies ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-dark">
                      🎉 Free gifts included!
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-ink">
                      {CASTOR_OIL_OFFER.summary} — added free to your order
                    </p>
                    <ul className="mt-1.5 space-y-0.5">
                      {CASTOR_OIL_OFFER.freebies.map((f) => (
                        <li key={f.name} className="text-xs text-green flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-dark inline-block" />
                          {f.name} · {f.size}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-dark/70">
                      Add {CASTOR_OIL_OFFER.triggerQty - quantity} more bottle{CASTOR_OIL_OFFER.triggerQty - quantity !== 1 ? 's' : ''} to unlock free gift
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Buy {CASTOR_OIL_OFFER.triggerQty} → get {CASTOR_OIL_OFFER.summary} free
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-green">
              <User className="h-4 w-4 text-amber-dark" aria-hidden="true" />
              <span>Contact Information</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={nameId} className="block text-xs font-medium text-ink">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formErrors.name) setFormErrors((err) => ({ ...err, name: '' }));
                  }}
                  placeholder="e.g. Priya Sharma"
                  className={`mt-1 w-full rounded-xl border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-1 focus:ring-green ${formErrors.name ? 'border-red-500 bg-red-50/30' : 'border-green/20'
                    }`}
                />
                {formErrors.name && <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor={phoneId} className="block text-xs font-medium text-ink">
                  WhatsApp Number <span className="text-red-600">*</span>
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-ink-muted">
                    <Phone className="h-3.5 w-3.5 mr-1" aria-hidden="true" /> +91
                  </span>
                  <input
                    id={phoneId}
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10));
                      if (formErrors.phone) setFormErrors((err) => ({ ...err, phone: '' }));
                    }}
                    placeholder="9988998899"
                    className={`w-full rounded-xl border bg-cream py-2 pl-16 pr-3 text-sm text-ink outline-none transition focus:border-green focus:ring-1 focus:ring-green ${formErrors.phone ? 'border-red-500 bg-red-50/30' : 'border-green/20'
                      }`}
                  />
                </div>
                {formErrors.phone && <p className="mt-1 text-xs text-red-600">{formErrors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-green">
              <MapPin className="h-4 w-4 text-amber-dark" aria-hidden="true" />
              <span>Delivery Address</span>
            </div>

            <div>
              <label htmlFor={addressId} className="block text-xs font-medium text-ink">
                House / Flat / Street / Area <span className="text-red-600">*</span>
              </label>
              <textarea
                id={addressId}
                rows={2}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (formErrors.address) setFormErrors((err) => ({ ...err, address: '' }));
                }}
                placeholder="e.g. #42, Green Glen Layout, Bellandur"
                className={`mt-1 w-full rounded-xl border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-1 focus:ring-green ${formErrors.address ? 'border-red-500 bg-red-50/30' : 'border-green/20'
                  }`}
              />
              {formErrors.address && <p className="mt-1 text-xs text-red-600">{formErrors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={cityId} className="block text-xs font-medium text-ink">
                  City / Town <span className="text-red-600">*</span>
                </label>
                <input
                  id={cityId}
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (formErrors.city) setFormErrors((err) => ({ ...err, city: '' }));
                  }}
                  placeholder="e.g. Bengaluru"
                  className={`mt-1 w-full rounded-xl border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-1 focus:ring-green ${formErrors.city ? 'border-red-500 bg-red-50/30' : 'border-green/20'
                    }`}
                />
                {formErrors.city && <p className="mt-1 text-xs text-red-600">{formErrors.city}</p>}
              </div>

              <div>
                <label htmlFor={pincodeId} className="block text-xs font-medium text-ink">
                  PIN Code (6 digits) <span className="text-red-600">*</span>
                </label>
                <input
                  id={pincodeId}
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/[^0-9]/g, ''));
                    if (formErrors.pincode) setFormErrors((err) => ({ ...err, pincode: '' }));
                  }}
                  placeholder="560103"
                  className={`mt-1 w-full rounded-xl border bg-cream px-3 py-2 text-sm text-ink outline-none transition focus:border-green focus:ring-1 focus:ring-green ${formErrors.pincode ? 'border-red-500 bg-red-50/30' : 'border-green/20'
                    }`}
                />
                {formErrors.pincode && <p className="mt-1 text-xs text-red-600">{formErrors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-green">
              <CreditCard className="h-4 w-4 text-amber-dark" aria-hidden="true" />
              <span>Payment Preference</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition ${paymentMethod === 'UPI'
                    ? 'border-green bg-green/10 text-green shadow-sm'
                    : 'border-green/15 bg-cream hover:bg-cream-50'
                  }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="mt-0.5 text-green focus:ring-green"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                    <Sparkles className="h-3.5 w-3.5 text-amber-dark" />
                    <span>UPI (Recommended)</span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-muted">GPay, PhonePe, Paytm, or UPI QR</p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition ${paymentMethod === 'COD'
                    ? 'border-green bg-green/10 text-green shadow-sm'
                    : 'border-green/15 bg-cream hover:bg-cream-50'
                  }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-0.5 text-green focus:ring-green"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                    <Truck className="h-3.5 w-3.5 text-amber-dark" />
                    <span>Cash on Delivery</span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-muted">Pay in cash when package arrives</p>
                </div>
              </label>
            </div>
          </div>

          {/* WhatsApp Message Preview Accordion */}
          <div className="rounded-2xl border border-green/15 bg-cream-50 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex w-full items-center justify-between p-3.5 text-xs font-semibold text-green hover:bg-cream-200/50"
            >
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                Preview WhatsApp Message
              </span>
              {showPreview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showPreview && (
              <div className="border-t border-green/10 bg-[#e5ddd5]/40 p-4">
                <div className="rounded-2xl bg-white p-3.5 shadow-sm text-xs font-mono text-ink whitespace-pre-wrap leading-relaxed">
                  {previewMessage}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-green px-6 text-base font-semibold text-cream transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark shadow-md"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Confirm & Open WhatsApp
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleSkipDirectly}
                className="text-xs text-ink-muted underline underline-offset-4 hover:text-green"
              >
                Or chat directly without entering address now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

