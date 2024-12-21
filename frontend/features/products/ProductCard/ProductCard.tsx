// ProductCard.tsx
'use client';

import Image from 'next/image';
import { ProductPrice } from './ProductPrice';
import { ProductTitle } from './ProductTitle';
import { FavoriteButton } from './FavoriteButton'; // Nuevo componente
import { useProductStore } from '@/lib/stores/useProductStore'; // Usamos el store de productos unificado

interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
  likes: number;
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export function ProductCard({
  product,
  variant = 'default'
}: ProductCardProps) {
  const { favorites, toggleFavorite } = useProductStore();
  const userFavoriteIds = new Set(favorites.map(fav => fav._id));
  const isFavorite = userFavoriteIds.has(product.id);

  const handleFavoriteToggle = () => {
    toggleFavorite(product.id); // Togglear favorito
  };



  return (
    <article className='group relative bg-background rounded-lg overflow-hidden border border-border/10 transition-all hover:border-border/30 hover:shadow-sm'>
      <div className='aspect-[4/5] relative overflow-hidden bg-muted/5'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
          fill
          sizes='(max-width: 768px) 100vw, 25vw' // Opcional, mejora el rendimiento
        />

        <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteToggle} />
      </div>

      <div className='p-3'>
        <ProductTitle name={product.name} variant={variant} />
        <div className='flex items-center justify-between mt-1.5'>
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            variant={variant}
          />
          {product.likes > 0 && (
            <span className='text-xs text-muted-foreground'>
              {product.likes} likes
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
