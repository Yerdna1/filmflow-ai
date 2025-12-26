'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="bg-card border-red-500/50 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Nastala chyba
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Ospravedlňujeme sa, niečo sa pokazilo. Skúste to prosím znova.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              Kód chyby: {error.digest}
            </p>
          )}
          <div className="flex gap-3">
            <Button onClick={reset} variant="default">
              Skúsiť znova
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="secondary"
            >
              Späť na hlavnú stránku
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
