import { ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND, COMBO } from '@/data/siteData';
import { useOrderModal } from '@/context/OrderModalContext';

export default function ComboStrip() {
  const { openOrderModal } = useOrderModal();

  const handleOrderCombo = () => {
    openOrderModal(
      {
        id: 'hair-care-trio',
        name: COMBO.title,
        size: COMBO.items,
        price: BRAND.comboPrice,
        isCombo: true,
      },
      1,
    );
  };

  return (
    <section aria-label="Combo offer" className="border-y border-amber-200/80 bg-gradient-to-r from-amber-100 via-cream-50 to-amber-100/70 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-start gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green text-amber-light shadow-md shadow-green/20">
            <ShoppingBag className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-dark/30 bg-amber-200/50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-dark">
                <Sparkles className="h-3 w-3" />
                Complete Ritual Trio
              </span>
              <span className="rounded-full bg-green/10 px-2.5 py-0.5 text-xs font-bold text-green">
                Save ₹31
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold text-green sm:text-3xl">
              {COMBO.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted sm:text-base">
              Pure Castor Oil (200 ml) + Rosemary Powder (100 g) + Shikakai Powder (100 g)
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-green">₹{BRAND.comboPrice}</span>
              <span className="text-sm text-ink-muted line-through">₹330</span>
              <span className="text-xs font-medium text-amber-dark">• All 3 essentials in one box</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOrderCombo}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green px-8 text-base font-semibold text-cream shadow-md transition-all hover:bg-green-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark sm:w-auto"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Order the trio on WhatsApp
        </button>
      </div>
    </section>
  );
}
