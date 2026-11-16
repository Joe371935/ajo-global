"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { Badge, Button, ButtonLink, Card, EmptyState, PageHeader } from "@/components/ui";
import { formatNGN } from "@/lib/format";
import { useDemo } from "@/lib/store";

function statusTone(status: string) {
  if (status === "Active") return "success" as const;
  if (status === "Completed") return "neutral" as const;
  return "warning" as const;
}

export default function CirclesPage() {
  const { circles, joinCircle } = useDemo();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Circles"
          title="Savings circles"
          actions={<ButtonLink href="/circles/new">Create circle</ButtonLink>}
        />

        {circles.length === 0 ? (
          <EmptyState
            title="No circles yet"
            body="Create the first circle and invite members."
            action={<ButtonLink href="/circles/new">Create circle</ButtonLink>}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {circles.map((c) => {
              const progress =
                c.members.length > 0
                  ? Math.round((c.members.filter((m) => m.paid).length / c.members.length) * 100)
                  : 0;
              return (
                <Card key={c.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{c.name}</p>
                      <p className="text-sm text-[color:var(--muted)]">
                        {c.frequency} · {c.payoutMethod}
                      </p>
                    </div>
                    <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-[color:var(--muted)]">Contribution</p>
                      <p className="font-semibold">{formatNGN(c.amountNGN)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[color:var(--muted)]">Members</p>
                      <p className="font-semibold">{c.members.length}/{c.membersCount}</p>
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--border)]">
                    <div
                      className="h-full rounded-full bg-[color:var(--primary)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-[color:var(--muted)]">{progress}% paid this cycle</p>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/circles/${c.id}`}
                      className="inline-flex items-center justify-center rounded-lg border border-[color:var(--border)] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[color:var(--accent)]"
                    >
                      Open circle
                    </Link>
                    {c.joined ? (
                      <Badge tone="success">Joined</Badge>
                    ) : (
                      <Button variant="primary" onClick={() => joinCircle(c.id)}>
                        Join
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
