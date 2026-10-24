"use client";

import { Magnifier } from "@gravity-ui/icons";
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
    <div className="grid grid-cols-[280px_minmax(0,1fr)] items-start gap-6 max-[980px]:grid-cols-1">
      <aside className="sticky top-[100px] rounded-2xl border border-stone-200 bg-white p-[22px] shadow-md dark:border-neutral-800 dark:bg-neutral-900 max-[980px]:static [&_label]:mb-2 [&_select]:my-2 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-stone-200 [&_select]:bg-stone-100 [&_select]:px-3 [&_select]:py-2.5 [&_select]:text-stone-900 dark:[&_select]:border-neutral-700 dark:[&_select]:bg-neutral-800 dark:[&_select]:text-stone-100">
        <label className="grid gap-2 font-bold text-stone-800 dark:text-stone-100" htmlFor="recipe-search">
          Search
        </label>
        <div className="grid min-h-[46px] grid-cols-[auto_1fr] items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-3 dark:border-neutral-700 dark:bg-neutral-800 [&_input]:min-h-10 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-stone-900 [&_input]:outline-none dark:[&_input]:text-stone-100">
          <Magnifier size={18} />
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
        <label className="grid gap-2 font-bold text-stone-800 dark:text-stone-100" htmlFor="category-filter">
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
        <p className="text-sm leading-[1.6] text-stone-500 dark:text-stone-400 [&_a]:text-emerald-800 dark:[&_a]:text-emerald-300">
          Backend-ready filter: category values map directly to MongoDB $in queries.
        </p>
      </aside>
      <div>
        <div className="mb-[18px] flex items-center justify-between text-stone-500 dark:text-stone-400 max-[660px]:flex-col max-[660px]:items-start">
          <strong>{filteredRecipes.length} recipes</strong>
          <span>
            Page {safePage} of {pageCount}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-2 max-[660px]:grid-cols-1">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-end gap-2.5 text-stone-500 dark:text-stone-400 max-[660px]:flex-col max-[660px]:items-start" aria-label="Recipe pagination">
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-stone-100 text-stone-800 hover:bg-stone-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-100 dark:hover:bg-neutral-700"
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={safePage === 1}
          >
            Previous
          </button>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 font-bold transition duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-55 border-stone-200 bg-stone-100 text-stone-800 hover:bg-stone-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-100 dark:hover:bg-neutral-700"
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
