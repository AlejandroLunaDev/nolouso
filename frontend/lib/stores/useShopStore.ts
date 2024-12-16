import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product, ShopFilters } from '@/features/shop/types';

interface ShopState {
  products: Product[];
  isLoading: boolean;
  filters: ShopFilters;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  updateFilters: (filters: Partial<ShopFilters>) => void;
  getFilteredProducts: () => Product[];
}

const initialFilters: ShopFilters = {
  search: '',
  category: '',
  price: {
    min: 0,
    max: 10000
  },
  sort: 'price_asc',
  location: ''
};

const initialState: Partial<ShopState> = {
  products: [],
  isLoading: false,
  filters: initialFilters
};

export const useShopStore = create<ShopState>()(
  devtools(
    (set, get) => ({
      ...(initialState as ShopState),

      setProducts: products =>
        set(
          state => ({
            ...state,
            products,
            isLoading: false
          }),
          false,
          'setProducts'
        ),

      setLoading: loading =>
        set(
          state => ({
            ...state,
            isLoading: loading
          }),
          false,
          'setLoading'
        ),

      updateFilters: newFilters =>
        set(
          state => ({
            ...state,
            filters: {
              ...state.filters,
              ...newFilters
            }
          }),
          false,
          'updateFilters'
        ),

      getFilteredProducts: () => {
        const { products, filters } = get();
        let filtered = [...products];

        if (filters?.search?.trim()) {
          const searchLower = filters.search.toLowerCase().trim();
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchLower)
          );
        }

        if (filters.category) {
          filtered = filtered.filter(
            product => product.category === filters.category
          );
        }

        if (filters.price.min > 0 || filters.price.max < 10000) {
          filtered = filtered.filter(
            product =>
              product.price >= filters.price.min &&
              product.price <= filters.price.max
          );
        }

        if (filters.location) {
          filtered = filtered.filter(
            product => product.location === filters.location
          );
        }

        // Ordenamiento
        return filtered.sort((a, b) => {
          switch (filters.sort) {
            case 'price_asc':
              return a.price - b.price;
            case 'price_desc':
              return b.price - a.price;
            case 'name_asc':
              return a.name.localeCompare(b.name);
            case 'name_desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        });
      }
    }),
    {
      name: 'shop-store',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
);
