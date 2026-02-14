"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Sparkles, Search } from "lucide-react"

const SUGGESTED_INGREDIENTS = [
  "Chicken", "Pasta", "Rice", "Garlic", "Onion", "Tomatoes",
  "Bell Peppers", "Eggs", "Cheese", "Butter", "Milk", "Broccoli",
  "Salmon", "Tofu", "Avocado", "Lemon", "Coconut Milk", "Olive Oil",
]

interface IngredientInputProps {
  onGenerate?: (ingredients: string[]) => void
}

export function IngredientInput({ onGenerate }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<string[]>(["Pasta", "Garlic", "Parmesan", "Cream"])
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const addIngredient = useCallback((ingredient: string) => {
    const trimmed = ingredient.trim()
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed])
    }
    setInputValue("")
  }, [ingredients])

  const removeIngredient = useCallback((ingredient: string) => {
    setIngredients((prev) => prev.filter((i) => i !== ingredient))
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addIngredient(inputValue)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    onGenerate?.(ingredients)
  }

  const availableSuggestions = SUGGESTED_INGREDIENTS.filter(
    (s) => !ingredients.includes(s)
  )

  return (
    <section id="dashboard" className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            {"What's in Your Fridge?"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ingredient-first, not recipe-first.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8"
        >
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type an ingredient and press Enter..."
              className="w-full rounded-xl border border-border bg-background/50 py-3.5 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>

          {/* Active ingredients */}
          <div className="mt-5 flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {ingredients.map((ingredient) => (
                <motion.button
                  key={ingredient}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => removeIngredient(ingredient)}
                  className="group flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  {ingredient}
                  <X className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Suggestions */}
          <div className="mt-5 border-t border-border pt-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Quick Add
            </p>
            <div className="flex flex-wrap gap-2">
              {availableSuggestions.slice(0, 8).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addIngredient(suggestion)}
                  className="flex items-center gap-1 rounded-full border border-border bg-secondary/30 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                >
                  <Plus className="h-3 w-3" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGenerate}
            disabled={ingredients.length === 0 || isGenerating}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                Analyzing Ingredients...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Smart Matches
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
