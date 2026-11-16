"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type * as React from "react";
import AppShell from "@/components/AppShell";
import { Button, Card, Field, Input, PageHeader, Select } from "@/components/ui";
import { useDemo, type Frequency, type PayoutMethod } from "@/lib/store";

export default function NewCirclePage() {
  const { createCircle } = useDemo();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    amountNGN: "50000",
    frequency: "Weekly" as Frequency,
    membersCount: "6",
    startDate: "",
    payoutMethod: "Fixed order" as PayoutMethod,
    lateFeePct: "5",
    graceDays: "2",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = createCircle({
      name: form.name.trim(),
      amountNGN: Number(form.amountNGN) || 0,
      frequency: form.frequency,
      membersCount: Number(form.membersCount) || 2,
      startDate: form.startDate,
      payoutMethod: form.payoutMethod,
      lateFeePct: Number(form.lateFeePct) || 0,
      graceDays: Number(form.graceDays) || 0,
    });
    router.push(`/circles/${id}`);
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <PageHeader eyebrow="Circles" title="Create a circle" />
        <Card>
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Circle name">
                <Input value={form.name} onChange={set("name")} placeholder="e.g. Market Sisters Circle" required />
              </Field>
            </div>
            <Field label="Contribution amount (NGN)">
              <Input type="number" min={0} step={1000} value={form.amountNGN} onChange={set("amountNGN")} required />
            </Field>
            <Field label="Members count">
              <Input type="number" min={2} max={50} value={form.membersCount} onChange={set("membersCount")} />
            </Field>
            <Field label="Frequency">
              <Select value={form.frequency} onChange={set("frequency")}>
                <option>Weekly</option>
                <option>Biweekly</option>
                <option>Monthly</option>
              </Select>
            </Field>
            <Field label="Payout method">
              <Select value={form.payoutMethod} onChange={set("payoutMethod")}>
                <option>Fixed order</option>
                <option>Random draw</option>
                <option>Bidding</option>
              </Select>
            </Field>
            <Field label="Start date">
              <Input type="date" value={form.startDate} onChange={set("startDate")} />
            </Field>
            <Field label="Late fee (%)">
              <Input type="number" min={0} max={50} value={form.lateFeePct} onChange={set("lateFeePct")} />
            </Field>
            <Field label="Grace period (days)">
              <Input type="number" min={0} max={30} value={form.graceDays} onChange={set("graceDays")} />
            </Field>
            <div className="sm:col-span-2 mt-2 flex flex-wrap gap-2">
              <Button type="submit">Create circle</Button>
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
        <p className="text-xs text-[color:var(--muted)]">
          Prototype note: circles are stored locally in your browser. No real money moves.
        </p>
      </div>
    </AppShell>
  );
}
