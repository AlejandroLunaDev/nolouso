import { Skeleton } from '@/common/ui/skeleton';

export function FavoritesCarouselSkeleton() {
  return (
    <section className='py-8'>
      <Skeleton className='h-8 w-48 mb-6' />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='space-y-4'>
            <Skeleton className='aspect-square w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    </section>
  );
} 