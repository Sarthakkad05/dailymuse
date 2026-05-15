"use client";

import { motion } from "framer-motion";
import {
  Brain, MessageCircle, Heart, BarChart2, Mic, BookOpen, Target, Sparkles, Clock
} from "lucide-react";

const features = [
  {
    id: "journal", icon: Brain, title: "AI Journaling",
    desc: "Guided prompts and intelligent suggestions that help you articulate what you're feeling, even when words feel hard.",
    gradient: "from-violet-600/15 to-purple-900/5", border: "border-violet-500/20",
    glow: "rgba(139,92,246,0.12)", size: "col-span-2 md:col-span-2", accent: "text-violet-600 dark:text-violet-400",
    preview: (
      <div className="mt-3 space-y-1.5">
        {["What made today worth it?","What drained your energy?","What are you grateful for?"].map((p) => (
          <div key={p} className="text-[11px] flex items-center gap-2" style={{ color: "var(--land-subtext)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500/60 flex-shrink-0" />{p}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "muse", icon: MessageCircle, title: "Muse AI Chat",
    desc: "Your emotionally intelligent AI companion. Talk through anything — it listens, reflects, and guides you gently.",
    gradient: "from-blue-600/15 to-cyan-900/5", border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.12)", size: "col-span-2 md:col-span-1", accent: "text-blue-600 dark:text-blue-400",
    preview: (
      <div className="mt-3 glass rounded-xl p-2.5 text-[11px] leading-relaxed" style={{ color: "var(--land-subtext)" }}>
        "It sounds like you've been carrying a lot. Let's unpack that together..."
      </div>
    ),
  },
  {
    id: "emotions", icon: Heart, title: "Emotional Intelligence",
    desc: "Understand your emotional patterns over time. DailyMuse identifies your triggers, cycles, and growth areas.",
    gradient: "from-fuchsia-600/15 to-rose-900/5", border: "border-fuchsia-500/20",
    glow: "rgba(217,70,239,0.1)", size: "col-span-2 md:col-span-1", accent: "text-fuchsia-600 dark:text-fuchsia-400",
    preview: (
      <div className="mt-3 flex gap-2">
        {[{ label: "Calm", pct: 72, color: "bg-blue-500" },{ label: "Joyful", pct: 55, color: "bg-amber-400" }].map((m) => (
          <div key={m.label} className="flex-1">
            <div className="text-[10px] mb-1" style={{ color: "var(--land-subtext)" }}>{m.label}</div>
            <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "analytics", icon: BarChart2, title: "AI Insights Dashboard",
    desc: "See your week at a glance. Mood graphs, habit heatmaps, and AI-generated weekly summaries.",
    gradient: "from-emerald-600/15 to-teal-900/5", border: "border-emerald-500/20",
    glow: "rgba(16,185,129,0.1)", size: "col-span-2 md:col-span-2", accent: "text-emerald-600 dark:text-emerald-400",
    preview: (
      <div className="mt-3 flex items-end gap-1 h-10">
        {[40,65,45,80,60,90,75].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-emerald-300 opacity-70" style={{ height: `${h}%` }} />
        ))}
      </div>
    ),
  },
  {
    id: "voice", icon: Mic, title: "Voice Journaling",
    desc: "Speak your thoughts out loud. Muse transcribes, analyzes tone, and extracts insights from your voice entries.",
    gradient: "from-orange-600/15 to-red-900/5", border: "border-orange-500/20",
    glow: "rgba(249,115,22,0.1)", size: "col-span-2 md:col-span-1", accent: "text-orange-600 dark:text-orange-400",
    preview: (
      <div className="mt-3 flex items-center gap-1">
        {[3,5,8,6,4,7,5,3,6,8,5,4].map((h, i) => (
          <div key={i} className="flex-1 bg-orange-400/60 rounded-full" style={{ height: `${h * 3}px` }} />
        ))}
      </div>
    ),
  },
  {
    id: "habits", icon: Target, title: "Habit Coaching",
    desc: "AI-powered habit suggestions tailored to your emotional state. Build routines that actually stick.",
    gradient: "from-indigo-600/15 to-blue-900/5", border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.1)", size: "col-span-2 md:col-span-1", accent: "text-indigo-600 dark:text-indigo-400",
    preview: (
      <div className="mt-3 space-y-1.5">
        {[{ label: "Morning pages", done: true },{ label: "10-min walk", done: true },{ label: "Evening reflection", done: false }].map((h) => (
          <div key={h.label} className="flex items-center gap-2 text-[11px]" style={{ color: "var(--land-subtext)" }}>
            <div className={`w-3 h-3 rounded flex-shrink-0 ${h.done ? "bg-indigo-500" : "border border-black/20 dark:border-white/20"}`} />
            {h.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "notion", icon: BookOpen, title: "Notion Integration",
    desc: "Sync your journals and insights directly to Notion. Build your second brain seamlessly.",
    gradient: "from-slate-600/15 to-gray-900/5", border: "border-slate-500/20",
    glow: "rgba(100,116,139,0.1)", size: "col-span-2 md:col-span-1", accent: "text-slate-600 dark:text-slate-400",
    preview: (
      <div className="mt-3 flex items-center gap-2 text-[11px]" style={{ color: "var(--land-subtext)" }}>
        <div className="w-5 h-5 glass rounded flex items-center justify-center text-sm">N</div>
        <span>Syncing 3 journals...</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    ),
  },
  {
    id: "timeline", icon: Clock, title: "Reflection Timeline",
    desc: "Browse your entire emotional journey. Watch yourself grow, one entry at a time.",
    gradient: "from-pink-600/15 to-rose-900/5", border: "border-pink-500/20",
    glow: "rgba(236,72,153,0.1)", size: "col-span-2 md:col-span-1", accent: "text-pink-600 dark:text-pink-400",
    preview: (
      <div className="mt-3 relative pl-4">
        <div className="absolute left-1 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500/50 to-transparent" />
        {["Jan 12","Feb 4","Today"].map((d) => (
          <div key={d} className="flex items-center gap-2 mb-1.5 text-[11px]" style={{ color: "var(--land-subtext)" }}>
            <div className="absolute left-0 w-2 h-2 rounded-full bg-pink-500/60" style={{ marginLeft: '-3px' }} />{d}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "insights", icon: Sparkles, title: "Personalized Insights",
    desc: "Every week, Muse generates a personalized narrative of your emotional arc — what shifted, what's growing.",
    gradient: "from-amber-600/15 to-yellow-900/5", border: "border-amber-500/20",
    glow: "rgba(245,158,11,0.1)", size: "col-span-2 md:col-span-2", accent: "text-amber-600 dark:text-amber-400",
    preview: (
      <div className="mt-3 glass rounded-xl p-3 text-[11px] leading-relaxed" style={{ color: "var(--land-subtext)" }}>
        "You started this week feeling scattered, but by Thursday your entries show a clear shift toward calm focus. Your gratitude practice is working."
      </div>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 dark:bg-violet-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-[0.2em] font-medium mb-4 block">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--land-text)" }}>
            Everything your mind needs
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--land-subtext)" }}>
            A thoughtfully crafted toolkit to journal, reflect, and grow — all powered by AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`${f.size} group relative rounded-2xl p-5 overflow-hidden border cursor-default transition-all duration-300 ${f.border}`}
              style={{ background: `radial-gradient(ellipse at top left, ${f.glow}, transparent 70%), var(--land-glass-bg)` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 40px ${f.glow}` }}
              />
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${f.gradient}`}>
                <f.icon className={`w-4 h-4 ${f.accent}`} />
              </div>
              <h3 className="text-sm font-semibold mb-1.5" style={{ color: "var(--land-text)" }}>{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--land-subtext)" }}>{f.desc}</p>
              {f.preview}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
