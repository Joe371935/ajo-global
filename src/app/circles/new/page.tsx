export default function NewCirclePage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-5 py-8 text-[color:var(--fg)] md:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
        <h1 className="mb-1 font-[family-name:var(--font-display)] text-3xl">Create a circle</h1>
        <p className="mb-6 text-sm text-[color:var(--muted)]">Demo form — wire to Prisma/API next.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm" placeholder="Circle name" />
          <input className="rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm" placeholder="Contribution amount (NGN)" />
          <input className="rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm" placeholder="Frequency" />
          <input className="rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm" placeholder="Members count" />
          <input className="rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm" placeholder="Start date" />
          <input className="rounded-lg border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm" placeholder="Payout method" />
        </div>
        <button className="mt-6 rounded-lg bg-[color:var(--primary)] px-4 py-2 text-sm font-medium text-white">Create (demo)</button>
      </div>
    </div>
  );
}
