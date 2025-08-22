
import React, { useState, useCallback, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import { ChatMessage, Author } from './types';
import { generateResponse } from './services/geminiService';
import { WHATSAPP_TRANSCRIPT } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initial greeting from the bot
    setMessages([
      {
        author: Author.BOT,
        text: "Hello Hello Divyuu! Kya baat hai! Kaise ho? 🤗",
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      author: Author.USER,
      text,
      timestamp: Date.now(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // We only send the last few messages for recent context to save tokens, but the full transcript for background.
      const recentHistory = messages.slice(-10); 
      const botResponseText = await generateResponse([...recentHistory, userMessage], WHATSAPP_TRANSCRIPT);
      
      const botMessage: ChatMessage = {
        author: Author.BOT,
        text: botResponseText,
        timestamp: Date.now() + 1,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to get response from bot:", error);
       const errorBotMessage: ChatMessage = {
        author: Author.BOT,
        text: "Oopsie! Thoda network issue lag raha hai. 🙈 Let's try again in a bit.",
        timestamp: Date.now() + 1,
      };
      setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-gray-200">
        <div className="w-full max-w-2xl h-full md:h-[90vh] lg:h-[85vh]">
            <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
            />
        </div>
    </div>
  );
};

export default App;
