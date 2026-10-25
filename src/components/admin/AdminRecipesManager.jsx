"use client";

import { Button, Card, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export function AdminRecipesManager() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workingId, setWorkingId] = useState("");

  useEffect(() => {
    let active = true;
    apiFetch("/api/recipes?limit=100")
      .then(({ recipes: items }) => {
        if (active) setRecipes(items || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Could not load recipes.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function updateRecipe(recipe, action) {
    const id = recipe._id || recipe.id;
    setWorkingId(id);
    try {
      if (action === "feature") {
        const isFeatured = !recipe.isFeatured;
        await apiFetch(`/api/admin/recipes/${id}/feature`, {
          method: "PATCH",
          body: JSON.stringify({ isFeatured }),
        });
        setRecipes((current) => current.map((item) =>
          (item._id || item.id) === id ? { ...item, isFeatured } : item
        ));
        toast.success(isFeatured ? "Recipe featured." : "Recipe removed from featured.");
      } else {
        await apiFetch(`/api/admin/recipes/${id}`, { method: "DELETE" });
        setRecipes((current) => current.filter((item) => (item._id || item.id) !== id));
        toast.success("Recipe removed.");
      }
    } catch (requestError) {
      toast.error(requestError.message || "Could not update this recipe.");
    } finally {
      setWorkingId("");
    }
  }

  if (loading) return <Card><Card.Content className="flex items-center gap-3"><Spinner /> Loading recipes...</Card.Content></Card>;
  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (!recipes.length) return <Card><Card.Content>No recipes to manage.</Card.Content></Card>;

  return (
    <Card className="overflow-hidden">
      <Card.Content className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] border-collapse text-left [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-xs [&_th]:uppercase [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800">
          <thead><tr><th>Recipe</th><th>Author</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {recipes.map((recipe) => {
              const id = recipe._id || recipe.id;
              const isWorking = workingId === id;
              return (
                <tr key={id}>
                  <td className="font-semibold">{recipe.recipeName}</td>
                  <td>{recipe.authorName || recipe.authorEmail || "Unknown"}</td>
                  <td>{recipe.isFeatured ? "Yes" : "No"}</td>
                  <td>{recipe.status || "published"}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="secondary" isDisabled={isWorking} onPress={() => updateRecipe(recipe, "feature")}>
                        {recipe.isFeatured ? "Unfeature" : "Feature"}
                      </Button>
                      <Button size="sm" variant="danger" isDisabled={isWorking} onPress={() => updateRecipe(recipe, "delete")}>
                        Delete
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
