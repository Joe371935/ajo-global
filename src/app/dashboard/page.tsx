"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { Badge, ButtonLink, Card, EmptyState, PageHeader, Stat } from "@/components/ui";
import { formatNGN } from "@/lib/format";
import { useDemo } from "@/lib/store";

function statusTone(status: string) {
  if (status === "Active") return "success" as const;
  if (status === "Completed") return "neutral" as const;
  return "warning" as const;
}

export default function DashboardPage() {
  const { user, balance, myCircles, transactions, notifications, unreadCount } = useDemo();
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const nextCircle = myCircles.find((c) => c.status === "Active") ?? myCircles[0];
  const recentTx = transactions.slice(0, 4);
  const recentNotes = notifications.slice(0, 3);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Dashboard"
          title={`Welcome back, ${firstName}`}
          actions={
            <>
              <ButtonLink href="/wallet" variant="outline">
                Top up
              </ButtonLink>
              <ButtonLink href="/circles/new">Create circle</ButtonLink>
            </>
          }
        />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="Wallet balance" value={formatNGN(balance)} sub="Available to contribute" tone="accent" />
          <Stat
            label="Next payment"
            value={nextCircle ? formatNGN(nextCircle.amountNGN) : formatNGN(0)}
            sub={nextCircle ? `${nextCircle.name} · ${nextCircle.frequency}` : "No upcoming payment"}
          />
          <Stat
            label="Trust score"
            value={
              <>
                {user?.trustScore ?? 0}
                <span className="text-sm text-[color:var(--muted)]">/100</span>
              </>
            }
            sub={user?.verified ? "Verified member" : "Verification pending"}
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">My circles</h2>
                <Link href="/circles" className="text-sm text-[color:var(--primary)]">
                  View all
                </Link>
              </div>
              {myCircles.length === 0 ? (
                <EmptyState
                  title="No circles yet"
                  body="Create a circle or join an existing one to get started."
                  action={<ButtonLink href="/circles/new">Create circle</ButtonLink>}
                />
              ) : (
                <div className="space-y-3">
                  {myCircles.map((c) => {
                    const progress =
                      c.members.length > 0
                        ? Math.round((c.members.filter((m) => m.paid).length / c.members.length) * 100)
                        : 0;
                    return (
                      <Link
                        key={c.id}
                        href={`/circles/${c.id}`}
                        className="block rounded-xl border border-[color:var(--border)] p-4 transition-colors hover:border-[color:var(--accent)]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{c.name}</p>
                            <p className="text-sm text-[color:var(--muted)]">
                              {c.frequency} · {c.members.length} members
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                            <p className="font-semibold">{formatNGN(c.amountNGN)}</p>
                          </div>
                        </div>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--border)]">
                          <div
                            className="h-full rounded-full bg-[color:var(--primary)]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-[color:var(--muted)]">
                          {progress}% contributed this cycle · {c.cyclesPaid} cycles paid
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Card>

            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Recent activity</h2>
                <Link href="/wallet" className="text-sm text-[color:var(--primary)]">
                  Wallet
                </Link>
              </div>
              {recentTx.length === 0 ? (
                <p className="text-sm text-[color:var(--muted)]">No transactions yet.</p>
              ) : (
                <div className="divide-y divide-[color:var(--border)] text-sm">
                  {recentTx.map((t) => {
                    const out = t.type !== "TOPUP";
                    return (
                      <div key={t.id} className="flex items-center justify-between py-2.5">
                        <span className="text-[color:var(--muted)]">{t.label}</span>
                        <span className={out ? "text-[color:var(--danger)]" : "text-[color:var(--primary)]"}>
                          {out ? "-" : "+"}
                          {formatNGN(t.amount)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold">Notifications</h2>
                {unreadCount > 0 ? <Badge tone="accent">{unreadCount} new</Badge> : null}
              </div>
              <div className="space-y-3">
                {recentNotes.map((n) => (
                  <Link
                    key={n.id}
                    href="/notifications"
                    className="block rounded-xl border border-[color:var(--border)] p-3 hover:border-[color:var(--accent)]"
                  >
                    <div className="flex items-center gap-2">
                      {!n.read ? <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" /> : null}
                      <p className="text-sm font-medium">{n.title}</p>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-[color:var(--muted)]">{n.body}</p>
                  </Link>
                ))}
              </div>
              <Link href="/notifications" className="mt-3 inline-block text-sm text-[color:var(--primary)]">
                See all
              </Link>
            </Card>

            <Card>
              <h2 className="mb-3 font-semibold">Quick actions</h2>
              <div className="grid grid-cols-2 gap-2">
                <ButtonLink href="/wallet" variant="outline" className="w-full">
                  Add money
                </ButtonLink>
                <ButtonLink href="/circles" variant="outline" className="w-full">
                  Join circle
                </ButtonLink>
                <ButtonLink href="/circles/new" variant="outline" className="w-full">
                  New circle
                </ButtonLink>
                <ButtonLink href="/profile" variant="outline" className="w-full">
                  Profile
                </ButtonLink>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
