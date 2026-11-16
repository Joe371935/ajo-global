"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type * as React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button, Field, Input } from "@/components/ui";
import { useDemo } from "@/lib/store";

export default function LoginPage() {
  const { login } = useDemo();
  const router = useRouter();
  const [email, setEmail] = useState("ada@ajo.ng");
  const [password, setPassword] = useState("demo1234");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--bg)] px-5 py-6 text-[color:var(--fg)]">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--fg)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--primary)] text-sm font-semibold text-white">
            A
          </span>
          Ajo Global
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center py-8">
        <div className="w-full max-w-md rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 sm:p-8">
          <p className="text-sm text-[color:var(--muted)]">Welcome back</p>
          <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl">
            Log in to Ajo Global
          </h1>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </Field>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-[color:var(--muted)]">
            No account?{" "}
            <Link href="/signup" className="text-[color:var(--primary)]">
              Sign up
            </Link>
          </p>
          <p className="mt-6 rounded-lg bg-[color:var(--border)]/30 px-3 py-2 text-center text-xs text-[color:var(--muted)]">
            Prototype: any email &amp; password works. Try the demo account.
          </p>
        </div>
      </div>
    </div>
  );
}
