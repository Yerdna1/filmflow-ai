import Link from 'next/link'
import { Plus, Users, Crown, UserCheck } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { ActorCard } from '@/components/actors/ActorCard'

async function getActors(userId: string) {
  return db.actor.findMany({
    where: {
      OR: [
        { userId },
        { type: 'PRESET', userId: null },
      ],
    },
    orderBy: [
      { type: 'asc' },
      { createdAt: 'desc' },
    ],
    include: {
      _count: {
        select: { sceneActors: true },
      },
    },
  })
}

async function getActorCounts(userId: string) {
  const counts = await db.actor.groupBy({
    by: ['type'],
    where: { userId },
    _count: { id: true },
  })

  return {
    MAIN: counts.find(c => c.type === 'MAIN')?._count.id || 0,
    SUPPORTING: counts.find(c => c.type === 'SUPPORTING')?._count.id || 0,
  }
}

export default async function ActorsPage() {
  const session = await auth()
  const [actors, counts] = await Promise.all([
    getActors(session!.user.id),
    getActorCounts(session!.user.id),
  ])

  const mainActors = actors.filter(a => a.type === 'MAIN')
  const supportingActors = actors.filter(a => a.type === 'SUPPORTING')
  const presetActors = actors.filter(a => a.type === 'PRESET')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Herci</h1>
          <p className="text-muted-foreground mt-1">
            Spravujte hercov pre vaše projekty
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/actors/new">
            <Plus className="h-4 w-4 mr-2" />
            Nový herec
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Hlavní herci"
          count={counts.MAIN}
          limit={2}
          color="text-primary"
        />
        <StatCard
          icon={<UserCheck className="h-5 w-5" />}
          label="Vedľajší herci"
          count={counts.SUPPORTING}
          limit={5}
          color="text-blue-500"
        />
        <StatCard
          icon={<Crown className="h-5 w-5" />}
          label="Preset herci"
          count={presetActors.length}
          color="text-accent-gold"
        />
      </div>

      {/* Main Actors */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hlavní herci</h2>
          <Link href="/dashboard/actors/main" className="text-sm text-primary hover:underline">
            Zobraziť všetkých
          </Link>
        </div>
        {mainActors.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mainActors.slice(0, 5).map(actor => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="Zatiaľ nemáte žiadnych hlavných hercov"
            action="/dashboard/actors/new?type=MAIN"
            actionLabel="Pridať hlavného herca"
          />
        )}
      </section>

      {/* Supporting Actors */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Vedľajší herci</h2>
          <Link href="/dashboard/actors/supporting" className="text-sm text-primary hover:underline">
            Zobraziť všetkých
          </Link>
        </div>
        {supportingActors.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {supportingActors.slice(0, 5).map(actor => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="Zatiaľ nemáte žiadnych vedľajších hercov"
            action="/dashboard/actors/new?type=SUPPORTING"
            actionLabel="Pridať vedľajšieho herca"
          />
        )}
      </section>

      {/* Preset Actors */}
      {presetActors.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Preset herci</h2>
            <Link href="/dashboard/actors/presets" className="text-sm text-primary hover:underline">
              Zobraziť všetkých
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {presetActors.slice(0, 5).map(actor => (
              <ActorCard key={actor.id} actor={actor} showActions={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  count,
  limit,
  color,
}: {
  icon: React.ReactNode
  label: string
  count: number
  limit?: number
  color: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-muted rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">
            {count}
            {limit && <span className="text-muted-foreground text-lg font-normal"> / {limit}</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

function EmptyState({
  message,
  action,
  actionLabel,
}: {
  message: string
  action: string
  actionLabel: string
}) {
  return (
    <div className="bg-card border border-dashed border-border rounded-xl p-8 text-center">
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button asChild>
        <Link href={action}>
          <Plus className="h-4 w-4 mr-2" />
          {actionLabel}
        </Link>
      </Button>
    </div>
  )
}
