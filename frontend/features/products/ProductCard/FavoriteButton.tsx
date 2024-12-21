// FavoriteButton.tsx
'use client';

import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (

    <button
      onClick={onClick}
      className='absolute top-2 right-2 cursor-pointer bg-white p-2 rounded-full'
    >
      <Heart
        size={18}
        className={`${
          isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-transparent stroke-[#61005d]'
        } transition-colors`}
      />
      
    </button>
  );
}
