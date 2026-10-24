"use client";

import { motion } from "framer-motion";
import { Medal, Persons, Sparkles } from "@gravity-ui/icons";

const features = [
  {
    icon: Sparkles,
    title: "Creator-first sharing",
    text: "Publish recipes, track likes, and build a personal cookbook profile.",
  },
  {
    icon: Medal,
    title: "Premium unlocks",
    text: "Members can add unlimited recipes and carry a premium profile badge.",
  },
  {
    icon: Persons,
    title: "Moderated community",
    text: "Reports, featured recipes, and admin controls keep the platform curated.",
  },
];

export function MotionFeature() {
  return (
    <section className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)]">
      <div className="mb-7 max-w-[720px] [&_h2]:m-0 [&_h2]:text-[clamp(1.9rem,4vw,3.4rem)] [&_h2]:tracking-tight">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Animated workflow</span>
        <h2>From kitchen notes to community favorite</h2>
      </div>
      <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              className="min-h-[210px] rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_h3]:mt-[18px] [&_h3]:text-xl [&_h3]:font-bold [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300"
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
            >
              <span className="inline-grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Icon size={22} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
