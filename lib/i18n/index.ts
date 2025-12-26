import { sk, type Translations } from './sk'

export const translations: { sk: Translations } = {
  sk,
}

export const defaultLocale = 'sk'

/**
 * Get translation by key path
 * Example: t('actors.title') => 'Herci'
 */
export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.')
  let value: any = translations[defaultLocale]

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      console.warn(`Translation missing: ${key}`)
      return key
    }
  }

  if (typeof value !== 'string') {
    console.warn(`Translation is not a string: ${key}`)
    return key
  }

  // Replace parameters like {n} with values
  if (params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey]?.toString() ?? `{${paramKey}}`
    })
  }

  return value
}

/**
 * Format date to Slovak format: DD.MM.YYYY
 */
export function formatDateSk(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('sk-SK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Format date and time to Slovak format
 */
export function formatDateTimeSk(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('sk-SK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format relative time in Slovak
 */
export function formatRelativeTimeSk(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return t('time.justNow')
  if (diffMins < 60) return t('time.minutesAgo', { n: diffMins })
  if (diffHours < 24) return t('time.hoursAgo', { n: diffHours })
  if (diffDays === 1) return t('time.yesterday')
  if (diffDays < 7) return t('time.daysAgo', { n: diffDays })

  return formatDateSk(d)
}

/**
 * Format currency in Slovak format: XX,XX €
 */
export function formatCurrencySk(amount: number): string {
  return new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export { sk }
export type { Translations }
