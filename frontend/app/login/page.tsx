"use client";

import { useGuestAuth } from "@/hooks/useGuestAuth";

export default function LoginPage() {
  const {
    authenticated,
    continueAsGuest,
  } = useGuestAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <section className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            A
          </div>

          <span className="text-sm font-semibold">
            AbleSpace
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
          <div className="text-center">
            <h1 className="text-lg font-semibold">
              Let&apos;s get back on track
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Continue as a guest to access your workspace.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={continueAsGuest}
              disabled={authenticated === null}
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {authenticated === null
                ? "Loading..."
                : "Continue as Guest"}
            </button>

            <button
              type="button"
              disabled
              title="Google Login is not configured"
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground opacity-70"
            >
              <span className="font-semibold">
                G
              </span>

              <span>Login with Google</span>

              <span className="text-xs">
                (Soon)
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
            By continuing, you agree to use this
            workspace as a guest.
          </p>
        </div>
      </section>
    </main>
  );
}