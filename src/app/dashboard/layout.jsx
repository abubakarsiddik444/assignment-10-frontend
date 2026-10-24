import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { auth } from "@/lib/auth";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/my-recipes", label: "My Recipes" },
  { href: "/dashboard/add-recipe", label: "Add Recipe" },
  { href: "/dashboard/favorites", label: "My Favorites" },
  { href: "/dashboard/purchased", label: "Purchased Recipes" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login?next=%2Fdashboard");
  }

  return (
    <div className="grid grid-cols-[280px_minmax(0,1fr)] items-start gap-6 max-[980px]:grid-cols-1">
      <DashboardNav items={items} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
