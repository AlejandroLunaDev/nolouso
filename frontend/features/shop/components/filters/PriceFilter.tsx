import React from 'react';
import { Label } from '@/common/ui/label';
import { Input } from '@/common/ui/input';
import { Slider } from '@/common/ui/slider';

interface PriceFilterProps {
  value: {
    min: number;
    max: number;
  };
  onChange: (value: { min: number; max: number }) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange({ min: newValue[0], max: newValue[1] });
  };

  const handleInputChange = (type: 'min' | 'max', inputValue: string) => {
    const numValue = parseInt(inputValue) || 0;
    onChange({
      ...value,
      [type]: numValue
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base">Precio</Label>
      
      <Slider
        defaultValue={[value.min, value.max]}
        max={10000}
        step={100}
        onValueChange={handleSliderChange}
        className="my-6"
      />
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="min-price" className="text-sm text-muted-foreground">
            Mínimo
          </Label>
          <Input
            id="min-price"
            type="number"
            value={value.min}
            onChange={(e) => handleInputChange('min', e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="max-price" className="text-sm text-muted-foreground">
            Máximo
          </Label>
          <Input
            id="max-price"
            type="number"
            value={value.max}
            onChange={(e) => handleInputChange('max', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
} 