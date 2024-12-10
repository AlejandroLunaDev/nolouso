'use client';

import { Heart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';
import { useFavoritesStore } from '@/lib/stores/useFavoritesStore';

export function FavoritesMenu() {
  const { user } = useAuth();
  const { favorites, isLoading } = useFavoritesStore();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='relative'>
        <Heart className='h-6 w-6 text-white hover:text-[#61005d] transition-colors' />
        {favorites.length > 0 && (
          <span className='absolute -top-2 -right-2 bg-[#61005d] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
            {favorites.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-64'>
        {isLoading ? (
          <DropdownMenuItem>Cargando...</DropdownMenuItem>
        ) : favorites.length > 0 ? (
          favorites.slice(0, 5).map((product) => (
            <DropdownMenuItem
              key={product.id}
              className='flex items-center gap-2 py-2'
            >
              <div className='relative w-10 h-10'>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className='object-cover rounded'
                  unoptimized
                />
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>{product.title}</p>
                <p className='text-xs text-gray-500'>{product.likes} likes</p>
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
