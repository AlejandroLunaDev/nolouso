import React from 'react';
import { Label } from '@/common/ui/label';
import { RadioGroup, RadioGroupItem } from '@/common/ui/radio-group';

const sortOptions = [
  { value: 'price_asc', label: 'Precio: Menor a Mayor' },
  { value: 'price_desc', label: 'Precio: Mayor a Menor' },
  { value: 'name_asc', label: 'Nombre: A-Z' },
  { value: 'name_desc', label: 'Nombre: Z-A' }
] as const;

interface SortFilterProps {
  value: (typeof sortOptions)[number]['value'];
  onChange: (value: (typeof sortOptions)[number]['value']) => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base">Ordenar por</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {sortOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value} className="text-sm">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
} 