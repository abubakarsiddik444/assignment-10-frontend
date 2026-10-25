"use client";

import { Button, Card, Input, Link, ListBox, Select, TextArea } from "@heroui/react";
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
    <Card>
      <Card.Content>
    <form className="grid gap-4 [&_label]:grid [&_label]:gap-2 [&_label]:font-bold [&_label]:text-stone-800 dark:[&_label]:text-stone-100 [&_input]:min-h-[46px] [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-stone-200 [&_input]:bg-stone-100 [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-stone-900 [&_input]:placeholder:text-stone-400 [&_input]:focus:border-emerald-600 [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-emerald-600/20 [&_textarea]:min-h-[46px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-stone-200 [&_textarea]:bg-stone-100 [&_textarea]:px-3 [&_textarea]:py-3 [&_input]:dark:border-neutral-700 [&_input]:dark:bg-neutral-800 [&_input]:dark:text-stone-100 [&_textarea]:dark:border-neutral-700 [&_textarea]:dark:bg-neutral-800 [&_textarea]:dark:text-stone-100 grid-cols-2 max-[660px]:grid-cols-1" onSubmit={handleSubmit}>
      <label>
        Recipe Name
        <Input name="recipeName" type="text" placeholder="Recipe name" required />
      </label>
      <label>
        Recipe Image Upload
        <Input name="recipeImage" type="file" accept="image/*" />
      </label>
      <label>
        Category
        <Select aria-label="Category" defaultSelectedKey="Dinner" name="category">
          <Select.Trigger className="min-h-11"><Select.Value /></Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["Dinner", "Breakfast", "Dessert", "Vegan"].map((item) => (
                <ListBox.Item key={item} id={item} textValue={item}>{item}</ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </label>
      <label>
        Cuisine Type
        <Input name="cuisineType" type="text" placeholder="Thai, Indian, Mexican..." required />
      </label>
      <label>
        Difficulty Level
        <Select aria-label="Difficulty Level" defaultSelectedKey="Easy" name="difficultyLevel">
          <Select.Trigger className="min-h-11"><Select.Value /></Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["Easy", "Medium", "Hard"].map((item) => (
                <ListBox.Item key={item} id={item} textValue={item}>{item}</ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </label>
      <label>
        Preparation Time
        <Input name="preparationTime" type="text" placeholder="35 min" required />
      </label>
      <label className="col-span-full max-[660px]:col-span-1">
        Ingredients
        <TextArea name="ingredients" placeholder="One ingredient per line" rows={4} />
      </label>
      <label className="col-span-full max-[660px]:col-span-1">
        Instructions
        <TextArea name="instructions" placeholder="Detailed cooking steps" rows={6} required />
      </label>
      <Button variant="primary" type="submit" isDisabled={pending}>
        {pending ? "Publishing..." : "Publish Recipe"}
      </Button>
      <Link className="button button--secondary" href="/premium">
        Become Premium
      </Link>
      {message ? <p className="mt-3.5 font-bold text-emerald-800 dark:text-emerald-300 col-span-full max-[660px]:col-span-1">{message}</p> : null}
    </form>
      </Card.Content>
    </Card>
  );
}
