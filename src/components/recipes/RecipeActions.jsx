"use client";

import { CreditCard, Flag, Heart } from "@gravity-ui/icons";
import { Xmark } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { RecipeFavoriteButton } from "./RecipeFavoriteButton";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function RecipeActions({ recipe }) {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [likes, setLikes] = useState(recipe.likesCount);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionPending || !session?.user) return;
    apiFetch(`/api/recipes/${recipe._id || recipe.id}/like`)
      .then((data) => {
        setLiked(data.liked);
        setLikes(data.likesCount);
      })
      .catch((error) => {
        if (error.status !== 401) {
          toast.error(`Could not check like status: ${error.message}`, {
            id: "recipe-like-status-error",
          });
        }
      });
  }, [recipe._id, recipe.id, session?.user, sessionPending]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        <Button
          variant="primary"
          isDisabled={liking || liked}
          onPress={async () => {
            setLiking(true);
            try {
              const data = await apiFetch(`/api/recipes/${recipe._id || recipe.id}/like`, {
                method: "POST",
              });
              if (data.recipe) setLikes(data.recipe.likesCount);
              setLiked(data.liked);
              if (data.liked) toast.success("You liked this recipe.");
              else toast("You have already liked this recipe.");
            } catch (error) {
              setMessage(error.message);
              toast.error(error.message);
            } finally {
              setLiking(false);
            }
          }}
        >
          <Heart size={18} /> {liked ? "Liked" : liking ? "Liking..." : "Like"} ({likes})
        </Button>
        <RecipeFavoriteButton recipeId={recipe._id || recipe.id} />
        <Button
          variant="secondary"
          onPress={async () => {
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
        </Button>
        <Button variant="danger" onPress={() => setShowReport(true)}>
          <Flag size={18} /> Report
        </Button>
      </div>
      {message ? <p className="mt-3.5 font-bold text-emerald-800 dark:text-emerald-300">{message}</p> : null}
      {showReport ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/55 p-[18px]" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <Card className="relative w-full max-w-[460px] shadow-2xl [&_h2]:m-0 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:mb-4 [&_p]:leading-7 [&_p]:text-stone-600 dark:[&_p]:text-stone-300">
            <Card.Content className="p-6">
            <Button
              className="absolute right-3 top-3"
              variant="tertiary"
              isIconOnly
              aria-label="Close report modal"
              onPress={() => setShowReport(false)}
            >
              <Xmark size={18} />
            </Button>
            <h2 id="report-title">Report recipe</h2>
            <p>Select a reason so admins can review this recipe.</p>
            <div className="grid gap-2.5">
              {["Spam", "Offensive Content", "Copyright Issue"].map((reason) => (
                <Button
                  variant="secondary"
                  key={reason}
                  onPress={async () => {
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
                </Button>
              ))}
            </div>
            </Card.Content>
          </Card>
        </div>
      ) : null}
    </>
  );
}
