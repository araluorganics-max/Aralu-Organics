import { Instagram, Mail, MapPin, MessageCircle, Phone, Truck, Wallet } from 'lucide-react';
import { BRAND } from '@/data/siteData';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import SectionHeading from '@/components/SectionHeading';

type ContactRow = {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
};

const ROWS: ContactRow[] = [
  { icon: Phone, label: 'Phone', value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: Instagram, label: 'Instagram', value: BRAND.instagramUrl, href: BRAND.instagramUrl },
  { icon: MapPin, label: 'Address', value: BRAND.address },
  { icon: Truck, label: 'Delivery areas', value: BRAND.deliveryAreas },
  { icon: Wallet, label: 'Payment', value: 'UPI and cash on delivery (COD)' },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Contact and order"
            title="Order in one message"
            description="Tap the button, choose your product and quantity, and send. We reply on WhatsApp with payment and delivery details."
          />
          <a
            href={buildWhatsAppUrl('Hi Aralu Organics, I would like to place an order.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-green px-8 text-base font-semibold text-cream transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Chat on WhatsApp: {BRAND.whatsappNumber}
          </a>
        </div>

        <dl className="divide-y divide-green/15 rounded-3xl border border-green/15 bg-cream-50">
          {ROWS.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex gap-4 p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-200 text-green">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm font-semibold uppercase tracking-wider text-amber-dark">{label}</dt>
                <dd className="mt-1 break-words text-base text-ink">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="rounded underline decoration-amber-dark/50 underline-offset-4 transition-colors hover:decoration-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
