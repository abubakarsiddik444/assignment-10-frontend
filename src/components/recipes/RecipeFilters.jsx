"use client";

import { Magnifier } from "@gravity-ui/icons";
import { Card, Input, ListBox, Pagination, Select } from "@heroui/react";
import { useMemo, useState } from "react";
import { RecipeCard } from "./RecipeCard";

export function RecipeFilters({ recipes, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 12;

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
    <div>
      <Card className="mb-7">
        <Card.Content className="grid grid-cols-[minmax(240px,1fr)_minmax(180px,260px)] items-end gap-4 p-5 max-[660px]:grid-cols-1">
        <label className="grid gap-2 font-semibold text-stone-700 dark:text-stone-200" htmlFor="recipe-search">
          Search recipes
          <div className="relative">
            <Magnifier className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
            <Input
              className="h-11 w-full pl-10"
              id="recipe-search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by recipe name"
              aria-label="Search recipes"
            />
          </div>
        </label>
        <label className="grid gap-2 font-semibold text-stone-700 dark:text-stone-200" htmlFor="category-filter">
          Category
          <Select
            aria-label="Category"
            selectedKey={category}
            onSelectionChange={(key) => {
              setCategory(String(key));
              setPage(1);
            }}
          >
            <Select.Trigger id="category-filter" className="min-h-11">
              <Select.Value />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {["All", ...categories].map((item) => (
                  <ListBox.Item key={item} id={item} textValue={item}>{item}</ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </label>
        </Card.Content>
      </Card>
      <div>
        <div className="mb-[18px] flex items-center justify-between text-stone-500 dark:text-stone-400 max-[660px]:flex-col max-[660px]:items-start">
          <strong>
            Showing {filteredRecipes.length ? (safePage - 1) * pageSize + 1 : 0}-
            {Math.min(safePage * pageSize, filteredRecipes.length)} of {filteredRecipes.length} recipes
          </strong>
          <span>Page {safePage} of {pageCount}</span>
        </div>
        <div className="grid grid-cols-4 gap-5 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id || recipe._id || recipe.recipeName} recipe={recipe} />
          ))}
        </div>
        {visibleRecipes.length === 0 ? (
          <p className="mt-5 text-stone-600 dark:text-stone-300">No recipes match your search.</p>
        ) : null}
        <Pagination className="mt-6 justify-center" aria-label="Recipe pagination">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                onPress={() => setPage((current) => Math.max(1, current - 1))}
                isDisabled={safePage === 1}
              >
                Previous
              </Pagination.Previous>
            </Pagination.Item>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <Pagination.Item key={pageNumber}>
                <Pagination.Link
                  isActive={safePage === pageNumber}
                  onPress={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                onPress={() => setPage((current) => Math.min(pageCount, current + 1))}
                isDisabled={safePage === pageCount}
              >
                Next
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    </div>
  );
}
