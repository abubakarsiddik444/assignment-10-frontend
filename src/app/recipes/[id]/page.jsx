import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Cup, Speedometer } from "@gravity-ui/icons";
import { RecipeActions } from "@/components/recipes/RecipeActions";
import { getRecipe } from "@/lib/api";
import { getRecipeById, recipes } from "@/lib/data";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { recipe } = await getRecipe(id);
  return {
    title: recipe ? `${recipe.recipeName} - RecipeHub` : "Recipe - RecipeHub",
  };
}

export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;
  const { recipe } = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <article className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-[4.5rem] max-[660px]:w-[calc(100%-1.25rem)]">
      <div className="grid min-h-[540px] grid-cols-[1fr_.9fr] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900 max-[980px]:grid-cols-1 [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          width={1200}
          height={900}
          sizes="(max-width: 980px) 100vw, 50vw"
          priority
        />
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 [&_h1]:my-3.5 [&_h1]:text-[clamp(2.1rem,5vw,4.6rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-7 items-center rounded-full bg-emerald-100 px-2.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{recipe.category}</span>
            <span className="inline-flex min-h-7 items-center rounded-full bg-emerald-100 px-2.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">{recipe.cuisineType}</span>
          </div>
          <h1>{recipe.recipeName}</h1>
          <p>{recipe.instructions}</p>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400 [&_span]:inline-flex [&_span]:items-center [&_span]:gap-1.5">
            <span>
              <Clock size={18} /> {recipe.preparationTime}
            </span>
            <span>
              <Speedometer size={18} /> {recipe.difficultyLevel}
            </span>
            <span>
              <Cup size={18} /> {recipe.likesCount} likes
            </span>
          </div>
          <RecipeActions recipe={recipe} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-[18px] max-[980px]:grid-cols-1">
        <section className="rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
          <h2>Ingredients</h2>
          <ul className="mt-4 grid list-none gap-2.5 p-0 [&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:text-stone-600 dark:[&_li]:text-stone-300 [&_li]:before:size-2 [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-emerald-600 [&_li]:before:content-['']">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 [&_h2]:m-0 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
          <p className="text-sm leading-[1.6] text-stone-500 dark:text-stone-400 [&_a]:text-emerald-800 dark:[&_a]:text-emerald-300">
            Author: {recipe.authorName} ({recipe.authorEmail})
          </p>
        </section>
      </div>
    </article>
  );
}
