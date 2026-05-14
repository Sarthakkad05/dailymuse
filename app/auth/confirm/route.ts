import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase email confirmation callback.
 *
 * Supabase sends users here after they click the verification link in their
 * email. The URL looks like:
 *   https://yourdomain.com/auth/confirm?token_hash=<hash>&type=signup&next=/sign-in
 *
 * This route:
 *  1. Exchanges the one-time token for a valid session (verifyOtp)
 *  2. On success → redirects to /sign-in (or the `next` param if present)
 *  3. On failure → redirects to /auth/auth-error with an error message
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as
    | "signup"
    | "invite"
    | "magiclink"
    | "recovery"
    | "email_change"
    | null;
  const next = searchParams.get("next") ?? "/sign-in";

  // If token or type is missing, something is wrong with the link
  if (!token_hash || !type) {
    return NextResponse.redirect(
      `${origin}/auth/auth-error?error=Missing+token+or+type`
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    // Token expired, already used, or invalid
    return NextResponse.redirect(
      `${origin}/auth/auth-error?error=${encodeURIComponent(error.message)}`
    );
  }

  // Email confirmed successfully — send to sign-in page
  return NextResponse.redirect(`${origin}${next}`);
}
