import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "text-2xl font-bold text-white hover:text-white/90 transition-colors",
        className
      )}
    >
      NoLoUso
    </Link>
  );
} 