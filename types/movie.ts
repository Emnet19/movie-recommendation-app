export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  runtime?: number
  genres?: Genre[]
  recommended_movies?: Movie[]
}

export interface Genre {
  id: number
  name: string
}

export interface TMDBResponse {
  results: Movie[]
  total_pages: number
  page: number
}
