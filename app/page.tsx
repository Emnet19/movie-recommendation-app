"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { MovieGrid } from "@/components/movie-grid"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { ErrorUI } from "@/components/error-ui"
import type { Movie } from "@/types/movie"
import { getHeroImageUrl } from "@/utils/tmdb-client"
import Link from "next/link"
import Image from "next/image"
import { Play, Sparkles } from "lucide-react"

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("/api/movies/trending")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setTrendingMovies(data.results.slice(0, 12))
      } catch (err) {
        setError("Failed to load trending movies. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ErrorUI title="Error Loading Movies" message={error} retry={() => window.location.reload()} />
          </div>
        </main>
      </>
    )
  }

  const featuredMovie = trendingMovies[0]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section with Featured Movie */}
        {!isLoading && featuredMovie && (
          <section className="relative h-[600px] md:h-[700px] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={getHeroImageUrl(featuredMovie.backdrop_path) || "/placeholder.svg"}
                alt={featuredMovie.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                      Featured This Week
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
                    {featuredMovie.title}
                  </h1>

                  <p className="text-lg text-muted-foreground line-clamp-3 max-w-xl">
                    {featuredMovie.overview ||
                      "Experience the magic of cinema with our curated collection of the most trending movies."}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(featuredMovie.vote_average / 2) ? "fill-primary" : "fill-muted"
                            } text-primary`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-foreground font-semibold">{featuredMovie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>

                  <Link
                    href={`/movie/${featuredMovie.id}`}
                    className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-[0_0_30px_hsla(45,93%,58%,0.4)] transition-all duration-300 w-fit group"
                  >
                    <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Trending Movies Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="mb-12">
                <h2 className="section-title">Trending Now</h2>
              </div>
              <MovieGrid movies={trendingMovies.slice(1)} />
            </>
          )}
        </div>
      </main>
    </>
  )
}
