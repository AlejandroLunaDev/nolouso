'use client';

import { VoiceVisualizer } from './VoiceVisualizer';
import { VoiceControls } from './VoiceControls';

interface VoiceModeProps {
  isListening: boolean;
  isLoading: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onClose: () => void;
}

export function VoiceMode({
  isListening,
  isLoading,
  onStartListening,
  onStopListening,
  onClose
}: VoiceModeProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center p-4 border-b">
        <h2 className="font-semibold">Modo Voz</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <VoiceVisualizer isActive={isListening || isLoading} />
        <VoiceControls
          isListening={isListening}
          isLoading={isLoading}
          onStartListening={onStartListening}
          onStopListening={onStopListening}
          onClose={onClose}
        />
      </div>
    </div>
  );
} 