"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type * as React from "react";

export type Frequency = "Weekly" | "Biweekly" | "Monthly";
export type PayoutMethod = "Random draw" | "Fixed order" | "Bidding";
export type CircleStatus = "Forming" | "Active" | "Completed";

export type TxType = "TOPUP" | "WITHDRAW" | "CONTRIB" | "PAYOUT" | "FEE";

export type Tx = {
  id: string;
  type: TxType;
  label: string;
  amount: number;
  createdAt: string;
};

export type Member = { name: string; paid: boolean };

export type Circle = {
  id: string;
  name: string;
  amountNGN: number;
  frequency: Frequency;
  membersCount: number;
  startDate: string;
  payoutMethod: PayoutMethod;
  lateFeePct: number;
  graceDays: number;
  status: CircleStatus;
  joined: boolean;
  members: Member[];
  cyclesPaid: number;
  inviteCode: string;
  activity: string[];
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  type: string;
  createdAt: string;
  read: boolean;
};

export type User = {
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  trustScore: number;
};

export type NewCircleInput = {
  name: string;
  amountNGN: number;
  frequency: Frequency;
  membersCount: number;
  startDate: string;
  payoutMethod: PayoutMethod;
  lateFeePct: number;
  graceDays: number;
};

type State = {
  user: User | null;
  balance: number;
  transactions: Tx[];
  circles: Circle[];
  notifications: NotificationItem[];
};

type Toast = { id: string; message: string; kind: "success" | "error" | "info" };

type DemoContextValue = State & {
  authed: boolean;
  unreadCount: number;
  myCircles: Circle[];
  pendingTotal: number;
  login: (email: string) => void;
  signup: (input: { name: string; email: string; phone: string }) => void;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
  topUp: (amount: number) => boolean;
  withdraw: (amount: number) => boolean;
  contribute: (circleId: string, amount: number) => boolean;
  createCircle: (input: NewCircleInput) => string;
  joinCircle: (circleId: string) => void;
  leaveCircle: (circleId: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  getCircle: (id: string) => Circle | undefined;
  toast: (message: string, kind?: Toast["kind"]) => void;
};

const STORAGE_KEY = "ajo-global:v2";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const nowISO = () => new Date().toISOString();

const addDays = (days: number) =>
  new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

const seedUser: User = {
  name: "Adaeze Okafor",
  email: "ada@ajo.ng",
  phone: "+234 801 111 0001",
  verified: true,
  trustScore: 92,
};

const seedCircles: Circle[] = [
  {
    id: "c1",
    name: "Market Sisters Circle",
    amountNGN: 50000,
    frequency: "Weekly",
    membersCount: 6,
    startDate: "2026-05-01",
    payoutMethod: "Fixed order",
    lateFeePct: 5,
    graceDays: 2,
    status: "Active",
    joined: true,
    cyclesPaid: 3,
    inviteCode: "AJO-MKT9",
    members: [
      { name: "Adaeze Okafor", paid: true },
      { name: "Tunde Bakare", paid: true },
      { name: "Ngozi Eze", paid: false },
      { name: "Ibrahim Musa", paid: false },
      { name: "Chidinma Ude", paid: true },
      { name: "Femi Adebayo", paid: false },
    ],
    activity: [
      "Circle created",
      "Cycle 1 paid by Adaeze",
      "Cycle 2 paid by Tunde",
      "Escrow hold applied for Cycle 2 payout",
      "Cycle 2 payout released to Tunde",
    ],
  },
  {
    id: "c2",
    name: "Lagos Builders Fund",
    amountNGN: 200000,
    frequency: "Monthly",
    membersCount: 8,
    startDate: "2026-06-15",
    payoutMethod: "Random draw",
    lateFeePct: 3,
    graceDays: 3,
    status: "Active",
    joined: false,
    cyclesPaid: 1,
    inviteCode: "AJO-BLD2",
    members: [
      { name: "Tunde Bakare", paid: true },
      { name: "Ibrahim Musa", paid: false },
      { name: "Femi Adebayo", paid: false },
    ],
    activity: ["Circle created", "Cycle 1 paid by Tunde"],
  },
  {
    id: "c3",
    name: "NYSC Savings Squad",
    amountNGN: 20000,
    frequency: "Biweekly",
    membersCount: 5,
    startDate: "2026-07-01",
    payoutMethod: "Bidding",
    lateFeePct: 0,
    graceDays: 1,
    status: "Forming",
    joined: false,
    cyclesPaid: 0,
    inviteCode: "AJO-NYSC",
    members: [
      { name: "Ngozi Eze", paid: false },
      { name: "Chidinma Ude", paid: false },
    ],
    activity: ["Circle created"],
  },
];

const seedTransactions: Tx[] = [
  { id: "t1", type: "TOPUP", label: "Wallet top up", amount: 235000, createdAt: "2026-07-08T09:12:00.000Z" },
  { id: "t2", type: "CONTRIB", label: "Market Sisters Circle contribution", amount: 50000, createdAt: "2026-07-07T18:30:00.000Z" },
];

const seedNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Payment reminder",
    body: "Your Market Sisters Circle contribution is due in 2 days.",
    type: "reminder",
    createdAt: "2026-07-07T09:00:00.000Z",
    read: false,
  },
  {
    id: "n2",
    title: "Payout released",
    body: "Cycle 2 payout released to Tunde (escrow hold complete).",
    type: "payout",
    createdAt: "2026-07-06T09:00:00.000Z",
    read: false,
  },
  {
    id: "n3",
    title: "Default alert",
    body: "A member missed the grace period in Lagos Builders Fund.",
    type: "alert",
    createdAt: "2026-07-04T09:00:00.000Z",
    read: true,
  },
];

const initialState: State = {
  user: seedUser,
  balance: 185000,
  transactions: seedTransactions,
  circles: seedCircles,
  notifications: seedNotifications,
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate persisted demo state after mount
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* ignore */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const toast = useCallback((message: string, kind: Toast["kind"] = "success") => {
    const id = uid();
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const pushNotification = useCallback(
    (n: Omit<NotificationItem, "id" | "createdAt" | "read">) => {
      setState((s) => ({
        ...s,
        notifications: [
          { id: uid(), createdAt: nowISO(), read: false, ...n },
          ...s.notifications,
        ],
      }));
    },
    []
  );

  const login = useCallback(
    (email: string) => {
      const name = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
      setState((s) => ({
        ...s,
        user: {
          name: name || "Demo Member",
          email: email || "demo@ajo.ng",
          phone: s.user?.phone || "+234 800 000 0000",
          verified: true,
          trustScore: s.user?.trustScore ?? 85,
        },
      }));
      toast("Logged in — welcome back");
    },
    [toast]
  );

  const signup = useCallback(
    (input: { name: string; email: string; phone: string }) => {
      setState((s) => ({
        ...s,
        user: {
          name: input.name || "New Member",
          email: input.email || "new@ajo.ng",
          phone: input.phone || "+234 800 000 0000",
          verified: false,
          trustScore: 50,
        },
      }));
      toast("Account created — you're in");
    },
    [toast]
  );

  const logout = useCallback(() => {
    setState((s) => ({ ...s, user: null }));
    toast("Logged out", "info");
  }, [toast]);

  const updateProfile = useCallback(
    (patch: Partial<User>) => {
      setState((s) => (s.user ? { ...s, user: { ...s.user, ...patch } } : s));
      toast("Profile updated");
    },
    [toast]
  );

  const topUp = useCallback(
    (amount: number) => {
      if (!Number.isFinite(amount) || amount <= 0) {
        toast("Enter a valid amount", "error");
        return false;
      }
      setState((s) => ({
        ...s,
        balance: s.balance + amount,
        transactions: [
          { id: uid(), type: "TOPUP", label: "Wallet top up", amount, createdAt: nowISO() },
          ...s.transactions,
        ],
      }));
      toast(`Added ${amount.toLocaleString("en-NG")} to wallet`);
      return true;
    },
    [toast]
  );

  const withdraw = useCallback(
    (amount: number) => {
      if (!Number.isFinite(amount) || amount <= 0) {
        toast("Enter a valid amount", "error");
        return false;
      }
      let ok = false;
      setState((s) => {
        if (amount > s.balance) return s;
        ok = true;
        return {
          ...s,
          balance: s.balance - amount,
          transactions: [
            { id: uid(), type: "WITHDRAW", label: "Wallet withdrawal", amount, createdAt: nowISO() },
            ...s.transactions,
          ],
        };
      });
      if (ok) toast("Withdrawal queued");
      else toast("Insufficient balance", "error");
      return ok;
    },
    [toast]
  );

  const contribute = useCallback(
    (circleId: string, amount: number) => {
      let ok = false;
      setState((s) => {
        const c = s.circles.find((x) => x.id === circleId);
        if (!c || amount > s.balance) return s;
        ok = true;
        return {
          ...s,
          balance: s.balance - amount,
          transactions: [
            { id: uid(), type: "CONTRIB", label: `${c.name} contribution`, amount, createdAt: nowISO() },
            ...s.transactions,
          ],
          circles: s.circles.map((x) =>
            x.id === circleId
              ? {
                  ...x,
                  cyclesPaid: x.cyclesPaid + 1,
                  members: x.members.map((m, i) => (i === x.cyclesPaid % Math.max(1, x.members.length) ? { ...m, paid: true } : m)),
                  activity: [...x.activity, `Contribution of ${amount.toLocaleString("en-NG")} paid`],
                }
              : x
          ),
        };
      });
      if (ok) toast("Contribution recorded");
      else toast("Insufficient balance for this contribution", "error");
      return ok;
    },
    [toast]
  );

  const createCircle = useCallback(
    (input: NewCircleInput) => {
      const id = uid();
      const me = state.user;
      const circle: Circle = {
        id,
        name: input.name || "New Circle",
        amountNGN: input.amountNGN,
        frequency: input.frequency,
        membersCount: Math.max(2, input.membersCount),
        startDate: input.startDate || addDays(0),
        payoutMethod: input.payoutMethod,
        lateFeePct: input.lateFeePct,
        graceDays: input.graceDays,
        status: "Forming",
        joined: true,
        cyclesPaid: 0,
        inviteCode: `AJO-${id.slice(0, 4).toUpperCase()}`,
        members: me ? [{ name: me.name, paid: false }] : [{ name: "You", paid: false }],
        activity: ["Circle created"],
      };
      setState((s) => ({ ...s, circles: [circle, ...s.circles] }));
      pushNotification({
        title: "Circle created",
        body: `${circle.name} is ready. Invite members to start.`,
        type: "circle",
      });
      toast("Circle created");
      return id;
    },
    [state.user, pushNotification, toast]
  );

  const joinCircle = useCallback(
    (circleId: string) => {
      setState((s) => ({
        ...s,
        circles: s.circles.map((c) =>
          c.id === circleId
            ? {
                ...c,
                joined: true,
                members: s.user
                  ? c.members.some((m) => m.name === s.user!.name)
                    ? c.members
                    : [...c.members, { name: s.user.name, paid: false }]
                  : c.members,
                activity: [...c.activity, `${s.user?.name ?? "Member"} joined the circle`],
              }
            : c
        ),
      }));
      toast("Joined circle");
    },
    [toast]
  );

  const leaveCircle = useCallback(
    (circleId: string) => {
      setState((s) => ({
        ...s,
        circles: s.circles.map((c) =>
          c.id === circleId
            ? {
                ...c,
                joined: false,
                activity: [...c.activity, `${s.user?.name ?? "Member"} left the circle`],
              }
            : c
        ),
      }));
      toast("Left circle", "info");
    },
    [toast]
  );

  const markRead = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  }, []);

  const markAllRead = useCallback(() => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const getCircle = useCallback((id: string) => state.circles.find((c) => c.id === id), [state.circles]);

  const value = useMemo<DemoContextValue>(() => {
    const myCircles = state.circles.filter((c) => c.joined);
    const pendingTotal = myCircles
      .filter((c) => c.status !== "Completed")
      .reduce((sum, c) => sum + c.amountNGN, 0);
    return {
      ...state,
      authed: !!state.user,
      unreadCount: state.notifications.filter((n) => !n.read).length,
      myCircles,
      pendingTotal,
      login,
      signup,
      logout,
      updateProfile,
      topUp,
      withdraw,
      contribute,
      createCircle,
      joinCircle,
      leaveCircle,
      markRead,
      markAllRead,
      getCircle,
      toast,
    };
  }, [
    state,
    login,
    signup,
    logout,
    updateProfile,
    topUp,
    withdraw,
    contribute,
    createCircle,
    joinCircle,
    leaveCircle,
    markRead,
    markAllRead,
    getCircle,
    toast,
  ]);

  return (
    <DemoContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto w-full max-w-sm rounded-xl border px-4 py-3 text-sm shadow-lg ${
              t.kind === "error"
                ? "border-[color:var(--danger)] bg-[color:var(--card)] text-[color:var(--danger)]"
                : t.kind === "info"
                  ? "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--fg)]"
                  : "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
