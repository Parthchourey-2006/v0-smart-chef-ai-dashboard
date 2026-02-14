"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { IngredientInput } from "@/components/ingredient-input"
import { SwipeDeck } from "@/components/swipe-deck"
import { SubstitutionPanel } from "@/components/substitution-panel"
import { WasteMetrics } from "@/components/waste-metrics"
import { LoadingState } from "@/components/loading-state"

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasResults, setHasResults] = useState(true)

  const handleGenerate = () => {
    setIsLoading(true)
    setHasResults(false)
    setTimeout(() => {
      setIsLoading(false)
      setHasResults(true)
    }, 2000)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <IngredientInput onGenerate={handleGenerate} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingState key="loading" />
        ) : hasResults ? (
          <div key="results">
            <SwipeDeck />
            <SubstitutionPanel />
            <WasteMetrics />
          </div>
        ) : null}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-muted-foreground">
            SmartChef AI - Cook What You Have. Waste Nothing.
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Powered by RecipeDB + FlavorDB
          </p>
        </div>
      </footer>
    </main>
  )
}
