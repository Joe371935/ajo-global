import Link from "next/link";
import { formatNGN } from "@/lib/format";
import { demoCircles, demoUsers } from "@/lib/mockData";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const activePot = demoCircles.reduce(
    (s, c) => s + c.amountNGN * Math.min(3, c.membersCount),
    0
  );

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--fg)]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--primary)] text-white font-semibold">
            A
          </span>
          <div>
            <p className="text-xs tracking-wide text-[color:var(--muted)]">Premium rotating savings</p>
            <p className="text-lg font-semibold">Ajo Global</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden rounded-lg px-4 py-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)] sm:inline-flex">
            Log in
          </Link>
          <Link href="/signup" className="rounded-lg bg-[color:var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[color:var(--primary-2)]">
            Get started
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-16">
        <section className="grid gap-10 py-8 md:grid-cols-2 md:items-center md:py-12">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs tracking-wide text-[color:var(--muted)]">
              Trusted circle finance, built for mobile-first Nigeria
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl md:text-6xl">
              Digitize ajo with
              <span className="block text-[color:var(--primary)]">transparency you can prove.</span>
            </h1>
            <p className="max-w-xl text-[color:var(--muted)]">
              Ajo Global modernizes trusted rotating savings with verified profiles, visible payment
              progress, escrow-style payout holds, and an activity log for every circle.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-lg bg-[color:var(--primary)] px-5 py-3 text-sm font-medium text-white hover:bg-[color:var(--primary-2)]">
                View demo dashboard
              </Link>
              <Link href="/circles/c1" className="rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-3 text-sm font-medium hover:border-[color:var(--accent)]">
                Open demo circle
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[color:var(--muted)]">
              <span>Verified members</span>
              <span>Escrow-style holds</span>
              <span>Transparent activity log</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-[color:var(--muted)]">Circle overview</p>
              <span className="rounded-full bg-[color:var(--accent)]/20 px-2 py-1 text-xs text-[color:var(--accent-2)]">
                Live preview
              </span>
            </div>
            <p className="font-[family-name:var(--font-display)] text-3xl">{formatNGN(activePot)}</p>
            <p className="mb-6 text-sm text-[color:var(--muted)]">Tracked in active demo circles</p>
            <div className="space-y-3">
              {demoCircles.map((c) => (
                <Link
                  key={c.id}
                  href={`/circles/${c.id}`}
                  className="block rounded-xl border border-[color:var(--border)] p-4 transition-colors hover:border-[color:var(--accent)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-[color:var(--muted)]">
                        {c.frequency} · {c.membersCount} members
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{formatNGN(c.amountNGN)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-8 md:grid-cols-3">
          {[
            ["Trust score", "Member reliability is visible before you accept invites."],
            ["Escrow-style holds", "Payouts stay protected until the full pot is confirmed."],
            ["Activity log", "Every action is recorded so no movement is hidden."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">
              <p className="mb-2 font-semibold">{title}</p>
              <p className="text-sm text-[color:var(--muted)]">{text}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold">Trusted by demo members</p>
            <p className="text-xs text-[color:var(--muted)]">Prototype preview data</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {demoUsers.slice(0, 6).map((u) => (
              <div key={u.id} className="rounded-xl border border-[color:var(--border)] p-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--primary)]/10 text-sm font-semibold text-[color:var(--primary)]">
                    {u.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-[color:var(--muted)]">{u.phone}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={u.verified ? "text-[color:var(--primary)]" : "text-[color:var(--muted)]"}>
                    {u.verified ? "Verified" : "Unverified"}
                  </span>
                  <span className="text-[color:var(--accent-2)]">Trust {u.trustScore}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--border)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-[color:var(--muted)] sm:flex-row">
          <span>Ajo Global — prototype demo. No real money moves.</span>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-[color:var(--fg)]">Log in</Link>
            <Link href="/signup" className="hover:text-[color:var(--fg)]">Sign up</Link>
            <Link href="/dashboard" className="hover:text-[color:var(--fg)]">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
