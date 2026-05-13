"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Eye, Lock } from "lucide-react";

const stats = [
  { value: "10K+", label: "Reflections written" },
  { value: "2K+",  label: "Active journalers" },
  { value: "98%",  label: "User satisfaction" },
  { value: "4.9★", label: "App rating" },
];

const pills = [
  { icon: Zap,    text: "AI-Powered Reflection" },
  { icon: Lock,   text: "Private & Encrypted" },
  { icon: Eye,    text: "Emotion-Aware Insights" },
  { icon: Shield, text: "No Ads, Ever" },
];

export default function TrustSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="fade-sep mb-20" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm uppercase tracking-[0.2em] mb-12 font-medium"
          style={{ color: "var(--land-subtext)" }}
        >
          Built for students, creators, and deep thinkers
        </motion.p>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-12"
          style={{ background: "var(--land-stat-border)" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="stat-cell flex flex-col items-center justify-center py-10 px-6"
            >
              <span className="shimmer text-4xl font-bold mb-1">{stat.value}</span>
              <span className="text-sm" style={{ color: "var(--land-subtext)" }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Pill badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {pills.map((pill, i) => (
            <motion.div
              key={pill.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-2 px-5 py-2.5 glass rounded-full border border-violet-500/20 hover:border-violet-500/40 transition-all group cursor-default"
            >
              <pill.icon className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 group-hover:text-violet-500 transition-colors" />
              <span className="text-sm transition-colors" style={{ color: "var(--land-subtext)" }}>{pill.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fade-sep mt-20" />
    </section>
  );
}
