"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Twitter, Github, Instagram } from "lucide-react";

const links = {
  Product: ["Features", "How It Works", "Muse AI", "Pricing"],
  Company:  ["About", "Blog", "Careers", "Press"],
  Legal:    ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden" style={{ borderTop: "1px solid var(--land-glass-border)" }}>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(124,58,237,0.06)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5 mb-4"
            >
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg" style={{ color: "var(--land-text)" }}>DailyMuse</span>
            </motion.div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "var(--land-subtext)" }}>
              Your AI-powered companion for reflection, emotional clarity, and daily growth.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Twitter,   href: "#", label: "Twitter"   },
                { Icon: Github,    href: "#", label: "GitHub"    },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center border border-violet-500/15 hover:border-violet-500/35 transition-all"
                  style={{ color: "var(--land-subtext)" }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p
                className="text-xs uppercase tracking-widest font-medium mb-4"
                style={{ color: "var(--land-subtext)", opacity: 0.45 }}
              >
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm transition-colors hover:text-violet-600 dark:hover:text-violet-400"
                      style={{ color: "var(--land-subtext)" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="fade-sep mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--land-subtext)", opacity: 0.45 }}>
          <p>© 2025 DailyMuse. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-fuchsia-500">♥</span> for reflective minds
          </p>
        </div>
      </div>
    </footer>
  );
}
