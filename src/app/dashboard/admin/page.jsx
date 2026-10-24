import { BadgeCheck, Flag, Soup, Users } from "lucide-react";
import { getDashboardStats } from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard - RecipeHub",
};

export default function AdminPage() {
  const stats = getDashboardStats();
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Admin dashboard</span>
        <h1>Overview</h1>
      </div>
      <div className="stat-grid">
        <article className="stat-card">
          <Users size={22} />
          <span>Total Users</span>
          <strong>{stats.totalUsers}</strong>
        </article>
        <article className="stat-card">
          <Soup size={22} />
          <span>Total Recipes</span>
          <strong>{stats.totalRecipes}</strong>
        </article>
        <article className="stat-card">
          <BadgeCheck size={22} />
          <span>Premium Members</span>
          <strong>{stats.totalPremiumMembers}</strong>
        </article>
        <article className="stat-card">
          <Flag size={22} />
          <span>Total Reports</span>
          <strong>{stats.totalReports}</strong>
        </article>
      </div>
    </section>
  );
}
