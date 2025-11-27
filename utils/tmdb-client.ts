const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const TMDB_ORIGINAL_IMAGE_URL = "https://image.tmdb.org/t/p/original"

export function getImageUrl(path: string | null) {
  if (!path) return "/abstract-movie-poster.png"
  return `${TMDB_IMAGE_BASE_URL}${path}`
}

export function getHeroImageUrl(path: string | null) {
  if (!path) return "/cinema-backdrop.jpg"
  return `${TMDB_ORIGINAL_IMAGE_URL}${path}`
}
