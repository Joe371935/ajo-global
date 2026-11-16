import { formatNGN } from "@/lib/format";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-5 py-8 text-[color:var(--fg)] md:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">Wallet</h1>
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <p className="text-sm text-[color:var(--muted)]">Available balance (mock)</p>
          <p className="mt-2 text-4xl font-semibold">{formatNGN(185000)}</p>
          <div className="mt-5 flex gap-3"><button className="rounded-lg bg-[color:var(--primary)] px-4 py-2 text-sm text-white">Top up (mock)</button><button className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm">Withdraw (mock)</button></div>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="mb-3 font-semibold">Transaction history</h2>
          <div className="space-y-2 text-sm"><div className="flex justify-between border-b border-[color:var(--border)] pb-2"><span>Top up</span><span>+{formatNGN(200000)}</span></div><div className="flex justify-between border-b border-[color:var(--border)] pb-2"><span>Circle contribution</span><span>-{formatNGN(50000)}</span></div></div>
        </div>
      </div>
    </div>
  );
}
