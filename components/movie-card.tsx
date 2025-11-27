"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import type { Movie } from "@/types/movie"
import { getImageUrl } from "@/utils/tmdb-client"
import { useFavorites } from "@/hooks/use-favorites"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isFavorited, addFavorite, removeFavorite } = useFavorites()
  const isfav = isFavorited(movie.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isfav) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="movie-card group relative overflow-hidden bg-card">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-3">{movie.title}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-primary font-semibold text-sm">{movie.vote_average.toFixed(1)}</span>
            </div>
            <button
              onClick={handleFavoriteClick}
              className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
                isfav
                  ? "bg-destructive text-destructive-foreground shadow-[0_0_20px_hsla(0,84%,60%,0.3)]"
                  : "bg-accent text-accent-foreground hover:shadow-[0_0_20px_hsla(262,83%,58%,0.3)]"
              }`}
            >
              <Heart className={`w-4 h-4 ${isfav ? "fill-current" : ""}`} />
              {isfav ? "Saved" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
