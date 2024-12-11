import { create } from 'zustand';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  thumbnails: string[];
  stock: number;
  status: boolean;
  category: string;
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  
  // Acciones básicas
  fetchProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<Product | null>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  // Estado local
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      set({ products: data, isLoading: false });
    } catch {
      set({ error: 'Error fetching products', isLoading: false });
    }
  },

  getProduct: async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      return data;
    } catch {
      set({ error: 'Error fetching product' });
      return null;
    }
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Error updating product');
      
      // Actualizar el producto en el estado local
      const updatedProduct = await response.json();
      set(state => ({
        products: state.products.map(p => 
          p.id === id ? updatedProduct : p
        ),
      }));
    } catch {
      set({ error: 'Error updating product' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Error deleting product');
      
      // Eliminar el producto del estado local
      set(state => ({
        products: state.products.filter(p => p.id !== id),
      }));
    } catch {
      set({ error: 'Error deleting product' });
    } finally {
      set({ isLoading: false });
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
})); 