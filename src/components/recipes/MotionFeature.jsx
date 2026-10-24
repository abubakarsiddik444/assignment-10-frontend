"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Creator-first sharing",
    text: "Publish recipes, track likes, and build a personal cookbook profile.",
  },
  {
    icon: Award,
    title: "Premium unlocks",
    text: "Members can add unlimited recipes and carry a premium profile badge.",
  },
  {
    icon: Users,
    title: "Moderated community",
    text: "Reports, featured recipes, and admin controls keep the platform curated.",
  },
];

export function MotionFeature() {
  return (
    <section className="section">
      <div className="section-heading">
        <span className="eyebrow">Animated workflow</span>
        <h2>From kitchen notes to community favorite</h2>
      </div>
      <div className="feature-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              className="feature-panel"
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
            >
              <span className="feature-icon">
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
