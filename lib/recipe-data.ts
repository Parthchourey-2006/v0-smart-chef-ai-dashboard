export interface Recipe {
  id: number
  name: string
  image: string
  matchPercentage: number
  fridgeUtilization: number
  cookTime: string
  difficulty: string
  ingredients: string[]
  missingIngredients: string[]
}

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Creamy Garlic Parmesan Pasta",
    image: "/images/recipe-1.jpg",
    matchPercentage: 92,
    fridgeUtilization: 84,
    cookTime: "25 min",
    difficulty: "Easy",
    ingredients: ["Pasta", "Garlic", "Parmesan", "Cream", "Butter", "Herbs"],
    missingIngredients: ["Fresh Basil"],
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    image: "/images/recipe-2.jpg",
    matchPercentage: 87,
    fridgeUtilization: 76,
    cookTime: "15 min",
    difficulty: "Easy",
    ingredients: ["Bell Peppers", "Broccoli", "Tofu", "Soy Sauce", "Garlic"],
    missingIngredients: ["Sesame Oil", "Ginger"],
  },
  {
    id: 3,
    name: "Grilled Salmon & Vegetables",
    image: "/images/recipe-3.jpg",
    matchPercentage: 78,
    fridgeUtilization: 68,
    cookTime: "30 min",
    difficulty: "Medium",
    ingredients: ["Salmon", "Lemon", "Asparagus", "Olive Oil"],
    missingIngredients: ["Dill", "Capers"],
  },
  {
    id: 4,
    name: "Thai Green Curry",
    image: "/images/recipe-4.jpg",
    matchPercentage: 84,
    fridgeUtilization: 72,
    cookTime: "35 min",
    difficulty: "Medium",
    ingredients: ["Coconut Milk", "Green Curry Paste", "Chicken", "Rice"],
    missingIngredients: ["Thai Basil", "Fish Sauce"],
  },
  {
    id: 5,
    name: "Mediterranean Quinoa Bowl",
    image: "/images/recipe-5.jpg",
    matchPercentage: 95,
    fridgeUtilization: 90,
    cookTime: "20 min",
    difficulty: "Easy",
    ingredients: ["Quinoa", "Avocado", "Tomatoes", "Feta", "Cucumber"],
    missingIngredients: [],
  },
]

export interface Substitution {
  missing: string
  substitute: string
  compatibility: number
  sharedCompounds: string[]
  explanation: string
}

export const substitutions: Substitution[] = [
  {
    missing: "Fresh Basil",
    substitute: "Dried Oregano",
    compatibility: 91,
    sharedCompounds: ["Linalool", "Eugenol", "Cineole"],
    explanation: "Both herbs share dominant aromatic compounds from the terpene family, preserving the core Mediterranean flavor structure.",
  },
  {
    missing: "Sesame Oil",
    substitute: "Peanut Oil + Soy",
    compatibility: 86,
    sharedCompounds: ["Pyrazines", "Furanones", "Thiazoles"],
    explanation: "Peanut oil provides similar nutty base notes while soy sauce adds the umami depth that sesame oil contributes.",
  },
  {
    missing: "Fish Sauce",
    substitute: "Soy Sauce + Lime",
    compatibility: 88,
    sharedCompounds: ["Glutamates", "Histidine", "Alanine"],
    explanation: "Both are fermented condiments rich in free amino acids. The combination replicates the umami-acid balance.",
  },
]
