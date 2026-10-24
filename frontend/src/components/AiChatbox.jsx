"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { formatPrice } from '@/utils/formatters';

export function AiChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "✨ Hello gorgeous! I am your **Beauty & Blush Advisor**. How can I help you today? I can recommend personalized skincare routines, match your blush or lipstick shade, or help you find your signature fragrance!",
      products: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "Recommend a blush for warm South Asian skin",
    "Skincare routine for oily acne-prone skin",
    "What's the difference between Dior Sauvage and YSL Libre?",
    "How to verify cosmetic batch codes?"
  ];

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMessage = { sender: 'user', text, products: [] };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', { message: text });
      const botMessage = {
        sender: 'bot',
        text: res.data.reply,
        products: res.data.products || []
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "✨ I'm currently reviewing other consultations. For oily skin, Niacinamide and Snail Mucin work wonders! For blushes, Rare Beauty 'Joy' or 'Happy' gives a radiant dewy finish.",
          products: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 btn-rose-primary p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2 group hover:scale-105 transition-transform"
        title="Open AI Beauty Advisor"
      >
        <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Beauty Advisor
        </span>
      </button>

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-96 max-h-[600px] h-[520px] rounded-3xl bg-white dark:bg-[#180e1a] border border-rose-200 dark:border-rose-900/60 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight">Beauty & Blush Advisor</h3>
                <span className="text-[10px] text-rose-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                  Online Concierge
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-rose-500 text-white rounded-br-none shadow-md'
                      : 'bg-rose-50/70 dark:bg-rose-950/30 text-slate-800 dark:text-rose-100 rounded-bl-none border border-rose-100 dark:border-rose-900/40'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Recommended Products Pill */}
                  {m.products && m.products.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-rose-200/60 dark:border-rose-900/40 pt-2">
                      <span className="text-[10px] uppercase font-bold text-rose-500 block">Recommended Match:</span>
                      {m.products.map((p, pIdx) => (
                        <Link
                          key={pIdx}
                          href={`/product/${p._id || p.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 p-1.5 rounded-xl bg-white dark:bg-[#120a14] border border-rose-100 dark:border-rose-900/50 hover:border-rose-400 transition-colors"
                        >
                          <img
                            src={p.images && p.images[0] ? p.images[0] : ''}
                            alt={p.title}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-bold truncate text-slate-900 dark:text-white">{p.title}</h4>
                            <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">{formatPrice(p.price)}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-slate-500 text-[11px] animate-pulse">
                  Advisor is analyzing formulation & shades...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Consultation Chips */}
          <div className="px-3 py-1.5 bg-rose-50/40 dark:bg-rose-950/20 border-t border-rose-100 dark:border-rose-950/40 overflow-x-auto flex gap-1.5 scrollbar-none text-[10px]">
            {quickPrompts.map((q, qIdx) => (
              <button
                key={qIdx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-[#1a0f1c] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 whitespace-nowrap hover:bg-rose-100 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-[#140a16] border-t border-rose-100 dark:border-rose-950/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for routine, shade match, or perfume..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2.5 rounded-xl btn-rose-primary shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
