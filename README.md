# RecipeHub Frontend

RecipeHub is a recipe sharing platform frontend built with Next.js 16. It covers the public recipe discovery flow, user dashboard, admin dashboard, premium membership screen, payment success screen, theme toggle, pagination UI, reporting modal, and Framer Motion animation requirement.

## Tech Stack

- Next.js 16 App Router
- React 19
- Better Auth with MongoDB
- Express API with JWT bearer verification
- HeroUI, Gravity UI icons, and React Hot Toast
- Tailwind CSS 4 entrypoint with custom global design tokens
- Framer Motion
- Lucide React icons

## Environment

Keep frontend and backend environment variables separate. Copy the examples to
`.env.local` in the frontend and `.env` in the backend. Never put database
credentials, JWT/Better Auth secrets, Google client secrets, or Stripe secret
keys in a `NEXT_PUBLIC_*` variable or the frontend environment.

The frontend needs `NEXT_PUBLIC_API_BASE_URL` (for local development:
`http://localhost:5000`), `MONGODB_URI`, `DB_NAME`, `JWT_SECRET`,
`BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`. The backend needs the same
`MONGODB_URI` and `JWT_SECRET`, plus `CLIENT_ORIGIN` and `STRIPE_SECRET_KEY`.
Use `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Better Auth Google sign-in.
`NEXT_PUBLIC_IMGBB_API_KEY` is used by browser image uploads and
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe to expose to the browser.
Generate `JWT_SECRET` and `BETTER_AUTH_SECRET` yourself (for example,
`node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`).
Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the backend environment only if you
want the API to create an initial administrator. Use a unique, strong password.
For Google OAuth, register `http://localhost:3000/api/auth/callback/google`
as a development redirect URI and the matching callback URL for your deployed
frontend.

MongoDB, Better Auth, JWT, and Google OAuth credentials are server-side values:
do not give them a `NEXT_PUBLIC_` prefix. Keep Stripe's secret key only in the
backend `.env`, never in the frontend.

## Routes

- `/` home with banner, featured recipes, popular recipes, and extra sections
- `/browse-recipes` recipe cards with search, category filter, and pagination UI
- `/recipes/[id]` recipe details with like, purchase, report, and favorite actions
- `/login` and `/register`
- `/dashboard` user overview
- `/dashboard/add-recipe`
- `/dashboard/my-recipes`
- `/dashboard/favorites`
- `/dashboard/purchased`
- `/dashboard/profile`
- `/premium`
- `/payment-success`
- `/dashboard/admin`
- `/dashboard/admin/users`
- `/dashboard/admin/recipes`
- `/dashboard/admin/reports`
- `/dashboard/admin/transactions`

## Run Locally

Start the Express API from `C:\projects\Assignment\assignment-10-backend`
after creating its `.env` from `.env.example`:

```bash
npm install
npm run dev
```

Then start the frontend from this directory after creating `.env.local` from
`.env.example` and setting `BETTER_AUTH_SECRET`, `JWT_SECRET`, and
`MONGODB_URI` (the MongoDB URI and JWT secret must match the backend values):

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

Run lint and build from the frontend directory. The production build requires a
`BETTER_AUTH_SECRET` to be set in the environment.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
