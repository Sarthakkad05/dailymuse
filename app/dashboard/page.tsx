"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import { Home, FileText } from "lucide-react";
import TopBar from "@/components/common/TopBar";
import WritingArea from "@/components/common/WritingArea";
import InsightModal from "@/components/common/InsightModal";
import { MessageCircle } from "lucide-react";

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
  const [saveStatus, setSaveStatus] =
    useState<"idle" | "success" | "error">("idle");
  const [selectedEntry, setSelectedEntry] =
    useState<JournalEntry | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isInsightModalOpen, setIsInsightModalOpen] = useState(false);
  const [insight, setInsight] = useState("");

  const router = useRouter();

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

  const handleSave = async () => {
    if (!content.trim()) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          journalText: content.trim(),
          userId: session.user.id,
        }),
      });

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();

      setInsight(data.insight);
      setIsInsightModalOpen(true);

      setContent("");
      setSelectedEntry(null);
      setIsViewing(false);

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
    setIsViewing(true);
  };

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setContent("");
    setIsViewing(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        navigationItems={[
          { icon: MessageCircle, label: "Muse", href: "/muse" },
          { icon: FileText, label: "New Entry", href: "/dashboard" },
        ]}
        userEmail={session.user.email}
        onEntrySelect={handleEntrySelect}
      />

      <div className="flex-1 flex flex-col">
        <TopBar
          onSave={handleSave}
          isSaving={isSaving}
          saveStatus={saveStatus}
        />

        <div className="flex-1">
          {isViewing && selectedEntry ? (
            <div className="p-6 whitespace-pre-wrap">
              <div className="mb-4 text-sm text-muted-foreground">
                {new Date(selectedEntry.created_at).toLocaleString()}
              </div>

              <div>{selectedEntry.content}</div>

              <button
                onClick={handleNewEntry}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground"
              >
                New Entry
              </button>
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

      </div>
    </div>
  );
}
