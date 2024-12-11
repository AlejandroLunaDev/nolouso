import React from 'react'
import { Hero } from './components/Hero'
import { FavoritesCarousel } from '../products/components/FavoritesCarousel/FavoritesCarousel'

export default function Home() {
  return (
    <>
    <Hero />
    <div className='container px-10 bg-black/90'>
      <FavoritesCarousel />
    </div>
    </>
  )
}
