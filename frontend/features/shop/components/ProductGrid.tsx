import React from 'react';
import { useShopStore } from '@/lib/stores/useShopStore';
import { ProductCard } from '@/features/products/ProductCard/ProductCard';
import { Skeleton } from '@/common/ui/skeleton';

function ProductGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className='space-y-4'>
          <Skeleton className='h-48 w-full rounded-lg' />
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      ))}
    </div>
  );
}

export function ProductGrid() {
  const isLoading = useShopStore(state => state.isLoading);
  const getFilteredProducts = useShopStore(state => state.getFilteredProducts);
  const filteredProducts = getFilteredProducts();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-lg text-muted-foreground'>
          No se encontraron productos
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
