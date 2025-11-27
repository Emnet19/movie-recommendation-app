"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Heart, Search } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_20px_hsla(45,93%,58%,0.3)] group-hover:shadow-[0_0_30px_hsla(45,93%,58%,0.5)] transition-all">
              <Film className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MovieFlix
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={`nav-link ${
                isActive("/")
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(45,93%,58%,0.2)]"
                  : "text-foreground hover:bg-secondary/50"
              }`}
            >
              <span>Home</span>
            </Link>
            <Link
              href="/search"
              className={`nav-link flex items-center gap-2 ${
                isActive("/search")
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(45,93%,58%,0.2)]"
                  : "text-foreground hover:bg-secondary/50"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
            <Link
              href="/favorites"
              className={`nav-link flex items-center gap-2 ${
                isActive("/favorites")
                  ? "bg-accent text-accent-foreground shadow-[0_0_20px_hsla(262,83%,58%,0.2)]"
                  : "text-foreground hover:bg-secondary/50"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
