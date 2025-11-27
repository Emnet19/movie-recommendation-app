"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { MovieGrid } from "@/components/movie-grid"
import { useFavorites } from "@/hooks/use-favorites"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const { favorites, isLoading } = useFavorites()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated || isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">Loading favorites...</div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-card rounded-lg border border-border">
              <Heart className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Favorites Yet</h2>
              <p className="text-muted-foreground text-center max-w-md">
                Add movies to your favorites to see them here. Click the heart icon on any movie card!
              </p>
            </div>
          ) : (
            <MovieGrid movies={favorites} title={`Your Favorite Movies (${favorites.length})`} />
          )}
        </div>
      </main>
    </>
  )
}
