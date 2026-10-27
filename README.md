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
- HeroUI, Gravity UI Icons, React Icons, and React Hot Toast
- Tailwind CSS 4 utility classes for all application styling
- Framer Motion

## Features and Functions

### Visitor and recipe features

- Browse recipes and open recipe details.
- Search recipes, filter by category, and move through paginated results.
- Like a recipe once per signed-in account, add or remove favorites, and report recipes.
- View recipe images, ingredients, instructions, preparation time, difficulty, and author.
- Switch between light and dark themes.
- Open responsive navigation from the three-dot mobile menu and visit Facebook, LinkedIn, or GitHub from the footer.

### Account and dashboard features

- Register or sign in with email and password; Google sign-in is available when configured.
- Sign out, view and update profile details, and display profile image and gender.
- View personal dashboard totals for recipes, favorites, likes, and Premium status.
- Submit recipes for admin approval, then edit or delete your own submissions.
- Free accounts can keep up to 3 non-deleted recipes, including pending and
  rejected submissions; Premium accounts have no submission limit.
- View purchased recipes and payment confirmation status.

### Premium and payments

- Start Stripe Checkout for Premium membership or recipe purchases.
- Verify a completed Checkout session with the backend before showing a confirmed state.
- Save completed transactions and enable Premium benefits after successful verification.

### Admin features

- Restrict the admin workspace and admin API actions to administrator accounts.
- View admin dashboard totals and transactions.
- Review, approve, or reject recipes before they appear in public listings.
- Assign or remove admin roles and block or unblock accounts.
- Feature or unfeature recipes, remove recipes, and review, dismiss, or remove reported content.

### Shared application functions

- Use the same-origin API proxy to attach a short-lived backend JWT to authenticated API requests.
- Show loading, empty, success, and error states for data-driven dashboard and payment views.
- Use HeroUI components, Gravity UI icons, toast notifications, and Framer Motion effects.

## How the app works

The Next.js app handles pages, Better Auth sessions, and the same-origin
`/api/backend/*` proxy. The Express API handles recipe and account data, admin
actions, and Stripe Checkout. MongoDB is shared by the services. The proxy
converts the signed-in Better Auth user into a short-lived backend JWT, so
browser requests do not need a MongoDB or JWT secret.

Regular users' new or edited recipes stay pending and are hidden from public
search until an admin approves them. Admin submissions can publish directly.
Free users can keep up to three non-deleted recipes; Premium members have no
submission limit.

## API connection

The browser sends API calls to the Next.js route `/api/backend/*`. The proxy
forwards them to `NEXT_PUBLIC_API_BASE_URL` and attaches authentication when
available. The backend defaults to `http://localhost:5000`; its `CLIENT_ORIGIN`
must allow the frontend origin. The frontend and backend must use the same
`MONGODB_URI` and `JWT_SECRET`.

Key backend routes include:

- `/health` for MongoDB readiness.
- `/api/recipes` for public, approved recipe search and filtering.
- `/api/recipes/:id` for details and owner-managed submissions.
- `/api/dashboard/overview` and `/api/favorites` for user dashboard data.
- `/api/payments/*` for Stripe Checkout and payment confirmation.
- `/api/admin/*` for admin-only management and moderation.

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

Start the Express API in its own terminal after creating the backend `.env`:

```powershell
cd C:\projects\Assignment\assignment-10-backend
npm install
npm run dev
```

Then create the frontend `.env.local` with the frontend settings above and start
the app in a second terminal:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Do not pass `index.js` to the frontend's `npm run dev` or `next dev` command.
That makes Next.js treat `index.js` as the frontend project directory and
produces an "Invalid project directory" error. The backend already has its
own `npm run dev` command and does not require `nodemon`.

## Verification

```bash
npm run lint
npm run build
```

Run lint and build from the frontend directory. The production build requires
`BETTER_AUTH_SECRET` and valid frontend environment settings.

## Deployment notes

The frontend can be deployed to a Next.js host such as Vercel. Deploy the
Express API separately and set `NEXT_PUBLIC_API_BASE_URL` to its public HTTPS
origin. Set `CLIENT_ORIGIN` on the API to the deployed frontend origin, and
configure the same `MONGODB_URI` and `JWT_SECRET` in both services. Add the
production frontend URL to Google OAuth's allowed redirect URIs. Keep server
secrets in the host's environment settings, not in source control.
