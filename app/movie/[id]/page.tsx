"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { MovieGrid } from "@/components/movie-grid"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { ErrorUI } from "@/components/error-ui"
import { useFavorites } from "@/hooks/use-favorites"
import type { Movie } from "@/types/movie"
import { getImageUrl } from "@/utils/tmdb-client"
import { ArrowLeft, Heart, Star, Calendar, Clock } from "lucide-react"

export default function MoviePage() {
  const params = useParams()
  const movieId = Number.parseInt(params.id as string)
  const { isFavorited, addFavorite, removeFavorite } = useFavorites()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/movies/details/${movieId}`)
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setMovie(data.details)
        setRecommendations(data.recommendations.results.slice(0, 8))
      } catch (err) {
        setError("Failed to load movie details.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [movieId])

  const isfav = movie ? isFavorited(movie.id) : false

  const handleFavoriteClick = () => {
    if (movie) {
      if (isfav) {
        removeFavorite(movie.id)
      } else {
        addFavorite(movie)
      }
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <LoadingSkeleton />
          </div>
        </main>
      </>
    )
  }

  if (error || !movie) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ErrorUI
              title="Movie Not Found"
              message={error || "This movie could not be loaded."}
              retry={() => window.location.reload()}
            />
          </div>
        </main>
      </>
    )
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src={getImageUrl(movie.backdrop_path) || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={handleFavoriteClick}
                className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
                  isfav
                    ? "bg-destructive text-destructive-foreground shadow-[0_0_20px_hsla(0,84%,60%,0.3)]"
                    : "bg-accent text-accent-foreground hover:shadow-[0_0_20px_hsla(262,83%,58%,0.3)]"
                }`}
              >
                <Heart className={`w-5 h-5 ${isfav ? "fill-current" : ""}`} />
                {isfav ? "Saved" : "Add to Favorites"}
              </button>
            </div>

            <div className="md:col-span-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{movie.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{releaseYear}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed text-lg">{movie.overview}</p>
            </div>
          </div>

          {recommendations.length > 0 && <MovieGrid movies={recommendations} title="You Might Also Like" />}
        </div>
      </main>
    </>
  )
}
