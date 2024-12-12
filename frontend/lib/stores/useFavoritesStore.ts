// stores/useFavoritesStore.ts
import { create } from 'zustand';
import { fetchWithInterceptor } from '../utils/fetchInterceptor';

interface FavoriteProduct {
  _id: string;
  title: string;
  price: number;
  thumbnails: string[];
  likes: number;
}

interface FavoritesStore {
  favorites: FavoriteProduct[];
  allFavorites: FavoriteProduct[];
  isLoading: boolean;
  error: string | null;
  fetchUserFavorites: () => Promise<void>;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  allFavorites: [],
  isLoading: false,
  error: null,

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

  fetchFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchWithInterceptor('/api/products/favorites');
      const data = await response.json();
      set({ allFavorites: data, isLoading: false });
    } catch {
      set({ error: 'Error fetching favorites', isLoading: false });
    }
  },

  toggleFavorite: async (productId: string) => {
    const currentState = get();
    const isCurrentlyFavorite = currentState.favorites.some(fav => fav._id === productId);
    const productToToggle = currentState.allFavorites.find(p => p._id === productId);

    if (!productToToggle) return;

    // Actualización optimista inmediata
    if (isCurrentlyFavorite) {
      // Remover de favoritos
      set({
        favorites: currentState.favorites.filter(f => f._id !== productId),
        allFavorites: currentState.allFavorites.map(p => 
          p._id === productId ? { ...p, likes: p.likes - 1 } : p
        )
      });
    } else {
      // Agregar a favoritos
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
  }
}));
