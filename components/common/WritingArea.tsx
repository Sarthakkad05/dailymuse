"use client";

import { useEffect, useRef, useState } from "react";

interface WritingAreaProps {
  userId: string;
  onSave: (content: string) => Promise<void>;
  content: string;
  onContentChange: (content: string) => void;
}

export default function WritingArea({
  userId,
  onSave,
  content,
  onContentChange,
}: WritingAreaProps) {
  const [reflectiveQuestion, setReflectiveQuestion] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchReflectiveQuestion = async () => {
      try {
        const res = await fetch("/api/reflective", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          },
          body: JSON.stringify({ userId }),
        });
    
        const data = await res.json();
        setReflectiveQuestion(data.message);
      } catch {
        setReflectiveQuestion(
          "What’s one small moment today that quietly shaped how you’re feeling?"
        );
      }
    };

    fetchReflectiveQuestion();
  }, []);

  return (
    <div className="flex-1 h-full bg-background">
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="
          w-full h-full
          resize-none
          border-none outline-none
          bg-transparent
          text-foreground
          text-lg
          leading-relaxed
          p-8
          placeholder:text-muted-foreground
        "
        placeholder={reflectiveQuestion}
      />
    </div>
  );
}
