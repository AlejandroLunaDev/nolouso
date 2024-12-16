'use client';

import React, { useState, useEffect } from 'react';
import { useShopStore } from '@/lib/stores/useShopStore';
import { useProductStore } from '@/lib/stores/useProductStore';
import { ShopHeader } from './components/ShopHeader';
import { ProductGrid } from './components/ProductGrid';
import { FilterSidebar } from './components/FilterSidebar';

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filters = useShopStore(state => state.filters);
  const updateFilters = useShopStore(state => state.updateFilters);
  const setProducts = useShopStore(state => state.setProducts);
  const setLoading = useShopStore(state => state.setLoading);

  const fetchProducts = useProductStore(state => state.fetchProducts);
  const products = useProductStore(state => state.products);
  const isProductLoading = useProductStore(state => state.isLoading);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setLoading(isProductLoading);
    setProducts(
      products.map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        location: '',
        imageUrl: product.thumbnails[0] || '',
        seller: {
          id: '1',
          name: 'Vendedor',
          rating: 5
        }
      }))
    );
  }, [products, isProductLoading, setLoading, setProducts]);

  const toggleFilters = () => setIsFilterOpen(prev => !prev);

  return (
    <div className='flex min-h-screen'>
      <main className='flex-1 px-4 py-8'>
        <ShopHeader onToggleFilters={toggleFilters} />
        <div className='mt-8'>
          <ProductGrid />
        </div>
      </main>
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={toggleFilters}
        filters={filters}
        onUpdateFilters={updateFilters}
      />
    </div>
  );
}
