"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type * as React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button, Field, Input } from "@/components/ui";
import { useDemo } from "@/lib/store";

export default function SignupPage() {
  const { signup } = useDemo();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ name, email, phone });
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
          <p className="text-sm text-[color:var(--muted)]">Create account</p>
          <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl">Join Ajo Global</h1>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Full name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ada Obi"
                required
              />
            </Field>
            <Field label="Phone number">
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 801 234 5678"
                required
              />
            </Field>
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
                placeholder="Create a password"
                required
              />
            </Field>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-[color:var(--muted)]">
            Already have one?{" "}
            <Link href="/login" className="text-[color:var(--primary)]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
