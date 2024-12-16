'use client';

import { Button } from '@/common/ui/button';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  onClose: () => void;
}

export function ChatHeader({ title, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="font-semibold">{title}</h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
} 