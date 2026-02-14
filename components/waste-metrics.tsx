"use client"

import { motion } from "framer-motion"
import { Leaf, TrendingUp, DollarSign, Scale } from "lucide-react"

const metrics = [
  {
    label: "Ingredients Used",
    value: "12",
    change: "+3 this week",
    positive: true,
    icon: Scale,
  },
  {
    label: "Food Waste Prevented",
    value: "1.8 lbs",
    change: "~$4.20 saved",
    positive: true,
    icon: Leaf,
  },
  {
    label: "Money Saved",
    value: "$28.50",
    change: "This month",
    positive: true,
    icon: DollarSign,
  },
]

function CircularProgress({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke="hsl(222 25% 18%)"
          strokeWidth="8"
        />
        <motion.circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke="hsl(160 84% 39%)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="font-display text-3xl font-bold text-foreground"
        >
          {percentage}%
        </motion.span>
        <p className="text-xs text-muted-foreground">Utilization</p>
      </div>
    </div>
  )
}

export function WasteMetrics() {
  return (
    <section id="impact" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Sustainability Impact</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Your Waste Impact
          </h2>
          <p className="mt-2 text-muted-foreground">
            Small decisions. Massive environmental impact.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {metric.change}
                  </div>
                </div>
                <p className="mt-4 font-display text-3xl font-bold text-foreground">{metric.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Fridge Utilization Circle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm"
        >
          <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
            Fridge Utilization Score
          </h3>
          <CircularProgress percentage={74} />
          <p className="mt-4 text-sm text-muted-foreground">
            Higher score = less waste
          </p>

          {/* Projected savings chart placeholder */}
          <div className="mt-8 w-full">
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">Projected Household Savings</h4>
            <div className="flex h-32 items-end gap-2">
              {[28, 35, 42, 38, 52, 60, 48, 65, 72, 68, 78, 85].map((val, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md bg-primary/60"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${val}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-xs text-muted-foreground">Jan</span>
              <span className="text-xs text-muted-foreground">Dec</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
