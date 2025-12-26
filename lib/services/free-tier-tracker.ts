import { db } from '@/lib/db'

export type ServiceType = 'higgsfield' | 'elevenlabs' | 'suno' | 'modal'

interface FreeTierLimits {
  [key: string]: {
    limit: number
    period: 'daily' | 'monthly'
    unit: string
  }
}

export const FREE_TIER_LIMITS: FreeTierLimits = {
  higgsfield: { limit: 5, period: 'daily', unit: 'generácií' },
  elevenlabs: { limit: 10000, period: 'monthly', unit: 'znakov' },
  suno: { limit: 50, period: 'daily', unit: 'kreditov' },
  modal: { limit: 3000, period: 'monthly', unit: 'centov' }, // $30 in cents
}

/**
 * Get the current period string for a service
 */
function getCurrentPeriod(service: ServiceType): string {
  const now = new Date()
  const limits = FREE_TIER_LIMITS[service]

  if (limits.period === 'daily') {
    return now.toISOString().split('T')[0] // YYYY-MM-DD
  } else {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` // YYYY-MM
  }
}

/**
 * Check if user can use a service
 */
export async function checkFreeTierLimit(
  userId: string,
  service: ServiceType,
  amount: number = 1
): Promise<{
  allowed: boolean
  used: number
  limit: number
  remaining: number
  period: string
}> {
  const period = getCurrentPeriod(service)
  const limits = FREE_TIER_LIMITS[service]

  const usage = await db.apiUsage.findUnique({
    where: {
      userId_service_period: {
        userId,
        service,
        period,
      },
    },
  })

  const used = usage?.count || 0
  const remaining = limits.limit - used
  const allowed = remaining >= amount

  return {
    allowed,
    used,
    limit: limits.limit,
    remaining: Math.max(0, remaining),
    period,
  }
}

/**
 * Track usage for a service
 */
export async function trackUsage(
  userId: string,
  service: ServiceType,
  amount: number = 1
): Promise<void> {
  const period = getCurrentPeriod(service)

  await db.apiUsage.upsert({
    where: {
      userId_service_period: {
        userId,
        service,
        period,
      },
    },
    update: {
      count: { increment: amount },
    },
    create: {
      userId,
      service,
      period,
      count: amount,
    },
  })
}

/**
 * Get all usage for a user
 */
export async function getAllUsage(userId: string): Promise<{
  [key in ServiceType]: {
    used: number
    limit: number
    remaining: number
    period: string
    resetTime: Date
  }
}> {
  const services: ServiceType[] = ['higgsfield', 'elevenlabs', 'suno', 'modal']
  const result: any = {}

  for (const service of services) {
    const period = getCurrentPeriod(service)
    const limits = FREE_TIER_LIMITS[service]

    const usage = await db.apiUsage.findUnique({
      where: {
        userId_service_period: {
          userId,
          service,
          period,
        },
      },
    })

    const used = usage?.count || 0
    const resetTime = getResetTime(service)

    result[service] = {
      used,
      limit: limits.limit,
      remaining: Math.max(0, limits.limit - used),
      period,
      resetTime,
    }
  }

  return result
}

/**
 * Get the next reset time for a service
 */
function getResetTime(service: ServiceType): Date {
  const limits = FREE_TIER_LIMITS[service]
  const now = new Date()

  if (limits.period === 'daily') {
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return tomorrow
  } else {
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    nextMonth.setHours(0, 0, 0, 0)
    return nextMonth
  }
}

/**
 * Format remaining time until reset
 */
export function formatTimeUntilReset(resetTime: Date): string {
  const now = new Date()
  const diff = resetTime.getTime() - now.getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return `${days} dní`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes} minút`
  }
}
