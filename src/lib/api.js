import {
  getDashboardStats,
  getFeaturedRecipes,
  getPopularRecipes,
  getRecipeById,
  recipes as fallbackRecipes,
} from "@/lib/data";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function apiFetch(path, options = {}) {
  const requestUrl =
    typeof window === "undefined"
      ? `${API_BASE_URL}${path}`
      : `/api/backend${path}`;
  const response = await fetch(requestUrl, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function getRecipes(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });
  try {
    return await apiFetch(`/api/recipes?${searchParams}`);
  } catch {
    let items = fallbackRecipes;
    if (params.featured === "true") items = getFeaturedRecipes();
    if (params.sort === "popular") items = getPopularRecipes();
    return { recipes: items, total: items.length, page: 1, limit: items.length, pages: 1 };
  }
}

export async function getRecipe(id) {
  try {
    return await apiFetch(`/api/recipes/${id}`);
  } catch {
    return { recipe: getRecipeById(id) };
  }
}

export async function getOverview() {
  try {
    return await apiFetch("/api/dashboard/overview");
  } catch {
    return getDashboardStats();
  }
}
