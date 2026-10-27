"use client";

import Image from "next/image";
import { Xmark } from "@gravity-ui/icons";
import { Button, Card, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ConfirmActionModal } from "@/components/shared/ConfirmActionModal";
import toast from "react-hot-toast";

export function AdminRecipesManager() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workingId, setWorkingId] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const selectedRecipe = recipes.find(
    (recipe) => (recipe._id || recipe.id) === selectedRecipeId,
  );

  useEffect(() => {
    let active = true;
    apiFetch("/api/admin/recipes")
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
        return true;
      } else if (action === "approve" || action === "reject") {
        const status = action === "approve" ? "published" : "rejected";
        await apiFetch(`/api/admin/recipes/${id}/status`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        });
        setRecipes((current) => current.map((item) =>
          (item._id || item.id) === id ? { ...item, status, isFeatured: false } : item
        ));
        toast.success(status === "published" ? "Recipe approved and published." : "Recipe rejected.");
        return true;
      } else {
        await apiFetch(`/api/admin/recipes/${id}`, { method: "DELETE" });
        setRecipes((current) => current.filter((item) => (item._id || item.id) !== id));
        toast.success("Recipe removed.");
        return true;
      }
    } catch (requestError) {
      toast.error(requestError.message || "Could not update this recipe.");
      return false;
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
                      <Button
                        size="sm"
                        variant="secondary"
                        onPress={() => setSelectedRecipeId(id)}
                      >
                        View Details
                      </Button>
                      {recipe.status !== "published" ? (
                        <>
                          <Button size="sm" variant="primary" isDisabled={isWorking} onPress={() => updateRecipe(recipe, "approve")}>
                            Approve
                          </Button>
                          {recipe.status === "pending" ? (
                            <Button size="sm" variant="secondary" isDisabled={isWorking} onPress={() => updateRecipe(recipe, "reject")}>
                              Reject
                            </Button>
                          ) : null}
                        </>
                      ) : (
                        <Button size="sm" variant="secondary" isDisabled={isWorking} onPress={() => updateRecipe(recipe, "feature")}>
                          {recipe.isFeatured ? "Unfeature" : "Feature"}
                        </Button>
                      )}
                      <ConfirmActionModal
                        title="Delete this recipe?"
                        description={`"${recipe.recipeName}" will be permanently removed from the site.`}
                        pendingLabel="Deleting..."
                        onConfirm={() => updateRecipe(recipe, "delete")}
                      >
                        <Button size="sm" variant="danger" isDisabled={isWorking}>
                          Delete
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
          aria-labelledby="admin-recipe-details-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedRecipeId("");
          }}
        >
          <Card className="relative my-auto w-full max-w-3xl shadow-2xl">
            <Card.Content className="grid gap-5 p-5 sm:p-7">
              <Button
                className="absolute right-3 top-3 z-10"
                variant="tertiary"
                isIconOnly
                aria-label="Close recipe details"
                onPress={() => setSelectedRecipeId("")}
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
                  id="admin-recipe-details-title"
                  className="m-0 text-2xl font-bold sm:text-3xl"
                >
                  {selectedRecipe.recipeName}
                </h2>
                <p className="m-0 text-sm text-stone-600 dark:text-stone-300">
                  By {selectedRecipe.authorName || selectedRecipe.authorEmail || "Unknown"}
                  {" · "}
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
              <div className="flex flex-wrap justify-end gap-2 border-t border-stone-200 pt-4 dark:border-neutral-700">
                {selectedRecipe.status !== "published" ? (
                  <>
                    <Button
                      variant="primary"
                      isDisabled={workingId === selectedRecipeId}
                      onPress={() => updateRecipe(selectedRecipe, "approve")}
                    >
                      {workingId === selectedRecipeId ? "Approving..." : "Approve & Publish"}
                    </Button>
                    {selectedRecipe.status === "pending" ? (
                      <Button
                        variant="secondary"
                        isDisabled={workingId === selectedRecipeId}
                        onPress={() => updateRecipe(selectedRecipe, "reject")}
                      >
                        Reject
                      </Button>
                    ) : null}
                  </>
                ) : null}
                <Button variant="tertiary" onPress={() => setSelectedRecipeId("")}>
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
