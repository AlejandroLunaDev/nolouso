import React, { memo, useCallback, useRef, useEffect } from 'react';
import { Input } from '@/common/ui/input';
import { useShopStore } from '@/lib/stores/useShopStore';
import { BiSearch } from 'react-icons/bi';

function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export const SearchBar = memo(function SearchBar() {
  const updateFilters = useShopStore(
    useCallback(state => {
      if (!state) return undefined;
      return state.updateFilters;
    }, [])
  );

  const searchValue = useShopStore(
    useCallback(state => {
      if (!state) return '';
      return state.filters.search || '';
    }, [])
  );

  const handleSearchChange = useDebounce((value: string) => {
    if (updateFilters) {
      updateFilters({ search: value });
    }
  }, 300);

  if (!updateFilters) {
    console.warn('SearchBar: updateFilters is not available');
    return null;
  }

  return (
    <div className='relative flex-1'>
      <BiSearch
        className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground'
        aria-hidden='true'
      />
      <Input
        type='text'
        placeholder='Buscar productos...'
        defaultValue={searchValue}
        onChange={e => handleSearchChange(e.target.value)}
        className='w-full pl-10'
        aria-label='Buscar productos'
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
