'use client';

import { ProductActions } from "./ProductActions";
import { ProductPrice } from "./ProductPrice";
import { ProductTitle } from "./ProductTitle";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
  onAction?: (product: Product) => void;
  actionIcon?: React.ReactNode;
  variant?: 'default' | 'compact';
  likesCount?: number;
}

export function ProductCard({
  product,
  onAction,
  actionIcon,
  variant = 'default',
  likesCount = 0
}: ProductCardProps) {
  return (
    <article className='group relative bg-background rounded-lg overflow-hidden border border-border/10 transition-all hover:border-border/30 hover:shadow-sm'>
      <div className='aspect-[4/5] relative overflow-hidden bg-muted/5'>
        <img
          src={product.imageUrl}
          alt={product.name}
          className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
        />
        {actionIcon && (
          <div className='absolute top-2 right-2'>
            <ProductActions
              onClick={() => onAction?.(product)}
              icon={actionIcon}
            />
          </div>
        )}
      </div>

      <div className='p-3'>
        <ProductTitle
          name={product.name}
          variant={variant}
        />
        <div className='flex items-center justify-between mt-1.5'>
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            variant={variant}
          />
          {likesCount > 0 && (
            <span className='text-xs text-muted-foreground'>
              {likesCount} likes
            </span>
          )}
        </div>
      </div>
    </article>
  );
} 