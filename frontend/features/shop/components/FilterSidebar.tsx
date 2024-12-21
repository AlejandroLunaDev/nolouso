import React from 'react';
import { ShopFilters } from '../types';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/common/ui/sheet';
import { SortFilter } from './filters/SortFilter';
import { LocationFilter } from './filters/LocationFilter';
import { PriceFilter } from './filters/PriceFilter';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ShopFilters;
  onUpdateFilters: (filters: Partial<ShopFilters>) => void;
}

export function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onUpdateFilters
}: FilterSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] ">
        <SheetHeader >
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <PriceFilter 
            value={filters.price}
            onChange={(price) => onUpdateFilters({ price })}
          />
          <SortFilter
            value={filters.sort}
            onChange={(sort) => onUpdateFilters({ sort })}
          />
          <LocationFilter
            value={filters.location}
            onChange={(location) => onUpdateFilters({ location })}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
} 