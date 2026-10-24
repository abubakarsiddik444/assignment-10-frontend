import Link from "next/link";
import { payments, recipes } from "@/lib/data";

export const metadata = {
  title: "Purchased Recipes - RecipeHub",
};

export default function PurchasedRecipesPage() {
  const purchased = payments
    .filter((payment) => payment.recipeId)
    .map((payment) => ({
      ...payment,
      recipe: recipes.find((recipe) => recipe.id === payment.recipeId),
    }));

  return (
    <section>
      <div className="page-heading compact-heading">
        <span className="eyebrow">Library</span>
        <h1>My Purchased Recipes</h1>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Amount</th>
              <th>Transaction</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {purchased.map((payment) => (
              <tr key={payment.transactionId}>
                <td>{payment.recipe?.recipeName}</td>
                <td>${payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.paymentStatus}</td>
                <td>
                  <Link className="button button-secondary compact" href={`/recipes/${payment.recipeId}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
