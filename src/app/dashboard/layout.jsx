import { DashboardNav } from "@/components/layout/DashboardNav";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/my-recipes", label: "My Recipes" },
  { href: "/dashboard/add-recipe", label: "Add Recipe" },
  { href: "/dashboard/favorites", label: "My Favorites" },
  { href: "/dashboard/purchased", label: "Purchased Recipes" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardNav items={items} />
      <div className="dashboard-content">{children}</div>
    </div>
  );
}
