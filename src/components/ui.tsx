"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type * as React from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5",
        className
      )}
    >
      {children}
    </div>
  );
}

const buttonStyles = {
  primary:
    "bg-[color:var(--primary)] text-white hover:bg-[color:var(--primary-2)] disabled:opacity-50",
  outline:
    "border border-[color:var(--border)] bg-transparent text-[color:var(--fg)] hover:border-[color:var(--accent)] disabled:opacity-50",
  ghost: "text-[color:var(--muted)] hover:text-[color:var(--fg)] disabled:opacity-50",
  danger:
    "border border-[color:var(--danger)] text-[color:var(--danger)] hover:bg-[color:var(--danger)] hover:text-white disabled:opacity-50",
  accent:
    "bg-[color:var(--accent)] text-[#1c1503] hover:bg-[color:var(--accent-2)] disabled:opacity-50",
} as const;

type Variant = keyof typeof buttonStyles;

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] disabled:cursor-not-allowed";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ variant = "primary", className, ...props }, ref) {
  return <button ref={ref} className={cx(base, buttonStyles[variant], className)} {...props} />;
});

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cx(base, buttonStyles[variant], className)}>
      {children}
    </Link>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[color:var(--muted)]">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-[color:var(--muted)]">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-[color:var(--border)] bg-transparent px-3.5 py-2.5 text-sm text-[color:var(--fg)] outline-none transition-colors focus:border-[color:var(--accent)]";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cx(inputClass, className)} {...props} />;
  }
);

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cx(inputClass, "appearance-none", className)} {...props}>
        {children}
      </select>
    );
  }
);

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "accent";
}) {
  const tones = {
    neutral: "bg-[color:var(--border)]/40 text-[color:var(--muted)]",
    success: "bg-[color:var(--primary)]/12 text-[color:var(--primary)]",
    warning: "bg-[color:var(--accent)]/20 text-[color:var(--accent-2)]",
    danger: "bg-[color:var(--danger)]/12 text-[color:var(--danger)]",
    accent: "bg-[color:var(--accent)]/20 text-[color:var(--accent-2)]",
  } as const;
  return (
    <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  actions,
}: {
  eyebrow?: string;
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow ? (
          <p className="text-sm text-[color:var(--muted)]">{eyebrow}</p>
        ) : null}
        <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl">{title}</h1>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  tone?: "default" | "accent";
}) {
  return (
    <Card className="p-4 sm:p-5">
      <p className="text-sm text-[color:var(--muted)]">{label}</p>
      <p
        className={cx(
          "mt-2 text-xl font-semibold sm:text-2xl",
          tone === "accent" && "text-[color:var(--primary)]"
        )}
      >
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-[color:var(--muted)]">{sub}</p> : null}
    </Card>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[color:var(--border)] p-8 text-center">
      <p className="font-medium">{title}</p>
      {body ? <p className="mt-1 text-sm text-[color:var(--muted)]">{body}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
