"use client"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown";

interface InsightModalProps {
  isOpen: boolean
  onClose: () => void
  insight: string
}

export default function InsightModal({ isOpen, onClose, insight }: InsightModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-background p-6 rounded-xl shadow-xl w-full relative max-w-4xl">
        <h2 className="text-lg font-semibold text-foreground mb-2">Insights from your journal</h2>
        
        <div className="text-sm text-muted-foreground whitespace-pre-wrap "><ReactMarkdown >{insight}</ReactMarkdown></div>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-muted-foreground hover:text-foreground transition"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
