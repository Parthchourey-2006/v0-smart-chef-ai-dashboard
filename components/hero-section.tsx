"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Powered by RecipeDB + FlavorDB</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-balance text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl"
        >
          40% of Food Waste
          <br />
          <span className="text-primary">Happens at Home.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl"
        >
          We turn your fridge into intelligent meals. Ingredient-first matching, 
          molecular substitutions, and waste reduction scoring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#dashboard"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            Try SmartChef
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#swipe"
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-3.5 font-medium text-foreground transition-all hover:bg-secondary"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {["Ingredient-First Matching", "Molecular Substitutions", "Waste Reduction Scoring"].map((feature) => (
            <div
              key={feature}
              className="rounded-full border border-border bg-secondary/30 px-4 py-2 text-sm text-muted-foreground"
            >
              {feature}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
