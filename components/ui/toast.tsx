'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ToastProps {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning'
  onClose: (id: string) => void
}

function Toast({ id, title, description, variant = 'default', onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 5000)
    return () => clearTimeout(timer)
  }, [id, onClose])

  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-emerald-950 border-emerald-500/50',
    error: 'bg-red-950 border-red-500/50',
    warning: 'bg-amber-950 border-amber-500/50',
  }

  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg',
        'animate-in slide-in-from-right-full duration-300',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

interface ToastContextType {
  toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Array<Omit<ToastProps, 'onClose'>>>([])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = React.useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])
  }, [])

  const contextValue = React.useMemo(
    () => ({
      toast: addToast,
      success: (title: string, description?: string) =>
        addToast({ title, description, variant: 'success' }),
      error: (title: string, description?: string) =>
        addToast({ title, description, variant: 'error' }),
      warning: (title: string, description?: string) =>
        addToast({ title, description, variant: 'warning' }),
    }),
    [addToast]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
