import BotanicalSapling from '@/components/BotanicalSapling';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-green/10 bg-[#F6F1E8] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Story Text */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-dark">
              Our Story
            </p>

            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.15] text-green sm:text-5xl">
              About Aralu
            </h2>

            <p
              lang="kn"
              className="mt-1 font-kannada text-5xl font-normal leading-none text-amber sm:text-6xl"
            >
              ಅರಳು
            </p>

            <p className="mt-5 font-display text-lg italic text-green/90 sm:text-xl">
              Aralu — to bloom, to open up, to flourish.
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              <p>
                Aralu Organics was born from a simple belief: the best care comes from nature, kept pure.
                We grew up watching grandmothers press castor seeds and brew herbal rinses — rituals
                passed down not as routines, but as acts of love.
              </p>

              <p>
                Today, we make those same ingredients available in their most honest form. No blends,
                no fillers. Just one ingredient, handled with care and packed in small batches.
              </p>

              <p className="pt-2 text-ink">
                <span lang="kn" className="font-kannada font-semibold text-amber-dark">
                  ಅರಳು
                </span>{' '}
                — because we believe good care lets you bloom.
              </p>
            </div>
          </div>

          {/* Botanical Seedling Illustration */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative flex items-center justify-center p-4">
              <BotanicalSapling className="h-auto w-56 sm:w-64 lg:w-72 drop-shadow-sm transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
