import { WHY_POINTS } from '@/data/siteData';
import SectionHeading from '@/components/SectionHeading';
import { ShieldCheck } from 'lucide-react';

export default function WhyAralu() {
  return (
    <section id="why-aralu" className="scroll-mt-20 border-t border-green/10 bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Why Aralu"
            title="Honest care, with nothing hidden"
            description="We make products you can trust with your eyes closed. Single ingredients harvested with respect, processed without shortcuts, and shared with love."
          />
          <div className="mt-8 hidden lg:block rounded-2xl border border-green/15 bg-cream p-5 text-sm text-ink-muted leading-relaxed">
            <div className="flex items-center gap-2 font-semibold text-green mb-1.5">
              <ShieldCheck className="h-5 w-5 text-amber-dark" />
              Our Promise
            </div>
            If an ingredient does not serve your hair or skin directly, it does not go into our bottle or pouch. Simple as that.
          </div>
        </div>

        <ol className="grid gap-6 lg:col-span-7">
          {WHY_POINTS.map((point, index) => (
            <li
              key={point.title}
              className="flex gap-6 rounded-2xl border border-green/10 bg-cream p-6 transition-all duration-300 hover:border-green/25 hover:shadow-sm"
            >
              <span
                className="font-display text-3xl font-semibold text-amber-dark/90"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-green">{point.title}</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink-muted">
                  {point.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
