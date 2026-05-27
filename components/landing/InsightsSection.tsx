"use client";

import { motion } from "framer-motion";
import { TrendingDown, Calendar, Sun, Sparkles } from "lucide-react";

const insightCards = [
  {
    icon: TrendingDown, label: "Stress Pattern",
    title: "Before deadlines, your stress peaks — but journaling reduces it by 34%.",
    sub: "Detected over 6 weeks of entries",
    color: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20",
    glow: "rgba(37,99,235,0.08)", bar: [60,85,70,90,50,65,40], barColor: "from-blue-500 to-violet-500",
  },
  {
    icon: Sun, label: "Morning Ritual",
    title: "Your entries before 9am are 2x more positive and insightful.",
    sub: "Pattern from your last 30 journals",
    color: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20",
    glow: "rgba(217,119,6,0.08)", bar: [30,55,80,75,90,85,95], barColor: "from-amber-500 to-orange-400",
  },
  {
    icon: Calendar, label: "Weekly Arc",
    title: "You tend to feel most reflective on Thursdays and most energized on Mondays.",
    sub: "Your 12-week emotional calendar",
    color: "text-fuchsia-600 dark:text-fuchsia-400", border: "border-fuchsia-500/20",
    glow: "rgba(192,38,211,0.08)", bar: [70,50,60,90,55,40,65], barColor: "from-fuchsia-500 to-pink-500",
  },
];

export default function InsightsSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-900/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-600/5 dark:bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-[0.2em] font-medium mb-4 block">AI Insights</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--land-text)" }}>
            Your emotions,{" "}
            <span className="grad-text">decoded</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--land-subtext)" }}>
            DailyMuse doesn&apos;t just store your thoughts — it understands them.
            Every entry becomes a data point in your personal emotional map.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {insightCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-5 border ${card.border} transition-all duration-300`}
              style={{ background: `radial-gradient(ellipse at top, ${card.glow}, transparent 70%), var(--land-glass-bg)` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <card.icon className={`w-4 h-4 ${card.color}`} />
                <span className={`text-xs font-medium uppercase tracking-wider ${card.color}`}>{card.label}</span>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--land-text)" }}>{card.title}</p>
              <div className="flex items-end gap-1 h-10 mb-3">
                {card.bar.map((h, j) => (
                  <motion.div
                    key={j}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + j * 0.05 }}
                    className={`flex-1 rounded-t bg-gradient-to-t ${card.barColor} opacity-70`}
                  />
                ))}
              </div>
              <p className="text-[11px]" style={{ color: "var(--land-subtext)" }}>{card.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Big callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="glass-strong rounded-3xl p-8 border border-violet-500/15 text-center glow-purple"
        >
          <Sparkles className="w-8 h-8 text-violet-600 dark:text-violet-400 mx-auto mb-4" />
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light" style={{ color: "var(--land-subtext)" }}>
            &ldquo;You tend to feel overwhelmed before deadlines &mdash;{" "}
            <span className="font-medium" style={{ color: "var(--land-text)" }}>
              but journaling consistently reduces your stress levels
            </span>{" "}
            within 48 hours. You&apos;re getting better at this.&rdquo;
          </p>
          <p className="mt-4 text-sm" style={{ color: "var(--land-subtext)", opacity: 0.6 }}>
            — From your Muse Weekly Summary
          </p>
        </motion.div>
      </div>
    </section>
  );
}
