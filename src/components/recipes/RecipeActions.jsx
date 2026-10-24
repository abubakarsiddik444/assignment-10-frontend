"use client";

import { CreditCard, Flag, Heart, Star } from "@gravity-ui/icons";
import { Xmark } from "@gravity-ui/icons";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export function RecipeActions({ recipe }) {
  const [likes, setLikes] = useState(recipe.likesCount);
  const [favorite, setFavorite] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
          type="button"
          onClick={async () => {
            setLikes((current) => current + 1);
            try {
              const data = await apiFetch(`/api/recipes/${recipe._id || recipe.id}/like`, {
                method: "POST",
              });
              if (data.recipe?.likesCount) setLikes(data.recipe.likesCount);
            } catch (error) {
              setMessage(error.message);
              toast.error(error.message);
            }
          }}
        >
          <Heart size={18} /> Like ({likes})
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800"
          type="button"
          onClick={async () => {
            try {
              const data = await apiFetch(`/api/recipes/${recipe._id || recipe.id}/favorite`, {
                method: "POST",
              });
              setFavorite(data.favorited);
              setMessage(data.favorited ? "Added to favorites." : "Removed from favorites.");
              toast.success(data.favorited ? "Added to favorites." : "Removed from favorites.");
            } catch (error) {
              setMessage(error.message);
              toast.error(error.message);
            }
          }}
        >
          <Star size={18} /> {favorite ? "Favorited" : "Favorite"}
        </button>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800"
          type="button"
          onClick={async () => {
            try {
              const data = await apiFetch("/api/payments/create-checkout-session", {
                method: "POST",
                body: JSON.stringify({ type: "recipe", recipeId: recipe._id || recipe.id }),
              });
              window.location.href = data.url;
            } catch (error) {
              setMessage(error.message);
              toast.error(error.message);
            }
          }}
        >
          <CreditCard size={18} /> Purchase ${recipe.price}
        </button>
        <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-red-700 text-white hover:bg-red-800" type="button" onClick={() => setShowReport(true)}>
          <Flag size={18} /> Report
        </button>
      </div>
      {message ? <p className="mt-3.5 font-bold text-emerald-800 dark:text-emerald-300">{message}</p> : null}
      {showReport ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-[18px]" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <div className="relative w-full max-w-[460px] rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 [&_h2]:m-0 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:mb-4 [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
            <button
              className="inline-flex size-[42px] items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-800 transition hover:-translate-y-px hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800 absolute right-3 top-3"
              type="button"
              onClick={() => setShowReport(false)}
              aria-label="Close report modal"
            >
              <Xmark size={18} />
            </button>
            <h2 id="report-title">Report recipe</h2>
            <p>Select a reason so admins can review this recipe.</p>
            <div className="grid gap-2.5">
              {["Spam", "Offensive Content", "Copyright Issue"].map((reason) => (
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800"
                  type="button"
                  key={reason}
                  onClick={async () => {
                    try {
                      await apiFetch(`/api/recipes/${recipe._id || recipe.id}/report`, {
                        method: "POST",
                        body: JSON.stringify({ reason }),
                      });
                      setMessage(`Report submitted: ${reason}.`);
                      toast.success("Report submitted for review.");
                      setShowReport(false);
                    } catch (error) {
                      setMessage(error.message);
                      toast.error(error.message);
                    }
                  }}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
