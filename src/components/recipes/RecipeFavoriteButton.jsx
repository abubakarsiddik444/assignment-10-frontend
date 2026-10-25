"use client";

import { Star } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function RecipeFavoriteButton({
  recipeId,
  initialFavorite,
  onFavoriteChange,
}) {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [favorited, setFavorited] = useState(initialFavorite ?? false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (initialFavorite !== undefined) return;
    if (sessionPending || !session?.user) return;

    apiFetch(`/api/recipes/${recipeId}/favorite`)
      .then((data) => setFavorited(data.favorited))
      .catch((error) => {
        if (error.status !== 401) {
          toast.error(`Could not check favorite status: ${error.message}`, {
            id: "favorite-status-error",
          });
        }
      });
  }, [initialFavorite, recipeId, session?.user, sessionPending]);

  async function toggleFavorite() {
    setPending(true);
    try {
      const data = await apiFetch(`/api/recipes/${recipeId}/favorite`, {
        method: favorited ? "DELETE" : "PUT",
      });
      setFavorited(data.favorited);
      onFavoriteChange?.(recipeId, data.favorited);
      toast.success(data.favorited ? "Added to favorites." : "Removed from favorites.");
    } catch (error) {
      toast.error(error.message || "Could not update favorites.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      className="cursor-pointer"
      variant="secondary"
      size="sm"
      aria-pressed={favorited}
      isDisabled={pending}
      onPress={toggleFavorite}
    >
      <Star size={18} /> {pending ? "Saving..." : favorited ? "Unfavorite" : "Favorite"}
    </Button>
  );
}
