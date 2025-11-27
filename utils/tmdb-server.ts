const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.TMDB_API_KEY

if (!API_KEY) {
  console.warn("TMDB_API_KEY is not set")
}

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.append("api_key", API_KEY || "")

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("TMDB API call failed:", error)
    throw error
  }
}

export async function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week", {
    language: "en-US",
  })
}

export async function getMovieDetails(movieId: number) {
  return fetchFromTMDB(`/movie/${movieId}`, {
    language: "en-US",
  })
}

export async function getMovieRecommendations(movieId: number) {
  return fetchFromTMDB(`/movie/${movieId}/recommendations`, {
    language: "en-US",
  })
}

export async function searchMovies(query: string) {
  return fetchFromTMDB("/search/movie", {
    query,
    language: "en-US",
  })
}
