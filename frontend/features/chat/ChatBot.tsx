'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from './hooks/useChat';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { VoiceMode } from './components/VoiceMode';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { GoogleAIChatService } from './services/googleAI.service';
import { useChatStore } from '@/lib/stores/useChatStore';
import { ChatButton } from './components/ChatButton';

export function ChatBot() {
  const { isOpen, toggleChat } = useChatStore();
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  const chatService = useMemo(() => new GoogleAIChatService(), []);
  const { messages, isLoading, handleMessage } = useChat();

  const handleVoiceResult = async (text: string) => {
    await handleMessage(text, chatService, true);
  };

  const { isListening, startListening, stopListening, isSupported } =
    useVoiceRecognition({
      onResult: handleVoiceResult
    });

  const handleTextSubmit = async (message: string) => {
    await handleMessage(message, chatService);
  };

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  return (
    <>
      <ChatButton onClick={toggleChat} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='fixed bottom-20 right-4 w-96 h-[600px] bg-background rounded-lg shadow-xl border flex flex-col z-50'
          >
            {isVoiceMode ? (
              <VoiceMode
                isListening={isListening}
                isLoading={isLoading}
                onStartListening={startListening}
                onStopListening={stopListening}
                onClose={toggleVoiceMode}
              />
            ) : (
              <>
                <ChatHeader title='Chat Asistente' onClose={toggleChat} />
                <ChatMessages messages={messages} isLoading={isLoading} />
                <ChatInput
                  onSubmit={handleTextSubmit}
                  onVoiceMode={toggleVoiceMode}
                  isLoading={isLoading}
                  isVoiceSupported={isSupported}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
