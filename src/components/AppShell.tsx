"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import type * as React from "react";
import { useDemo } from "@/lib/store";
import ThemeToggle from "./ThemeToggle";
import { cx } from "./ui";

function Icon({ name }: { name: "home" | "circles" | "wallet" | "bell" | "user" | "logout" }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "circles":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="10" r="2.2" />
          <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
          <path d="M15.5 20c0-2 1.4-3.6 3.5-3.6 1.7 0 2.9.9 3.5 2.3" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="3" />
          <path d="M3 9h18" />
          <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
          <path d="M10 8l-4 4 4 4" />
          <path d="M6 12h9" />
        </svg>
      );
  }
}

const NAV = [
  { href: "/dashboard", label: "Dashboard", short: "Home", icon: "home" as const },
  { href: "/circles", label: "Circles", short: "Circles", icon: "circles" as const },
  { href: "/wallet", label: "Wallet", short: "Wallet", icon: "wallet" as const },
  { href: "/notifications", label: "Notifications", short: "Alerts", icon: "bell" as const },
  { href: "/profile", label: "Profile", short: "Profile", icon: "user" as const },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--primary)] text-base font-semibold text-white">
        A
      </span>
      <span className={cx("leading-tight", compact && "hidden sm:block")}>
        <span className="block text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
          Rotating savings
        </span>
        <span className="block text-sm font-semibold">Ajo Global</span>
      </span>
    </Link>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, authed, logout, unreadCount } = useDemo();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authed) router.replace("/login");
  }, [authed, router]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  const doLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--fg)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-[color:var(--border)] bg-[color:var(--card)] md:flex">
        <div className="px-5 py-5">
          <Brand />
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-[color:var(--primary)]/10 text-[color:var(--primary)]"
                  : "text-[color:var(--muted)] hover:bg-[color:var(--border)]/40 hover:text-[color:var(--fg)]"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon name={item.icon} />
                {item.label}
              </span>
              {item.icon === "bell" && unreadCount > 0 ? (
                <span className="rounded-full bg-[color:var(--accent)] px-2 py-0.5 text-[10px] font-semibold text-[#1c1503]">
                  {unreadCount}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="border-t border-[color:var(--border)] p-3">
          <div className="mb-2 flex items-center justify-between px-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user?.name ?? "Guest"}</p>
              <p className="truncate text-xs text-[color:var(--muted)]">{user?.email ?? ""}</p>
            </div>
            <ThemeToggle />
          </div>
          <button
            onClick={doLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[color:var(--muted)] transition-colors hover:bg-[color:var(--danger)]/10 hover:text-[color:var(--danger)]"
          >
            <Icon name="logout" />
            Log out
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--bg)]/90 px-4 py-3 backdrop-blur md:hidden">
        <Brand compact />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={doLogout}
            aria-label="Log out"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border)] text-[color:var(--muted)]"
          >
            <Icon name="logout" />
          </button>
        </div>
      </header>

      <div className="md:pl-60">
        <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-5 sm:px-6 md:pb-12 md:pt-8">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[color:var(--border)] bg-[color:var(--card)]/95 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-between px-2 py-1.5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "relative flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[10px] font-medium",
                isActive(item.href) ? "text-[color:var(--primary)]" : "text-[color:var(--muted)]"
              )}
            >
              <Icon name={item.icon} />
              {item.short}
              {item.icon === "bell" && unreadCount > 0 ? (
                <span className="absolute right-2 top-0.5 h-2 w-2 rounded-full bg-[color:var(--danger)]" />
              ) : null}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
