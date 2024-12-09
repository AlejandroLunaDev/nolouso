import { Suspense } from 'react';
import { getFavoriteProducts } from "@/lib/services/products";
import { FavoritesCarousel } from "./FavoritesCarousel";
import { FavoritesLoading } from './FavoritesLoading';

export async function Favorites() {
  return (
    <section className="py-20 bg-black/90">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Los Más Populares
        </h2>
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<FavoritesLoading />}>
            <FavoritesContent />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function FavoritesContent() {
  const products = await getFavoriteProducts();
  return <FavoritesCarousel products={products} />;
} 