
import React from 'react';
import { ChatMessage, Author } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.author === Author.USER;

  const bubbleClasses = isUser
    ? 'bg-emerald-500 text-white self-end rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
    : 'bg-white text-gray-800 self-start rounded-tr-2xl rounded-tl-2xl rounded-br-2xl';
  
  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex ${containerClasses} mb-4`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 shadow-md ${bubbleClasses}`}>
        <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
