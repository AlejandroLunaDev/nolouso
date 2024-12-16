import { useState } from 'react';
import { voiceInteractionService } from '@/lib/services/voiceInteraction.service';

interface UseVoiceRecognitionProps {
  onResult: (text: string) => void;
}

export function useVoiceRecognition({ onResult }: UseVoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    setError(null);
    setIsListening(true);
    voiceInteractionService.startListening(
      (text) => {
        setIsListening(false);
        onResult(text);
      },
      (error) => {
        setError(error);
        setIsListening(false);
      }
    );
  };

  const stopListening = () => {
    voiceInteractionService.stopListening();
    setIsListening(false);
  };

  return {
    isListening,
    error,
    startListening,
    stopListening,
    isSupported: voiceInteractionService.isVoiceSupported()
  };
} 