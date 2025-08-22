
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Header from './Header';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-2xl overflow-hidden border border-gray-200">
      <Header />
      <div className="flex-1 p-4 overflow-y-auto bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')" }}>
        {messages.map((msg) => (
          <MessageBubble key={msg.timestamp} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
