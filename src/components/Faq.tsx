import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/siteData';
import SectionHeading from '@/components/SectionHeading';

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" description="Still curious? Message us on WhatsApp." />
        <div className="divide-y divide-green/15 border-y border-green/15">
          {FAQS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-green transition-colors hover:text-amber-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-5 pr-8 leading-[1.5] text-ink-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
