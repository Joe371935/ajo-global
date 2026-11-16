import Link from "next/link";
import { formatNGN } from "@/lib/format";
import { demoCircles } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-5 py-8 text-[color:var(--fg)] md:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-[color:var(--muted)]">Dashboard</p>
            <h1 className="font-[family-name:var(--font-display)] text-3xl">Welcome back, Adaeze</h1>
          </div>
          <Link href="/circles/new" className="rounded-lg bg-[color:var(--primary)] px-4 py-2 text-sm font-medium text-white">Create circle</Link>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5"><p className="text-sm text-[color:var(--muted)]">Wallet balance</p><p className="mt-2 text-2xl font-semibold">{formatNGN(185000)}</p></div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5"><p className="text-sm text-[color:var(--muted)]">Upcoming payment</p><p className="mt-2 text-2xl font-semibold">{formatNGN(50000)}</p><p className="text-xs text-[color:var(--muted)]">Due in 2 days</p></div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5"><p className="text-sm text-[color:var(--muted)]">Trust score</p><p className="mt-2 text-2xl font-semibold">92<span className="text-sm text-[color:var(--muted)]">/100</span></p></div>
        </section>

        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">My circles</h2><Link className="text-sm text-[color:var(--primary)]" href="/circles/c1">Open demo</Link></div>
          <div className="space-y-3">
            {demoCircles.map((c) => (
              <Link key={c.id} href={`/circles/${c.id}`} className="block rounded-xl border border-[color:var(--border)] p-4 hover:border-[color:var(--accent)]">
                <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-medium">{c.name}</p><p className="text-sm text-[color:var(--muted)]">{c.frequency} · {c.status}</p></div><p className="font-semibold">{formatNGN(c.amountNGN)}</p></div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
