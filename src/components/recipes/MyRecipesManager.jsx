"use client";

import { Button, Card, Link, Spinner } from "@heroui/react";
import { Pencil, TrashBin } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export function MyRecipesManager() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    let active = true;
    apiFetch("/api/recipes/my")
      .then(({ recipes: items }) => {
        if (active) setRecipes(items || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load your recipes.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function deleteRecipe(recipe) {
    const id = recipe._id || recipe.id;
    setDeletingId(id);
    try {
      await apiFetch(`/api/recipes/${id}`, { method: "DELETE" });
      setRecipes((current) => current.filter((item) => (item._id || item.id) !== id));
      toast.success("Recipe deleted.");
    } catch (requestError) {
      toast.error(requestError.message || "Could not delete this recipe.");
    } finally {
      setDeletingId("");
    }
  }

  if (loading) return <Card><Card.Content className="flex items-center gap-3"><Spinner /> Loading your recipes...</Card.Content></Card>;
  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (!recipes.length) return <Card><Card.Content>You have not published any recipes yet.</Card.Content></Card>;

  return (
    <Card className="overflow-hidden">
      <Card.Content className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] border-collapse text-left [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-xs [&_th]:uppercase [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800">
          <thead>
            <tr><th>Recipe</th><th>Category</th><th>Likes</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => {
              const id = recipe._id || recipe.id;
              const isDeleting = deletingId === id;
              return (
                <tr key={id}>
                  <td className="font-semibold">{recipe.recipeName}</td>
                  <td>{recipe.category}</td>
                  <td>{recipe.likesCount || 0}</td>
                  <td>{recipe.status || "published"}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        className="button button--secondary button--sm"
                        href={`/dashboard/my-recipes/${id}/edit`}
                      >
                        <Pencil size={16} /> Edit
                      </Link>
                      <Button
                        size="sm"
                        variant="danger"
                        isDisabled={isDeleting}
                        onPress={() => deleteRecipe(recipe)}
                      >
                        <TrashBin size={16} /> {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card.Content>
    </Card>
  );
}
