import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Star } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import { RecipeFavoriteButton } from "./RecipeFavoriteButton";

export function RecipeCard({ recipe, initialFavorite, onFavoriteChange }) {
  const recipeId = recipe.id || recipe._id;

  return (
    <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <Image
        className="h-[230px] w-full object-cover"
        src={recipe.recipeImage}
        alt={recipe.recipeName}
        width={1200}
        height={800}
        sizes="(max-width: 980px) 50vw, (max-width: 660px) 100vw, 33vw"
      />
      <Card.Content className="flex h-full flex-col p-5 [&_h3]:mb-2 [&_h3]:mt-3.5 [&_h3]:text-xl [&_h3]:font-bold [&_p]:mb-4 [&_p]:line-clamp-3 [&_p]:min-h-[78px] [&_p]:leading-6 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
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
        <div className="mt-auto grid justify-items-start gap-2.5">
          <Link
            className="button button--secondary button--sm"
            href={`/recipes/${recipeId}`}
          >
            View Details
          </Link>
          <RecipeFavoriteButton
            recipeId={recipeId}
            initialFavorite={initialFavorite}
            onFavoriteChange={onFavoriteChange}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
