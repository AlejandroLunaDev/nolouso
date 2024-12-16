export interface IChatService {
  generateResponse(message: string): Promise<string>;
  speak?(text: string): void;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
} 