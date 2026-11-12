import { ArrowLeft, Shield, Lock, Eye, FileText, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { BRAND } from '@/data/siteData';

type PrivacyPolicyProps = {
  onBackToHome: () => void;
};

export default function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-ink antialiased">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="sticky top-0 z-40 border-b border-green/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 rounded-full border border-green/20 bg-cream px-4 py-2 text-sm font-semibold text-green transition hover:border-green hover:bg-green hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </button>

          <a href="#top" onClick={onBackToHome} className="font-display text-lg font-semibold text-green">
            Aralu Organics <span lang="kn" className="font-kannada font-normal text-amber-dark text-base ml-1">ಅರಳು</span>
          </a>
        </div>
      </div>

      {/* Main Privacy Policy Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header */}
        <div className="border-b border-green/15 pb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-green/20 bg-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
            <Shield className="h-3.5 w-3.5 text-amber-dark" />
            Legal & Data Protection
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-green sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-ink-muted sm:text-base">
            Last Updated: November 2026 • In accordance with the Digital Personal Data Protection (DPDP) Act, 2023 & Information Technology Act, 2000.
          </p>
        </div>

        {/* Commitment Statement */}
        <div className="mt-8 rounded-2xl border border-green/15 bg-cream p-6 text-sm sm:text-base leading-relaxed text-ink shadow-sm">
          <p>
            At <strong>{BRAND.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we hold nature and honesty at the core of everything we do. We respect your personal privacy and are committed to safeguarding the personal data you share with us when visiting our website or ordering our cold-pressed oils and herbal powders.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="mt-10 space-y-10 text-sm sm:text-base leading-relaxed text-ink-muted">
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-green">
              <Eye className="h-5 w-5 text-amber-dark" />
              <h2>1. Information We Collect</h2>
            </div>
            <p>
              We only collect information necessary to fulfill your orders and provide transparent customer service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-ink">
              <li>
                <strong>Contact Information:</strong> Your full name, mobile / WhatsApp phone number, and optional email address.
              </li>
              <li>
                <strong>Delivery Details:</strong> Complete shipping address, street, landmark, city, state, and 6-digit postal PIN code.
              </li>
              <li>
                <strong>Order & Transaction Records:</strong> Products selected, quantities, order reference code (e.g. <code>ARA-XXXXX</code>), and chosen payment method (UPI or Cash on Delivery).
              </li>
              <li>
                <strong>Payment Verification:</strong> When paying via UPI, we verify the transaction reference / UTR or payment screenshot you share in WhatsApp. <em>We do not collect or store your bank passwords, debit/credit card CVV, or UPI PINs.</em>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-green">
              <FileText className="h-5 w-5 text-amber-dark" />
              <h2>2. How We Use Your Information</h2>
            </div>
            <p>
              Your personal information is used strictly for legitimate business and fulfillment purposes:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <div className="rounded-xl border border-green/10 bg-cream-50 p-4">
                <h3 className="font-semibold text-green">Order Processing & Fulfillment</h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                  Packing your small-batch botanical products and coordinating door-step delivery.
                </p>
              </div>
              <div className="rounded-xl border border-green/10 bg-cream-50 p-4">
                <h3 className="font-semibold text-green">WhatsApp Dispatch Updates</h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                  Sending order confirmation, payment receipt details, and live courier tracking links.
                </p>
              </div>
              <div className="rounded-xl border border-green/10 bg-cream-50 p-4">
                <h3 className="font-semibold text-green">Customer Care & Support</h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                  Answering queries regarding product usage, patch tests, and ingredients.
                </p>
              </div>
              <div className="rounded-xl border border-green/10 bg-cream-50 p-4">
                <h3 className="font-semibold text-green">Regulatory Compliance</h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                  Complying with FSSAI record standards, GST requirements, and Indian commercial laws.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-green">
              <Lock className="h-5 w-5 text-amber-dark" />
              <h2>3. Data Sharing & Third Parties</h2>
            </div>
            <p className="text-ink font-medium">
              We never sell, rent, or trade your personal details to data brokers or third-party telemarketers.
            </p>
            <p>
              We share your information solely with trusted fulfillment partners required to deliver your goods:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-ink">
              <li>
                <strong>Logistics Partners:</strong> Reliable couriers (e.g., India Post, DTDC, Delhivery, Porter) receive your recipient name, delivery address, and contact number solely to complete transit.
              </li>
              <li>
                <strong>Messaging & Webhook Infrastructure:</strong> WhatsApp (Meta Platforms) and encrypted database servers (Supabase) used solely to transmit automated order receipts and status updates.
              </li>
              <li>
                <strong>Legal Obligations:</strong> If mandated by applicable Indian law or government law enforcement authority.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-green">
              <CheckCircle className="h-5 w-5 text-amber-dark" />
              <h2>4. WhatsApp Communication Policy</h2>
            </div>
            <p>
              When you initiate an order or message us on WhatsApp, you authorize us to respond regarding your order, delivery timeline, and ritual tips.
            </p>
            <p>
              We adhere to a zero-spam policy. If you ever wish to cease receiving messages, simply reply with <strong>STOP</strong> or <strong>CANCEL</strong> in the chat, and your active session will be closed immediately.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-green">
              <Shield className="h-5 w-5 text-amber-dark" />
              <h2>5. Data Security & Storage</h2>
            </div>
            <p>
              We implement industry-standard encryption, Row Level Security (RLS) on our databases, and restricted access protocols to safeguard your personal data from unauthorized disclosure, modification, or theft.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-display text-xl font-semibold text-green">
              <Eye className="h-5 w-5 text-amber-dark" />
              <h2>6. Your Rights</h2>
            </div>
            <p>
              Under Indian data protection laws, you retain the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-ink">
              <li>Request a copy of the personal details we hold regarding your past orders.</li>
              <li>Request rectification of an incorrect phone number or postal address.</li>
              <li>Request deletion of your contact records once orders and regulatory audit periods conclude.</li>
            </ul>
          </section>

          {/* Section 7 - Contact & Grievance */}
          <section className="mt-12 rounded-3xl border border-green/20 bg-cream p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-green">
              7. Grievance Redressal & Contact Us
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              For any questions regarding this Privacy Policy or how your personal information is handled, please contact our designated grievance team:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-amber-dark shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-green block">Email</span>
                  <a href={`mailto:${BRAND.email}`} className="text-ink hover:underline">
                    {BRAND.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-amber-dark shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-green block">WhatsApp & Phone</span>
                  <span className="text-ink">{BRAND.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-dark shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-green block">Location</span>
                  <span className="text-ink">{BRAND.address}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Back to Home Button at bottom */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-full bg-green px-8 py-3 text-base font-semibold text-cream transition hover:bg-green-700 shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Aralu Organics Store</span>
          </button>
        </div>
      </main>
    </div>
  );
}

