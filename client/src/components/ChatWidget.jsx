import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  Loader2,
  X,
  ArrowDown,
  RotateCcw,
} from 'lucide-react';
import { aiAPI } from '../services/api';

const GREETING =
  "Hi! I'm SmartGuide ✈️ Ask me about destinations, itineraries, packing, or local tips.";

function InlineText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

/** Lightweight markdown: bold headings, bullet lines, and paragraphs. */
function MessageBody({ content }) {
  return (
    <div className="space-y-1">
      {String(content || '').split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;
        if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
          return (
            <div key={i} className="pt-1 text-[13px] font-semibold">
              <InlineText text={trimmed} />
            </div>
          );
        }
        if (/^[-•*]\s+/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-2">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
              <span><InlineText text={trimmed.replace(/^[-•*]\s+/, '')} /></span>
            </div>
          );
        }
        return (
          <div key={i}>
            <InlineText text={line} />
          </div>
        );
      })}
    </div>
  );
}

export default function ChatWidget({ open = false }) {
  const [isOpen, setIsOpen] = useState(open);
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const [aiInfo, setAiInfo] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const atBottomRef = useRef(true);
  const nextId = useRef(2);

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  // Only auto-scroll when the user is already near the bottom, so reading
  // older messages isn't interrupted by a new reply.
  useEffect(() => {
    if (atBottomRef.current) scrollToBottom();
  }, [messages.length, sending, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      scrollToBottom('auto');
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, scrollToBottom]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    atBottomRef.current = near;
    setAtBottom(near);
  };

  const handleSend = async (event) => {
    event?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const history = messages.slice(-8).map(({ role, content }) => ({ role, content }));
    setInput('');
    atBottomRef.current = true;
    setMessages((prev) => [...prev, { id: nextId.current++, role: 'user', content: text }]);
    setSending(true);

    try {
      const res = await aiAPI.chat({ message: text, history });
      setAiInfo({ source: res.data?.source, model: res.data?.model });
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: 'assistant',
          content: res.data?.reply || 'Sorry, I did not get a reply. Please try again.',
        },
      ]);
    } catch (err) {
      const status = err.response?.status;
      const detail = err.response?.data?.message;
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: 'assistant',
          content: `Sorry — I couldn't reach the AI service${status ? ` (HTTP ${status})` : ''}. ${
            detail || 'Please check your connection and try again.'
          }`,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      { id: nextId.current++, role: 'assistant', content: 'Fresh chat! Where would you like to go?' },
    ]);
    setAiInfo(null);
    atBottomRef.current = true;
    inputRef.current?.focus();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-sky-700"
        aria-label="Open AI chat"
      >
        <img src="/logo.svg" alt="" className="h-6 w-6 rounded-md" />
        <span className="hidden sm:inline">Ask SmartGuide</span>
      </button>
    );
  }

  const providerLabel =
    aiInfo?.source && aiInfo.source !== 'mock'
      ? aiInfo.source.toUpperCase()
      : 'DEMO AI';

  return (
    <div className="fixed bottom-4 right-4 z-50 glass-card flex h-[70vh] max-h-[600px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden shadow-2xl sm:bottom-6 sm:right-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-sky-700/90 to-cyan-600/90 px-4 py-3 text-white backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="" className="h-8 w-8 rounded-lg shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold leading-tight">SmartGuide</h3>
              <span
                className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-bold tracking-wide"
                title={aiInfo?.model ? `Model: ${aiInfo.model}` : 'Built-in demo responses'}
              >
                {providerLabel}
              </span>
            </div>
            <p className="text-[11px] opacity-90">AI travel assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="rounded-lg p-1.5 text-white/90 transition hover:bg-white/20 hover:text-white"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-white/90 transition hover:bg-white/20 hover:text-white"
            aria-label="Close chat"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Messages — fixed-height flex child with its own scrollbar */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        aria-live="polite"
        className="relative min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-white/25 p-4 text-sm leading-relaxed dark:bg-slate-950/40"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[88%] break-words rounded-2xl px-3.5 py-2.5 shadow-sm ${
              msg.role === 'user'
                ? 'ml-auto rounded-br-md bg-sky-600 text-white'
                : 'mr-auto rounded-bl-md glass-chip text-slate-800 dark:text-slate-100'
            }`}
          >
            <MessageBody content={msg.content} />
          </div>
        ))}

        {sending && (
          <div className="mr-auto flex items-center gap-2 rounded-2xl rounded-bl-md glass-chip px-3.5 py-2.5 text-slate-700 dark:text-slate-200">
            <Loader2 size={15} className="animate-spin text-sky-500" />
            <span className="text-xs">Thinking…</span>
          </div>
        )}

        {!atBottom && (
          <button
            onClick={() => {
              atBottomRef.current = true;
              scrollToBottom();
            }}
            className="sticky bottom-0 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full glass-chip text-slate-600 shadow-lg dark:text-slate-100"
            aria-label="Scroll to latest message"
          >
            <ArrowDown size={15} />
          </button>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-white/60 bg-white/40 p-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50">
        <form onSubmit={handleSend} className="relative">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about travel… (Enter to send)"
            aria-label="Message SmartGuide"
            className="max-h-24 w-full resize-none glass-chip py-2.5 pl-3 pr-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:text-slate-100"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="absolute right-2 top-2 rounded-lg p-1.5 text-sky-600 transition hover:bg-sky-50 disabled:opacity-40 dark:text-sky-400 dark:hover:bg-sky-900/30"
            aria-label="Send message"
          >
            {sending ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
          </button>
        </form>
        <p className="mt-1.5 text-center text-[10px] text-slate-400 dark:text-slate-400">
          SmartGuide can make mistakes — verify important travel details.
        </p>
      </div>
    </div>
  );
}
