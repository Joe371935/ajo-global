"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Badge, Button, Card, EmptyState, Field, Input, PageHeader } from "@/components/ui";
import { formatNGN } from "@/lib/format";
import { useDemo } from "@/lib/store";

const QUICK = [5000, 10000, 25000, 50000];

export default function WalletPage() {
  const { balance, transactions, topUp, withdraw } = useDemo();
  const [amount, setAmount] = useState("10000");

  const value = Number(amount) || 0;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader eyebrow="Wallet" title="Wallet" />

        <Card className="bg-[color:var(--primary)] text-white">
          <p className="text-sm text-white/75">Available balance</p>
          <p className="mt-2 text-3xl font-semibold sm:text-4xl">{formatNGN(balance)}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              variant="accent"
              onClick={() => topUp(value)}
              disabled={!amount || value <= 0}
            >
              Top up {amount ? formatNGN(value) : ""}
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:border-white"
              onClick={() => withdraw(value)}
              disabled={!amount || value <= 0}
            >
              Withdraw
            </Button>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <h2 className="mb-3 font-semibold">Add money</h2>
            <Field label="Amount (NGN)">
              <Input
                type="number"
                min={0}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
              />
            </Field>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(String(q))}
                  className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--fg)]"
                >
                  {formatNGN(q)}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-[color:var(--muted)]">
              Prototype: balance is stored in your browser. No real payment is processed.
            </p>
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="mb-3 font-semibold">Transaction history</h2>
            {transactions.length === 0 ? (
              <EmptyState title="No transactions yet" body="Top up your wallet to get started." />
            ) : (
              <div className="divide-y divide-[color:var(--border)]">
                {transactions.map((t) => {
                  const out = t.type !== "TOPUP";
                  return (
                    <div key={t.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{t.label}</p>
                        <p className="text-xs text-[color:var(--muted)]">
                          {new Date(t.createdAt).toLocaleString("en-NG", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge tone={t.type === "TOPUP" ? "success" : t.type === "CONTRIB" ? "accent" : "neutral"}>
                          {t.type}
                        </Badge>
                        <span className={out ? "text-sm font-semibold text-[color:var(--danger)]" : "text-sm font-semibold text-[color:var(--primary)]"}>
                          {out ? "-" : "+"}
                          {formatNGN(t.amount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
