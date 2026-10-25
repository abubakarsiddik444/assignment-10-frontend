import { Suspense } from "react";
import { connection } from "next/server";
import { Card } from "@heroui/react";
import { RecipeFilters } from "@/components/recipes/RecipeFilters";
import { getRecipes } from "@/lib/api";
import { categories } from "@/lib/data";

export const metadata = {
  title: "Browse Recipes - RecipeHub",
};

async function BrowseRecipesContent() {
  await connection();
  const { recipes } = await getRecipes({ limit: 100 });
  return <RecipeFilters recipes={recipes} categories={categories} />;
}

export default function BrowseRecipesPage() {
  return (
    <section className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)]">
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Discover</span>
        <h1>Browse All Recipes</h1>
        <p>
          Filter community recipes by category and open details to like, purchase,
          report, or save favorites.
        </p>
      </div>
      <Suspense
        fallback={
          <Card className="grid min-h-48 place-items-center text-stone-500 dark:text-stone-400">
            Loading recipes...
          </Card>
        }
      >
        <BrowseRecipesContent />
      </Suspense>
    </section>
  );
}
