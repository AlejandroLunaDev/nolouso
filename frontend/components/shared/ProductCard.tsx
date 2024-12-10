'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useFavoritesStore } from '@/lib/stores/useFavoritesStore';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    image: string;
    likes: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [likes, setLikes] = useState(product.likes);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar si el producto está en los favoritos del usuario
  const isFavorite = favorites.some(fav => fav._id === product.id);

  const handleLike = async () => {
    if (!user || isLoading) return;

    setIsLoading(true);
    const success = await toggleFavorite(product.id);
    if (success) {
      setLikes(prev => (isFavorite ? prev - 1 : prev + 1));
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      className='flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-lg'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className='relative h-36 w-full'>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes='(max-width: 768px) 100vw, 400px'
          className='object-cover'
          unoptimized
        />
      </div>
      <div className='flex flex-col flex-grow p-4'>
        <h3 className='text-xl font-semibold mb-2 line-clamp-1'>
          {product.title}
        </h3>
        <p className='text-gray-600 text-sm mb-4 flex-grow line-clamp-3'>
          {product.description}
        </p>
        <div className='flex items-center gap-2 mt-auto'>
          <button
            onClick={handleLike}
            disabled={!user || isLoading}
            className={cn(
              'transition-colors duration-200',
              !user && 'cursor-not-allowed opacity-50'
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={cn(
                'h-5 w-5 transition-colors duration-200',
                isFavorite
                  ? 'text-[#61005d]'
                  : 'text-red-500 hover:text-[#61005d]'
              )}
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <span className='text-sm text-gray-500'>{likes} likes</span>
        </div>
      </div>
    </motion.div>
  );
}
