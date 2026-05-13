"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star, Sparkles, TrendingUp, Brain, Heart } from "lucide-react";

function Orb({ className }: { className: string }) {
  return <div className={`orb absolute pointer-events-none ${className}`} />;
}

function AppCard({ delay, className, children }: { delay: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-2xl p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay" />
      <Orb className="w-[500px] h-[500px] bg-violet-600/25 -top-32 -left-40 orb-slow" />
      <Orb className="w-[400px] h-[400px] bg-blue-600/20 top-1/2 -right-24" />
      <Orb className="w-[300px] h-[300px] bg-fuchsia-600/15 bottom-0 left-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div style={{ y: yParallax, opacity: opacityParallax }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-8 border border-violet-500/25"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
              <span className="text-xs text-violet-600 dark:text-violet-300 font-medium">AI-Powered Journaling Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
              style={{ color: "var(--land-text)" }}
            >
              Turn chaotic{" "}
              <span className="grad-text-animated">thoughts</span>
              <br />
              into clarity.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-lg max-w-xl leading-relaxed mb-10"
              style={{ color: "var(--land-subtext)" }}
            >
              DailyMuse is your AI-powered companion for reflection, focus, and emotional growth.
              Journal, chat with Muse, track moods, and receive insights that help you understand yourself.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/sign-up" className="btn-primary px-7 py-3.5 text-base flex items-center justify-center gap-2 group">
                Start Journaling
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-ghost px-7 py-3.5 text-base flex items-center justify-center gap-2 group">
                <div className="w-7 h-7 rounded-full flex items-center justify-center glass group-hover:border-violet-500/30 transition-colors border border-black/10 dark:border-white/10">
                  <Play className="w-3 h-3 fill-violet-600 dark:fill-white text-violet-600 dark:text-white ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-5"
            >
              <div className="flex -space-x-2">
                {["🧑‍💻","👩‍🎨","🧑‍🎓","👩‍💼","🧑‍🔬"].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full glass border border-black/10 dark:border-white/15 flex items-center justify-center text-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "var(--land-subtext)" }}>
                  Loved by <span className="font-medium" style={{ color: "var(--land-text)" }}>2,000+</span> reflectors
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/15 via-blue-600/8 to-fuchsia-600/10 rounded-3xl blur-3xl scale-110" />

            {/* Main journal card */}
            <div className="relative glass-strong rounded-3xl p-5 glow-purple">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-xs font-medium" style={{ color: "var(--land-subtext)" }}>Today's Entry · May 13</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/70" />
                </div>
              </div>

              {/* Writing area */}
              <div className="bg-black/[0.03] dark:bg-white/[0.03] rounded-2xl p-4 mb-4 border border-black/[0.06] dark:border-white/[0.06]">
                <p className="text-sm leading-relaxed" style={{ color: "var(--land-subtext)" }}>
                  I've been feeling scattered lately — too many ideas, not enough clarity.
                  But after my morning walk, something shifted...
                </p>
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="w-1 h-4 bg-violet-500 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Mood tags */}
              <div className="flex gap-2 mb-4">
                {[
                  { label: "Reflective", color: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/25" },
                  { label: "Hopeful",    color: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25" },
                  { label: "Focused",   color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
                ].map((tag) => (
                  <span key={tag.label} className={`text-xs px-3 py-1 rounded-full border font-medium ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* Insight cards row */}
              <div className="grid grid-cols-2 gap-3">
                <AppCard delay={0.6} className="border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--land-subtext)" }}>Mood Trend</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--land-text)" }}>Stress ↓ 18% this week</p>
                  <div className="mt-2 h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                  </div>
                </AppCard>

                <AppCard delay={0.7} className="border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--land-subtext)" }}>AI Insight</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--land-text)" }}>You write best after morning walks</p>
                </AppCard>
              </div>

              {/* Streak */}
              <AppCard delay={0.8} className="mt-3 border border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "var(--land-text)" }}>14-day streak</p>
                      <p className="text-[10px]" style={{ color: "var(--land-subtext)" }}>Keep it going!</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-sm ${i < 6 ? "bg-amber-400" : "bg-black/10 dark:bg-white/10"}`} />
                    ))}
                  </div>
                </div>
              </AppCard>
            </div>

            {/* Floating mood card */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-14 top-24 glass rounded-2xl p-3.5 border border-fuchsia-500/20 shadow-xl w-52"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Heart className="w-3.5 h-3.5 text-fuchsia-500 dark:text-fuchsia-400" />
                <span className="text-[10px] text-fuchsia-600 dark:text-fuchsia-400 font-medium uppercase tracking-wider">Pattern Detected</span>
              </div>
              <p className="text-xs" style={{ color: "var(--land-text)" }}>You feel calmer after morning workouts.</p>
            </motion.div>

            {/* Floating reflection card */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-10 bottom-24 glass rounded-2xl p-3.5 border border-blue-500/20 shadow-xl w-52"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">Weekly Reflection</span>
              </div>
              <p className="text-xs" style={{ color: "var(--land-text)" }}>10 reflections · 3 insights · 2 breakthroughs</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
