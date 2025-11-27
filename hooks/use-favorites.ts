"use client"

import { useState, useEffect } from "react"
import type { Movie } from "@/types/movie"

const FAVORITES_KEY = "movieFlix_favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse favorites:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const isDuplicate = prev.some((m) => m.id === movie.id)
      if (isDuplicate) return prev
      const updated = [...prev, movie]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => {
      const updated = prev.filter((m) => m.id !== movieId)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const isFavorited = (movieId: number) => {
    return favorites.some((m) => m.id === movieId)
  }

  return { favorites, addFavorite, removeFavorite, isFavorited, isLoading }
}
