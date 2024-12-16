'use client';

import React, { useState, useEffect } from 'react';
import { useShopStore } from '@/lib/stores/useShopStore';
import { useProductStore } from '@/lib/stores/useProductStore';
import { ShopHeader } from './components/ShopHeader';
import { ProductGrid } from './components/ProductGrid';
import { FilterSidebar } from './components/FilterSidebar';
import { Pagination } from './components/Pagination'; 

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filters = useShopStore(state => state.filters);
  const updateFilters = useShopStore(state => state.updateFilters);
  const setProducts = useShopStore(state => state.setProducts);
  const setLoading = useShopStore(state => state.setLoading);

  const fetchProducts = useProductStore(state => state.fetchProducts);
  const products = useProductStore(state => state.products);
  const isProductLoading = useProductStore(state => state.isLoading);
  const pagination = useProductStore(state => state.pagination);

  useEffect(() => {
    fetchProducts(pagination.currentPage);
  }, [fetchProducts, pagination.currentPage]);

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

  const handlePageChange = (page: number) => {
    fetchProducts(page); // Llama a fetchProducts con el número de página correcto
  };

  return (
    <div className='flex min-h-screen mt-20'>
      <main className='flex-1 px-4 py-8'>
        <nav className="text-sm mb-4">
          <a href="/" className="text-gray-500 hover:text-gray-700">inicio</a>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-700">shop</span>
        </nav>
        <ShopHeader onToggleFilters={toggleFilters} />
        <div className='mt-8'>
          <ProductGrid />
        </div>
        <Pagination 
          currentPage={pagination.currentPage} 
          totalPages={pagination.totalPages} 
          onPageChange={handlePageChange} 
        />
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
