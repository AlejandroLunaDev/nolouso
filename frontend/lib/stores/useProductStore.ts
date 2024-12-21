import { create } from 'zustand';
import { fetchWithInterceptor } from '../utils/fetchInterceptor';

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
  likes: number;  // Campo de likes para los productos
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
  favorites: Product[];
  allFavorites: Product[];


  fetchProducts: (page: number) => Promise<void>;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: Pagination) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
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
  favorites: [],
  allFavorites: [],

  fetchProducts: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/products?page=${page}&limit=10`);
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
          currentPage: data.page
        },
        isLoading: false
      });
    } catch {
      set({ error: 'Error fetching products', isLoading: false });
    }
  },

  // FAVORITES

  fetchFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchWithInterceptor('/api/products/favorites');
      const data = await response.json();
  /*     console.log('All Favorites:', data); */
      set({ allFavorites: data, isLoading: false });
    } catch {
      set({ error: 'Error fetching favorites', isLoading: false });
    }
  },

  fetchUserFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchWithInterceptor('/api/products/favorites/me');
      const data = await response.json();
      set({ favorites: data, isLoading: false });
    } catch {
      set({ error: 'Error fetching user favorites', isLoading: false });
    }
  },

  toggleFavorite: async (productId: string) => {
/*     console.log("Toggling favorite for product ID:", productId); */
     await get().fetchFavorites();
    const currentState = get();
    const isCurrentlyFavorite = currentState.favorites.some(fav => fav._id === productId || fav.id === productId);
    const productToToggle = currentState.allFavorites.find(p => p._id === productId || p.id === productId);
/*     console.log("Product ID:", productId);
console.log("All Favorites IDs:", currentState.allFavorites.map(p => p._id || p.id));

  console.log("Product to toggle:", productToToggle);
  console.log("Is currently favorite:", isCurrentlyFavorite); */
    if (!productToToggle) return;
  
    // Actualización optimista inmediata
    if (isCurrentlyFavorite) {
      set({
        favorites: currentState.favorites.filter(f => f._id !== productId || f.id !== productId),
        allFavorites: currentState.allFavorites.map(p => 
          p._id === productId ? { ...p, likes: p.likes - 1 } : p
        )
      });
    } else {
      set({
        favorites: [...currentState.favorites, productToToggle],
        allFavorites: currentState.allFavorites.map(p => 
          p._id === productId ? { ...p, likes: p.likes + 1 } : p
        )
      });
    }
  
    try {
      // Realizar la petición en segundo plano
      await fetchWithInterceptor(`/api/products/favorites/${productId}`, {
        method: 'POST'
      });
   
      // Volver a obtener los favoritos para asegurarse de que los datos sean actuales
      await get().fetchFavorites();
  
    } catch {
      // Si falla, revertir los cambios silenciosamente
      if (isCurrentlyFavorite) {
        set({
          favorites: [...currentState.favorites],
          allFavorites: currentState.allFavorites.map(p => 
            p._id === productId ? { ...p, likes: p.likes + 1 } : p
          )
        });
      } else {
        set({
          favorites: currentState.favorites.filter(f => f._id !== productId),
          allFavorites: currentState.allFavorites.map(p => 
            p._id === productId ? { ...p, likes: p.likes - 1 } : p
          )
        });
      }
    }
  },

  isFavorite: (productId: string) => {
    return get().favorites.some(fav => fav._id === productId);
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  setPagination: (pagination: Pagination) => set({ pagination })
}));
