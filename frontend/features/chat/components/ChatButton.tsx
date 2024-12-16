'use client';

import { ChatBotIcon } from './ChatBotIcon';

interface ChatButtonProps {
  onClick: () => void;
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 p-0 bg-transparent border-none outline-none transition-transform hover:scale-110 duration-200"
      aria-label="Open chat"
    >
      <ChatBotIcon />
    </button>
  );
}