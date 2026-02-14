"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FlaskConical, ArrowRight, Atom } from "lucide-react"
import { substitutions, type Substitution } from "@/lib/recipe-data"

function MolecularDiagram({ compounds }: { compounds: string[] }) {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      {/* Center node */}
      <div className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
        <Atom className="h-5 w-5 text-primary" />
      </div>

      {/* Compound nodes */}
      {compounds.map((compound, i) => {
        const angle = (i * 120 - 90) * (Math.PI / 180)
        const radius = 56
        const cx = Math.cos(angle) * radius
        const cy = Math.sin(angle) * radius

        return (
          <motion.div
            key={compound}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
            className="absolute z-10"
            style={{ left: `calc(50% + ${cx}px - 32px)`, top: `calc(50% + ${cy}px - 12px)` }}
          >
            {/* Connection line (SVG would be ideal but text fallback) */}
            <div className="rounded-full border border-primary/20 bg-card px-2 py-1 text-center text-[10px] font-medium text-primary">
              {compound}
            </div>
          </motion.div>
        )
      })}

      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 160">
        {compounds.map((_, i) => {
          const angle = (i * 120 - 90) * (Math.PI / 180)
          const radius = 56
          const x2 = 80 + Math.cos(angle) * radius
          const y2 = 80 + Math.sin(angle) * radius
          return (
            <motion.line
              key={i}
              x1="80" y1="80"
              x2={x2} y2={y2}
              stroke="hsl(160 84% 39% / 0.25)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            />
          )
        })}
      </svg>
    </div>
  )
}

function SubstitutionCard({ sub, isActive }: { sub: Substitution; isActive: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border transition-colors ${
        isActive ? "border-primary/30 bg-card/80" : "border-border bg-card/40"
      }`}
    >
      <div className="p-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Missing ingredient */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
              Not in Fridge
            </span>
            <p className="mt-2 font-display text-lg font-bold text-foreground">
              {sub.missing}
            </p>
          </div>

          {/* Arrow / Diagram */}
          <div className="flex flex-col items-center gap-2">
            {isActive ? (
              <MolecularDiagram compounds={sub.sharedCompounds} />
            ) : (
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          {/* Substitute */}
          <div className="flex-1 text-center md:text-right">
            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              FlavorDB Match
            </span>
            <p className="mt-2 font-display text-lg font-bold text-foreground">
              {sub.substitute}
            </p>
            <p className="mt-1 text-sm text-primary">
              Compatibility: {sub.compatibility}%
            </p>
          </div>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 overflow-hidden border-t border-border pt-4"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                {sub.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function SubstitutionPanel() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="science" className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
            <FlaskConical className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Molecular Intelligence</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Smart Substitutions
          </h2>
          <p className="mt-2 text-muted-foreground">
            Matched using shared molecular compounds from FlavorDB
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {substitutions.map((sub, i) => (
            <div key={sub.missing} onClick={() => setActiveIndex(i)} className="cursor-pointer">
              <SubstitutionCard sub={sub} isActive={i === activeIndex} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
