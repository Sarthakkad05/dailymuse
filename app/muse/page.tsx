// "use client";

// import { createClient } from "@/lib/supabase/client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import MuseChat from "@/components/common/MuseChat";

// export default function MusePage() {
//   const [userId, setUserId] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const supabase = createClient();
//     supabase.auth.getSession().then(({ data }) => {
//       if (!data.session) {
//         router.push("/sign-in");
//       } else {
//         setUserId(data.session.user.id);
//       }
//     });
//   }, [router]);

//   if (!userId) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading Muse…
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       <div className="flex-1 flex flex-col max-w-3xl mx-auto">
//         <div className="border-b px-6 py-4">
//           <h1 className="text-lg font-semibold">Muse</h1>
//           <p className="text-sm text-muted-foreground">
//             A calm space to reflect and talk.
//           </p>
//         </div>

//         <div className="flex-1 overflow-hidden">
//           <MuseChat userId={userId} />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MuseChat from "@/components/common/MuseChat";
import ThemeToggle from "@/components/common/ThemeToggle";
import Sidebar from "@/components/common/Sidebar";
import { MessageCircle, FileText, LayoutDashboard } from "lucide-react";
export default function MusePage() {
  const [userId, setUserId] = useState<string | null>(null);
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
    <div className="flex h-screen bg-background">
      {/* LEFT SIDEBAR */}
      <Sidebar
        navigationItems={[
          { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
          { icon: MessageCircle, label: "Muse", href: "/muse" },
          { icon: FileText, label: "New Entry", href: "/dashboard" },
        ]}
        userEmail={"test@test.com"}
        onEntrySelect={() => {}}
      />
  
      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col w-full mx-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Muse</h1>
              <p className="text-sm text-muted-foreground">
                A calm space to reflect, explore, and feel heard.
              </p>
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
