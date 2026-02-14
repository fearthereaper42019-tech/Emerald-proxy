
import React, { useState, useEffect, useRef } from 'react';
import { getAIChatResponse } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    setMessages([{ role: 'model', text: 'Hello I am your personal assistant by EMERALD what do you want me to help?' }]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    const newHistory = [...messages, { role: 'user', text: userMessage }] as any;
    setMessages(newHistory);
    setInput('');
    setIsTyping(true);

    const response = await getAIChatResponse(newHistory);
    setMessages([...newHistory, { role: 'model', text: response || 'No response.' }]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 animate-fade-in h-[500px] flex flex-col">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              m.role === 'user' 
              ? 'bg-white text-black font-medium' 
              : 'glass-panel text-zinc-100 border-white/20'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="glass-panel p-4 rounded-2xl border-white/20 flex gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSend} className="relative group">
        <div className="absolute -inset-0.5 bg-white/20 rounded-2xl blur-sm group-focus-within:bg-white/40 transition duration-300"></div>
        <div className="relative flex items-center bg-black border border-white/20 rounded-2xl overflow-hidden white-border-glow">
          <input
            type="text"
            className="w-full bg-transparent border-none text-white py-4 px-6 focus:ring-0 text-lg placeholder:text-zinc-700"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={isTyping}
            className="bg-white hover:bg-zinc-200 text-black font-bold px-8 py-4 transition-all disabled:opacity-50"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
