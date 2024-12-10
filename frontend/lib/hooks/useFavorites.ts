import { useState, useEffect } from 'react';
import { FrontendProduct } from '@/lib/adapters/types/products';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FrontendProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/products/user-favorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isProductFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return { favorites, isLoading, isProductFavorite, refreshFavorites: fetchFavorites };
} 