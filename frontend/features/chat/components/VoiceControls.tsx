'use client';

import { Button } from '@/common/ui/button';
import { Mic, MicOff, X } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  isLoading: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onClose: () => void;
}

export function VoiceControls({
  isListening,
  isLoading,
  onStartListening,
  onStopListening,
  onClose,
}: VoiceControlsProps) {
  return (
    <div className="absolute bottom-8 flex items-center gap-4">
      <Button
        onClick={isListening ? onStopListening : onStartListening}
        variant={isListening ? 'destructive' : 'default'}
        size="icon"
        className="w-12 h-12 rounded-full"
        disabled={isLoading}
      >
        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        className="w-12 h-12 rounded-full"
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  );
}
