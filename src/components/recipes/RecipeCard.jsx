import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Star } from "lucide-react";

export function RecipeCard({ recipe, variant = "default" }) {
  const recipeId = recipe.id || recipe._id;

  return (
    <article className={`recipe-card ${variant === "compact" ? "recipe-card-compact" : ""}`}>
      <Image
        src={recipe.recipeImage}
        alt={recipe.recipeName}
        width={1200}
        height={800}
        sizes="(max-width: 980px) 50vw, (max-width: 660px) 100vw, 33vw"
      />
      <div className="recipe-card-body">
        <div className="pill-row">
          <span className="pill">{recipe.category}</span>
          <span className="pill muted">{recipe.cuisineType}</span>
        </div>
        <h3>{recipe.recipeName}</h3>
        <p>{recipe.instructions}</p>
        <div className="recipe-meta">
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
        <Link className="button button-secondary" href={`/recipes/${recipeId}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
