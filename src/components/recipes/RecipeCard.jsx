import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Star } from "@gravity-ui/icons";

export function RecipeCard({ recipe }) {
  const recipeId = recipe.id || recipe._id;

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 [&_img]:h-[230px] [&_img]:w-full [&_img]:object-cover [&_h3]:mb-2 [&_h3]:mt-3.5 [&_h3]:text-xl [&_h3]:font-bold [&_p]:mb-4 [&_p]:line-clamp-3 [&_p]:min-h-[78px] [&_p]:leading-6 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
      <Image
        src={recipe.recipeImage}
        alt={recipe.recipeName}
        width={1200}
        height={800}
        sizes="(max-width: 980px) 50vw, (max-width: 660px) 100vw, 33vw"
      />
      <div className="p-[22px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex min-h-7 items-center rounded-full bg-emerald-100 px-2.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{recipe.category}</span>
          <span className="inline-flex min-h-7 items-center rounded-full bg-emerald-100 px-2.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">{recipe.cuisineType}</span>
        </div>
        <h3>{recipe.recipeName}</h3>
        <p>{recipe.instructions}</p>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400 [&_span]:inline-flex [&_span]:items-center [&_span]:gap-1.5">
          <span>
            <Clock size={16} /> {recipe.preparationTime}
          </span>
          <span>
            <Heart size={16} /> {recipe.likesCount}
          </span>
          <span>
            <Star size={16} /> {recipe.difficultyLevel}
          </span>
        </div>
        <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800" href={`/recipes/${recipeId}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
