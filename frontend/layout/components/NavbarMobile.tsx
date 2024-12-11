'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navlinks } from '@/lib/config/navLInks';
import NavLinks from './NavLinks';

export function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-black/95 z-50">
          <nav className="flex flex-col items-center gap-8 pt-12">
            {navlinks.map((link, index) => (
              <NavLinks
                key={index}
                href={link.href}
                label={link.label}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
} 