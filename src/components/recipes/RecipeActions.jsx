"use client";

import { CreditCard, Flag, Heart, Star } from "@gravity-ui/icons";
import { X } from "lucide-react";
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
      <div className="action-grid">
        <button
          className="button button-primary"
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
          className="button button-secondary"
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
          className="button button-secondary"
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
        <button className="button button-danger" type="button" onClick={() => setShowReport(true)}>
          <Flag size={18} /> Report
        </button>
      </div>
      {message ? <p className="toast-message">{message}</p> : null}
      {showReport ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <div className="modal">
            <button
              className="icon-button modal-close"
              type="button"
              onClick={() => setShowReport(false)}
              aria-label="Close report modal"
            >
              <X size={18} />
            </button>
            <h2 id="report-title">Report recipe</h2>
            <p>Select a reason so admins can review this recipe.</p>
            <div className="stack">
              {["Spam", "Offensive Content", "Copyright Issue"].map((reason) => (
                <button
                  className="button button-secondary"
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
