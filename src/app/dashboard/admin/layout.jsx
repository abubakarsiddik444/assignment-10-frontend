import { DashboardNav } from "@/components/layout/DashboardNav";

const items = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/users", label: "Manage Users" },
  { href: "/dashboard/admin/recipes", label: "Manage Recipes" },
  { href: "/dashboard/admin/reports", label: "Reports" },
  { href: "/dashboard/admin/transactions", label: "Transactions" },
];

export default function AdminLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardNav items={items} />
      <div className="dashboard-content">{children}</div>
    </div>
  );
}
