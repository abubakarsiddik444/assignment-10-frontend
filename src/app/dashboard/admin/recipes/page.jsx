import Link from "next/link";
import { recipes } from "@/lib/data";

export const metadata = {
  title: "Manage Recipes - RecipeHub",
};

export default function ManageRecipesPage() {
  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Content</span>
        <h1>Manage Recipes</h1>
      </div>
      <div className="table-wrap">
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
                <td className="button-row">
                  <Link className="button button-secondary compact" href={`/recipes/${recipe.id}`}>
                    Edit
                  </Link>
                  <button className="button button-secondary compact" type="button">
                    Feature
                  </button>
                  <button className="button button-danger compact" type="button">
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
