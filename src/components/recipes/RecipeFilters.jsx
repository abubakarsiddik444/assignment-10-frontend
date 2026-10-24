"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { RecipeCard } from "./RecipeCard";

export function RecipeFilters({ recipes, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = category === "All" || recipe.category === category;
      const matchesQuery = recipe.recipeName.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [recipes, category, query]);

  const pageCount = Math.max(1, Math.ceil(filteredRecipes.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleRecipes = filteredRecipes.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="browse-layout">
      <aside className="filter-panel">
        <label className="field-label" htmlFor="recipe-search">
          Search
        </label>
        <div className="search-field">
          <Search size={18} />
          <input
            id="recipe-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search recipes"
          />
        </div>
        <label className="field-label" htmlFor="category-filter">
          Category
        </label>
        <select
          id="category-filter"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setPage(1);
          }}
        >
          <option>All</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <p className="fine-print">
          Backend-ready filter: category values map directly to MongoDB $in queries.
        </p>
      </aside>
      <div>
        <div className="result-bar">
          <strong>{filteredRecipes.length} recipes</strong>
          <span>
            Page {safePage} of {pageCount}
          </span>
        </div>
        <div className="recipe-grid">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="pagination" aria-label="Recipe pagination">
          <button
            className="button button-ghost"
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={safePage === 1}
          >
            Previous
          </button>
          <button
            className="button button-ghost"
            type="button"
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            disabled={safePage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
