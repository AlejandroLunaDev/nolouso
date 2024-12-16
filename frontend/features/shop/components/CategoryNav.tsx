import React from 'react';
import { Button } from '@/common/ui/button';
import { useShopStore } from '@/lib/stores/useShopStore';
import { 
  BsLaptop, 
  BsPhone, 
  BsCamera, 
  BsHeadphones, 
  BsController, 
  BsSmartwatch,
  BsThreeDots
} from 'react-icons/bs';

const categories = [
  { id: 'all', label: 'Todo', icon: BsThreeDots },
  { id: 'laptops', label: 'Laptops', icon: BsLaptop },
  { id: 'phones', label: 'Móviles', icon: BsPhone },
  { id: 'cameras', label: 'Cámaras', icon: BsCamera },
  { id: 'audio', label: 'Audio', icon: BsHeadphones },
  { id: 'gaming', label: 'Gaming', icon: BsController },
  { id: 'wearables', label: 'Wearables', icon: BsSmartwatch },
];

export function CategoryNav() {
  const selectedCategory = useShopStore((state) => state.filters.category);
  const updateFilters = useShopStore((state) => state.updateFilters);

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2">
      {categories.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={selectedCategory === id ? 'default' : 'ghost'}
          onClick={() => updateFilters({ category: id === 'all' ? '' : id })}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </nav>
  );
} 