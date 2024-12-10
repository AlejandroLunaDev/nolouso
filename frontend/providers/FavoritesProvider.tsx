'use client';

import { useEffect } from 'react';
import { useFavoritesStore } from '@/lib/stores/useFavoritesStore';

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return <>{children}</>;
}
