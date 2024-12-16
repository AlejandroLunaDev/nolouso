'use client';

import { useProductStore } from '@/lib/stores/useProductStore';
import { useEffect } from 'react';
import { ProductCard } from '../../../products/ProductCard/ProductCard';

export function FeaturedProducts() {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Simulamos productos destacados (en producción esto vendría del backend)
  const featuredProducts = products
    .filter(product => product.status)
    .slice(0, 3);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='py-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-medium text-white'>Featured Products</h2>
        <p className='text-sm text-white/70'>Handpicked by our experts</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {featuredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.title,
              price: product.price,
              imageUrl: product.thumbnails[0]
            }}
            variant='default'
          />
        ))}
      </div>
    </section>
  );
}
