"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ErrorContent() {
  const params = useSearchParams();
  const error = params.get("error") ?? "Something went wrong with your verification link.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">Success: Account Created Successfully, click the link below to sign in.</div>
        <Link
          href="/sign-in"
          className="w-full py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
