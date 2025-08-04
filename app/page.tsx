import Link from "next/link";
import { Brain, MessageCircle, Target, TrendingUp, Sparkles, BookOpen, Heart } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DailyMuse</h1>
            </div>
            <div className="flex gap-4 items-center">
              <ThemeToggle />
              <Link
                href="/sign-in"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your AI-Powered
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"> Mental Clarity</span>
            <br />Companion
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            DailyMuse helps you organize thoughts, improve productivity, and build healthier routines 
            with AI-powered journaling, habit coaching, and emotional intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg"
            >
              Start Your Journey
            </Link>
            <Link
              href="/sign-in"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need for mental clarity
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Powerful features designed to help you thrive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mental Clarity & Journaling */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mental Clarity & Journaling</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Daily guided journaling prompts with AI insights. Reflect on your thoughts and emotions with intelligent assistance.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Voice or text entry for logs</li>
              <li>• Mood/emotion tagging</li>
              <li>• Timeline view of your journey</li>
            </ul>
          </div>

          {/* AI Habit Coach */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AI Habit Coach</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Personalized habit suggestions based on your goals. Smart reminders and streak tracking to keep you motivated.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Personalized habit suggestions</li>
              <li>• Smart reminders & streak tracking</li>
              <li>• Weekly progress insights</li>
            </ul>
          </div>

          {/* Chat with Muse */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Chat with Muse</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your AI assistant for emotional check-ins and goal-based conversations. Set intentions and track progress naturally.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Natural conversation interface</li>
              <li>• Emotional check-ins</li>
              <li>• Goal-based conversations</li>
            </ul>
          </div>

          {/* Dashboard & Insights */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dashboard & Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Comprehensive overview of your daily mood, habits, and tasks. Visualize your progress and patterns.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Daily mood tracking</li>
              <li>• Habit & task overview</li>
              <li>• Progress visualizations</li>
            </ul>
          </div>

          {/* Notion Integration */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Notion Integration</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sync your notes, logs, and habit data to Notion. Embed Notion pages as custom dashboards.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Sync selected data to Notion</li>
              <li>• Embed Notion pages</li>
              <li>• Custom dashboard creation</li>
            </ul>
          </div>

          {/* Emotional Intelligence */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Emotional Intelligence</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AI-powered emotional intelligence with personalized responses and behavioral nudges for better mental health.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• AI emotional responses</li>
              <li>• Behavioral nudges</li>
              <li>• Personalization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your mental clarity?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their productivity, mental health, and overall well-being with DailyMuse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all"
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">DailyMuse</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Your AI-powered mental clarity companion
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
