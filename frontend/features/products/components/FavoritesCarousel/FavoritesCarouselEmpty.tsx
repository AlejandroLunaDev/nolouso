import { Heart } from 'lucide-react';

export function FavoritesCarouselEmpty() {
  return (
    <section className='py-8'>
      <div className='text-center py-12 border border-dashed rounded-lg'>
        <Heart className='w-12 h-12 mx-auto mb-4 text-muted-foreground' />
        <h2 className='text-xl font-semibold mb-2'>
          No tienes favoritos aún
        </h2>
        <p className='text-muted-foreground'>
          Marca productos como favoritos para verlos aquí
        </p>
      </div>
    </section>
  );
} 