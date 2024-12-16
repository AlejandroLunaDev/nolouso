'use client';

import Image from 'next/image';

export function ChatBotIcon() {
  return (
    <Image
      src="/images/chatbot.gif"
      alt="Chat Bot"
      width={80}
      height={80}
      priority
      className="drop-shadow-lg"
    />
  );
} 