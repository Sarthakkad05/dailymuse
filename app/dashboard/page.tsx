"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/TopBar";
import WritingArea from "@/components/common/WritingArea";
import InsightModal from "@/components/common/InsightModal";
import { MessageCircle, FileText, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface JournalEntry {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewMode, setViewMode] = useState<"dashboard" | "writing" | "viewing">("dashboard");

  const [isInsightModalOpen, setIsInsightModalOpen] = useState(false);
  const [insight, setInsight] = useState("");

  const [dashboardStats, setDashboardStats] = useState({
    entriesCount: 0,
    streak: 0,
    latestInsight: "Loading your insights...",
    recentEntry: null as any
  });

  const router = useRouter();

  /* ---------- AUTH ---------- */
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/sign-in");
      } else {
        setSession(data.session);
        setLoading(false);
      }
    });
  }, [router]);

  /* ---------- FETCH STATS ---------- */
  const fetchDashboardStats = async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const data = await res.json();
        setDashboardStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchDashboardStats();
    }
  }, [session, viewMode]); // Refetch when going back to dashboard

  /* ---------- SAVE ---------- */
  const handleSave = async () => {
    if (!content.trim()) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const isUpdating = !!selectedEntry;
      const method = isUpdating ? "PUT" : "POST";
      const body = isUpdating 
        ? JSON.stringify({ journalText: content.trim(), userId: session.user.id, journalId: selectedEntry.id })
        : JSON.stringify({ journalText: content.trim(), userId: session.user.id });

      const res = await fetch("/api/journal", {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();

      setInsight(data.insight);
      setIsInsightModalOpen(true);

      setContent("");
      setSelectedEntry(null);
      setViewMode("dashboard");

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEntrySelect = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setContent(entry.content);
    setViewMode("viewing");
  };

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setContent("");
    setViewMode("writing");
  };

  const handleEditEntry = () => {
    setViewMode("writing");
  };

  const handleDashboard = () => {
    setViewMode("dashboard");
    setSelectedEntry(null);
    setContent("");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const userName = session?.user?.user_metadata?.full_name?.split(' ')[0] || session?.user?.email?.split('@')[0] || "there";
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        navigationItems={[
          { icon: LayoutDashboard, label: "Dashboard", onClick: handleDashboard },
          { icon: MessageCircle, label: "Muse", href: "/muse" },
          { icon: FileText, label: "New Entry", onClick: handleNewEntry },
        ]}
        userEmail={session.user.email}
        onEntrySelect={handleEntrySelect}
      />

      <div className="flex-1 flex flex-col h-full">
        {viewMode === "dashboard" && (
          <TopBar 
            title="Overview" 
            subtitle="Your journaling journey" 
            showSave={false} 
          />
        )}
        {(viewMode === "writing" || viewMode === "viewing") && (
          <TopBar
            title={viewMode === "viewing" ? "Journal Entry" : "New Entry"}
            subtitle={viewMode === "viewing" ? "Viewing past entry" : selectedEntry ? "Editing entry" : "Express your thoughts and feelings"}
            onSave={handleSave}
            isSaving={isSaving}
            saveStatus={saveStatus}
            showSave={viewMode === "writing"}
          />
        )}

        <div className="flex-1 overflow-y-auto">
          {viewMode === "dashboard" ? (
            <div className="max-w-4xl mx-auto p-8 space-y-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Good morning, {userName}</h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                  {currentDate} • {dashboardStats.streak} day streak 🔥
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="col-span-1 md:col-span-2 shadow-sm border-border">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">AI INSIGHT • TODAY</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed md:text-lg">{dashboardStats.latestInsight}</p>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-border">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">STREAK</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-serif text-foreground">{dashboardStats.streak}</p>
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-border">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">ENTRIES</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-5xl font-serif text-foreground">{dashboardStats.entriesCount}</p>
                  </CardContent>
                </Card>

                {dashboardStats.recentEntry && (
                  <Card className="col-span-1 md:col-span-2 shadow-sm border-border">
                    <CardContent className="pt-6">
                      <div className="flex gap-4 items-start">
                        <div className="text-muted-foreground font-mono text-sm whitespace-nowrap pt-0.5">
                          {new Date(dashboardStats.recentEntry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed italic line-clamp-2">
                          "{dashboardStats.recentEntry.content}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : viewMode === "viewing" && selectedEntry ? (
            <div className="h-full p-8 max-w-3xl mx-auto whitespace-pre-wrap">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  {new Date(selectedEntry.created_at).toLocaleString()}
                </div>
                <button
                  onClick={handleEditEntry}
                  className="px-4 py-2 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors"
                >
                  Edit Entry
                </button>
              </div>

              <div className="text-foreground text-lg leading-relaxed">{selectedEntry.content}</div>

              <div className="mt-8 border-t border-border pt-8">
                <button
                  onClick={handleNewEntry}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  Write New Entry
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <WritingArea
                userId={session.user.id}
                content={content}
                onContentChange={setContent}
                onSave={handleSave}
              />
            </div>
          )}
        </div>

        <InsightModal
          isOpen={isInsightModalOpen}
          onClose={() => setIsInsightModalOpen(false)}
          insight={insight}
        />
      </div>
    </div>
  );
}
