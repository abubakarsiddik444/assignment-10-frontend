import { RecipeCard } from "@/components/recipes/RecipeCard";
import { recipes } from "@/lib/data";

export const metadata = {
  title: "Favorites - RecipeHub",
};

export default function FavoritesPage() {
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_h1]:text-[clamp(2rem,5vw,3.2rem)]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Saved</span>
        <h1>My Favorites</h1>
      </div>
      <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
        {recipes.slice(1, 4).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
