"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

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

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    // push user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    const res = await fetch("/api/muse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, userId }),
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
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 max-w-4xl mx-auto w-full space-y-6">
        {messages.map((m, i) => (
          <div key={i}>
            {/* USER MESSAGE — RIGHT */}
            {m.role === "user" && (
              <div className="flex justify-end">
                <div className="max-w-[75%] text-sm leading-relaxed bg-primary text-primary-foreground rounded-2xl px-4 py-3">
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
      <div className="bg-background px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-sidebar border rounded-full px-4 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Talk to Muse…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={sendMessage}
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
