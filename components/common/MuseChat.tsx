"use client"

import { useState, useRef, useEffect } from "react"
import { SendHorizonal } from "lucide-react"
import { getMuseReply } from "@/lib/gemini/muse"
import ReactMarkdown from "react-markdown"

export default function MuseChat({ userId }: { userId: string }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ from: "user" | "muse"; text: string }[]>([])
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async () => {
    if (!input.trim()) return
    const userText = input.trim()
    setMessages(prev => [...prev, { from: "user", text: userText }])
    setInput("")
    setLoading(true)

    try {
      const museReply = await getMuseReply(userText, userId)
      setMessages(prev => [...prev, { from: "muse", text: museReply }])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { from: "muse", text: "Muse is currently unavailable. Please try again later." },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        expanded &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [expanded])

  // Focus input on expand
  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [expanded])

  return (
    <div ref={containerRef} className="fixed bottom-4 center w-[1000px] z-50 ml-4">
      <div
        className={`transition-all duration-300 shadow-md rounded-2xl py-1 px-4 border
        ${expanded ? "h-[600px]" : "h-[48px]"} overflow-hidden flex flex-col
        bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-neutral-700`}
      >
      {expanded && (
          <div className="flex-1 overflow-y-auto space-y-2 p-4 mb-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm whitespace-pre-wrap transition-colors duration-200
                ${msg.from === "user"
                    ? "bg-blue-100 text-black self-end dark:bg-blue-500 dark:text-white rounded-lg inline-block max-w-[80%] py-2 px-5"
                    : "bg-gray-100 text-black self-start dark:bg-neutral-800 dark:text-white rounded-lg p-5"
                  }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && <div className="text-xs text-muted-foreground">Muse is thinking...</div>}
          </div>
        )} 
        <div className="flex items-center gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            placeholder="Talk to Muse..."
            className="flex-1 resize-none outline-none text-sm p-2 bg-transparent text-black dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
            value={input}
            onChange={e => {
              setInput(e.target.value)
              if (!expanded) setExpanded(true)
            }}
            onFocus={() => setExpanded(true)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="p-1 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <SendHorizonal size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
