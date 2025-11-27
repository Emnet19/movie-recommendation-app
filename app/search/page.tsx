"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { MovieGrid } from "@/components/movie-grid"
import { ErrorUI } from "@/components/error-ui"
import type { Movie } from "@/types/movie"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!query.trim()) return

      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) throw new Error("Failed to search")
        const data = await response.json()
        setResults(data.results)
        setHasSearched(true)
      } catch (err) {
        setError("Failed to search movies. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    [query],
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-6">Search Movies</h1>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter movie title..."
                  className="w-full px-6 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 font-medium"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </form>
          </div>

          {error ? (
            <ErrorUI
              title="Search Error"
              message={error}
              retry={() => handleSearch({ preventDefault: () => {} } as any)}
            />
          ) : hasSearched && results.length === 0 && !isLoading ? (
            <ErrorUI title="No Results" message={`No movies found for "${query}". Try a different search term.`} />
          ) : results.length > 0 ? (
            <MovieGrid movies={results} title={`Search Results for "${query}"`} />
          ) : (
            !hasSearched && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl text-muted-foreground">Start searching for your favorite movies</h2>
              </div>
            )
          )}
        </div>
      </main>
    </>
  )
}
