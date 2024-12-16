'use client';

import React from 'react';
import { Hero } from './sections/Hero/Hero';
import { NewArrivals } from './sections/NewArrivals/NewArrivals';
import { CategoryShowcase } from './sections/CategoryShowcase/CategoryShowcase';
import { FeaturedProducts } from './sections/FeaturedProducts/FeaturedProducts';
import { SpecialOffers } from './sections/SpecialOffers/SpecialOffers';
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
