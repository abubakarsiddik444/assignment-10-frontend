"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { apiFetch } from "@/lib/api";
import { RecipeCard } from "./RecipeCard";

export function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/favorites")
      .then((data) => setRecipes(data.recipes || []))
      .catch((requestError) => setError(requestError.message || "Could not load favorites."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Card><Card.Content>Loading your favorites...</Card.Content></Card>;
  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (recipes.length === 0) {
    return <Card><Card.Content>You have no favorites yet. Save a recipe to see it here.</Card.Content></Card>;
  }

  return (
    <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id || recipe._id}
          recipe={recipe}
          initialFavorite
          onFavoriteChange={(recipeId, favorited) => {
            if (!favorited) {
              setRecipes((current) =>
                current.filter((item) => (item.id || item._id) !== recipeId)
              );
            }
          }}
        />
      ))}
    </div>
  );
}
