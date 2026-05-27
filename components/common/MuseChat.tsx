"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Sparkles } from "lucide-react";

export default function MuseChat({ userId }: { userId: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "muse"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || loading) return;

    if (!overrideText) setInput("");
    setLoading(true);

    // push user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: textToSend },
    ]);

    const res = await fetch("/api/muse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: textToSend, userId }),
    });

    const data = await res.json();


    // push muse response
    setMessages((prev) => [
      ...prev,
      { role: "muse", text: data.reply },
    ]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 md:px-6 py-4 md:py-6 max-w-4xl mx-auto w-full space-y-6 flex flex-col">
        {messages.length === 0 && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Welcome to Muse</h2>
            <p className="text-muted-foreground text-sm">
              I'm your AI journaling companion. I'm here to listen, reflect, and help you find clarity. What's on your mind today?
            </p>
            
            <div className="grid grid-cols-1 w-full gap-3 mt-8">
              {[
                "I'm feeling a bit overwhelmed today.",
                "Help me reflect on my week.",
                "I have a big decision to make.",
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className="p-3 text-sm text-left bg-sidebar border border-border rounded-xl hover:bg-accent transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i}>
            {/* USER MESSAGE — RIGHT */}
            {m.role === "user" && (
              <div className="flex justify-end">
                <div className="max-w-[85%] md:max-w-[75%] text-sm leading-relaxed bg-primary text-primary-foreground rounded-2xl px-4 py-3">
                  {m.text}
                </div>
              </div>
            )}

            {/* MUSE MESSAGE — BELOW */}
            {m.role === "muse" && (
              <div className="mt-3">
                <div className="text-sm leading-6 text-foreground prose prose-invert max-w-none">
                  <Markdown>{m.text}</Markdown>
                </div>
              </div>
            )}

          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="mt-3 space-y-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Muse
            </div>
            <div className="text-sm text-muted-foreground">
              Thinking…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-background px-3 md:px-4 py-3 md:py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 md:gap-3 bg-sidebar border rounded-full px-3 md:px-4 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Talk to Muse…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
