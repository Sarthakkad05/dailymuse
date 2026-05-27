"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Loader2 } from "lucide-react";

interface WritingAreaProps {
  userId: string;
  onSave: (content: string) => Promise<void>;
  content: string;
  onContentChange: (content: string) => void;
}

export default function WritingArea({
  userId,
  content,
  onContentChange,
}: WritingAreaProps) {
  const [reflectiveQuestion, setReflectiveQuestion] = useState("");
  const hasFetched = useRef(false);

  // STT State
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
  }, [userId]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await handleTranscribe(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscribe = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      // Whisper expects a filename with a recognized extension
      formData.append("file", audioBlob, "recording.webm");

      const res = await fetch("/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const newText = data.text;
        if (newText) {
          onContentChange(content ? `${content} ${newText}` : newText);
        }
      } else {
        console.error("Transcription failed", await res.text());
        alert("Failed to transcribe audio.");
      }
    } catch (error) {
      console.error("Transcription error:", error);
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="flex-1 h-full bg-background relative flex flex-col">
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="
          flex-1 w-full
          resize-none
          border-none outline-none
          bg-transparent
          text-foreground
          text-base md:text-lg
          leading-relaxed
          p-4 md:p-8 pb-24
          placeholder:text-muted-foreground
        "
        placeholder={reflectiveQuestion}
      />

      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex items-center gap-3 md:gap-4">
        {isTranscribing && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            Transcribing...
          </div>
        )}
        
        {!isTranscribing && (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`
              p-4 rounded-full shadow-lg transition-all flex items-center justify-center
              ${isRecording 
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"}
            `}
          >
            {isRecording ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" />}
          </button>
        )}
      </div>
    </div>
  );
}
