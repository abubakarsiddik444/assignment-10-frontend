import { ChartLineArrowUp, Cup, Heart, SealCheck } from "@gravity-ui/icons";
import { getOverview } from "@/lib/api";

export const metadata = {
  title: "Dashboard - RecipeHub",
};

export default async function DashboardPage() {
  const stats = await getOverview();
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">User dashboard</span>
        <h1>Overview</h1>
      </div>
      <div className="stat-grid">
        <article className="stat-card">
          <Cup size={22} />
          <span>Total Recipes</span>
          <strong>{stats.totalRecipes}</strong>
        </article>
        <article className="stat-card">
          <Heart size={22} />
          <span>Total Favorites</span>
          <strong>{stats.totalFavorites}</strong>
        </article>
        <article className="stat-card">
          <ChartLineArrowUp size={22} />
          <span>Likes Received</span>
          <strong>{stats.totalLikesReceived}</strong>
        </article>
        <article className="stat-card">
          <SealCheck size={22} />
          <span>Premium</span>
          <strong>{stats.isPremium ? "Active" : "Locked"}</strong>
        </article>
      </div>
    </section>
  );
}
