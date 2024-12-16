'use client';

import { useRef } from 'react';
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { RiVoiceAiFill } from "react-icons/ri";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  onVoiceMode: () => void;
  isLoading: boolean;
  isVoiceSupported: boolean;
}

export function ChatInput({
  onSubmit,
  onVoiceMode,
  isLoading,
  isVoiceSupported
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (!input?.value.trim()) return;

    onSubmit(input.value);
    input.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          placeholder="Escribe tu mensaje..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          type="button"
          onClick={onVoiceMode}
          variant="outline"
          size="icon"
          disabled={isLoading || !isVoiceSupported}
          title="Chat por voz"
          className="relative group hover:bg-primary/10"
        >
          <div className="relative flex items-center justify-center">
          <RiVoiceAiFill className="w-4 h-4" />
  
          </div>
        </Button>
      </div>
    </form>
  );
} 