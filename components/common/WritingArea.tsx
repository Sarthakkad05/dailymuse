"use client"

import { reflectiveQuestions } from "@/lib/gemini/reflectiveQuestions"
import { useState, useEffect, useRef } from "react"

interface WritingAreaProps {
  onSave: (content: string) => Promise<void>
  content: string
  onContentChange: (content: string) => void
}

export default function WritingArea({ onSave, content, onContentChange}: WritingAreaProps) {
  const [reflectiveQuestion, setReflectiveQuestion] = useState("")
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
  
    const fetchReflectiveQuestion = async () => {
      const question = await reflectiveQuestions()
      setReflectiveQuestion(question)
    }
    fetchReflectiveQuestion();

  }, [])

  return (
    <div className="flex-1 bg-background">
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full h-full resize-none border-none outline-none bg-transparent text-foreground text-lg leading-relaxed p-8 placeholder:text-muted-foreground"
        placeholder={reflectiveQuestion}
      />
    </div>
  )
}