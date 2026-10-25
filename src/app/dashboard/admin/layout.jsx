import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/layout/DashboardNav";
import { auth } from "@/lib/auth";
import { getBackendUser } from "@/lib/backend-user";

const items = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/users", label: "Manage Users" },
  { href: "/dashboard/admin/recipes", label: "Manage Recipes" },
  { href: "/dashboard/admin/reports", label: "Reports" },
  { href: "/dashboard/admin/transactions", label: "Transactions" },
];

export default async function AdminLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login?next=%2Fdashboard%2Fadmin");

  const user = await getBackendUser(session.user);
  if (user?.role !== "admin") redirect("/dashboard");

  return (
    <div className="grid grid-cols-[280px_minmax(0,1fr)] items-start gap-6 max-[980px]:grid-cols-1">
      <DashboardNav items={items} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
