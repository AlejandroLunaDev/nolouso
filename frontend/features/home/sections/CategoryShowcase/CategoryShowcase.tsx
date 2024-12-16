'use client';

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    imageUrl: '/images/categories/electronics.jpg',
    productCount: 120
  },
  {
    id: '2',
    name: 'Clothing',
    imageUrl: '/images/categories/clothing.jpg',
    productCount: 85
  },
  {
    id: '3',
    name: 'Home & Garden',
    imageUrl: '/images/categories/home.jpg',
    productCount: 65
  }
];

export function CategoryShowcase() {
  return (
    <section className='py-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-medium text-white'>Shop by Category</h2>
        <p className='text-sm text-white/70'>Find what you need faster</p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
        {categories.map(category => (
          <div
            key={category.id}
            className='group relative overflow-hidden rounded-lg aspect-[16/9] bg-muted/5'
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'>
              <div className='absolute bottom-3 left-3'>
                <h3 className='text-lg font-medium text-white'>{category.name}</h3>
                <p className='text-xs text-white/90'>{category.productCount} products</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 