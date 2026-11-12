import { useState } from 'react';
import { Minus, Plus, MessageCircle, Sparkles, Gift } from 'lucide-react';
import type { Product } from '@/data/siteData';
import { CASTOR_OIL_OFFER } from '@/data/siteData';
import ProductArt from '@/components/ProductArt';
import { useOrderModal } from '@/context/OrderModalContext';

const MIN_QTY = 1;
const MAX_QTY = 10;

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(MIN_QTY);
  const { openOrderModal } = useOrderModal();

  const isCastorOil = product.id === CASTOR_OIL_OFFER.triggerProductId;
  const offerUnlocked = isCastorOil && quantity >= CASTOR_OIL_OFFER.triggerQty;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-green/15 bg-cream-50 transition-all duration-300 hover:-translate-y-1 hover:border-green/30 hover:shadow-[0_16px_36px_-16px_rgba(31,61,43,0.25)]">
      {/* Product Artwork Container */}
      <div className="relative flex h-60 items-center justify-center border-b border-green/10 bg-gradient-to-b from-cream-200/50 to-cream-50/50 p-8 sm:h-68">
        {/* Top-left badge: offer for castor oil, else "Pure Essential" */}
        {isCastorOil ? (
          <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1 rounded-full border border-amber-dark/30 bg-amber-light/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-dark shadow-sm backdrop-blur-sm">
            <Gift className="h-3 w-3" />
            {CASTOR_OIL_OFFER.badgeLabel}
          </span>
        ) : (
          <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1 rounded-full border border-green/15 bg-cream/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-green shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-amber-dark" />
            Pure Essential
          </span>
        )}
        <ProductArt
          product={product}
          className="relative z-10 h-full w-auto max-w-full drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Content */}
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-dark">
            {product.size}
          </p>
          <h3 className="mt-1.5 font-display text-2xl font-semibold leading-[1.2] text-green">
            {product.name}
          </h3>
          {product.kannadaName && (
            <p lang="kn" className="mt-1 font-kannada text-lg text-ink-muted">
              {product.kannadaName}
            </p>
          )}
        </div>

        <p className="leading-relaxed text-ink-muted text-sm sm:text-base">
          {product.description}
        </p>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-green/80">
            Best for
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {product.bestFor.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-green/20 bg-cream px-3 py-1 text-xs font-medium text-green"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Free gift unlock banner — only for castor oil, appears at qty ≥ 2 */}
        {isCastorOil && (
          <div
            className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
              offerUnlocked
                ? 'border-amber-dark/40 bg-amber-light/20 max-h-40 opacity-100'
                : 'border-dashed border-amber-dark/25 bg-amber-light/10 max-h-40 opacity-100'
            }`}
          >
            <div className="flex items-start gap-3 p-3.5">
              <Gift
                className={`mt-0.5 h-5 w-5 shrink-0 transition-colors ${
                  offerUnlocked ? 'text-amber-dark' : 'text-amber-dark/50'
                }`}
              />
              <div>
                {offerUnlocked ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-dark">
                      🎉 Free gifts unlocked!
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-ink">
                      {CASTOR_OIL_OFFER.summary} added to your order — free!
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-dark/70">
                      Buy {CASTOR_OIL_OFFER.triggerQty} bottles →
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Get {CASTOR_OIL_OFFER.summary} absolutely free
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pricing & Quantity Controls */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-green/10 pt-5">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-ink-muted">Price</span>
            <p className="font-display text-3xl font-bold text-green">₹{product.price}</p>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-green/20 bg-cream shadow-inner">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(MIN_QTY, q - 1))}
              disabled={quantity <= MIN_QTY}
              aria-label={`Decrease quantity of ${product.name}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-green transition-colors hover:bg-green/10 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-green" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
              disabled={quantity >= MAX_QTY}
              aria-label={`Increase quantity of ${product.name}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-green transition-colors hover:bg-green/10 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Order Trigger Button */}
        <button
          type="button"
          onClick={() => openOrderModal(product, quantity)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-6 text-base font-semibold text-cream shadow-sm transition-all hover:bg-green-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Order on WhatsApp
        </button>
      </div>
    </article>
  );
}
