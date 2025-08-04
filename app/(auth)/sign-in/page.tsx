'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSignIn} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/sign-up" className="underline text-blue-600">Sign up</a>
        </p>
      </form>
      <div className="text-center text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg max-w-sm">
        <p>📧 New users: Check your email and click the confirmation link after signing up!</p>
      </div>
    </div>
  )
}
