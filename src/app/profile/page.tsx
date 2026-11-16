import { demoUsers } from "@/lib/mockData";

export default function ProfilePage() {
  const u = demoUsers[0];
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-5 py-8 text-[color:var(--fg)] md:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
        <h1 className="mb-4 font-[family-name:var(--font-display)] text-3xl">Profile</h1>
        <div className="space-y-2 text-sm"><p><span className="text-[color:var(--muted)]">Name:</span> {u.name}</p><p><span className="text-[color:var(--muted)]">Email:</span> {u.email}</p><p><span className="text-[color:var(--muted)]">Phone:</span> {u.phone}</p><p><span className="text-[color:var(--muted)]">Verified:</span> {u.verified ? "Yes (mock badge)" : "No"}</p><p><span className="text-[color:var(--muted)]">Trust score:</span> {u.trustScore}/100</p></div>
      </div>
    </div>
  );
}
