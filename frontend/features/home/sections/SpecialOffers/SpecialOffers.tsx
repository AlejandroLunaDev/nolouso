'use client';

import { useProductStore } from '@/lib/stores/useProductStore';
import { useEffect } from 'react';
import { ProductCard } from '../../../products/ProductCard/ProductCard';

export function SpecialOffers() {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Simulamos ofertas especiales (en producción esto vendría con descuentos del backend)
  const specialOffers = products
    .filter(product => product.stock > 0)
    .slice(0, 4);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='py-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-medium text-white'>Special Offers</h2>
        <p className='text-sm text-white/70'>Limited time deals</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {specialOffers.map(product => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.title,
              price: product.price,
              imageUrl: product.thumbnails[0],
              originalPrice: product.price * 1.2 // Simulamos un precio original 20% mayor
            }}
            variant='compact'
          />
        ))}
      </div>
    </section>
  );
}
