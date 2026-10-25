# RecipeHub Frontend

RecipeHub is a recipe sharing platform frontend built with Next.js 16. It covers the public recipe discovery flow, user dashboard, admin dashboard, premium membership screen, payment success screen, theme toggle, pagination UI, reporting modal, and Framer Motion animation requirement.

<p align="center">
  <img src="https://img.shields.io/badge/NEXT.JS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/EXPRESS-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MONGODB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/BETTER_AUTH-4B32C3?style=for-the-badge" alt="Better Auth" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/TAILWIND_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/HEROUI-7828C8?style=for-the-badge" alt="HeroUI" />
  <img src="https://img.shields.io/badge/GRAVITY_UI_ICONS-FF4F00?style=for-the-badge" alt="Gravity UI Icons" />
  <img src="https://img.shields.io/badge/STRIPE-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
</p>

## Tech Stack

- Next.js 16 App Router
- Better Auth with MongoDB
- Express API with JWT bearer verification
- HeroUI, Gravity UI Icons, and React Hot Toast
- Tailwind CSS 4 utility classes for all application styling
- Framer Motion

## Features and Functions

### Visitor and recipe features

- Browse recipes and open recipe details.
- Search recipes, filter by category, and move through paginated results.
- Like a recipe once per signed-in account, add or remove favorites, and report recipes.
- View recipe images, ingredients, instructions, preparation time, difficulty, and author.
- Switch between light and dark themes.

### Account and dashboard features

- Register or sign in with email and password; Google sign-in is available when configured.
- Sign out, view and update profile details, and display profile image and gender.
- View personal dashboard totals for recipes, favorites, likes, and Premium status.
- Create, edit, and delete your own recipes.
- Publish up to 3 recipes on a free account; Premium accounts can publish without this limit.
- View purchased recipes and payment confirmation status.

### Premium and payments

- Start Stripe Checkout for Premium membership or recipe purchases.
- Verify a completed Checkout session with the backend before showing a confirmed state.
- Save completed transactions and enable Premium benefits after successful verification.

### Admin features

- Restrict the admin workspace and admin API actions to administrator accounts.
- View admin dashboard totals and transactions.
- Assign or remove admin roles and block or unblock accounts.
- Feature or unfeature recipes, remove recipes, and review, dismiss, or remove reported content.

### Shared application functions

- Use the same-origin API proxy to attach a short-lived backend JWT to authenticated API requests.
- Show loading, empty, success, and error states for data-driven dashboard and payment views.
- Use HeroUI components, Gravity UI icons, toast notifications, and Framer Motion effects.

## Environment

Keep frontend and backend environment variables separate. Copy the examples to
`.env.local` in the frontend and `.env` in the backend. Never put database
credentials, JWT/Better Auth secrets, Google client secrets, or Stripe secret
keys in a `NEXT_PUBLIC_*` variable or the frontend environment.

The frontend needs `NEXT_PUBLIC_API_BASE_URL` (for local development:
`http://localhost:5000`), `MONGODB_URI`, `DB_NAME`, `JWT_SECRET`,
`BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`. The backend needs the same
`MONGODB_URI` and `JWT_SECRET`, plus `CLIENT_ORIGIN` and `STRIPE_SECRET_KEY`
to create Stripe Checkout sessions.
Use `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Better Auth Google sign-in.
`NEXT_PUBLIC_IMGBB_API_KEY` is used by browser image uploads and
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe to expose to the browser. The
current hosted Checkout redirect uses inline prices and only needs the Stripe
secret key in the backend; a publishable key or Stripe Price IDs are not
required.
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
In particular, use `MONGODB_URI` (not `NEXT_PUBLIC_MONGODB_URI`) in both
server environments, and `STRIPE_SECRET_KEY` only in the backend. Only the
Stripe publishable key and imgbb upload key should use `NEXT_PUBLIC_`.
Use the MongoDB Atlas **database user** credentials in `MONGODB_URI` (not the
Atlas website login), allow the development machine's IP in Atlas Network
Access, and percent-encode any reserved characters in the database password.
The frontend and backend must use the same working MongoDB URI. If either
server reports `bad auth: Authentication failed`, reset the Atlas Database
Access user's password, update `MONGODB_URI` in both private environment files,
and restart both servers. Stripe Checkout additionally needs `STRIPE_SECRET_KEY`
in the backend environment. Use a Stripe test-mode secret key while testing;
never paste the key into chat or commit it. The current payment confirmation
retrieves the Checkout session from Stripe after redirect, so a webhook signing
secret is not required for this flow.
Both environment examples use the `assignment-10` database by default.
If a live key or database password is pasted into chat or another shared
location, rotate it in its provider dashboard and update the private `.env`
files; do not commit those files.

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
