"use client"

import { Sparkles, User, FileText, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface NavigationItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

interface JournalEntry {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

interface SidebarProps {
  navigationItems: NavigationItem[]
  userEmail: string
  onEntrySelect?: (entry: JournalEntry) => void
}

export default function Sidebar({ 
  navigationItems,
  userEmail,
  onEntrySelect
}: SidebarProps) {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJournalEntries()
  }, [])

  const fetchJournalEntries = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        return
      }

      const { data, error } = await supabase
        .from("Journal")
        .select("id, title, content, created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(5) // Show only the 10 most recent entries

      if (error) {
        console.error("Error fetching journal entries:", error)
        return
      }

      setJournalEntries(data as JournalEntry[])
    } catch (error) {
      console.error("Error fetching journal entries:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })
  }

  const truncateTitle = (title: string) => {
    return title.length > 30 ? title.substring(0, 30) + "..." : title
  }

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/*Logo*/}
      <div className="flex items-center gap-3 p-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-sidebar-foreground">DailyMuse</h1>
          <p className="text-xs text-muted-foreground">Mental Clarity</p>
        </div>
      </div>
      
      {/*NavBar*/}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, itemIndex) => {
          const IconComponent = item.icon
          return (
            <a 
              key={itemIndex}
              href={item.href} 
              className="flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
            >
              <IconComponent className="w-4 h-4" />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>

      {/*My List Section*/}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-sidebar-foreground" />
          <h3 className="text-sm font-semibold text-sidebar-foreground">My List</h3>
        </div>
        
        {loading ? (
          <div className="text-xs text-muted-foreground">Loading entries...</div>
        ) : journalEntries.length === 0 ? (
          <div className="text-xs text-muted-foreground">No entries yet</div>
        ) : (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {journalEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onEntrySelect?.(entry)}
                className="w-full text-left p-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {entry.content.substring(0, 50)}...
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.created_at)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/*bottomBar*/}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-medium text-sidebar-foreground">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 