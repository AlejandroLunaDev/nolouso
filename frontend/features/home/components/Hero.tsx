'use client';

import { motion } from 'framer-motion';
import { Button } from '@/common/ui/button';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();

  return (
    <section className='min-h-[60vh] relative flex items-center justify-center text-white px-4'>
      {/* Video de fondo */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='w-full h-full object-cover z-50'
        >
          <source src="/videos/Herovideo.mp4" type="video/mp4" />
        </video>
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className='absolute inset-0 bg-black/60' />
      </div>

      {/* Contenido */}
      <div className='max-w-4xl mx-auto text-center relative z-10'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-4xl md:text-6xl font-bold mb-6'
        >
          Dale una segunda vida a tus productos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-lg md:text-xl text-gray-300 mb-8'
        >
          Compra y vende productos de segunda mano de forma fácil y segura
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={() => router.push('/shop')}
            className='text-lg px-8 py-4'
          >
            Explorar productos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
