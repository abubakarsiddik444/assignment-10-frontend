import { AddRecipeForm } from "@/components/recipes/AddRecipeForm";

export const metadata = {
  title: "Add Recipe - RecipeHub",
};

export default function AddRecipePage() {
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Create</span>
        <h1>Add Recipe</h1>
        <p>Normal users can add 2 recipes. Premium members unlock unlimited recipe publishing.</p>
      </div>
      <AddRecipeForm />
    </section>
  );
}
