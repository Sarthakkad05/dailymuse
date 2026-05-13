"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600/5 dark:via-violet-950/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/10 dark:bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/8 dark:bg-blue-600/15 blur-[80px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-fuchsia-600/6 dark:bg-fuchsia-600/10 blur-[80px]" />
        <div className="absolute inset-0 grid-overlay opacity-50" />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-violet-500/40 dark:bg-violet-400/50"
            style={{ left: `${15 + i * 6}%`, top: `${20 + (i % 3) * 20}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3 + i * 0.4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-8 border border-violet-500/25">
            <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span className="text-xs text-violet-600 dark:text-violet-300 font-medium">Free to start · No credit card required</span>
          </div>

          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
            style={{ color: "var(--land-text)" }}
          >
            Start understanding{" "}
            <br />
            <span className="grad-text-animated">yourself better.</span>
          </h2>

          <p className="text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "var(--land-subtext)" }}>
            Your thoughts deserve more than a notes app.
            <br />
            Give them the space, intelligence, and care they deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/sign-up" className="btn-primary px-8 py-4 text-base flex items-center justify-center gap-2 group">
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/muse" className="btn-ghost px-8 py-4 text-base flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              Talk to Muse
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm" style={{ color: "var(--land-subtext)", opacity: 0.55 }}>
            <span>✓ Free forever plan</span>
            <span className="hidden sm:block">·</span>
            <span>✓ Cancel anytime</span>
            <span className="hidden sm:block">·</span>
            <span>✓ Private & encrypted</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
