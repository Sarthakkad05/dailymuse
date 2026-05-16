'use client'

import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function GoogleButton() {
  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      toast.error(error.message)
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="glass-strong w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] glow-purple"
      style={{ color: 'var(--land-text)' }}
    >
      {/* Google "G" SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
        <path fill="#4285F4" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.1-6.1C34.46 3.04 29.54 1 24 1 14.82 1 7.07 6.48 3.69 14.23l7.1 5.52C12.5 13.36 17.79 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.73H24v8.95h12.42c-.54 2.9-2.17 5.36-4.63 7.01l7.1 5.52C43.27 37.35 46.1 31.4 46.1 24.55z"/>
        <path fill="#FBBC05" d="M10.79 28.25A14.54 14.54 0 0 1 9.5 24c0-1.48.25-2.91.69-4.25l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.86.92 7.5 2.54 10.73l8.25-6.48z"/>
        <path fill="#EA4335" d="M24 47c5.54 0 10.19-1.84 13.59-4.99l-7.1-5.52C28.74 38.02 26.48 38.5 24 38.5c-6.21 0-11.5-3.86-13.21-9.25l-8.25 6.48C6.07 43.52 14.43 47 24 47z"/>
      </svg>
      Continue with Google
    </button>
  )
}
