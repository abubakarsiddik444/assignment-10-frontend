import Link from "next/link";

export function DashboardNav({ items }) {
  return (
    <aside className="sticky top-[100px] rounded-2xl border border-stone-200 bg-white p-[18px] dark:border-neutral-800 dark:bg-neutral-900 max-[980px]:static [&_h2]:mb-3.5 [&_h2]:mt-0 [&_h2]:text-base [&_nav]:grid [&_nav]:gap-2 [&_a]:flex [&_a]:min-h-10 [&_a]:items-center [&_a]:rounded-xl [&_a]:px-3 [&_a]:font-bold [&_a]:text-stone-500 [&_a:hover]:bg-stone-100 [&_a:hover]:text-stone-900 dark:[&_a]:text-stone-400 dark:[&_a:hover]:bg-neutral-800 dark:[&_a:hover]:text-stone-100">
      <h2>Workspace</h2>
      <nav aria-label="Dashboard navigation">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
