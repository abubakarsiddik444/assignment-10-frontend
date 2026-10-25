import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { getBackendUser } from "@/lib/backend-user";

export const instant = false;

export default async function AdminLayout({ children }) {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login?next=%2Fdashboard%2Fadmin");

  const user = await getBackendUser(session.user);
  if (user?.role !== "admin") redirect("/dashboard");

  return children;
}
