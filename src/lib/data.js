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
  {
    id: "roasted-tomato-orzo",
    recipeName: "Roasted Tomato Orzo",
    recipeImage:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    category: "Dinner",
    cuisineType: "Italian",
    difficultyLevel: "Easy",
    preparationTime: "32 min",
    ingredients: ["Orzo", "Cherry tomatoes", "Garlic", "Basil", "Parmesan"],
    instructions:
      "Roast tomatoes with garlic until jammy, simmer the orzo in vegetable stock, then fold together with basil and parmesan.",
    authorName: "Nadia Rahman",
    authorEmail: "nadia@example.com",
    likesCount: 928,
    isFeatured: true,
    status: "published",
    price: 3.49,
  },
  {
    id: "coconut-lentil-curry",
    recipeName: "Coconut Lentil Curry",
    recipeImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    category: "Vegan",
    cuisineType: "Indian",
    difficultyLevel: "Easy",
    preparationTime: "40 min",
    ingredients: ["Red lentils", "Coconut milk", "Tomatoes", "Ginger", "Spinach"],
    instructions:
      "Toast ginger and spices, simmer lentils with tomatoes and coconut milk until soft, then finish with fresh spinach.",
    authorName: "Aisha Karim",
    authorEmail: "aisha@example.com",
    likesCount: 1102,
    isFeatured: false,
    status: "published",
    price: 3.99,
  },
  {
    id: "blueberry-lemon-pancakes",
    recipeName: "Blueberry Lemon Pancakes",
    recipeImage:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
    category: "Breakfast",
    cuisineType: "American",
    difficultyLevel: "Easy",
    preparationTime: "22 min",
    ingredients: ["Flour", "Blueberries", "Lemon zest", "Milk", "Maple syrup"],
    instructions:
      "Fold blueberries and lemon zest into a light pancake batter, cook until golden, and serve warm with maple syrup.",
    authorName: "Ella Morgan",
    authorEmail: "ella@example.com",
    likesCount: 876,
    isFeatured: false,
    status: "published",
    price: 2.49,
  },
  {
    id: "crispy-tofu-banh-mi",
    recipeName: "Crispy Tofu Banh Mi",
    recipeImage:
      "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=1200&q=80",
    category: "Street Food",
    cuisineType: "Vietnamese",
    difficultyLevel: "Medium",
    preparationTime: "30 min",
    ingredients: ["Firm tofu", "Baguette", "Pickled carrot", "Cucumber", "Cilantro"],
    instructions:
      "Press and crisp tofu with a savory glaze, then layer into a toasted baguette with quick pickles, cucumber, and herbs.",
    authorName: "Minh Tran",
    authorEmail: "minh@example.com",
    likesCount: 1438,
    isFeatured: true,
    status: "published",
    price: 4.25,
  },
  {
    id: "miso-glazed-aubergine",
    recipeName: "Miso Glazed Aubergine",
    recipeImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    category: "Vegan",
    cuisineType: "Japanese",
    difficultyLevel: "Medium",
    preparationTime: "38 min",
    ingredients: ["Aubergine", "White miso", "Mirin", "Sesame", "Spring onion"],
    instructions:
      "Roast halved aubergines until tender, brush with a sweet miso glaze, and finish under the grill with sesame and spring onion.",
    authorName: "Aiko Sato",
    authorEmail: "aiko@example.com",
    likesCount: 1015,
    isFeatured: false,
    status: "published",
    price: 3.75,
  },
  {
    id: "cardamom-pear-crumble",
    recipeName: "Cardamom Pear Crumble",
    recipeImage:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1200&q=80",
    category: "Dessert",
    cuisineType: "British",
    difficultyLevel: "Easy",
    preparationTime: "45 min",
    ingredients: ["Pears", "Rolled oats", "Butter", "Brown sugar", "Cardamom"],
    instructions:
      "Toss ripe pears with cardamom, cover with a buttery oat topping, and bake until the fruit bubbles and the crumble is crisp.",
    authorName: "Mina Chen",
    authorEmail: "mina@example.com",
    likesCount: 1198,
    isFeatured: false,
    status: "published",
    price: 3.25,
  },
  {
    id: "herb-chicken-couscous",
    recipeName: "Herb Chicken Couscous",
    recipeImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    category: "Dinner",
    cuisineType: "Moroccan",
    difficultyLevel: "Medium",
    preparationTime: "42 min",
    ingredients: ["Chicken thighs", "Couscous", "Preserved lemon", "Parsley", "Cumin"],
    instructions:
      "Sear cumin-spiced chicken until golden, steam couscous in its pan juices, and finish with preserved lemon and parsley.",
    authorName: "Omar Hayes",
    authorEmail: "omar@example.com",
    likesCount: 1326,
    isFeatured: false,
    status: "published",
    price: 4.75,
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
