'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/common/ui/carousel';
import { useFavoritesStore } from '@/lib/stores/useFavoritesStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useEffect } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { HiHeart } from 'react-icons/hi';
import { FavoritesCarouselTitle } from './FavoritesCarouselTitle';
import { FavoritesCarouselEmpty } from './FavoritesCarouselEmpty';
import { FavoritesCarouselSkeleton } from './FavoritesCarouselSkeleton';

export function FavoritesCarousel() {
  const {
    allFavorites,
    favorites,
    fetchFavorites,
    fetchUserFavorites,
    toggleFavorite,
    isLoading
  } = useFavoritesStore();

  const { user } = useAuthStore();

  useEffect(() => {
    fetchFavorites();
    if (user) {
      fetchUserFavorites();
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
    <section className='py-8'>
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
                className='pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
              >
                <ProductCard
                  product={{
                    id: product._id,
                    name: product.title,
                    price: product.price,
                    imageUrl: product.thumbnails[0]
                  }}
                  onAction={() => toggleFavorite(product._id)}
                  actionIcon={
                    <HiHeart
                      size={20}
                      style={{
                        color: isUserFavorite ? '#f43f5e' : '#61005d',
                        transition: 'color 0.2s'
                      }}
                    />
                  }
                  variant='compact'
                  likesCount={product.likes}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex left-0 opacity-0 group-hover:opacity-100 transition-opacity' />
        <CarouselNext className='hidden md:flex right-0 opacity-0 group-hover:opacity-100 transition-opacity' />
      </Carousel>
    </section>
  );
}
