"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center py-20">
      {/* Pulsing glow */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-8 w-8 text-primary" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 font-display text-lg font-semibold text-foreground"
      >
        Analyzing Your Ingredients...
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        Scanning RecipeDB and FlavorDB for optimal matches.
      </motion.p>

      {/* Progress dots */}
      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
