import { getTrendingMovies } from "@/utils/tmdb-server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await getTrendingMovies()
    return NextResponse.json(data)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: 500 })
  }
}
