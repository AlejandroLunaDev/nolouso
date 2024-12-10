'use client';

import { FrontendProduct } from '@/lib/adapters/types/products';
import { ProductCard } from '../../shared/ProductCard';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface FavoritesCarouselProps {
  products: FrontendProduct[];
}

export function FavoritesCarousel({ products }: FavoritesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true,
  }, [
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  ]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-[10px]">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-[0_0_100%] min-w-0 pl-[10px] 
                       md:flex-[0_0_50%] 
                       lg:flex-[0_0_25%]"
            >
              <div className="h-[340px]">
                <div className="max-w-[280px] mx-auto">
                  <ProductCard product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
          onClick={() => emblaApi?.scrollNext()}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 