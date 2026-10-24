import Link from "next/link";
import { recipes } from "@/lib/data";

export const metadata = {
  title: "Manage Recipes - RecipeHub",
};

export default function ManageRecipesPage() {
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2.3rem,7vw,5.8rem)] [&_h1]:leading-none [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300 [&_h1]:text-[clamp(2rem,5vw,3.2rem)]">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Content</span>
        <h1>Manage Recipes</h1>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 [&_table]:min-w-[720px] [&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 [&_tr:last-child_td]:border-b-0 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800 dark:[&_th]:text-stone-400">
        <table>
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Author</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.recipeName}</td>
                <td>{recipe.authorName}</td>
                <td>{recipe.isFeatured ? "Yes" : "No"}</td>
                <td>{recipe.status}</td>
                <td className="flex flex-wrap items-center gap-2">
                  <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800 min-h-9 px-3 text-sm" href={`/recipes/${recipe.id}`}>
                    Edit
                  </Link>
                  <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800 min-h-9 px-3 text-sm" type="button">
                    Feature
                  </button>
                  <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-red-700 text-white hover:bg-red-800 min-h-9 px-3 text-sm" type="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
