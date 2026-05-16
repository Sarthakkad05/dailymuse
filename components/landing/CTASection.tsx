"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-8 border border-black/10 dark:border-white/10">
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--land-subtext)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--land-subtext)' }}>Free to start · No credit card required</span>
          </div>

          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
            style={{ color: "var(--land-text)" }}
          >
            Start understanding{" "}
            <br />
            <span>yourself better.</span>
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
