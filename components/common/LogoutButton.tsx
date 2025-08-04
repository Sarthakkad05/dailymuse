// components/LogoutButton.tsx
"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/sign-in")
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </button>
  )
}
