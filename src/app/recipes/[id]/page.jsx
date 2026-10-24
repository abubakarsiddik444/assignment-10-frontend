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
    <article className="details-page">
      <div className="details-hero">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          width={1200}
          height={900}
          sizes="(max-width: 980px) 100vw, 50vw"
          priority
        />
        <div className="details-copy">
          <div className="pill-row">
            <span className="pill">{recipe.category}</span>
            <span className="pill muted">{recipe.cuisineType}</span>
          </div>
          <h1>{recipe.recipeName}</h1>
          <p>{recipe.instructions}</p>
          <div className="details-stats">
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
      <div className="details-grid">
        <section className="panel">
          <h2>Ingredients</h2>
          <ul className="check-list">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>
        <section className="panel">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
          <p className="fine-print">
            Author: {recipe.authorName} ({recipe.authorEmail})
          </p>
        </section>
      </div>
    </article>
  );
}
