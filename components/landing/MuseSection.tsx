"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";

const conversation = [
  { role: "user", text: "I've been feeling mentally exhausted lately. Like I'm running on empty." },
  { role: "muse", text: "It sounds like you've been carrying a lot emotionally. Before we dive in — when did this feeling start? Was there a specific moment, or has it been building quietly?", delay: 1200 },
  { role: "user", text: "Honestly, it's been building. Work has been intense and I haven't had time to just... be." },
  { role: "muse", text: "That makes a lot of sense. When we stop giving ourselves space to simply exist — without producing, solving, or achieving — the mind starts borrowing from reserves it doesn't have. What would 'just being' look like for you right now?", delay: 1000 },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 glass rounded-2xl rounded-bl-sm w-fit">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}

export default function MuseSection() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (visibleCount >= conversation.length) return;
    const current = conversation[visibleCount];
    if (current.role === "muse") {
      setIsTyping(true);
      const t = setTimeout(() => { setIsTyping(false); setVisibleCount((c) => c + 1); }, current.delay ?? 1000);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 600);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  return (
    <section id="muse-ai" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 dark:bg-violet-900/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-[0.2em] font-medium mb-4 block">Muse AI</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--land-text)" }}>
            An AI that actually{" "}
            <span className="grad-text">listens</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--land-subtext)" }}>
            Muse isn't a chatbot. It's an emotionally intelligent companion trained to help you
            think clearly and feel understood.
          </p>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl overflow-hidden border border-violet-500/15 glow-purple"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-black/[0.07] dark:border-white/[0.07]">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0a0a0a]" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--land-text)" }}>Muse</p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Active · emotionally aware</p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-5 space-y-4 min-h-[320px]">
            <AnimatePresence>
              {conversation.slice(0, visibleCount).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "muse" && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-violet-600/80 to-blue-600/80 text-white rounded-br-sm"
                        : "glass rounded-bl-sm border border-black/[0.07] dark:border-white/[0.07]"
                    }`}
                    style={msg.role === "muse" ? { color: "var(--land-text)" } : {}}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-3 h-3 text-white" />
                  </div>
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="px-5 pb-5">
            <div className="flex items-center gap-3 glass rounded-2xl px-4 py-3 border border-black/[0.07] dark:border-white/[0.07]">
              <span className="text-sm flex-1" style={{ color: "var(--land-subtext)", opacity: 0.5 }}>
                Share what&apos;s on your mind...
              </span>
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capabilities */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Emotionally aware", icon: "💜" },
            { label: "Non-judgmental", icon: "🌿" },
            { label: "Always available", icon: "🌙" },
          ].map((cap) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-4 text-center border border-black/[0.07] dark:border-white/[0.07]"
            >
              <div className="text-2xl mb-2">{cap.icon}</div>
              <p className="text-xs" style={{ color: "var(--land-subtext)" }}>{cap.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
