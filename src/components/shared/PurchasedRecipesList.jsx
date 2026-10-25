"use client";

import { Card, Link } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export function PurchasedRecipesList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/payments/my-recipes")
      .then((data) => setPayments(data.payments || []))
      .catch((requestError) => setError(requestError.message || "Could not load purchases."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Card><Card.Content>Loading your purchases...</Card.Content></Card>;
  if (error) return <Card><Card.Content><p role="alert">{error}</p></Card.Content></Card>;
  if (payments.length === 0) return <Card><Card.Content>You have not purchased any recipes yet.</Card.Content></Card>;

  return (
    <Card className="overflow-hidden [&_table]:min-w-[720px] [&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 [&_tr:last-child_td]:border-b-0 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800 dark:[&_th]:text-stone-400">
      <Card.Content className="overflow-x-auto p-0">
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
          {payments.map((payment) => (
            <tr key={payment.transactionId}>
              <td>{payment.recipe?.recipeName || "Recipe unavailable"}</td>
              <td>${Number(payment.amount).toFixed(2)}</td>
              <td>{payment.transactionId}</td>
              <td>{payment.paymentStatus}</td>
              <td>
                {payment.recipeId ? (
                  <Link
                    className="button button--secondary button--sm"
                    href={`/recipes/${payment.recipeId}`}
                  >
                    View
                  </Link>
                ) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Card.Content>
    </Card>
  );
}
