interface ProductTitleProps {
  name: string;
  variant?: 'default' | 'compact';
}

export function ProductTitle({ name, variant = 'default' }: ProductTitleProps) {
  return (
    <h3 className={`font-medium text-foreground line-clamp-2 ${
      variant === 'compact' ? 'text-sm' : 'text-base'
    }`}>
      {name}
    </h3>
  );
} 