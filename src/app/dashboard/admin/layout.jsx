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
    <div className="grid grid-cols-[280px_minmax(0,1fr)] items-start gap-6 max-[980px]:grid-cols-1">
      <DashboardNav items={items} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
