"use client";

import Link from "next/link";
import {
  Brain,
  MessageCircle,
  Target,
  TrendingUp,
  Sparkles,
  BookOpen,
  Heart,
} from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-sidebar backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">DailyMuse</h1>
            </div>
            <div className="flex gap-4 items-center">
              <ThemeToggle />
              <Link
                href="/sign-in"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Your AI-Powered{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Mental Clarity
            </span>{" "}
            Companion
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            DailyMuse helps you organize thoughts, improve productivity, and
            build healthier routines with AI-powered journaling, habit coaching,
            and emotional intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-md"
            >
              Start Your Journey
            </Link>
            <Link
              href="/sign-in"
              className="bg-sidebar text-foreground px-8 py-4 rounded-lg text-lg font-semibold border border-border hover:bg-accent transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="bg-sidebar">
      <section className= "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything you need for mental clarity
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to help you thrive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Mental Clarity & Journaling",
              desc: "Daily guided journaling prompts with AI insights. Reflect on your thoughts and emotions with intelligent assistance.",
              color: "from-purple-500 to-pink-500",
              items: [
                "Voice or text entry for logs",
                "Mood/emotion tagging",
                "Timeline view of your journey",
              ],
            },
            {
              icon: Target,
              title: "AI Habit Coach",
              desc: "Personalized habit suggestions based on your goals. Smart reminders and streak tracking to keep you motivated.",
              color: "from-blue-500 to-cyan-500",
              items: [
                "Personalized habit suggestions",
                "Smart reminders & streak tracking",
                "Weekly progress insights",
              ],
            },
            {
              icon: MessageCircle,
              title: "Chat with Muse",
              desc: "Your AI assistant for emotional check-ins and goal-based conversations. Set intentions and track progress naturally.",
              color: "from-green-500 to-emerald-500",
              items: [
                "Natural conversation interface",
                "Emotional check-ins",
                "Goal-based conversations",
              ],
            },
            {
              icon: TrendingUp,
              title: "Dashboard & Insights",
              desc: "Comprehensive overview of your daily mood, habits, and tasks. Visualize your progress and patterns.",
              color: "from-orange-500 to-red-500",
              items: [
                "Daily mood tracking",
                "Habit & task overview",
                "Progress visualizations",
              ],
            },
            {
              icon: BookOpen,
              title: "Notion Integration",
              desc: "Sync your notes, logs, and habit data to Notion. Embed Notion pages as custom dashboards.",
              color: "from-indigo-500 to-purple-500",
              items: [
                "Sync selected data to Notion",
                "Embed Notion pages",
                "Custom dashboard creation",
              ],
            },
            {
              icon: Heart,
              title: "Emotional Intelligence",
              desc: "AI-powered emotional intelligence with personalized responses and behavioral nudges for better mental health.",
              color: "from-pink-500 to-rose-500",
              items: ["AI emotional responses", "Behavioral nudges", "Personalization"],
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4">{feature.desc}</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                {feature.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      </div>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-12 text-center shadow-md">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your mental clarity?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their productivity, mental
            health, and overall well-being with DailyMuse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all shadow-sm"
            >
              Start Free Today
            </Link>
            <Link
              href="/sign-in"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">DailyMuse</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Your AI-powered mental clarity companion
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
