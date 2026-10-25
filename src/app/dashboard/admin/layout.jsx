import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBackendUser } from "@/lib/backend-user";

export default async function AdminLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login?next=%2Fdashboard%2Fadmin");

  const user = await getBackendUser(session.user);
  if (user?.role !== "admin") redirect("/dashboard");

  return children;
}
