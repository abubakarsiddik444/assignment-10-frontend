import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, ShieldCheck, UploadCloud } from "lucide-react";
import { MotionFeature } from "@/components/recipes/MotionFeature";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { getRecipes } from "@/lib/api";

export default async function Home() {
  const [{ recipes: featuredRecipes }, { recipes: popularRecipes }] = await Promise.all([
    getRecipes({ featured: "true", limit: 3 }),
    getRecipes({ sort: "popular", limit: 3 }),
  ]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Recipe sharing platform</span>
          <h1>RecipeHub</h1>
          <p>
            Create, share, discover, save, report, and purchase recipes from a
            polished community kitchen built for food lovers and creators.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/browse-recipes">
              Browse Recipes <ArrowRight size={18} />
            </Link>
            <Link className="button button-ghost" href="/dashboard/add-recipe">
              Add Recipe
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <Image
            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1400&q=80"
            alt="A table filled with colorful dishes"
            width={1400}
            height={1000}
            priority
            sizes="(max-width: 980px) 100vw, 55vw"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Featured by admin</span>
          <h2>Featured Recipes</h2>
        </div>
        <div className="recipe-grid">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <span className="eyebrow">Most liked</span>
          <h2>Popular Recipes</h2>
        </div>
        <div className="popular-list">
          {popularRecipes.map((recipe, index) => (
            <article className="popular-item" key={recipe.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{recipe.recipeName}</h3>
                <p>
                  {recipe.likesCount} likes by {recipe.authorName}
                </p>
              </div>
              <Flame size={22} />
            </article>
          ))}
        </div>
      </section>

      <MotionFeature />

      <section className="section creator-band">
        <div className="creator-card">
          <UploadCloud size={28} />
          <h2>Publish from any kitchen</h2>
          <p>
            Add images, category, cuisine, difficulty, ingredients, instructions,
            and preparation time with a form ready for imgbb integration.
          </p>
        </div>
        <div className="creator-card">
          <ShieldCheck size={28} />
          <h2>Admin moderation built in</h2>
          <p>
            Reports, blocked users, recipe deletion, featured recipes, and
            transactions are represented in the dashboard flow.
          </p>
        </div>
      </section>
    </>
  );
}
