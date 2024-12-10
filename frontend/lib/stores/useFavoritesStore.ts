import { create } from 'zustand';
import { FrontendProduct } from '@/lib/adapters/types/products';

interface FavoritesStore {
  favorites: FrontendProduct[];
  isLoading: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<boolean>;
  isProductFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    favorites: [],
    isLoading: true, // Indicador inicial de carga
  
    fetchFavorites: async () => {
      try {
        const response = await fetch('/api/products/user-favorites', {
          credentials: 'include'
        });
  
        if (response.ok) {
          const data = await response.json();
          set({ favorites: data, isLoading: false });
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        set({ favorites: [], isLoading: false });
      }
    },
  
    toggleFavorite: async (productId: string) => {
      try {
        const response = await fetch(`/api/products/favorite/${productId}`, {
          method: 'POST',
          credentials: 'include'
        });
  
        if (response.ok) {
          await get().fetchFavorites();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error toggling favorite:', error);
        return false;
      }
    },
  
    isProductFavorite: (productId: string) => {
      return get().favorites.some(fav => fav.id === productId);
    },
  }));
   