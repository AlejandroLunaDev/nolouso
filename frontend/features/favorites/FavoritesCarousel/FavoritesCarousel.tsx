'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/common/ui/carousel';
import { useProductStore } from '@/lib/stores/useProductStore'; // Cambiar aquí para usar el store unificado
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useEffect } from 'react';
import { ProductCard } from '../../products/ProductCard/ProductCard';
import { Heart } from 'lucide-react';
import { FavoritesCarouselTitle } from './FavoritesCarouselTitle';
import { FavoritesCarouselEmpty } from './FavoritesCarouselEmpty';
import { FavoritesCarouselSkeleton } from './FavoritesCarouselSkeleton';

export function FavoritesCarousel() {
  const {
    allFavorites, // Ahora proviene del store unificado
    favorites, // Lista de favoritos del usuario
    fetchFavorites,
    fetchUserFavorites,
    toggleFavorite,
    isLoading
  } = useProductStore(); // Usar el store de productos unificado
  const { user } = useAuthStore();

  useEffect(() => {
    fetchFavorites(); // Obtiene todos los favoritos (debe traer los productos favoritos)
    if (user) {
      fetchUserFavorites(); // Obtiene los favoritos específicos del usuario
    }
  }, [fetchFavorites, fetchUserFavorites, user]);

  if (isLoading) {
    return <FavoritesCarouselSkeleton />;
  }

  if (!allFavorites.length) {
    return <FavoritesCarouselEmpty />;
  }

  const userFavoriteIds = new Set(favorites.map(fav => fav._id));

  return (
    <section className='py-6'>
      <FavoritesCarouselTitle count={allFavorites.length} />

      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className='w-full relative group'
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {allFavorites.map(product => {
            const isUserFavorite = userFavoriteIds.has(product._id);

            return (
              <CarouselItem
                key={product._id}
                className='pl-2 md:pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
              >
                <ProductCard
                  product={{
                    id: product._id,
                    name: product.title,
                    price: product.price,
                    imageUrl: product.thumbnails[0]
                  }}
                  onAction={() => toggleFavorite(product._id)} // Acción de favorito
                  actionIcon={
                    <Heart
                      size={18}
                      className={`${
                        isUserFavorite
                          ? 'fill-red-500 stroke-red-500'
                          : 'fill-transparent stroke-[#61005d]'
                      } transition-colors`}
                    />
                  }
                  variant='compact'
                  likesCount={product.likes}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex -left-2 opacity-0 group-hover:opacity-100 transition-opacity' />
        <CarouselNext className='hidden md:flex -right-2 opacity-0 group-hover:opacity-100 transition-opacity' />
      </Carousel>
    </section>
  );
}
