'use client';

import { Button } from '@/common/ui/button';
import { Heart } from 'lucide-react';
import { useRef, useState } from 'react';
import { useFavoritesStore } from '@/lib/stores/useFavoritesStore';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';

export function FavoritesMenu() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { favorites, fetchUserFavorites, isLoading } = useFavoritesStore();

  useEffect(() => {
    if (user) {
      fetchUserFavorites();
    }
  }, [fetchUserFavorites, user]);

  if (!user) return null;

  return (
    <div className='relative' ref={menuRef}>
      <Button
        variant='transparent'
        size='icon'
        onClick={() => setIsOpen(!isOpen)}
        className='relative'
      >
        <Heart className='h-5 w-5 text-white transition-transform hover:scale-110' />
        {favorites.length > 0 && (
          <span className='absolute -top-1 -right-1 bg-transparent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
            {favorites.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-64 py-2 bg-popover rounded-md shadow-lg border border-border'>
          <h3 className='px-4 py-2 text-sm font-semibold border-b border-border'>
            Mis Favoritos
          </h3>

          {isLoading ? (
            <div className='p-4 text-center'>Cargando...</div>
          ) : favorites.length > 0 ? (
            <div className='max-h-96 overflow-y-auto'>
              {favorites.map(product => (
                <div
                  key={product.id}
                  className='flex items-center gap-3 px-4 py-2 hover:bg-accent/50 transition-colors'
                >
                  <div className='relative h-10 w-10 rounded overflow-hidden'>
                    <img
                      src={product.thumbnails[0] || ''}
                      alt={product.title}
                      className='object-cover h-full w-full'
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium truncate'>
                      {product.title}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-4 text-center text-sm text-muted-foreground'>
              No tienes favoritos
            </div>
          )}
        </div>
      )}
    </div>
  );
}
