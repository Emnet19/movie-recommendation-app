"use client"

import { AlertCircle } from "lucide-react"

interface ErrorUIProps {
  title: string
  message: string
  retry?: () => void
}

export function ErrorUI({ title, message, retry }: ErrorUIProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-card rounded-lg border border-border">
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
