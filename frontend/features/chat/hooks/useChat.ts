'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/lib/stores/useChatStore';
import { IChatService } from '../services/chat.interface';
import aiPrompts from '@/config/ai-prompts.json';

export function useChat() {
  const {
    messages,
    isLoading,
    addMessage,
    setLoading,
  } = useChatStore();

  const handleMessage = useCallback(async (
    message: string,
    chatService: IChatService,
    useVoice: boolean = false
  ) => {
    addMessage(message, 'user');
    setLoading(true);

    try {
      const response = await chatService.generateResponse(message);
      addMessage(response, 'assistant');
      
      if (useVoice && chatService.speak) {
        chatService.speak(response);
      }
      
      return response;
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = aiPrompts.chatbot.error_messages.general;
      addMessage(errorMsg, 'assistant');
      
      if (useVoice && chatService.speak) {
        chatService.speak(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, [addMessage, setLoading]);

  return {
    messages,
    isLoading,
    handleMessage
  };
} 