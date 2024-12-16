import Link from 'next/link';
import { Logo } from '../components/Logo';
import { navlinks } from '@/config/navLInks';

export function Footer() {
  return (
    <footer className='bg-black/90 text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <Logo className='mb-4' />
            <p className='text-white/70'>
              Marketplace de productos de segunda mano
            </p>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Enlaces</h3>
            <nav className='flex flex-col gap-2'>
              {navlinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className='text-white/70 hover:text-white transition-colors'
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className='font-semibold mb-4'>Contacto</h3>
            <p className='text-white/70'>Email: info@nolouso.com</p>
          </div>
        </div>
        <div className='border-t border-white/10 mt-8 pt-8 text-center text-white/50'>
          <p>
            © {new Date().getFullYear()} NoLoUso. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
