'use client';

import { ProductActions } from "./ProductActions";
import { ProductPrice } from "./ProductPrice";
import { ProductTitle } from "./ProductTitle";

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
    <article className='group relative bg-card rounded-lg overflow-hidden border border-border transition-all hover:shadow-md'>
      <div className='aspect-square relative overflow-hidden'>
        <img
          src={product.imageUrl}
          alt={product.name}
          className='object-cover w-full h-full transition-transform group-hover:scale-105'
        />
      </div>

      <div className='p-4'>
        <ProductTitle
          name={product.name}
          variant={variant}
        />
        <div className='flex items-center justify-between mt-2'>
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            variant={variant}
          />
          {actionIcon && (
            <div className='flex items-center gap-1'>
                
              <span className='text-sm text-muted-foreground'>Likes ({likesCount})</span>
              <ProductActions
                onClick={() => onAction?.(product)}
                icon={actionIcon}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
} 