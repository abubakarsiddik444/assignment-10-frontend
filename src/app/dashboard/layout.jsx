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
    <div className="dashboard-layout">
      <DashboardNav items={items} />
      <div className="dashboard-content">{children}</div>
    </div>
  );
}
