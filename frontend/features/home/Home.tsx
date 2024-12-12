'use client';

import React from 'react';
import { Hero } from './components/Hero';
import { NewArrivals } from '../products/components/NewArrivals/NewArrivals';
import { CategoryShowcase } from '../products/components/CategoryShowcase/CategoryShowcase';
import { FeaturedProducts } from '../products/components/FeaturedProducts/FeaturedProducts';
import { SpecialOffers } from '../products/components/SpecialOffers/SpecialOffers';
import { FavoritesCarousel } from '../favorites/FavoritesCarousel/FavoritesCarousel';

export default function Home() {
  return (
    <main className='bg-black/90 min-h-screen'>
      <Hero />
      <div className='space-y-12 py-12'>
        <div className='px-6'>
          <FavoritesCarousel />
        </div>

        <div className='container px-6 max-w-7xl mx-auto'>
          <NewArrivals />
        </div>

        <div className='container px-6 max-w-7xl mx-auto'>
          <CategoryShowcase />
        </div>

        <div className='bg-black/50 py-12'>
          <div className='container px-6 max-w-7xl mx-auto'>
            <FeaturedProducts />
          </div>
        </div>

        <div className='container px-6 max-w-7xl mx-auto'>
          <SpecialOffers />
        </div>
      </div>
    </main>
  );
}
