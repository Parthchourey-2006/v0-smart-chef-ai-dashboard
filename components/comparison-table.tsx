"use client"

import { motion } from "framer-motion"
import { Check, X, Zap } from "lucide-react"

const features = [
  {
    feature: "Ingredient-first approach",
    traditional: false,
    smartchef: true,
  },
  {
    feature: "Scientific substitutions",
    traditional: false,
    smartchef: true,
  },
  {
    feature: "Waste metric tracking",
    traditional: false,
    smartchef: true,
  },
  {
    feature: "Molecular flavor matching",
    traditional: false,
    smartchef: true,
  },
  {
    feature: "Recipe search",
    traditional: true,
    smartchef: true,
  },
  {
    feature: "Fridge utilization score",
    traditional: false,
    smartchef: true,
  },
]

export function ComparisonTable() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Why SmartChef</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Recipe Apps vs SmartChef AI
          </h2>
          <p className="mt-2 text-muted-foreground">
            Not just another recipe app. A food intelligence platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-border px-6 py-4">
            <div className="text-sm font-medium text-muted-foreground">Feature</div>
            <div className="text-center text-sm font-medium text-muted-foreground">Traditional Apps</div>
            <div className="text-center text-sm font-medium text-primary">SmartChef AI</div>
          </div>

          {/* Rows */}
          {features.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`grid grid-cols-3 items-center px-6 py-3.5 ${
                i < features.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <span className="text-sm text-foreground">{row.feature}</span>
              <div className="flex justify-center">
                {row.traditional ? (
                  <Check className="h-4.5 w-4.5 text-muted-foreground" />
                ) : (
                  <X className="h-4.5 w-4.5 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex justify-center">
                <Check className="h-4.5 w-4.5 text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
