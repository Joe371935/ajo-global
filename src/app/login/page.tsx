import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-5 py-10 text-[color:var(--fg)]">
      <div className="mx-auto max-w-md rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
        <p className="text-sm text-[color:var(--muted)]">Welcome back</p>
        <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl">Log in to Ajo Global</h1>
        <div className="space-y-4">
          <input placeholder="Email" className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm outline-none" />
          <input placeholder="Password" type="password" className="w-full rounded-lg border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm outline-none" />
          <button className="w-full rounded-lg bg-[color:var(--primary)] px-4 py-3 text-sm font-medium text-white">Continue (demo)</button>
        </div>
        <p className="mt-4 text-sm text-[color:var(--muted)]">No account? <Link href="/signup" className="text-[color:var(--primary)]">Sign up</Link></p>
      </div>
    </div>
  );
}
