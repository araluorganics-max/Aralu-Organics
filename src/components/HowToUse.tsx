import { STEPS } from '@/data/siteData';
import SectionHeading from '@/components/SectionHeading';

export default function HowToUse() {
  return (
    <section id="how-to-use" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How to use"
          title="Three simple rituals"
          description="Start with small amounts and see how your skin and hair respond."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <article key={step.product} className="rounded-3xl border border-green/15 bg-cream-50 p-6 sm:p-8">
              <p className="font-display text-5xl font-semibold text-amber-dark/80" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-green">{step.product}</h3>
              <ol className="mt-6 space-y-4">
                {step.steps.map((line, stepIndex) => (
                  <li key={line} className="flex gap-3 leading-[1.5] text-ink-muted">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-dark/40 text-xs font-semibold text-amber-dark">
                      {stepIndex + 1}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <p className="mt-8 rounded-2xl border border-amber-dark/30 bg-amber-100/60 px-6 py-4 text-sm font-medium leading-[1.5] text-ink">
          Patch-test before first use. For external use only.
        </p>
      </div>
    </section>
  );
}
