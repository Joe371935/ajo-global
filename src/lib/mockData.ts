export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  verified: boolean;
  trustScore: number;
};

export type Circle = {
  id: string;
  name: string;
  amountNGN: number;
  frequency: "Weekly" | "Biweekly" | "Monthly";
  membersCount: number;
  startDate: string;
  payoutMethod: "Random draw" | "Fixed order" | "Bidding";
  lateFeePct: number;
  graceDays: number;
  status: "Forming" | "Active" | "Completed";
};

export const demoUsers: User[] = [
  { id: "u1", name: "Adaeze Okafor", email: "ada@ajo.ng", phone: "+234 801 111 0001", avatar: "AO", verified: true, trustScore: 92 },
  { id: "u2", name: "Tunde Bakare", email: "tunde@ajo.ng", phone: "+234 801 111 0002", avatar: "TB", verified: true, trustScore: 88 },
  { id: "u3", name: "Ngozi Eze", email: "ngozi@ajo.ng", phone: "+234 801 111 0003", avatar: "NE", verified: false, trustScore: 76 },
  { id: "u4", name: "Ibrahim Musa", email: "ibrahim@ajo.ng", phone: "+234 801 111 0004", avatar: "IM", verified: true, trustScore: 95 },
  { id: "u5", name: "Chidinma Ude", email: "chidi@ajo.ng", phone: "+234 801 111 0005", avatar: "CU", verified: true, trustScore: 81 },
  { id: "u6", name: "Femi Adebayo", email: "femi@ajo.ng", phone: "+234 801 111 0006", avatar: "FA", verified: false, trustScore: 67 },
];

export const demoCircles: Circle[] = [
  { id: "c1", name: "Market Sisters Circle", amountNGN: 50000, frequency: "Weekly", membersCount: 6, startDate: "2026-05-01", payoutMethod: "Fixed order", lateFeePct: 5, graceDays: 2, status: "Active" },
  { id: "c2", name: "Lagos Builders Fund", amountNGN: 200000, frequency: "Monthly", membersCount: 8, startDate: "2026-06-15", payoutMethod: "Random draw", lateFeePct: 3, graceDays: 3, status: "Active" },
  { id: "c3", name: "NYSC Savings Squad", amountNGN: 20000, frequency: "Biweekly", membersCount: 5, startDate: "2026-07-01", payoutMethod: "Bidding", lateFeePct: 0, graceDays: 1, status: "Forming" },
];
