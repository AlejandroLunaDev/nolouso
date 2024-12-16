import { useEffect, RefObject } from 'react';

export function useAutoScroll<T extends HTMLElement>(
  ref: RefObject<T>,
  dependency: any[]
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency]);
} 