interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  variant?: 'default' | 'compact';
}

export function ProductPrice({
  price,
  originalPrice,
  variant = 'default'
}: ProductPriceProps) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className='mt-2 flex items-center gap-2'>
      <span className={`font-semibold ${
        variant === 'compact' ? 'text-base' : 'text-lg'
      }`}>
        ${price.toLocaleString()}
      </span>
      
      {hasDiscount && (
        <>
          <span className='text-sm text-muted-foreground line-through'>
            ${originalPrice?.toLocaleString()}
          </span>
          <span className='text-sm text-green-600'>
            {discountPercentage}% OFF
          </span>
        </>
      )}
    </div>
  );
} 