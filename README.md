# Ajo Global (Prototype)

Premium web prototype for digitizing Nigerian ajo/esusu rotating savings with trust, transparency, and simulated money movement.

## Setup
1. `cd ajo-global`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## Build
- `npm run build`
- `npm run start`

## Architecture (current prototype)
- Next.js App Router + TypeScript + Tailwind CSS
- Mocked in-memory UI data in `src/lib/mockData.ts`
- Currency helper `formatNGN` formats amounts as `₦` with separators
- Prisma schema is included (`prisma/schema.prisma`) for planned persistence; current pages are UI prototype-first

## What is mocked vs production-needed
### Mocked now
- Authentication/session flow (UI pages only)
- Wallet balance and transaction history
- Payment provider behavior (no real gateway calls)
- Escrow/payout release timing and notifications content
- Trust score values and activity log entries

### Needed for production
- Real auth (NextAuth/Credentials + secure password reset/session hardening)
- Persistent DB via Prisma migrations and server actions/API routes
- Real payment integration behind `PaymentProvider` (Paystack/Flutterwave)
- KYC/identity checks, audit-grade logging, and role-based access controls
- Notification delivery (email/SMS/push) and background schedulers for due cycles/default handling

## Key routes
- `/` landing
- `/login`, `/signup`
- `/dashboard`
- `/circles/new`, `/circles/c1`
- `/wallet`
- `/profile`
- `/notifications`

## Notes for presentation/demo
- This prototype is optimized for demo clarity and mobile-first UX.
- Data shown is intentionally realistic and static for first-run demo experience.
