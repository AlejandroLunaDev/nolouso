import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  toggleChat: () => void;
  setLoading: (loading: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isOpen: false,
  isLoading: false,

  addMessage: (content, role) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: new Date(),
        },
      ],
    })),

  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  clearChat: () => set({ messages: [] }),
})); 