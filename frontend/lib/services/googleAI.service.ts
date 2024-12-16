import { GoogleGenerativeAI } from '@google/generative-ai';
import aiPrompts from '@/config/ai-prompts.json';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || '';

export class GoogleAIService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    if (!API_KEY) {
      throw new Error(
        'La API key de Google AI no está configurada. Por favor, configura NEXT_PUBLIC_GOOGLE_AI_API_KEY en el archivo .env.local'
      );
    }
    this.genAI = new GoogleGenerativeAI(API_KEY);
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      console.log('Iniciando generación de respuesta...');

      if (!userMessage.trim()) {
        throw new Error('El mensaje no puede estar vacío');
      }

      const model = this.genAI.getGenerativeModel({
        model: 'gemini-pro',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000
        }
      });

      console.log('Modelo configurado, enviando prompt...');

      const { system } = aiPrompts.chatbot;
      const prompt = `${system.role}
        ${system.personality}
        
        ${system.style}
        
        Usuario: ${userMessage}
        
        Asistente:`;

      const result = await model.generateContent(prompt);
      console.log('Respuesta recibida del modelo');

      if (!result.response) {
        throw new Error('No se recibió respuesta del modelo');
      }

      const response = result.response.text();
      console.log('Respuesta procesada:', response);

      if (!response.trim()) {
        throw new Error('La respuesta generada está vacía');
      }

      return response;
    } catch (error) {
      console.error('Error detallado al generar respuesta:', error);

      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error(
            'Error de configuración: API key no válida o faltante'
          );
        }
        if (error.message.includes('PERMISSION_DENIED')) {
          throw new Error(
            'Error de permisos: La API key no tiene permisos suficientes'
          );
        }
        if (error.message.includes('QUOTA_EXCEEDED')) {
          throw new Error('Se ha excedido el límite de la API');
        }
        throw new Error(`Error al generar la respuesta: ${error.message}`);
      }

      throw new Error(
        'Error inesperado al generar la respuesta. Por favor, intenta de nuevo.'
      );
    }
  }
}

export const googleAIService = new GoogleAIService();
