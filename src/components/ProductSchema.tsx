import { BRAND, PRODUCTS } from '@/data/siteData';

export default function ProductSchema() {
  const graph = [
    {
      '@type': 'Organization',
      name: BRAND.name,
      description: BRAND.tagline,
      email: BRAND.email,
      telephone: BRAND.phone,
      sameAs: [BRAND.instagramUrl],
    },
    ...PRODUCTS.map((product) => {
      const numericPrice = Number(product.price);
      return {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        keywords: product.keywords,
        brand: { '@type': 'Brand', name: BRAND.name },
        size: product.size,
        ...(product.image ? { image: product.image } : {}),
        ...(Number.isFinite(numericPrice) && product.price.trim() !== ''
          ? {
              offers: {
                '@type': 'Offer',
                price: numericPrice,
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
      };
    }),
  ];

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
