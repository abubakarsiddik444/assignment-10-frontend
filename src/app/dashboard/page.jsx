import { DashboardOverview } from "@/components/shared/DashboardOverview";

export const metadata = {
  title: "Dashboard - RecipeHub",
};

export default function DashboardPage() {
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_h1]:text-[clamp(2rem,5vw,3.2rem)]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">User dashboard</span>
        <h1>Overview</h1>
      </div>
      <DashboardOverview />
    </section>
  );
}
