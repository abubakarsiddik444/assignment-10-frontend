# RecipeHub Frontend

RecipeHub is a recipe sharing platform frontend built with Next.js 16. It covers the public recipe discovery flow, user dashboard, admin dashboard, premium membership screen, payment success screen, theme toggle, pagination UI, reporting modal, and Framer Motion animation requirement.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4 entrypoint with custom global design tokens
- Framer Motion
- Lucide React icons

## Environment

Keep frontend and backend environment variables separate. Copy the examples to
`.env.local` in the frontend and `.env` in the backend. Never put database
credentials, JWT/Better Auth secrets, Google client secrets, or Stripe secret
keys in a `NEXT_PUBLIC_*` variable or the frontend environment.

The frontend needs `NEXT_PUBLIC_API_BASE_URL` (for local development:
`http://localhost:5000`). The backend needs `MONGODB_URI`, a random
`JWT_SECRET` of at least 32 characters, `CLIENT_ORIGIN`, and `STRIPE_SECRET_KEY`
to enable checkout. Set `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`,
`GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` for the Better Auth/OAuth
configuration. `NEXT_PUBLIC_IMGBB_API_KEY` is used by the browser image upload.
Generate both secrets yourself (for example,
`node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`).

The current frontend `.env` contains server credentials named with the
`NEXT_PUBLIC_` prefix. Move those values to the backend `.env` using the
server-only names above, remove their old frontend entries, and rotate any
secrets that may already have been exposed or committed. Do not send secret
values in chat.

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
`.env.example` and setting `BETTER_AUTH_SECRET`:

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
