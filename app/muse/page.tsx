"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MuseChat from "@/components/common/MuseChat";
import ThemeToggle from "@/components/common/ThemeToggle";
import Sidebar from "@/components/common/Sidebar";
import { Menu, MessageCircle, FileText, LayoutDashboard } from "lucide-react";

export default function MusePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/sign-in");
      } else {
        setUserId(data.session.user.id);
      }
    });
  }, [router]);

  if (!userId) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Loading Muse…
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar (desktop fixed + mobile drawer) */}
      <Sidebar
        navigationItems={[
          { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
          { icon: MessageCircle, label: "Muse", href: "/muse" },
          { icon: FileText, label: "New Entry", href: "/dashboard" },
        ]}
        userEmail={""}
        onEntrySelect={() => {}}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <div className="px-3 md:px-6 py-3 md:py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger — mobile only */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden flex-shrink-0 p-1.5 rounded-lg hover:bg-accent transition-colors text-foreground"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-base md:text-lg font-semibold leading-tight">Muse</h1>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  A calm space to reflect, explore, and feel heard.
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-hidden">
          <MuseChat userId={userId} />
        </div>
      </div>
    </div>
  );
}
