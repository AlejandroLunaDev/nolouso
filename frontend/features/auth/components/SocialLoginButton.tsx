'use client';

import { Button } from '@/common/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useAuthStore } from '@/lib/stores/useAuthStore';

interface SocialLoginButtonProps {
  provider: 'google';
  onClick: () => void;
  className?: string;
}

export function SocialLoginButton({ className }: SocialLoginButtonProps) {
  const { googleLogin } = useAuthStore();
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`;
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
