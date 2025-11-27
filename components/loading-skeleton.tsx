export function LoadingSkeleton() {
  return (
    <div className="movie-grid animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-muted rounded-lg aspect-[2/3]" />
      ))}
    </div>
  )
}
