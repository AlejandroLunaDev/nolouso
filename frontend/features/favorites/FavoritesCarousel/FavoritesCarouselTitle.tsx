interface FavoritesCarouselTitleProps {
  count: number;
}

export function FavoritesCarouselTitle({ count }: FavoritesCarouselTitleProps) {
  return (
    <div className='flex items-center justify-between mb-6'>
      <h2 className='text-2xl font-semibold text-white'>
        Mas Populares
        <span className='ml-2 text-sm text-white text-muted-foreground'>
          ({count} {count === 1 ? 'producto' : 'productos'})
        </span>
      </h2>
    </div>
  );
} 