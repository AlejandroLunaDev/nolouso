
export class VoiceInteractionService {
  private recognition: SpeechRecognition | null = null;
  private synthesis!: SpeechSynthesis;
  private isListening = false;
  private isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Inicializar reconocimiento de voz
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.lang = 'es-ES';
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
      }

      // Inicializar síntesis de voz
      this.synthesis = window.speechSynthesis;
    }
  }

  startListening(
    onResult: (text: string) => void,
    onError: (error: string) => void
  ): void {
    if (!this.recognition) {
      onError('El reconocimiento de voz no está disponible en este navegador');
      return;
    }

    if (this.isListening) {
      return;
    }

    this.isListening = true;
    let hasRecognizedSpeech = false;

    // Manejar resultados intermedios para mejor feedback
    this.recognition.onresult = event => {
      hasRecognizedSpeech = true;
      const last = event.results.length - 1;
      const result = event.results[last];

      if (result.isFinal) {
        const text = result[0].transcript.trim();
        if (text) {
          this.isListening = false;
          onResult(text);
          this.recognition?.stop();
        }
      } else {
        // Feedback para resultados intermedios

      }
    };

    this.recognition.onerror = event => {
      this.isListening = false;
      let errorMessage = '';

      switch (event.error) {
        case 'no-speech':
          if (!hasRecognizedSpeech) {
            errorMessage =
              'Asegúrate de que tu micrófono esté funcionando y habla claramente.';
          }
          break;
        case 'audio-capture':
          errorMessage =
            'No se detectó ningún micrófono. Por favor, verifica que tu micrófono esté conectado y funcionando.';
          break;
        case 'not-allowed':
          errorMessage =
            'El acceso al micrófono fue denegado. Por favor, permite el acceso al micrófono para usar esta función.';
          break;
        case 'network':
          errorMessage =
            'Error de red. Por favor, verifica tu conexión a internet.';
          break;
        case 'aborted':
          if (!hasRecognizedSpeech) {
            errorMessage = 'La grabación fue cancelada. Intenta de nuevo.';
          }
          break;
        default:
          errorMessage = 'Error en el reconocimiento de voz: ' + event.error;
      }

      if (errorMessage) {
        onError(errorMessage);
      }
    };

    this.recognition.onend = () => {
      // Solo reiniciamos si no hemos reconocido voz y seguimos escuchando
      if (this.isListening && !hasRecognizedSpeech) {
        try {
          console.log('Reiniciando reconocimiento de voz...');
          this.recognition?.start();
        } catch {
          this.isListening = false;
          onError('Error al reiniciar el reconocimiento de voz');
        }
      } else {
        this.isListening = false;
      }
    };

    this.recognition.onstart = () => {
      console.log('Reconocimiento de voz iniciado - Puedes empezar a hablar');
    };

    this.recognition.onsoundstart = () => {
      console.log('Sonido detectado - Te estoy escuchando');
    };

    this.recognition.onsoundend = () => {
      console.log('Sonido finalizado');
    };

    this.recognition.onaudiostart = () => {
      console.log('Captura de audio iniciada');
    };

    try {
      this.recognition.start();
    } catch {
      this.isListening = false;
      onError(
        'Error al iniciar el reconocimiento de voz. Por favor, intenta de nuevo.'
      );
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text: string): void {
    if (!this.synthesis) {
      console.error('La síntesis de voz no está disponible');
      return;
    }

    // Cancelar cualquier voz en reproducción
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 0.8;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = event => {
      console.error('Error en la síntesis de voz:', event.error);
      this.isSpeaking = false;
    };

    this.synthesis.speak(utterance);
  }

  isVoiceSupported(): boolean {
    return !!this.recognition && !!this.synthesis;
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const voiceInteractionService = new VoiceInteractionService();