import Link from "next/link";
import { formatNGN } from "@/lib/format";
import { demoCircles } from "@/lib/mockData";

export default function CircleDetailPage() {
  const c = demoCircles[0];
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-5 py-8 text-[color:var(--fg)] md:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-sm text-[color:var(--muted)]"><Link href="/dashboard" className="underline">Dashboard</Link> / Circle</p><h1 className="font-[family-name:var(--font-display)] text-3xl">{c.name}</h1></div>
          <span className="rounded-full bg-[color:var(--accent)]/20 px-3 py-1 text-sm text-[color:var(--accent-2)]">{c.status}</span>
        </div>
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4"><p className="text-xs text-[color:var(--muted)]">Contribution</p><p className="mt-1 font-semibold">{formatNGN(c.amountNGN)}</p></div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4"><p className="text-xs text-[color:var(--muted)]">Frequency</p><p className="mt-1 font-semibold">{c.frequency}</p></div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4"><p className="text-xs text-[color:var(--muted)]">Payout method</p><p className="mt-1 font-semibold">{c.payoutMethod}</p></div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4"><p className="text-xs text-[color:var(--muted)]">Late fee / grace</p><p className="mt-1 font-semibold">{c.lateFeePct}% / {c.graceDays}d</p></div>
        </section>
        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">
          <h2 className="mb-3 font-semibold">Rotation timeline (demo)</h2>
          <div className="space-y-2 text-sm">
            {["Cycle 1 · Adaeze · Paid", "Cycle 2 · Tunde · Paid", "Cycle 3 · Ngozi · Pending", "Cycle 4 · Ibrahim · Upcoming"].map((row) => (<div key={row} className="rounded-lg border border-[color:var(--border)] px-3 py-2">{row}</div>))}
          </div>
        </section>
        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">
          <h2 className="mb-3 font-semibold">Activity log (immutable, demo)</h2>
          <div className="space-y-2 text-sm text-[color:var(--muted)]">
            <p>2026-07-08 09:12 — Tunde paid {formatNGN(c.amountNGN)}</p>
            <p>2026-07-08 09:13 — Escrow hold applied for Cycle 2 payout</p>
            <p>2026-07-08 10:01 — Payout released to Tunde (mock)</p>
          </div>
        </section>
      </div>
    </div>
  );
}
