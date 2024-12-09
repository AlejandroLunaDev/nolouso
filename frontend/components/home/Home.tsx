import React from 'react'
import Hero from './hero/Hero'
import { Favorites } from './favorites/Favorites'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Hero />
      <Favorites />
    </div>
  )
}
