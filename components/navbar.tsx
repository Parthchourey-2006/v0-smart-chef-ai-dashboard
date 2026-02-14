"use client"

import { ChefHat, Leaf } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <ChefHat className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            SmartChef <span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="#swipe" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Discover
          </Link>
          <Link href="#science" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Science
          </Link>
          <Link href="#impact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Impact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
            <Leaf className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Eco Mode</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
