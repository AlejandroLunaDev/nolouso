'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FrontendProduct } from '@/lib/adapters/types/products';
import Image from 'next/image';

export function FavoritesMenu() {
  const [favorites, setFavorites] = useState<FrontendProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/products/user-favorites');
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();

    // Escuchar cambios en favoritos
    const handleFavoritesUpdate = () => {
      fetchFavorites();
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Heart className="h-6 w-6 text-white hover:text-red-500 transition-colors" />
        {favorites.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {isLoading ? (
          <DropdownMenuItem>Cargando...</DropdownMenuItem>
        ) : favorites.length > 0 ? (
          favorites.map((product) => (
            <DropdownMenuItem key={product.id} className="flex items-center gap-2 py-2">
              <div className="relative w-10 h-10">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.title}</p>
                <p className="text-xs text-gray-500">{product.likes} likes</p>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No tienes favoritos</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 