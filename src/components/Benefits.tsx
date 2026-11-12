import { BENEFITS } from '@/data/siteData';
import SectionHeading from '@/components/SectionHeading';
import { DropIcon, LeafIcon, PodIcon, SeedIcon } from '@/components/BotanicalIcons';

const ICONS = {
  leaf: LeafIcon,
  seed: SeedIcon,
  pod: PodIcon,
  drop: DropIcon,
};

export default function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-20 border-y border-green/15 bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Benefits"
          title="Traditional care, used the simple way"
          description="Our products are traditionally used for everyday care. They are not medicines."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => {
            const Icon = ICONS[benefit.icon];
            return (
              <li
                key={benefit.title}
                className="group flex gap-4 rounded-2xl border border-green/15 bg-cream p-6 transition-colors duration-300 hover:border-amber-dark/60 hover:bg-cream-200/50"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green text-amber-light transition-transform duration-300 group-hover:-rotate-6">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-green">{benefit.title}</h3>
                  <p className="mt-2 leading-[1.5] text-ink-muted">{benefit.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
