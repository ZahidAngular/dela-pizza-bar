"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Logo";
import { api, auth, type AuthUser, type SiteDetail } from "@/lib/api";
import { site } from "@/lib/site";

const field =
  "mt-2.5 w-full border border-line bg-ink-2 px-4 py-3.5 text-[0.9rem] text-cream " +
  "transition-colors duration-300 focus:border-gold focus-visible:outline-none";
const label = "block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted";

type Values = { name: string; email: string; phoneNumber: string; whatsapp: string };

const toValues = (d: SiteDetail): Values => ({
  name: d.name ?? "",
  email: d.email ?? "",
  phoneNumber: d.phoneNumber ?? "",
  whatsapp: d.whatsapp ?? "",
});

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [detail, setDetail] = useState<SiteDetail | null>(null);
  const [values, setValues] = useState<Values | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!auth.token) {
      router.replace("/login");
      return;
    }
    // Reading the stored session happens after mount so the server and first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(auth.user);
    api
      .mySite()
      .then((d) => {
        setDetail(d);
        setValues(toValues(d));
      })
      .catch((err) => {
        if (!auth.token) router.replace("/login");
        else setError(err instanceof Error ? err.message : "Could not load the site details.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function signOut() {
    await api.logout();
    router.replace("/login");
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!values) return;
    setBusy(true);
    setError(null);
    try {
      const d = await api.saveMySite(values);
      setDetail(d);
      setValues(toValues(d));
      setEditing(false);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => (v ? { ...v, [key]: e.target.value } : v));

  const rows: [string, string][] = detail
    ? [
        ["Business name", detail.name],
        ["Site email", detail.email],
        ["Phone", detail.phoneNumber || "—"],
        ["WhatsApp", detail.whatsapp || "—"],
        ["Site name", detail.siteName],
      ]
    : [];

  return (
    <div className="min-h-screen bg-ink">
      <header className="border-b border-line bg-ink-2">
        <div className="container-x flex items-center justify-between py-4">
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark className="h-9" decorative />
          </Link>
          <div className="flex items-center gap-5">
            {user && <span className="hidden text-[0.8rem] text-muted sm:inline">{user.email}</span>}
            <button onClick={signOut} className="btn btn-ghost px-5 py-2.5">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-x max-w-3xl py-12">
        <span className="block h-px w-10 bg-gold" />
        <h1 className="display mt-5 text-[2.4rem] leading-tight text-cream">Dashboard</h1>
        <p className="mt-2 text-[0.9rem] text-body">
          {user ? `Signed in as ${user.fullName}.` : "Your site details."}
        </p>

        {loading && <p className="mt-10 text-muted">Loading...</p>}
        {!loading && error && !editing && (
          <p role="alert" className="mt-8 border border-brand/40 bg-brand/10 px-4 py-3 text-[0.85rem] text-cream">
            {error}
          </p>
        )}

        {detail && values && (
          <section className="mt-10 border border-line bg-surface p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-gold">Site details</h2>
              {!editing && (
                <button
                  onClick={() => {
                    setSaved(false);
                    setEditing(true);
                  }}
                  className="btn btn-ghost px-5 py-2.5"
                >
                  Edit
                </button>
              )}
            </div>
            {saved && !editing && <p className="mt-3 text-[0.85rem] text-gold-soft">Saved.</p>}

            {editing ? (
              <form onSubmit={onSave} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={label}>
                    Business name
                    <input required value={values.name} onChange={set("name")} className={field} />
                  </label>
                  <label className={label}>
                    Site email
                    <input required type="email" value={values.email} onChange={set("email")} className={field} />
                  </label>
                  <label className={label}>
                    Phone
                    <input value={values.phoneNumber} onChange={set("phoneNumber")} className={field} />
                  </label>
                  <label className={label}>
                    WhatsApp
                    <input value={values.whatsapp} onChange={set("whatsapp")} className={field} />
                  </label>
                </div>
                {error && (
                  <p role="alert" className="border border-brand/40 bg-brand/10 px-4 py-3 text-[0.85rem] text-cream">
                    {error}
                  </p>
                )}
                <div className="flex gap-3">
                  <button disabled={busy} className="btn btn-primary disabled:opacity-60">
                    {busy ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(toValues(detail));
                      setError(null);
                      setEditing(false);
                    }}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <dl className="mt-6 divide-y divide-line">
                {rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-4 py-3.5 text-[0.9rem]">
                    <dt className="text-muted">{k}</dt>
                    <dd className="col-span-2 break-words text-cream">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
