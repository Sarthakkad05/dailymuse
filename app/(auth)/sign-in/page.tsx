'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import GoogleButton from '@/components/auth/GoogleButton'
import Link from 'next/link'

export default function SignIn() {
  const [showEmail, setShowEmail] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Signed in!')
      router.push('/dashboard')
    }
  }

  return (
    <div className="landing-root min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background orbs */}
      <div className="orb absolute w-[400px] h-[400px] -top-24 -right-24 pointer-events-none" />
      <div className="orb orb-slow absolute w-[300px] h-[300px] -bottom-16 -left-16 pointer-events-none" />

      <div className="w-full max-w-[380px] relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-8 group w-fit mx-auto">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="text-lg font-bold" style={{ color: 'var(--land-text)' }}>DailyMuse</span>
        </Link>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8 space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-xl font-semibold" style={{ color: 'var(--land-text)' }}>Welcome back</h1>
            <p className="text-sm" style={{ color: 'var(--land-subtext)' }}>Sign in to continue</p>
          </div>

          <GoogleButton />

          {/* Email section */}
          <div className="text-center">
            {!showEmail ? (
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="text-xs transition-colors hover:opacity-80"
                style={{ color: 'var(--land-subtext)' }}
              >
                Sign in with email instead
              </button>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-3 text-left">
                <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                <Button type="submit" variant="outline" className="w-full">Sign in with Email</Button>
                <button type="button" onClick={() => setShowEmail(false)} className="w-full text-xs text-center" style={{ color: 'var(--land-subtext)' }}>← Back</button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm mt-6" style={{ color: 'var(--land-subtext)' }}>
          No account?{' '}
          <Link href="/sign-up" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--land-text)' }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
