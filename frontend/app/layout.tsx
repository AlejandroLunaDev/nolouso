import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import { Footer } from '@/layout/footer/Footer';
import { Navbar } from '@/layout/navbar/Navbar';

export const metadata: Metadata = {
  title: 'NoLoUso - Marketplace de segunda mano',
  description:
    'Compra y vende productos de segunda mano de forma fácil y segura'
};

export default function RootLayout({
  children,
  auth
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body suppressHydrationWarning className='min-h-screen flex flex-col'>
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <main className='flex-grow'>{children}</main>
            {auth}
            <Footer />
        </Suspense>
      </body>
    </html>
  );
}
