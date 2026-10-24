import Link from "next/link";

export function DashboardNav({ items }) {
  return (
    <aside className="dashboard-sidebar">
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
