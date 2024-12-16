import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Avatar } from '@/common/ui/avatar';
import { BotIcon, UserIcon } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatMessage = React.memo(function ChatMessage({
  content,
  role,
  timestamp,
}: ChatMessageProps) {
  const isBot = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg',
        isBot ? 'bg-secondary' : 'bg-primary/10'
      )}
    >
      <Avatar className={cn('w-8 h-8', isBot ? 'bg-primary' : 'bg-secondary')}>
        {isBot ? <BotIcon className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">{content}</p>
        <time className="text-xs text-muted-foreground">
          {new Intl.DateTimeFormat('es', {
            hour: '2-digit',
            minute: '2-digit',
          }).format(timestamp)}
        </time>
      </div>
    </motion.div>
  );
}); 