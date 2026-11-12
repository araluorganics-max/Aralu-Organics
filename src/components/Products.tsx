import { PRODUCTS } from '@/data/siteData';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';

export default function Products() {
  return (
    <section id="products" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our products"
          title="Three simple essentials for hair, skin and brows"
          description="Single-ingredient care you can understand at a glance."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
