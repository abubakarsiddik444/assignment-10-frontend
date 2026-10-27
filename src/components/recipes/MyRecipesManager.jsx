"use client";

import Image from "next/image";
import { Button, Card, Link, Spinner } from "@heroui/react";
import { Pencil, TrashBin, Xmark } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ConfirmActionModal } from "@/components/shared/ConfirmActionModal";
import toast from "react-hot-toast";

export function MyRecipesManager() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
      return true;
    } catch (requestError) {
      toast.error(requestError.message || "Could not delete this recipe.");
      return false;
    } finally {
      setDeletingId("");
    }
  }

  if (loading) return <Card><Card.Content className="flex items-center gap-3"><Spinner /> Loading your recipes...</Card.Content></Card>;
  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (!recipes.length) return <Card><Card.Content>You have not submitted any recipes yet.</Card.Content></Card>;

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
                        variant="secondary"
                        onPress={() => setSelectedRecipe(recipe)}
                      >
                        View Details
                      </Button>
                      <ConfirmActionModal
                        title="Delete this recipe?"
                        description={`"${recipe.recipeName}" will be permanently removed from your recipes.`}
                        pendingLabel="Deleting..."
                        onConfirm={() => deleteRecipe(recipe)}
                      >
                        <Button size="sm" variant="danger" isDisabled={isDeleting}>
                          <TrashBin size={16} /> Delete
                        </Button>
                      </ConfirmActionModal>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card.Content>
      {selectedRecipe ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="my-recipe-details-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedRecipe(null);
          }}
        >
          <Card className="relative my-auto w-full max-w-3xl shadow-2xl">
            <Card.Content className="grid gap-5 p-5 sm:p-7">
              <Button
                className="absolute right-3 top-3 z-10"
                variant="tertiary"
                isIconOnly
                aria-label="Close recipe details"
                onPress={() => setSelectedRecipe(null)}
              >
                <Xmark size={18} />
              </Button>
              {selectedRecipe.recipeImage ? (
                <div className="relative h-56 overflow-hidden rounded-xl sm:h-72">
                  <Image
                    className="object-cover"
                    src={selectedRecipe.recipeImage}
                    alt={selectedRecipe.recipeName}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    unoptimized
                  />
                </div>
              ) : null}
              <div className="grid gap-2 pr-10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  {selectedRecipe.status || "published"}
                </span>
                <h2
                  id="my-recipe-details-title"
                  className="m-0 text-2xl font-bold sm:text-3xl"
                >
                  {selectedRecipe.recipeName}
                </h2>
                <p className="m-0 text-sm text-stone-600 dark:text-stone-300">
                  {[selectedRecipe.category, selectedRecipe.cuisineType, selectedRecipe.preparationTime]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <section>
                  <h3 className="mb-2 mt-0 font-bold">Ingredients</h3>
                  {selectedRecipe.ingredients?.length ? (
                    <ul className="m-0 grid gap-1 pl-5 text-sm text-stone-700 dark:text-stone-200">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index}`}>{ingredient}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="m-0 text-sm text-stone-500">No ingredients provided.</p>
                  )}
                </section>
                <section>
                  <h3 className="mb-2 mt-0 font-bold">Instructions</h3>
                  <p className="m-0 whitespace-pre-line text-sm leading-6 text-stone-700 dark:text-stone-200">
                    {selectedRecipe.instructions || "No instructions provided."}
                  </p>
                </section>
              </div>
              <div className="flex justify-end border-t border-stone-200 pt-4 dark:border-neutral-700">
                <Button variant="tertiary" onPress={() => setSelectedRecipe(null)}>
                  Close
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      ) : null}
    </Card>
  );
}
