import { Cup, Flag, Persons, SealCheck } from "@gravity-ui/icons";
import { getDashboardStats } from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard - RecipeHub",
};

export default function AdminPage() {
  const stats = getDashboardStats();
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_h1]:text-[clamp(2rem,5vw,3.2rem)]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Admin dashboard</span>
        <h1>Overview</h1>
      </div>
      <div className="grid grid-cols-4 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <Persons size={22} />
          <span>Total Users</span>
          <strong>{stats.totalUsers}</strong>
        </article>
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <Cup size={22} />
          <span>Total Recipes</span>
          <strong>{stats.totalRecipes}</strong>
        </article>
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <SealCheck size={22} />
          <span>Premium Members</span>
          <strong>{stats.totalPremiumMembers}</strong>
        </article>
        <article className="grid min-h-[150px] content-between rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_svg]:text-emerald-800 dark:[&_svg]:text-emerald-300 [&_span]:text-stone-500 dark:[&_span]:text-stone-400 [&_strong]:text-3xl">
          <Flag size={22} />
          <span>Total Reports</span>
          <strong>{stats.totalReports}</strong>
        </article>
      </div>
    </section>
  );
}
