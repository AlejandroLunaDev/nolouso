interface ProductActionsProps {
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function ProductActions({ onClick, icon }: ProductActionsProps) {
  return (
    <button
      onClick={onClick}
      className='rounded-full p-1.5 hover:bg-accent transition-colors'
      style={{ color: 'inherit' }}
    >
      <span className='[&>*]:w-5 [&>*]:h-5'>
        {icon}
      </span>
    </button>
  );
} 