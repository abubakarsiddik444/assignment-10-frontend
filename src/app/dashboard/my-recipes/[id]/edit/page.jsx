import { AddRecipeForm } from "@/components/recipes/AddRecipeForm";

export const metadata = {
  title: "Edit Recipe - RecipeHub",
};

export const instant = false;

export default async function EditRecipePage({ params }) {
  const { id } = await params;
  return (
    <section>
      <div className="mb-7 max-w-[720px] pt-5 [&_h1]:m-0 [&_h1]:text-[clamp(2rem,5vw,3.2rem)] [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[.12em] text-orange-700 dark:text-orange-300">Manage</span>
        <h1>Edit Recipe</h1>
        <p>Update your recipe details and save your changes.</p>
      </div>
      <AddRecipeForm recipeId={id} />
    </section>
  );
}
