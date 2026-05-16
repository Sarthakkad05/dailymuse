import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * OAuth callback handler.
 *
 * After Google redirects back, Supabase appends a `code` query param.
 * This route exchanges it for a session cookie, then sends the user to /dashboard.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    return NextResponse.redirect(
      `${origin}/auth/auth-error?error=${encodeURIComponent(error.message)}`
    )
  }

  // No code — something went wrong with the OAuth flow
  return NextResponse.redirect(
    `${origin}/auth/auth-error?error=No+authorization+code+returned`
  )
}
