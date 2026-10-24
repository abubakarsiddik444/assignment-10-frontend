export default function Loading() {
  return (
    <div className="loading-page" aria-live="polite" aria-busy="true">
      <span className="loader" />
      <p>Loading RecipeHub...</p>
    </div>
  );
}
