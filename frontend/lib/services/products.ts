import { unstable_cache } from 'next/cache';
import { BackendProduct, FrontendProduct } from '../adapters/types/products';
import { productAdapter } from '../adapters/products/productAdapter';

export const getFavoriteProducts = unstable_cache(
  async (): Promise<FrontendProduct[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/favorites`, {
      next: { 
        revalidate: 60, // revalidar cada minuto
        tags: ['favorites'] 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch favorite products');
    }

    const data = await response.json();
    return data.map((product: BackendProduct) => productAdapter(product));
  },
  ['favorites'],
  { revalidate: 60 }
); 