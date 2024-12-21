'use client';

import { useProductStore } from '@/lib/stores/useProductStore';
import { useEffect } from 'react';
import { ProductCard } from '../../../products/ProductCard/ProductCard';

export function NewArrivals() {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts(1); // Obtén los productos solo una vez al cargar la página (sin paginación)
  }, [fetchProducts]);

  // Ordena los productos por fecha de creación y toma los primeros 4
  const newProducts = products
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4); // Limita a los últimos 4 productos

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='py-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-medium text-white'>New Arrivals</h2>
        <p className='text-sm text-white/70'>Check out our latest products</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
        {newProducts.map(product => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.title,
              price: product.price,
              imageUrl: product.thumbnails[0],
            }}
            
            variant='compact'
          />
        ))}
      </div>
    </section>
  );
}
