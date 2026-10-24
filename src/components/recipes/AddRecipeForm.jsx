"use client";

import Link from "next/link";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

export function AddRecipeForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("recipeImage");
    const form = event.currentTarget;
    let recipeImage = "";

    try {
      if (imageFile?.size && !process.env.NEXT_PUBLIC_IMGBB_API_KEY) {
        throw new Error("Add the imgbb API key to NEXT_PUBLIC_IMGBB_API_KEY before uploading images.");
      }
      if (imageFile?.size) {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: uploadData }
        );
        const result = await response.json();
        if (!response.ok || !result.success || !result.data?.url) {
          throw new Error(result.error?.message || "The recipe image upload failed.");
        }
        recipeImage = result.data.url;
      }

      await apiFetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify({
          recipeName: formData.get("recipeName"),
          recipeImage,
          category: formData.get("category"),
          cuisineType: formData.get("cuisineType"),
          difficultyLevel: formData.get("difficultyLevel"),
          preparationTime: formData.get("preparationTime"),
          ingredients: formData.get("ingredients"),
          instructions: formData.get("instructions"),
        }),
      });
      form.reset();
      setMessage("Recipe published successfully.");
      toast.success("Recipe published successfully.");
    } catch (error) {
      setMessage(error.message);
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="grid gap-4 [&_label]:grid [&_label]:gap-2 [&_label]:font-bold [&_label]:text-stone-800 dark:[&_label]:text-stone-100 [&_input]:min-h-[46px] [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-stone-200 [&_input]:bg-stone-100 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-stone-900 [&_input]:placeholder:text-stone-400 [&_input]:focus:border-emerald-600 [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-emerald-600/20 [&_select]:min-h-[46px] [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-stone-200 [&_select]:bg-stone-100 [&_select]:px-3 [&_select]:py-2.5 [&_textarea]:min-h-[46px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-stone-200 [&_textarea]:bg-stone-100 [&_textarea]:px-3 [&_textarea]:py-3 [&_input]:dark:border-neutral-700 [&_input]:dark:bg-neutral-800 [&_input]:dark:text-stone-100 [&_select]:dark:border-neutral-700 [&_select]:dark:bg-neutral-800 [&_select]:dark:text-stone-100 [&_textarea]:dark:border-neutral-700 [&_textarea]:dark:bg-neutral-800 [&_textarea]:dark:text-stone-100 grid-cols-2 max-[660px]:grid-cols-1" onSubmit={handleSubmit}>
      <label>
        Recipe Name
        <input name="recipeName" type="text" placeholder="Recipe name" required />
      </label>
      <label>
        Recipe Image Upload
        <input name="recipeImage" type="file" accept="image/*" />
      </label>
      <label>
        Category
        <select name="category">
          <option>Dinner</option>
          <option>Breakfast</option>
          <option>Dessert</option>
          <option>Vegan</option>
        </select>
      </label>
      <label>
        Cuisine Type
        <input name="cuisineType" type="text" placeholder="Thai, Indian, Mexican..." required />
      </label>
      <label>
        Difficulty Level
        <select name="difficultyLevel">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </label>
      <label>
        Preparation Time
        <input name="preparationTime" type="text" placeholder="35 min" required />
      </label>
      <label className="col-span-full max-[660px]:col-span-1">
        Ingredients
        <textarea name="ingredients" placeholder="One ingredient per line" rows={4} />
      </label>
      <label className="col-span-full max-[660px]:col-span-1">
        Instructions
        <textarea name="instructions" placeholder="Detailed cooking steps" rows={6} required />
      </label>
      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 bg-emerald-700 text-white hover:bg-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300" type="submit" disabled={pending}>
        {pending ? "Publishing..." : "Publish Recipe"}
      </button>
      <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-white text-stone-800 hover:bg-stone-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800" href="/premium">
        Become Premium
      </Link>
      {message ? <p className="mt-3.5 font-bold text-emerald-800 dark:text-emerald-300 col-span-full max-[660px]:col-span-1">{message}</p> : null}
    </form>
  );
}
