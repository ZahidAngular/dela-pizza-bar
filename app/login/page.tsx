"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Wordmark } from "@/components/Logo";
import { api, auth } from "@/lib/api";
import { site } from "@/lib/site";

const field =
  "mt-2.5 w-full border border-line bg-ink-2 px-4 py-3.5 text-[0.9rem] text-cream " +
  "placeholder:text-muted/70 transition-colors duration-300 focus:border-gold focus-visible:outline-none";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Someone already signed in has no business on the login screen.
  useEffect(() => {
    if (auth.token) router.replace("/dashboard");
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await api.login(email.trim(), password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark className="h-14" decorative />
          </Link>
        </div>

        <div className="mt-9 border border-line bg-surface p-8 md:p-10">
          <span className="block h-px w-10 bg-gold" />
          <h1 className="display mt-5 text-[2.2rem] leading-tight text-cream">Staff sign in</h1>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-body">
            Sign in to manage the contact details shown on the website.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Email
              <input
                required
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={field}
              />
            </label>
            <label className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
              Password
              <span className="relative block">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${field} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 mt-[0.3rem] -translate-y-1/2 p-1 text-muted transition-colors hover:text-cream"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {error && (
              <p role="alert" className="border border-brand/40 bg-brand/10 px-4 py-3 text-[0.85rem] text-cream">
                {error}
              </p>
            )}

            <button disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
              {busy ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[0.8rem] text-muted">
          <Link href="/" className="link-underline hover:text-cream">
            Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
