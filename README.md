# Bartender

The go to app for all of your bartending, barkeeping, and mixologist needs.

Live Demo: https://bar-tender-app.vercel.app

<img width="1428" height="1040" alt="Bartender Homescreen" src="https://github.com/user-attachments/assets/9be7b478-6626-47b6-8c35-4c9af440e24d" />

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Convex** - Serverless database and API
- **Clerk** - User authentication (proxy.ts for Next.js 16)
- **shadcn UI** - Accessible component library
- **Tailwind CSS** - Styling

## Features

- **Inventory Tracker** - CRUD for ingredients with quantity, unit, and category
- **Drinks Catalog** - Browse 100+ IBA official cocktails
- **What Can I Make?** - Filter drinks by your current inventory
- **Drink Detail** - Ingredients, preparation steps, collapsible history
- **Make This Drink** - Subtract ingredients from inventory
- **Saved Drinks** - Save favorites for quick access
- **Dark/Light Mode** - Theme toggle in header

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Convex

```bash
npx convex dev
```

This will:
- Prompt you to log in or create a Convex account
- Create a new project or link to existing
- Generate `convex/_generated` and add env vars to `.env.local`

### 3. Set up Clerk

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Add your keys to `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### 4. Configure Convex + Clerk auth

1. In Clerk Dashboard → JWT Templates → New template → Convex
2. Copy the Issuer URL
3. In Convex Dashboard → Settings → Environment Variables, add:
   - `CLERK_JWT_ISSUER_DOMAIN` = your Clerk Issuer URL

### 5. Seed the drinks database

After Convex is running, open the Convex Dashboard and run the `seed:seedDrinks` action to populate the IBA cocktails catalog.

### 6. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_CONVEX_URL=       # From `npx convex dev`
CONVEX_DEPLOYMENT=           # From `npx convex dev`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Analytics (Optional)

When deploying to Vercel, add `@vercel/analytics` for analytics:

```bash
npm install @vercel/analytics
```

Then add `<Analytics />` from `@vercel/analytics/react` to your root layout.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright E2E tests

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities
└── providers/        # Context providers
convex/
├── schema.ts         # Database schema
├── ingredients.ts    # Inventory CRUD
├── drinks.ts        # Drinks queries
├── savedDrinks.ts   # Saved drinks
└── seed.ts          # IBA drinks seeder
```
