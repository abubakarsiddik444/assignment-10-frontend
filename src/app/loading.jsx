export default function Loading() {
  return (
    <div className="grid min-h-[70vh] content-center justify-items-center gap-3.5 text-stone-500 dark:text-stone-400" aria-live="polite" aria-busy="true">
      <span className="size-[46px] animate-spin rounded-full border-4 border-stone-200 border-t-emerald-700 dark:border-neutral-700 dark:border-t-emerald-400" />
      <p>Loading RecipeHub...</p>
    </div>
  );
}
