import type { Product } from '@/data/siteData';

type ProductArtProps = {
  product: Product;
  className?: string;
};

// Flat placeholder art. Swap for real photos by setting `image` on the product in siteData.
export default function ProductArt({ product, className }: ProductArtProps) {
  if (product.image) {
    return <img src={product.image} alt={`${product.name}, ${product.size}`} className={className} loading="lazy" />;
  }

  if (product.art === 'bottle') {
    return (
      <svg viewBox="0 0 200 240" className={className} role="img" aria-label={`${product.name} bottle illustration`}>
        <rect x="76" y="14" width="48" height="26" rx="4" fill="#8A5A0B" />
        <rect x="70" y="36" width="60" height="22" rx="3" fill="#E8E0CC" />
        <rect x="58" y="58" width="84" height="164" rx="22" fill="#1F3D2B" />
        <rect x="58" y="112" width="84" height="64" fill="#C8861D" />
        <path d="M100 124c-6 6-7 13 0 20 7-7 6-14 0-20z" fill="#F4EFE3" />
        <rect x="72" y="186" width="56" height="4" rx="2" fill="#E3AE55" />
        <rect x="72" y="196" width="36" height="3" rx="1.5" fill="#E3AE55" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 240" className={className} role="img" aria-label={`${product.name} pouch illustration`}>
      <path d="M36 40h128l8 180H28z" fill="#E3AE55" />
      <path d="M36 40h128l-6 14H42z" fill="#8A5A0B" />
      <rect x="36" y="40" width="128" height="180" fill="none" stroke="#1F3D2B" strokeWidth="2" />
      <rect x="58" y="96" width="84" height="84" rx="6" fill="#1F3D2B" />
      <path d="M100 110c-10 10-12 20 0 32 12-12 10-22 0-32z" fill="#E3AE55" />
      <path d="M100 132v22" stroke="#F4EFE3" strokeWidth="2" strokeLinecap="round" />
      <rect x="58" y="62" width="84" height="8" rx="4" fill="#1F3D2B" opacity="0.6" />
    </svg>
  );
}
