import { ChartLineArrowUp, Cup, Heart, SealCheck } from "@gravity-ui/icons";
import { getOverview } from "@/lib/api";

export const metadata = {
  title: "Dashboard - RecipeHub",
};

export default async function DashboardPage() {
  const stats = await getOverview();
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_h1]:text-[clamp(2rem,5vw,3.2rem)]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">User dashboard</span>
        <h1>Overview</h1>
      </div>
      <div className="grid grid-cols-4 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <Cup size={22} />
          <span>Total Recipes</span>
          <strong>{stats.totalRecipes}</strong>
        </article>
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <Heart size={22} />
          <span>Total Favorites</span>
          <strong>{stats.totalFavorites}</strong>
        </article>
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <ChartLineArrowUp size={22} />
          <span>Likes Received</span>
          <strong>{stats.totalLikesReceived}</strong>
        </article>
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <SealCheck size={22} />
          <span>Premium</span>
          <strong>{stats.isPremium ? "Active" : "Locked"}</strong>
        </article>
      </div>
    </section>
  );
}
