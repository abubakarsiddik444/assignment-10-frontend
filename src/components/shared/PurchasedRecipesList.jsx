"use client";

import Link from "next/link";
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

  if (loading) return <p>Loading your purchases...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (payments.length === 0) return <p>You have not purchased any recipes yet.</p>;

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 [&_table]:min-w-[720px] [&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-stone-200 [&_th]:px-4 [&_th]:py-3.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-stone-500 [&_td]:border-b [&_td]:border-stone-200 [&_td]:px-4 [&_td]:py-3.5 [&_tr:last-child_td]:border-b-0 dark:[&_th]:border-neutral-800 dark:[&_td]:border-neutral-800 dark:[&_th]:text-stone-400">
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
                    className="inline-flex min-h-9 items-center justify-center rounded-xl border border-stone-200 bg-white px-3 text-sm font-bold text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800"
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
    </div>
  );
}
