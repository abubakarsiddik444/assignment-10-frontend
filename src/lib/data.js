export const categories = [
  "Breakfast",
  "Dinner",
  "Dessert",
  "Vegan",
  "Street Food",
  "Seafood",
];

export const recipes = [
  {
    id: "golden-paneer-bowl",
    recipeName: "Golden Paneer Bowl",
    recipeImage:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    category: "Dinner",
    cuisineType: "Indian",
    difficultyLevel: "Medium",
    preparationTime: "35 min",
    ingredients: ["Paneer", "Turmeric rice", "Bell pepper", "Mint yogurt"],
    instructions:
      "Sear paneer until crisp, fold into spiced vegetables, and serve over turmeric rice with chilled mint yogurt.",
    authorName: "Nadia Rahman",
    authorEmail: "nadia@example.com",
    likesCount: 842,
    isFeatured: true,
    status: "published",
    price: 4.99,
  },
  {
    id: "citrus-salmon-tray",
    recipeName: "Citrus Salmon Tray",
    recipeImage:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    category: "Seafood",
    cuisineType: "Mediterranean",
    difficultyLevel: "Easy",
    preparationTime: "28 min",
    ingredients: ["Salmon", "Lemon", "Asparagus", "Olive oil"],
    instructions:
      "Roast salmon with lemon wheels and vegetables until flaky, then finish with herbs and olive oil.",
    authorName: "Omar Hayes",
    authorEmail: "omar@example.com",
    likesCount: 1190,
    isFeatured: true,
    status: "published",
    price: 5.49,
  },
  {
    id: "mango-sticky-parfait",
    recipeName: "Mango Sticky Parfait",
    recipeImage:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    category: "Dessert",
    cuisineType: "Thai",
    difficultyLevel: "Easy",
    preparationTime: "20 min",
    ingredients: ["Mango", "Sticky rice", "Coconut cream", "Sesame"],
    instructions:
      "Layer coconut sticky rice, mango slices, and lightly salted cream in chilled glasses.",
    authorName: "Mina Chen",
    authorEmail: "mina@example.com",
    likesCount: 1565,
    isFeatured: true,
    status: "published",
    price: 3.99,
  },
  {
    id: "smoky-bean-tacos",
    recipeName: "Smoky Bean Tacos",
    recipeImage:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
    category: "Street Food",
    cuisineType: "Mexican",
    difficultyLevel: "Easy",
    preparationTime: "25 min",
    ingredients: ["Black beans", "Corn tortillas", "Avocado", "Pickled onion"],
    instructions:
      "Simmer beans with smoked paprika, char tortillas, and top with avocado and pickled onion.",
    authorName: "Carlos Vega",
    authorEmail: "carlos@example.com",
    likesCount: 1324,
    isFeatured: false,
    status: "published",
    price: 2.99,
  },
  {
    id: "green-garden-ramen",
    recipeName: "Green Garden Ramen",
    recipeImage:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    category: "Vegan",
    cuisineType: "Japanese",
    difficultyLevel: "Hard",
    preparationTime: "50 min",
    ingredients: ["Ramen noodles", "Miso", "Mushroom", "Bok choy"],
    instructions:
      "Build a mushroom miso broth, cook noodles separately, and assemble with greens and chili oil.",
    authorName: "Aiko Sato",
    authorEmail: "aiko@example.com",
    likesCount: 986,
    isFeatured: false,
    status: "published",
    price: 4.49,
  },
  {
    id: "berry-oat-skillet",
    recipeName: "Berry Oat Skillet",
    recipeImage:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80",
    category: "Breakfast",
    cuisineType: "American",
    difficultyLevel: "Easy",
    preparationTime: "18 min",
    ingredients: ["Rolled oats", "Berries", "Honey", "Greek yogurt"],
    instructions:
      "Toast oats in a skillet, simmer with berries, and spoon into bowls with yogurt and honey.",
    authorName: "Ella Morgan",
    authorEmail: "ella@example.com",
    likesCount: 764,
    isFeatured: false,
    status: "published",
    price: 2.49,
  },
];

export const currentUser = {
  name: "Hasnain Ahmed",
  email: "hasnain@example.com",
  image:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  role: "user",
  isPremium: true,
  isBlocked: false,
};

export const users = [
  currentUser,
  {
    name: "Nadia Rahman",
    email: "nadia@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    role: "admin",
    isPremium: true,
    isBlocked: false,
  },
  {
    name: "Carlos Vega",
    email: "carlos@example.com",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    role: "user",
    isPremium: false,
    isBlocked: false,
  },
];

export const reports = [
  {
    id: "rpt-1001",
    recipeId: "smoky-bean-tacos",
    recipeName: "Smoky Bean Tacos",
    reporterEmail: "reader@example.com",
    reason: "Copyright Issue",
    status: "pending",
    createdAt: "2026-10-10",
  },
  {
    id: "rpt-1002",
    recipeId: "green-garden-ramen",
    recipeName: "Green Garden Ramen",
    reporterEmail: "chef@example.com",
    reason: "Spam",
    status: "pending",
    createdAt: "2026-10-12",
  },
];

export const payments = [
  {
    userEmail: "hasnain@example.com",
    amount: 19.99,
    recipeId: null,
    transactionId: "txn_91HUBPREMIUM",
    paymentStatus: "paid",
    paidAt: "2026-10-13",
  },
  {
    userEmail: "reader@example.com",
    amount: 5.49,
    recipeId: "citrus-salmon-tray",
    transactionId: "txn_84SALMON",
    paymentStatus: "paid",
    paidAt: "2026-10-11",
  },
];

export function getFeaturedRecipes() {
  return recipes.filter((recipe) => recipe.isFeatured);
}

export function getPopularRecipes() {
  return [...recipes].sort((a, b) => b.likesCount - a.likesCount).slice(0, 3);
}

export function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

export function getDashboardStats() {
  return {
    totalRecipes: recipes.length,
    totalFavorites: 4,
    totalLikesReceived: recipes.reduce((total, recipe) => total + recipe.likesCount, 0),
    totalUsers: users.length,
    totalPremiumMembers: users.filter((user) => user.isPremium).length,
    totalReports: reports.length,
  };
}
