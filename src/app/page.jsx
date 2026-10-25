import Image from "next/image";
import { ArrowRight, FileArrowUp, Flame, ShieldCheck } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
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
      <section className="mx-auto mt-6 grid min-h-[calc(100vh-7.5rem)] w-[calc(100%-2rem)] max-w-[1180px] grid-cols-[minmax(0,.9fr)_minmax(360px,1.1fr)] items-stretch gap-7 pb-9 max-[980px]:min-h-0 max-[980px]:grid-cols-1 max-[660px]:w-[calc(100%-1.25rem)]">
        <Card className="flex flex-col justify-center p-6 shadow-xl sm:p-10 lg:p-14 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-[.96] [&_p]:my-6 [&_p]:max-w-[58ch] [&_p]:text-lg [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
          <Card.Content className="p-0">
          <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Recipe sharing platform</span>
          <h1>RecipeHub</h1>
          <p>
            Create, share, discover, save, report, and purchase recipes from a
            polished community kitchen built for food lovers and creators.
          </p>
          <div className="flex flex-wrap items-center gap-3 max-[660px]:[&>a]:w-full">
            <Link className="button button--primary button--lg" href="/browse-recipes">
              Browse Recipes <ArrowRight size={18} />
            </Link>
            <Link className="button button--secondary button--lg" href="/dashboard/add-recipe">
              Add Recipe
            </Link>
          </div>
          </Card.Content>
          </Card>
        <div className="min-h-[520px] overflow-hidden rounded-2xl shadow-xl max-[980px]:min-h-[360px] max-[660px]:min-h-[280px] [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
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

      <section className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)]">
        <div className="mb-7 max-w-[720px] [&_h2]:m-0 [&_h2]:text-[clamp(1.9rem,4vw,3.4rem)] [&_h2]:tracking-tight">
          <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Featured by admin</span>
          <h2>Featured Recipes</h2>
        </div>
        <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id || recipe._id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)] grid grid-cols-[.8fr_1.2fr] items-start gap-8 max-[980px]:grid-cols-1 [&_h2]:text-[clamp(1.9rem,4vw,3.4rem)]">
        <div>
          <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Most liked</span>
          <h2>Popular Recipes</h2>
        </div>
        <div className="grid gap-3">
          {popularRecipes.map((recipe, index) => (
            <Card className="[&_h3]:m-0 [&_h3]:font-bold [&_p]:m-0 [&_p]:text-stone-500 dark:[&_p]:text-stone-400 [&>span]:text-2xl [&>span]:font-extrabold [&>span]:text-amber-600" key={recipe.id || recipe._id}>
              <Card.Content className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-[18px]">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{recipe.recipeName}</h3>
                <p>
                  {recipe.likesCount} likes by {recipe.authorName}
                </p>
              </div>
              <Flame size={22} />
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <MotionFeature />

      <section className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)] grid grid-cols-2 gap-[18px] max-[980px]:grid-cols-1">
        <Card className="min-h-[230px] bg-gradient-to-br from-white to-stone-100 dark:from-neutral-900 dark:to-neutral-800 [&_h2]:mt-[18px] [&_h2]:text-2xl [&_h2]:font-bold [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
          <Card.Content className="p-[22px]">
          <FileArrowUp size={28} />
          <h2>Publish from any kitchen</h2>
          <p>
            Add images, category, cuisine, difficulty, ingredients, instructions,
            and preparation time with a form ready for imgbb integration.
          </p>
          </Card.Content>
        </Card>
        <Card className="min-h-[230px] bg-gradient-to-br from-white to-stone-100 dark:from-neutral-900 dark:to-neutral-800 [&_h2]:mt-[18px] [&_h2]:text-2xl [&_h2]:font-bold [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
          <Card.Content className="p-[22px]">
          <ShieldCheck size={28} />
          <h2>Admin moderation built in</h2>
          <p>
            Reports, blocked users, recipe deletion, featured recipes, and
            transactions are represented in the dashboard flow.
          </p>
          </Card.Content>
        </Card>
      </section>
    </>
  );
}
