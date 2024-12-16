import { create } from 'zustand';

interface Product {
  id: string;
  _id: string;
  title: string;
  price: number;
  description: string;
  thumbnails: string[];
  stock: number;
  status: boolean;
  category: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  totalDocs: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  pagination: Pagination;

  fetchProducts: (page: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: Pagination) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    totalDocs: 0,
    totalPages: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1
  },

  fetchProducts: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/products?page=${page}&limit=4`);
      const data = await response.json();

      set({
        products: data.docs || [],
        pagination: {
          page: data.page,
          totalDocs: data.totalDocs,
          totalPages: data.totalPages,
          limit: data.limit,
          hasNextPage: data.hasNextPage,
          hasPrevPage: data.hasPrevPage,
          currentPage: data.page // Actualiza currentPage con el valor correcto
        },
        isLoading: false
      });
    } catch {
      set({ error: 'Error fetching products', isLoading: false });
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  setPagination: (pagination: Pagination) => set({ pagination }),
}));
