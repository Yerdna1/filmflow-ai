'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="sk">
      <body className="bg-background text-foreground">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-md w-full bg-card rounded-lg border border-red-500/50 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h1 className="text-xl font-semibold text-red-400">
                Kritická chyba
              </h1>
            </div>

            <p className="text-muted-foreground mb-6">
              Aplikácia narazila na neočakávanú chybu. Naši technici boli upozornení.
            </p>

            {error.digest && (
              <p className="text-xs text-muted-foreground font-mono mb-4">
                Referencia: {error.digest}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Obnoviť stránku
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
              >
                Domov
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
