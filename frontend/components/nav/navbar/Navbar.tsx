'use client'
import { navlinks } from '@/data/navLinks';
import { UserLogin } from '@/components/auth/UserLogin';
import NavLinks from './NavLinks';
import Logo from './Logo';
import NavbarMobile from './mobile/NavbarMobile';

export default function Navbar({ auth }:{auth: React.ReactNode}) {
  const menu = navlinks.map((link, index) => {
    return <NavLinks key={index} href={link.href} label={link.label} />;
  });

  return (
    <header className='fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md border-b border-white/10 p-4 lg:p-6 z-40'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4 lg:gap-10 flex-1'>
          <Logo />
          <nav className='hidden lg:flex items-center gap-6 uppercase font-semibold'>
            {menu}
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <UserLogin />
          <div className='lg:hidden'>
            <NavbarMobile />
          </div>
        </div>
        {auth}
      </div>
    </header>
  );
} 