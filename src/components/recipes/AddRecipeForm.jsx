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
    <form className="form-grid two-column-form" onSubmit={handleSubmit}>
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
      <label className="span-2">
        Ingredients
        <textarea name="ingredients" placeholder="One ingredient per line" rows={4} />
      </label>
      <label className="span-2">
        Instructions
        <textarea name="instructions" placeholder="Detailed cooking steps" rows={6} required />
      </label>
      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? "Publishing..." : "Publish Recipe"}
      </button>
      <Link className="button button-secondary" href="/premium">
        Become Premium
      </Link>
      {message ? <p className="toast-message span-2">{message}</p> : null}
    </form>
  );
}
