import React, { memo } from 'react';
import { Button } from '@/common/ui/button';
import { BsFilter } from 'react-icons/bs';
import { SearchBar } from '@/features/shop/components/SearchBar';
import { CategoryNav } from './CategoryNav';

interface ShopHeaderProps {
  onToggleFilters: () => void;
}

export const ShopHeader = memo(function ShopHeader({ onToggleFilters }: ShopHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SearchBar />
        <Button
          variant="outline"
          onClick={onToggleFilters}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <BsFilter className="w-5 h-5" />
          Filtros
        </Button>
      </div>
      <CategoryNav />
    </div>
  );
});
