"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-white/75 dark:bg-[#140b17]/85 backdrop-blur-2xl text-slate-800 dark:text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-[0_10px_35px_rgba(201,77,100,0.25)] border border-white/60 dark:border-white/15 flex items-center gap-2 group hover:bg-white/90 dark:hover:bg-[#140b17]/95 transition-all cursor-pointer"
        title="Open Beauty Advisor"
      >
        <Sparkles className="w-4 h-4 text-[#c94d64] animate-pulse" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          Beauty Advisor
        </span>
      </motion.button>

      {/* Chat Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-96 max-h-[600px] h-[520px] rounded-3xl bg-white/80 dark:bg-[#140b17]/85 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 bg-rose-500/10 dark:bg-white/[0.04] backdrop-blur-xl text-slate-900 dark:text-white flex items-center justify-between border-b border-white/40 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-rose-500/15 dark:bg-white/10 backdrop-blur-md flex items-center justify-center border border-rose-300/30 dark:border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-[#c94d64]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-tight font-serif text-slate-900 dark:text-white">Beauty Advisor</h3>
                  <span className="text-[10px] text-slate-500 dark:text-white/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Online
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-white/30 dark:bg-transparent backdrop-blur-sm">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md text-[#c94d64] flex items-center justify-center shrink-0 mt-0.5 border border-white/60 dark:border-white/10">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#c94d64] text-white shadow-sm border border-rose-400/30'
                        : 'bg-white/70 dark:bg-white/5 backdrop-blur-md text-slate-800 dark:text-slate-100 border border-white/60 dark:border-white/10 shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {/* Recommended Products Pill */}
                    {m.products && m.products.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-rose-200/50 dark:border-white/10 pt-2">
                        <span className="text-[10px] uppercase font-bold text-[#c94d64] block">Recommended Match:</span>
                        {m.products.map((p, pIdx) => (
                          <Link
                            key={pIdx}
                            href={`/product/${p._id || p.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 p-1.5 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/10 hover:border-rose-300 transition-colors"
                          >
                            <img
                              src={p.images && p.images[0] ? p.images[0] : ''}
                              alt={p.title}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[11px] font-bold truncate text-slate-900 dark:text-white">{p.title}</h4>
                              <p className="text-[10px] text-[#c94d64] font-semibold">{formatPrice(p.price)}</p>
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
                  <div className="w-6 h-6 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-[#c94d64] flex items-center justify-center shrink-0 border border-rose-200/40">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 text-slate-500 text-[11px] animate-pulse">
                    Advisor is analyzing formulation & shades...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Consultation Chips */}
            <div className="px-3 py-2 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border-t border-white/40 dark:border-white/10 overflow-x-auto flex gap-1.5 scrollbar-none text-[10px]">
              {quickPrompts.map((q, qIdx) => (
                <motion.button
                  key={qIdx}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md text-rose-700 dark:text-rose-300 border border-white/60 dark:border-white/10 whitespace-nowrap hover:bg-rose-50 dark:hover:bg-white/20 transition-all cursor-pointer"
                >
                  {q}
                </motion.button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white/60 dark:bg-[#140b17]/70 backdrop-blur-2xl border-t border-white/40 dark:border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask for routine, shade match, or perfume..."
                className="flex-1 text-xs p-2.5 rounded-xl border border-white/60 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#c94d64]/50"
              />
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="submit"
                disabled={loading || !inputText.trim()}
                className="p-2.5 rounded-xl btn-rose-primary shrink-0 cursor-pointer shadow-md shadow-[#c94d64]/20"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
