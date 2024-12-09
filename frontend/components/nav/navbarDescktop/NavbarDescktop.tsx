'use client'
import { navlinks } from '@/data/navLinks';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { UserLogin } from '@/components/auth/UserLogin';

export default function NavbarDescktop({ auth }:{auth: React.ReactNode}) {
  const menu = navlinks.map((link, index) => {
    return <NavLinks key={index} href={link.href} label={link.label} />;
  });
  return (
    <header className='flex justify-between border-b-primary fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md border-b border-white/10 p-6 z-50'>
      <div className='flex intems-center justify-between px-10 flex-1'>
      <Logo />
      <div className='flex gap-4 uppercase font-semibold'>{menu}</div>
      </div>
      <div>
        <UserLogin />
      </div>
      {auth}
    </header>
  );
}
