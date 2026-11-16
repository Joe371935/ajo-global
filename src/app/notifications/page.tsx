"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Badge, Button, Card, EmptyState, PageHeader } from "@/components/ui";
import { useDemo } from "@/lib/store";

export default function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead } = useDemo();
  const [tab, setTab] = useState<"all" | "unread">("all");

  const list = tab === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Inbox"
          title="Notifications"
          actions={
            <Button variant="outline" onClick={markAllRead} disabled={unreadCount === 0}>
              Mark all read
            </Button>
          }
        />

        <div className="inline-flex rounded-xl border border-[color:var(--border)] p-1">
          {(["all", "unread"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "bg-[color:var(--primary)] text-white"
                  : "text-[color:var(--muted)] hover:text-[color:var(--fg)]"
              }`}
            >
              {t}
              {t === "unread" && unreadCount > 0 ? ` (${unreadCount})` : ""}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <EmptyState
            title={tab === "unread" ? "You're all caught up" : "No notifications"}
            body={tab === "unread" ? "No unread notifications." : "Activity will appear here."}
          />
        ) : (
          <div className="space-y-3">
            {list.map((n) => (
              <Card key={n.id} className={n.read ? "opacity-70" : ""}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!n.read ? <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" /> : null}
                      <p className="font-medium">{n.title}</p>
                    </div>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{n.body}</p>
                    <p className="mt-2 text-xs text-[color:var(--muted)]">
                      {new Date(n.createdAt).toLocaleString("en-NG", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <Badge tone={n.type === "alert" ? "danger" : n.type === "payout" ? "success" : "neutral"}>
                      {n.type}
                    </Badge>
                    {!n.read ? (
                      <button
                        onClick={() => markRead(n.id)}
                        className="text-xs text-[color:var(--primary)] hover:underline"
                      >
                        Mark read
                      </button>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
