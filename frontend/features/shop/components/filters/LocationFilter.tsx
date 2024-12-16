import React from 'react';
import { Label } from '@/common/ui/label';
import { Input } from '@/common/ui/input';
import { Button } from '@/common/ui/button';
import { BiCurrentLocation } from 'react-icons/bi';

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Aquí podrías convertir las coordenadas a una dirección usando una API de geocodificación
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        onChange(coords);
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base">Ubicación</Label>
      <div className="flex gap-2">
        <Input
          placeholder="Ingresa una ubicación"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleGetCurrentLocation}
          title="Usar ubicación actual"
        >
          <BiCurrentLocation className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
} 