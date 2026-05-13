"use client";

import { motion } from "framer-motion";
import { PenLine, Brain, Lightbulb, Repeat2 } from "lucide-react";

const steps = [
  {
    number: "01", icon: PenLine, title: "Write your thoughts",
    desc: "Open DailyMuse and write freely — no pressure, no rules. Use voice or text. Let it flow.",
    color: "text-violet-600 dark:text-violet-400", glow: "rgba(124,58,237,0.25)", border: "border-violet-500/25",
  },
  {
    number: "02", icon: Brain, title: "Muse analyzes emotions",
    desc: "Our AI reads between the lines — understanding sentiment, tone, patterns, and emotional signals.",
    color: "text-blue-600 dark:text-blue-400", glow: "rgba(37,99,235,0.25)", border: "border-blue-500/25",
  },
  {
    number: "03", icon: Lightbulb, title: "Get personalized insights",
    desc: "Receive weekly emotional summaries, behavioral patterns, and gentle nudges from Muse.",
    color: "text-fuchsia-600 dark:text-fuchsia-400", glow: "rgba(192,38,211,0.25)", border: "border-fuchsia-500/25",
  },
  {
    number: "04", icon: Repeat2, title: "Build mental habits",
    desc: "DailyMuse helps you build a ritual of reflection that compounds into lasting clarity and growth.",
    color: "text-emerald-600 dark:text-emerald-400", glow: "rgba(5,150,105,0.25)", border: "border-emerald-500/25",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-violet-600/8 via-blue-600/6 to-fuchsia-600/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-[0.2em] font-medium mb-4 block">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--land-text)" }}>
            Four steps to{" "}
            <span className="grad-text">mental clarity</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--land-subtext)" }}>
            Simple enough to start today. Deep enough to transform over time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px">
            <div className="h-full bg-gradient-to-r from-violet-500/30 via-blue-500/30 to-fuchsia-500/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className={`relative w-20 h-20 rounded-2xl glass border ${step.border} flex items-center justify-center mb-6 z-10`}
                  style={{ boxShadow: `0 0 30px ${step.glow}` }}
                >
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                  <span
                    className="absolute -top-2 -right-2 text-[10px] font-bold glass rounded-full w-6 h-6 flex items-center justify-center border border-black/10 dark:border-white/10"
                    style={{ color: "var(--land-subtext)" }}
                  >
                    {step.number.slice(-1)}
                  </span>
                </motion.div>

                <span className={`text-xs font-bold ${step.color} opacity-60 mb-2 tracking-widest uppercase`}>
                  Step {step.number}
                </span>
                <h3 className="text-base font-semibold mb-3" style={{ color: "var(--land-text)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--land-subtext)" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
