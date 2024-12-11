'use client';

import { Button } from '@/common/ui/button';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/common/ui/skeleton';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { UserMenu } from './UserMenu';

export function UserLogin() {
  const router = useRouter();
  const { user, loading, checkAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    checkAuth();
    const timeout = setTimeout(() => setMounted(true), 0);
    
    // Verificar el estado de autenticación periódicamente
    const interval = setInterval(checkAuth, 5 * 60 * 1000); // Cada 5 minutos
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!mounted || loading) {
    return (
      <div className='flex items-center gap-2'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <Skeleton className='h-4 w-24' />
      </div>
    );
  }

  return user ? (
    <UserMenu />
  ) : (
    <Button
      variant='default'
      onClick={() => router.push('/login')}
      className='min-w-[100px] text-md uppercase'
    >
      Iniciar sesión
    </Button>
  );
}
