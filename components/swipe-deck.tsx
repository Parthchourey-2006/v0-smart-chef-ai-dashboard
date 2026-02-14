"use client"

import { useState, useCallback } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion"
import { Heart, X, Clock, ChefHat, Flame } from "lucide-react"
import Image from "next/image"
import { recipes, type Recipe } from "@/lib/recipe-data"

const SWIPE_THRESHOLD = 120

function SwipeCard({
  recipe,
  isTop,
  onSwipe,
}: {
  recipe: Recipe
  isTop: boolean
  onSwipe: (direction: "left" | "right") => void
}) {
  const x = useMotionValue(0)

  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12])
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 0.8, 1, 0.8, 0.5])

  // Overlay opacities
  const rejectOpacity = useTransform(x, [-150, -50, 0], [1, 0.3, 0])
  const saveOpacity = useTransform(x, [0, 50, 150], [0, 0.3, 1])

  // Background tint
  const backgroundGradient = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, transparent 100%)",
      "linear-gradient(135deg, transparent 0%, transparent 100%)",
      "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, transparent 100%)",
    ]
  )

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offsetX = info.offset.x

    if (offsetX > SWIPE_THRESHOLD) {
      onSwipe("right")
    } else if (offsetX < -SWIPE_THRESHOLD) {
      onSwipe("left")
    }
  }

  if (!isTop) {
    return (
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 0.95, y: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="h-full overflow-hidden rounded-3xl border border-border bg-card/60 opacity-60 backdrop-blur-sm">
          <div className="relative h-56 w-full bg-secondary/50">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover opacity-50"
            />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, y: 10, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{
        x: x.get() > 0 ? 400 : -400,
        opacity: 0,
        rotate: x.get() > 0 ? 15 : -15,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl shadow-black/40"
        style={{ background: backgroundGradient }}
      >
        {/* Recipe image */}
        <div className="relative h-56 w-full overflow-hidden md:h-64">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

          {/* Floating overlays */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: rejectOpacity }}
          >
            <div className="rounded-2xl border-4 border-destructive/80 bg-destructive/20 px-8 py-4 backdrop-blur-sm">
              <X className="mx-auto h-10 w-10 text-destructive" />
              <p className="mt-1 text-sm font-bold text-destructive">SKIP</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: saveOpacity }}
          >
            <div className="rounded-2xl border-4 border-primary/80 bg-primary/20 px-8 py-4 backdrop-blur-sm">
              <Heart className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-1 text-sm font-bold text-primary">SAVED</p>
            </div>
          </motion.div>

          {/* Match badge */}
          <div className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 backdrop-blur-sm">
            <span className="text-sm font-bold text-primary-foreground">{recipe.matchPercentage}% Match</span>
          </div>
        </div>

        {/* Recipe info */}
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
            {recipe.name}
          </h3>

          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {recipe.cookTime}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Flame className="h-4 w-4" />
              {recipe.difficulty}
            </div>
          </div>

          {/* Fridge utilization bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Fridge Utilization</span>
              <span className="text-xs font-bold text-primary">{recipe.fridgeUtilization}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${recipe.fridgeUtilization}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {recipe.ingredients.slice(0, 4).map((ing) => (
              <span
                key={ing}
                className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {ing}
              </span>
            ))}
            {recipe.missingIngredients.length > 0 && (
              <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                {recipe.missingIngredients.length} missing
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function SwipeDeck() {
  const [deck, setDeck] = useState<Recipe[]>([...recipes])
  const [saved, setSaved] = useState<Recipe[]>([])
  const [rejected, setRejected] = useState<Recipe[]>([])

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const current = deck[deck.length - 1]
      if (!current) return

      if (direction === "right") {
        setSaved((prev) => [...prev, current])
      } else {
        setRejected((prev) => [...prev, current])
      }

      setDeck((prev) => prev.slice(0, -1))
    },
    [deck]
  )

  const handleButtonSwipe = (direction: "left" | "right") => {
    handleSwipe(direction)
  }

  const topCard = deck[deck.length - 1]
  const nextCard = deck[deck.length - 2]

  return (
    <section id="swipe" className="relative px-6 py-24">
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
            <ChefHat className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Swipe to Discover</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Recipe Discovery
          </h2>
          <p className="mt-2 text-muted-foreground">
            Swipe right to save, left to skip
          </p>
        </motion.div>

        {/* Deck area */}
        <div className="relative mx-auto h-[480px] w-full max-w-sm md:h-[520px]">
          <AnimatePresence mode="popLayout">
            {deck.length > 0 ? (
              <>
                {nextCard && (
                  <SwipeCard
                    key={`next-${nextCard.id}`}
                    recipe={nextCard}
                    isTop={false}
                    onSwipe={() => {}}
                  />
                )}
                {topCard && (
                  <SwipeCard
                    key={`top-${topCard.id}`}
                    recipe={topCard}
                    isTop
                    onSwipe={handleSwipe}
                  />
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-card/50"
              >
                <ChefHat className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 font-display text-lg font-semibold text-foreground">All Caught Up!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You saved {saved.length} recipes
                </p>
                <button
                  onClick={() => setDeck([...recipes])}
                  className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        {deck.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleButtonSwipe("left")}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive shadow-lg shadow-destructive/10 transition-colors hover:bg-destructive/20"
            >
              <X className="h-7 w-7" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleButtonSwipe("right")}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/10 transition-colors hover:bg-primary/20"
            >
              <Heart className="h-7 w-7" />
            </motion.button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{saved.length}</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">{rejected.length}</p>
            <p className="text-xs text-muted-foreground">Skipped</p>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{deck.length}</p>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
        </div>
      </div>
    </section>
  )
}
