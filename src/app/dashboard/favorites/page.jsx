import { RecipeCard } from "@/components/recipes/RecipeCard";
import { recipes } from "@/lib/data";

export const metadata = {
  title: "Favorites - RecipeHub",
};

export default function FavoritesPage() {
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Saved</span>
        <h1>My Favorites</h1>
      </div>
      <div className="recipe-grid">
        {recipes.slice(1, 4).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} variant="compact" />
        ))}
      </div>
    </section>
  );
}
