"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type * as React from "react";
import AppShell from "@/components/AppShell";
import { Badge, Button, Card, Field, Input, PageHeader } from "@/components/ui";
import { formatNGN } from "@/lib/format";
import { useDemo } from "@/lib/store";

export default function ProfilePage() {
  const { user, balance, myCircles, updateProfile, logout } = useDemo();
  const router = useRouter();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    verified: user?.verified ?? false,
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({
      ...f,
      [key]: key === "verified" ? e.target.checked : e.target.value,
    }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
  };

  const doLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <PageHeader eyebrow="Account" title="Profile" />

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--primary)] text-lg font-semibold text-white">
                {(form.name || "A").slice(0, 1).toUpperCase()}
              </span>
              <div>
                <p className="font-semibold">{form.name || "Member"}</p>
                <p className="text-sm text-[color:var(--muted)]">{form.email}</p>
              </div>
            </div>
            <Badge tone={form.verified ? "success" : "warning"}>
              {form.verified ? "Verified" : "Unverified"}
            </Badge>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-[color:var(--border)] p-3">
              <p className="text-lg font-semibold">{user?.trustScore ?? 0}</p>
              <p className="text-xs text-[color:var(--muted)]">Trust score</p>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] p-3">
              <p className="text-lg font-semibold">{myCircles.length}</p>
              <p className="text-xs text-[color:var(--muted)]">Circles joined</p>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] p-3">
              <p className="text-lg font-semibold">{formatNGN(balance)}</p>
              <p className="text-xs text-[color:var(--muted)]">Wallet</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-semibold">Edit details</h2>
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <Input value={form.name} onChange={set("name")} required />
            </Field>
            <Field label="Phone number">
              <Input value={form.phone} onChange={set("phone")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email">
                <Input type="email" value={form.email} onChange={set("email")} required />
              </Field>
            </div>
            <label className="sm:col-span-2 flex items-center gap-3 rounded-lg border border-[color:var(--border)] px-3 py-3 text-sm">
              <input
                type="checkbox"
                checked={form.verified}
                onChange={set("verified")}
                className="h-4 w-4 accent-[color:var(--primary)]"
              />
              Verified member (prototype toggle)
            </label>
            <div className="sm:col-span-2 flex flex-wrap gap-2">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="danger" onClick={doLogout}>
                Log out
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
