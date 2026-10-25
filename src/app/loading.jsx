import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="grid min-h-[70vh] content-center justify-items-center gap-3.5 text-stone-500 dark:text-stone-400" aria-live="polite" aria-busy="true">
      <Spinner aria-label="Loading RecipeHub" />
      <p>Loading RecipeHub...</p>
    </div>
  );
}
