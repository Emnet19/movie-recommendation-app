import type { Movie } from "@/types/movie"
import { MovieCard } from "./movie-card"

interface MovieGridProps {
  movies: Movie[]
  title: string
}

export function MovieGrid({ movies, title }: MovieGridProps) {
  return (
    <section className="py-8">
      <h2 className="section-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
