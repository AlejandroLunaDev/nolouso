'use client';

import { useAuthStore } from '@/lib/stores/useAuthStore';
import {  useRef, useState } from 'react';
import Image from 'next/image';

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase() || '?';

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 outline-none'
      >
        <div className='relative h-8 w-8 rounded-full overflow-hidden bg-[#61005d] flex items-center justify-center text-white'>
          {!imgError ? (
            <Image
              src={user.avatar || ''}
              alt={user.name}
              fill
              className='object-cover'
              onError={() => setImgError(true)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <span className='text-white hidden md:inline-block'>{user.name}</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 py-1 bg-popover rounded-md shadow-lg border border-border'>
          <button
            onClick={handleLogout}
            className='w-full px-4 py-2 text-sm text-left hover:bg-accent transition-colors'
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
