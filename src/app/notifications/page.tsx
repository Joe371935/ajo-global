export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-5 py-8 text-[color:var(--fg)] md:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl">Notifications</h1>
        {[["Payment reminder", "Your Market Sisters Circle contribution is due in 2 days."],["Payout released", "Cycle 2 payout released to Tunde (mock escrow hold complete)."],["Default alert", "A member missed the grace period in Lagos Builders Fund (demo)."]].map(([t,b])=>(
          <div key={t} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4"><p className="font-medium">{t}</p><p className="text-sm text-[color:var(--muted)]">{b}</p></div>
        ))}
      </div>
    </div>
  );
}
