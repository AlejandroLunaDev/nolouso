'use client';

import { Button } from '@/common/ui/button';
import { FcGoogle } from 'react-icons/fc';

interface SocialLoginButtonProps {
  provider: 'google';
  onClick: () => void;
  className?: string;
}

export function SocialLoginButton({ className }: SocialLoginButtonProps) {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Button
      type='button'
      variant='outline'
      onClick={handleLogin}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <FcGoogle className='w-5 h-5' />
      Continuar con Google
    </Button>
  );
}
