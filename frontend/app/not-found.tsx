import { Button } from '@/common/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black/90'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-white mb-4'>404</h1>
        <p className='text-xl text-white/70 mb-8'>Página no encontrada</p>
        <Button asChild>
          <Link href='/'>Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
