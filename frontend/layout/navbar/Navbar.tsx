'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';  // Asegúrate de que la ruta sea correcta
import { navlinks } from '@/config/navLInks';
import { Logo } from '../components/Logo';
import NavLinks from '../components/NavLinks';
import { NavbarMobile } from '../components/NavbarMobile';
import { UserLogin } from '@/features/auth/components/UserLogin';
import { FavoritesMenu } from '@/features/favorites/FavoritesMenu';

export function Navbar() {
 // Usamos el store para obtener la función checkAuth

 useEffect(() => {
  useAuthStore.getState().checkAuth();
}, []); // Se ejecutará cada vez que el Navbar se renderice

  return (
    <header className='fixed w-full bg-black/50 backdrop-blur-md border-b border-white/10 p-4 lg:p-6 z-40'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4 lg:gap-10 flex-1'>
          <Logo />
          <nav className='hidden lg:flex items-center gap-6 uppercase font-semibold'>
            {navlinks.map((link, index) => (
              <NavLinks key={index} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <FavoritesMenu />
          <UserLogin />
          <div className='lg:hidden'>
            <NavbarMobile />
          </div>
        </div>
      </div>
    </header>
  );
}
