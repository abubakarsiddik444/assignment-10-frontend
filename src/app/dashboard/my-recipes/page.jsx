import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { recipes } from "@/lib/data";

export const metadata = {
  title: "My Recipes - RecipeHub",
};

export default function MyRecipesPage() {
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Manage</span>
        <h1>My Recipes</h1>
      </div>
      <div className="table-wrap">
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
                <td className="table-actions">
                  <Link className="icon-button" href={`/recipes/${recipe.id}`} aria-label="View recipe">
                    <Pencil size={16} />
                  </Link>
                  <button className="icon-button danger-icon" type="button" aria-label="Delete recipe">
                    <Trash2 size={16} />
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
