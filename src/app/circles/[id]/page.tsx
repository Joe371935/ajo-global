"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import { Badge, Button, ButtonLink, Card, PageHeader } from "@/components/ui";
import { formatNGN } from "@/lib/format";
import { useDemo } from "@/lib/store";

function statusTone(status: string) {
  if (status === "Active") return "success" as const;
  if (status === "Completed") return "neutral" as const;
  return "warning" as const;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[color:var(--bg)]" />}>
      <CircleDetailPage />
    </Suspense>
  );
}

function CircleDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { getCircle, balance, contribute, joinCircle, leaveCircle, toast } = useDemo();
  const circle = getCircle(id);

  if (!circle) {
    return (
      <AppShell>
        <Card className="mx-auto max-w-lg text-center">
          <p className="text-lg font-semibold">Circle not found</p>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            It may have been removed or the link is incorrect.
          </p>
          <div className="mt-4 flex justify-center">
            <ButtonLink href="/circles">Back to circles</ButtonLink>
          </div>
        </Card>
      </AppShell>
    );
  }

  const paidCount = circle.members.filter((m) => m.paid).length;
  const progress =
    circle.members.length > 0 ? Math.round((paidCount / circle.members.length) * 100) : 0;
  const currentCycle = circle.cyclesPaid + 1;
  const recipient =
    circle.members.length > 0
      ? circle.members[circle.cyclesPaid % circle.members.length]
      : null;

  const copyInvite = async () => {
    const text = `Join ${circle.name} on Ajo Global — code ${circle.inviteCode}. ${formatNGN(
      circle.amountNGN
    )} ${circle.frequency.toLowerCase()}.`;
    try {
      await navigator.clipboard.writeText(text);
      toast("Invite copied to clipboard");
    } catch {
      toast(`Invite code: ${circle.inviteCode}`, "info");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-[color:var(--muted)]">
            <Link href="/dashboard" className="hover:text-[color:var(--fg)]">Dashboard</Link>
            {" / "}
            <Link href="/circles" className="hover:text-[color:var(--fg)]">Circles</Link>
          </p>
          <PageHeader
            title={circle.name}
            actions={
              <>
                <Badge tone={statusTone(circle.status)}>{circle.status}</Badge>
                {circle.joined ? (
                  <Button variant="outline" onClick={() => leaveCircle(circle.id)}>
                    Leave
                  </Button>
                ) : (
                  <Button onClick={() => joinCircle(circle.id)}>Join circle</Button>
                )}
              </>
            }
          />
        </div>

        <section className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs text-[color:var(--muted)]">Contribution</p>
            <p className="mt-1 font-semibold">{formatNGN(circle.amountNGN)}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-[color:var(--muted)]">Frequency</p>
            <p className="mt-1 font-semibold">{circle.frequency}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-[color:var(--muted)]">Payout method</p>
            <p className="mt-1 font-semibold">{circle.payoutMethod}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-[color:var(--muted)]">Late fee / grace</p>
            <p className="mt-1 font-semibold">{circle.lateFeePct}% / {circle.graceDays}d</p>
          </Card>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold">This cycle</h2>
                <Badge tone="accent">Cycle {currentCycle}</Badge>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--border)]">
                <div className="h-full rounded-full bg-[color:var(--primary)]" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {paidCount} of {circle.members.length} members paid this cycle ({progress}%)
              </p>
              {recipient ? (
                <p className="mt-3 rounded-lg bg-[color:var(--accent)]/15 px-3 py-2 text-sm text-[color:var(--accent-2)]">
                  Next payout to <span className="font-semibold">{recipient.name}</span> once the pot is confirmed.
                </p>
              ) : null}
              {circle.joined ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    onClick={() => contribute(circle.id, circle.amountNGN)}
                    disabled={balance < circle.amountNGN}
                  >
                    Contribute {formatNGN(circle.amountNGN)}
                  </Button>
                  <Button variant="outline" onClick={copyInvite}>
                    Copy invite
                  </Button>
                  {balance < circle.amountNGN ? (
                    <span className="self-center text-xs text-[color:var(--danger)]">
                      Top up your wallet to contribute.
                    </span>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button onClick={() => joinCircle(circle.id)}>Join to contribute</Button>
                  <Button variant="outline" onClick={copyInvite}>
                    Copy invite
                  </Button>
                </div>
              )}
            </Card>

            <Card>
              <h2 className="mb-3 font-semibold">Rotation timeline</h2>
              <div className="space-y-2 text-sm">
                {circle.members.map((m, i) => {
                  const cycleNo = i + 1;
                  const state =
                    cycleNo <= circle.cyclesPaid
                      ? "Paid"
                      : cycleNo === currentCycle
                        ? "In progress"
                        : "Upcoming";
                  return (
                    <div
                      key={`${m.name}-${i}`}
                      className="flex items-center justify-between rounded-lg border border-[color:var(--border)] px-3 py-2"
                    >
                      <span>
                        Cycle {cycleNo} · {m.name}
                      </span>
                      <Badge tone={state === "Paid" ? "success" : state === "In progress" ? "accent" : "neutral"}>
                        {state}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h2 className="mb-3 font-semibold">Members</h2>
              <div className="space-y-2">
                {circle.members.map((m, i) => (
                  <div key={`${m.name}-m-${i}`} className="flex items-center justify-between rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--primary)]/10 text-xs font-semibold text-[color:var(--primary)]">
                        {m.name.slice(0, 2).toUpperCase()}
                      </span>
                      {m.name}
                    </span>
                    <span className={m.paid ? "text-[color:var(--primary)]" : "text-[color:var(--muted)]"}>
                      {m.paid ? "Paid" : "Due"}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[color:var(--muted)]">
                Invite code: <span className="font-mono">{circle.inviteCode}</span>
              </p>
            </Card>

            <Card>
              <h2 className="mb-3 font-semibold">Activity log</h2>
              <div className="space-y-2 text-sm text-[color:var(--muted)]">
                {[...circle.activity].reverse().map((a, i) => (
                  <p key={`${a}-${i}`} className="border-b border-[color:var(--border)] pb-2 last:border-0">
                    {a}
                  </p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
