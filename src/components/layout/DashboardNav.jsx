"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@heroui/react";

export function DashboardNav({ items }) {
  const pathname = usePathname();

  return (
    <Card className="sticky top-[100px] p-[18px] max-[980px]:static [&_h2]:mb-3.5 [&_h2]:mt-0 [&_h2]:text-base [&_nav]:grid [&_nav]:gap-2 [&_a]:flex [&_a]:min-h-10 [&_a]:items-center [&_a]:rounded-xl [&_a]:px-3 [&_a]:font-bold [&_a]:text-stone-500 [&_a:hover]:bg-stone-100 [&_a:hover]:text-stone-900 dark:[&_a]:text-stone-400 dark:[&_a:hover]:bg-neutral-800 dark:[&_a:hover]:text-stone-100">
      <Card.Content className="p-0">
      <h2>Workspace</h2>
      <nav aria-label="Dashboard navigation">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className={pathname === item.href
              ? "!bg-emerald-100 !text-emerald-900 dark:!bg-emerald-950 dark:!text-emerald-300"
              : ""}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      </Card.Content>
    </Card>
  );
}
