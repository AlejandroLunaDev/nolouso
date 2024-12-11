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
    try {
      const currentFavorites = get().favorites;
      const currentAllFavorites = get().allFavorites;
      
      // Actualizar optimistamente
      const isCurrentlyFavorite = currentFavorites.some(fav => fav._id === productId);
      
      if (isCurrentlyFavorite) {
        // Remover de favorites
        set({ 
          favorites: currentFavorites.filter(fav => fav._id !== productId)
        });
        
        // Actualizar likes en allFavorites
        set({
          allFavorites: currentAllFavorites.map(fav => 
            fav._id === productId 
              ? { ...fav, likes: fav.likes - 1 }
              : fav
          )
        });
      } else {
        // Agregar a favorites
        const productToAdd = currentAllFavorites.find(fav => fav._id === productId);
        if (productToAdd) {
          set({ 
            favorites: [...currentFavorites, productToAdd]
          });
          
          // Actualizar likes en allFavorites
          set({
            allFavorites: currentAllFavorites.map(fav => 
              fav._id === productId 
                ? { ...fav, likes: fav.likes + 1 }
                : fav
            )
          });
        }
      }

      // Hacer la petición al servidor
      await fetchWithInterceptor(`/api/products/favorites/${productId}`, {
        method: 'POST'
      });
      
      // Opcional: Sincronizar con el servidor en caso de error
      await Promise.all([
        get().fetchUserFavorites(),
        get().fetchFavorites()
      ]);
    } catch {
      // En caso de error, revertir los cambios
      await Promise.all([
        get().fetchUserFavorites(),
        get().fetchFavorites()
      ]);
      set({ error: 'Error toggling favorite' });
    }
  },

  isFavorite: (productId: string) => {
    return get().favorites.some(fav => fav._id === productId);
  }
}));
