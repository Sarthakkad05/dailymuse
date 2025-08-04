
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient()

    const { error, data } = await supabase.auth.signUp({ email, password })

    if (error) {
      toast.error(error.message)
    } else {
      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Account created! Please check your email and click the confirmation link to activate your account.')
        router.push('/sign-in')
      } else {
        toast.success('Account created successfully!')
        router.push('/sign-in')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <a href="/sign-in" className="underline text-blue-600">Log in</a>
        </p>
      </form>
    </div>
  )
}

