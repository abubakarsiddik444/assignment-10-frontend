import Link from "next/link";
import { Pencil, TrashBin } from "@gravity-ui/icons";
import { recipes } from "@/lib/data";
import { Button, Card } from "@heroui/react";

export const metadata = {
  title: "My Recipes - RecipeHub",
};

export default function MyRecipesPage() {
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_h1]:text-[clamp(2rem,5vw,3.2rem)]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Manage</span>
        <h1>My Recipes</h1>
      </div>
      <Card className="overflow-hidden">
        <Card.Content className="overflow-x-auto p-0 [&_table]:min-w-[720px] [&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 [&_tr:last-child_td]:border-b-0 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800 dark:[&_th]:text-stone-400">
        <table>
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Category</th>
              <th>Likes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.slice(0, 4).map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.recipeName}</td>
                <td>{recipe.category}</td>
                <td>{recipe.likesCount}</td>
                <td>{recipe.status}</td>
                <td className="flex flex-wrap items-center gap-2">
                  <Link className="button button--secondary button--sm button--icon-only" href={`/recipes/${recipe.id}`} aria-label="View recipe">
                    <Pencil size={16} />
                  </Link>
                  <Button isIconOnly size="sm" variant="danger" type="button" aria-label="Delete recipe">
                    <TrashBin size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </Card.Content>
      </Card>
    </section>
  );
}
