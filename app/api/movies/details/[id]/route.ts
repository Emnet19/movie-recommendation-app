import { getMovieDetails, getMovieRecommendations } from "@/utils/tmdb-server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const movieId = Number.parseInt(id, 10)

    const [details, recommendations] = await Promise.all([getMovieDetails(movieId), getMovieRecommendations(movieId)])

    return NextResponse.json({ details, recommendations })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
  }
}
