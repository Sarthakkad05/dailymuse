"use client"

interface WritingAreaProps {
  onSave: (content: string) => Promise<void>
  content: string
  onContentChange: (content: string) => void
}

export default function WritingArea({ onSave, content, onContentChange }: WritingAreaProps) {
  return (
    <div className="flex-1 bg-background">
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full h-full resize-none border-none outline-none bg-transparent text-foreground text-lg leading-relaxed p-8 placeholder:text-muted-foreground"
        placeholder="Start writing your thoughts here... 

                You can write about:
                • How you're feeling today
                • What you're grateful for
                • Your goals and aspirations
                • Challenges you're facing
                • Moments of joy or growth

                Let your thoughts flow naturally..."
      />
    </div>
  )
}