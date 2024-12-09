'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { UserMenu } from './UserMenu';
import { Skeleton } from "@/components/ui/skeleton";

export function UserLogin() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        onClick={() => router.push('/login')}
        className="min-w-[100px]"
      >
        Iniciar sesión
      </Button>
    </div>
  );
}
