"use client";

import { ChartLineArrowUp, Cup, Heart, SealCheck } from "@gravity-ui/icons";
import { Card, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const metrics = [
  { key: "totalRecipes", label: "My Recipes", icon: Cup },
  { key: "totalFavorites", label: "My Favorites", icon: Heart },
  { key: "totalLikesReceived", label: "Likes Received", icon: ChartLineArrowUp },
];

export function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    apiFetch("/api/dashboard/overview")
      .then((data) => {
        if (active) setStats(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load your dashboard overview.");
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (!stats) return <Card><Card.Content className="flex items-center gap-3"><Spinner /> Loading your overview...</Card.Content></Card>;

  return (
    <div className="grid grid-cols-4 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
      {metrics.map(({ key, label, icon: Icon }) => (
        <Card key={key}>
          <Card.Content className="grid min-h-[150px] content-between p-[22px]">
            <Icon size={22} className="text-emerald-800 dark:text-emerald-300" />
            <span className="text-stone-500 dark:text-stone-400">{label}</span>
            <strong className="text-3xl">{stats[key]}</strong>
          </Card.Content>
        </Card>
      ))}
      <Card>
        <Card.Content className="grid min-h-[150px] content-between p-[22px]">
          <SealCheck size={22} className="text-emerald-800 dark:text-emerald-300" />
          <span className="text-stone-500 dark:text-stone-400">Premium</span>
          <strong className="text-3xl">{stats.isPremium ? "Active" : "Locked"}</strong>
        </Card.Content>
      </Card>
    </div>
  );
}
