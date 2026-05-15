"use client";

import { motion } from "framer-motion";
import { Star, GraduationCap, Laptop, Palette, Smile, PenTool, Rocket } from "lucide-react";

const testimonials = [
  {
    name: "Priya K.", role: "Graduate Student", avatar: GraduationCap,
    text: "DailyMuse helped me realize I was burning out weeks before I would have noticed on my own. The AI insights are eerily accurate.",
    stars: 5, gradient: "from-violet-500/8 to-purple-500/3", border: "border-violet-500/20",
  },
  {
    name: "Marcus L.", role: "Indie Developer", avatar: Laptop,
    text: "I've tried 10 journaling apps. This is the first one that actually made me *want* to journal. Muse feels like a real conversation.",
    stars: 5, gradient: "from-blue-500/8 to-cyan-500/3", border: "border-blue-500/20",
  },
  {
    name: "Sofia R.", role: "UX Designer & Creator", avatar: Palette,
    text: "The mood tracking revealed that my most creative hours are right after journaling. Changed how I structure my entire day.",
    stars: 5, gradient: "from-fuchsia-500/8 to-pink-500/3", border: "border-fuchsia-500/20",
  },
  {
    name: "Aryan M.", role: "Mental Health Advocate", avatar: Smile,
    text: "As someone who struggled with anxiety, having a judgment-free space to process thoughts daily has been genuinely life-changing.",
    stars: 5, gradient: "from-emerald-500/8 to-teal-500/3", border: "border-emerald-500/20",
  },
  {
    name: "Claire D.", role: "Content Strategist", avatar: PenTool,
    text: "The weekly AI summaries blow my mind every time. It finds patterns in my writing I never would have caught myself.",
    stars: 5, gradient: "from-amber-500/8 to-orange-500/3", border: "border-amber-500/20",
  },
  {
    name: "Ryo T.", role: "Startup Founder", avatar: Rocket,
    text: "I use it every morning. It's become as essential as coffee. The clarity it gives me before meetings is unreal.",
    stars: 5, gradient: "from-rose-500/8 to-red-500/3", border: "border-rose-500/20",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/5 dark:bg-fuchsia-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-violet-600 dark:text-violet-400 uppercase tracking-[0.2em] font-medium mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--land-text)" }}>
            Loved by deep thinkers
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--land-subtext)" }}>
            Real words from real people who found clarity through DailyMuse.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`break-inside-avoid rounded-2xl p-5 border ${t.border} bg-gradient-to-br ${t.gradient} transition-all duration-300`}
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--land-text)", opacity: 0.8 }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-lg border border-black/[0.07] dark:border-white/10 text-muted-foreground">
                  <t.avatar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--land-text)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--land-subtext)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
