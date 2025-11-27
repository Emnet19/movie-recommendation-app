import { searchMovies } from "@/utils/tmdb-server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || query.length < 1) {
      return NextResponse.json({ error: "Search query required" }, { status: 400 })
    }

    const data = await searchMovies(query)
    return NextResponse.json(data)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to search movies" }, { status: 500 })
  }
}
