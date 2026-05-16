"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

const navLinks = [
  { label: "Features",     href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Muse AI",      href: "#muse-ai" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div
          className={`w-full max-w-5xl rounded-2xl transition-all duration-500 ${
            scrolled ? "glass-strong shadow-2xl shadow-black/10 dark:shadow-black/40" : "glass"
          }`}
          style={{ borderColor: "rgba(124,58,237,0.15)" }}
        >
          <div className="flex items-center justify-between px-5 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="relative w-7 h-7 rounded-lg glass border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--land-subtext)' }} />
                </div>
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ color: "var(--land-text)" }}
              >
                DailyMuse
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm rounded-lg transition-all duration-200"
                  style={{ color: "var(--land-subtext)" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--land-text)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--land-subtext)")
                  }
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA + Theme Toggle */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm transition-colors"
                style={{ color: "var(--land-subtext)" }}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="btn-primary px-5 py-2 text-sm relative z-10"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 transition-colors rounded-lg"
                style={{ color: "var(--land-subtext)" }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-4 right-4 z-40 glass-strong rounded-2xl p-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="w-full text-left px-4 py-3 rounded-xl transition-all"
                style={{ color: "var(--land-subtext)" }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-black/[0.06] dark:border-white/10">
              <Link
                href="/sign-in"
                className="flex-1 text-center py-2.5 text-sm glass rounded-xl transition-all"
                style={{ color: "var(--land-subtext)" }}
              >
                Sign In
              </Link>
              <Link href="/sign-up" className="flex-1 text-center py-2.5 text-sm btn-primary">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
