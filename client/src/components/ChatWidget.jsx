import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Send,
  Loader2,
  Sun,
  Moon,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { aiAPI } from '../services/api';

export default function ChatWidget({ open = true }) {
  const [isOpen, setIsOpen] = useState(open);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm SmartGuide ✈️ Ask me about destinations, itineraries, packing, or local tips.",
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMessage = input;
    setInput('');
    setSending(true);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      const res = await aiAPI.chat({
        message: userMessage,
        history: messages,
      });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting. Make sure the backend is running.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-3 rounded-2xl shadow-xl hover:bg-sky-700 transition-all transform hover:scale-105 z-50"
        aria-label="Open chat"
      >
        <MessageCircle size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 flex flex-col shadow-2xl rounded-2xl bg-white border border-slate-200 z-50 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-700 to-cyan-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sky-600">
            <MessageCircle size={14} />
          </div>
          <div>
            <h3 className="font-bold text-sm">SmartGuide</h3>
            <p className="text-xs opacity-90">AI travel assistant</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-white/80"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user'
                ? 'ml-auto bg-sky-600 text-white'
                : 'mr-auto bg-white border border-slate-100 text-slate-800'
            } shadow-sm`}
          >
            {msg.role === 'assistant' && (
              <div className="flex items-start gap-2 mb-1">
                <Sparkles size={14} className="text-sky-500 mt-0.5" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-600">
                  SmartGuide
                </span>
              </div>
            )}
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        {sending && (
          <div className="mr-auto bg-white border border-slate-100 text-slate-800 p-3 rounded-2xl shadow-sm flex items-center gap-2">
            <Loader2 size={16} className="animate-spin text-sky-500" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-200 bg-white rounded-b-2xl">
        <form onSubmit={handleSend} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about travel..."
            className="input pl-10 pr-10 py-2.5 text-sm"
          />
          <div className="absolute left-3 top-3 text-slate-400">
            <MessageCircle size={16} />
          </div>
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="absolute right-3 top-2.5 text-sky-600 hover:text-sky-700 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
