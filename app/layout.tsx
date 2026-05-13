import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DailyMuse — AI-Powered Journaling & Emotional Clarity",
  description:
    "Turn chaotic thoughts into clarity. DailyMuse is your AI-powered companion for reflection, emotional intelligence, mood tracking, and daily mental growth.",
  keywords: ["AI journaling", "emotional intelligence", "mental clarity", "mood tracking", "Muse AI", "self-reflection"],
  openGraph: {
    title: "DailyMuse — AI-Powered Journaling & Emotional Clarity",
    description: "Your second brain for emotional clarity. Journal, reflect, and grow with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
