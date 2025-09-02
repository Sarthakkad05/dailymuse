"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/components/common/Sidebar"
import { Brain, MessageCircle, Target, Calendar, Home, FileText} from "lucide-react"
import TopBar from "@/components/common/TopBar"
import WritingArea from "@/components/common/WritingArea"
import { getGeminiInsight } from "@/lib/gemini/getInsights"
import InsightModal from "@/components/common/InsightModal"
import  MuseChat  from "@/components/common/MuseChat"


interface JournalEntry {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export default function Dashboard() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [isViewing, setIsViewing] = useState(false)
  const [isInsightModalOpen, setIsInsightModalOpen] = useState(false)
  const [insight, setInsight] = useState("")
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/sign-in")
        return
      }
      setSession(session)
      setLoading(false)
    }
    getSession()
  }, [router])

  const handleSave = async () => {
    if (!content.trim()) {
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
      return
    }

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      const supabase = createClient()

      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        throw new Error("User not authenticated")
      }

      const geminiInsight = await getGeminiInsight(content)

      setInsight(geminiInsight)
      setIsInsightModalOpen(true)

      // Insert the journal entry
      const { data, error } = await supabase
        .from("Journal")
        .insert({
          user_id: session.user.id,
          content: content.trim(),
          title: content.trim().split('\n')[0].slice(0, 10) || "Untitled Entry", // Use first line as title
          insight: geminiInsight
        })
        .select()

      if (error) {
        console.error("Error saving journal:", error)
        throw error
      }

      setSaveStatus("success")
      setContent("") // Clear the textarea after successful save
      setSelectedEntry(null) // Clear selected entry
      setIsViewing(false) // Exit viewing mode
      
      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
      
    } catch (error) {
      console.error("Error saving journal:", error)
      setSaveStatus("error")
      
      // Reset error status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEntrySelect = (entry: JournalEntry) => {
    setSelectedEntry(entry)
    setContent(entry.content)
    setIsViewing(true)
  }

  const handleNewEntry = () => {
    setSelectedEntry(null)
    setContent("")
    setIsViewing(false)
  }

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: MessageCircle, label: "Chat with Muse", href: "#" },
    { icon: FileText, label: "New Entry", href: "/dashboard" },
  ]

  if (loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        navigationItems={navigationItems}
        userEmail={session?.user?.email || ""}
        onEntrySelect={handleEntrySelect}
      />
      <div className="flex-1 flex flex-col">
        <TopBar 
          onSave={handleSave}
          isSaving={isSaving}
          saveStatus={saveStatus}
        />
        <div className="flex-1 flex flex-col">
          {isViewing && selectedEntry ? (
            <div className="flex-1 bg-background flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <div>
                  <p className="text-sm text-muted-foreground">
                  {new Date(selectedEntry.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleNewEntry}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  New Entry
                </button>
              </div>
              <div className="flex-1 p-8">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {selectedEntry.content}
                </div>
              </div>
            </div>
          ) : (
            <WritingArea 
              content={content}
              onContentChange={setContent}
              onSave={handleSave}
            />
          )}
          <InsightModal 
            isOpen={isInsightModalOpen}
            onClose={() => setIsInsightModalOpen(false)}
            insight={insight}
          />
        </div>
        {/* <MuseChat userId={session?.user?.id} /> */}
      </div>

    </div>
  )
}
