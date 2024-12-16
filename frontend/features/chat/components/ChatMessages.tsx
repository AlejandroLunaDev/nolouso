'use client';

import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { ChatMessage as Message } from './ChatMessage';
import { useAutoScroll } from '@/lib/hooks/useAutoScroll';
import { ChatMessage } from '../services/chat.interface';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  useAutoScroll(chatRef, messages);

  return (
    <div
      ref={chatRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
      
      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
    </div>
  );
} 