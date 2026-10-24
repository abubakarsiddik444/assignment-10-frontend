import { RecipeFilters } from "@/components/recipes/RecipeFilters";
import { getRecipes } from "@/lib/api";
import { categories } from "@/lib/data";

export const metadata = {
  title: "Browse Recipes - RecipeHub",
};

export default async function BrowseRecipesPage() {
  const { recipes } = await getRecipes({ limit: 30 });

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="eyebrow">Discover</span>
        <h1>Browse All Recipes</h1>
        <p>
          Filter community recipes by category and open details to like, purchase,
          report, or save favorites.
        </p>
      </div>
      <RecipeFilters recipes={recipes} categories={categories} />
    </section>
  );
}
