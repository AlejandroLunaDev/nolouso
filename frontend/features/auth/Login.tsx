'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialLoginButton } from './components/SocialLoginButton';
import { LoginForm } from './components/LoginFrom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/common/ui/dialog';

export function Login() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dialog
      open={true}
      onOpenChange={isOpen => {
        if (!isOpen) router.back();
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-bold text-purple-800'>
            Iniciar Sesión
          </DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <SocialLoginButton
              provider='google'
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
              }}
            />
          </div>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                O
              </span>
            </div>
          </div>
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
