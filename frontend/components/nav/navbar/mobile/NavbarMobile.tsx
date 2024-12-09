'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { navlinks } from '@/data/navLinks';
import { useRouter } from 'next/navigation';
import NavLinks from '../NavLinks';
import Logo from '../Logo';

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      <div className="relative z-[110]">
        <Hamburger 
          toggled={isOpen} 
          toggle={setIsOpen} 
          color="white"
          size={20}
        />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90]"
          >
            <div className="flex flex-col items-center pt-20 bg-black h-screen">
              <div className="mb-10">
                <Logo />
              </div>
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-center gap-8 mt-10"
              >
                {navlinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="py-2"
                    onClick={() => handleNavigation(link.href)}
                  >
                    <NavLinks
                      href={link.href}
                      label={link.label}
                    />
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 