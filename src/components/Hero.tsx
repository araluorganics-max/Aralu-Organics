import { ArrowRight } from 'lucide-react';
import { BRAND, PRODUCTS } from '@/data/siteData';
import ProductArt from '@/components/ProductArt';
import { BotanicalSprig } from '@/components/BotanicalIcons';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-green text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-light/40 px-3 py-1 font-kannada text-sm text-amber-light">
            <span lang="kn">{BRAND.kannadaName}</span>
            <span className="text-cream/70">Aralu</span>
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
            {BRAND.tagline}
          </h1>
          <p className="mt-6 text-lg leading-[1.5] text-cream/85 sm:text-xl">
            Pure castor oil, rosemary and shikakai powders for hair, skin and brows
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#products"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-light px-8 text-base font-semibold text-green transition-all hover:bg-cream hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            >
              Shop now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#how-to-use"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cream/40 px-8 text-base font-medium text-cream transition-colors hover:border-cream hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-light"
            >
              How to use
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-cream/15 pt-6 text-xs font-medium text-cream/75">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-light" />
              100% Single-Ingredient Care
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-light" />
              Small-Batch Cold-Pressed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-light" />
              Zero Additives or Fillers
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <BotanicalSprig className="absolute -left-6 top-4 h-40 w-auto text-amber-light/30" />
          <div className="relative rounded-[32px] border border-amber-light/30 bg-cream p-6 text-green sm:p-10">
            <div className="grid grid-cols-5 grid-rows-2 items-end gap-3">
              <ProductArt product={PRODUCTS[0]} className="col-span-3 row-span-2 h-auto w-full" />
              <ProductArt product={PRODUCTS[1]} className="col-span-2 h-auto w-full" />
              <ProductArt product={PRODUCTS[2]} className="col-span-2 h-auto w-full" />
            </div>
            <p className="mt-6 text-center text-sm text-ink-muted">Castor oil, rosemary and shikakai</p>
          </div>
        </div>
      </div>
    </section>
  );
}
