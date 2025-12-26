import Link from 'next/link'
import { Film, Users, Layers, Video, Mic, BarChart3, Plus } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function getDashboardStats(userId: string) {
  const [actorCount, sceneCount, generationCount] = await Promise.all([
    db.actor.count({ where: { userId } }),
    db.scene.count({ where: { userId } }),
    db.generation.count({ where: { userId } }),
  ])

  return { actorCount, sceneCount, generationCount }
}

export default async function DashboardPage() {
  const session = await auth()
  const stats = await getDashboardStats(session!.user.id)

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">
          Vitajte, {session?.user?.name?.split(' ')[0] || 'Používateľ'}
        </h1>
        <p className="text-muted-foreground mt-1">
          Čo budete dnes tvoriť?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Herci"
          value={stats.actorCount}
          href="/dashboard/actors"
        />
        <StatCard
          icon={<Layers className="h-5 w-5" />}
          label="Scény"
          value={stats.sceneCount}
          href="/dashboard/scenes"
        />
        <StatCard
          icon={<Video className="h-5 w-5" />}
          label="Generácie"
          value={stats.generationCount}
          href="/dashboard/generations"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Rýchle akcie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            icon={<Users className="h-6 w-6" />}
            title="Nový herec"
            description="Pridať herca do projektu"
            href="/dashboard/actors/new"
          />
          <QuickActionCard
            icon={<Layers className="h-6 w-6" />}
            title="Nová scéna"
            description="Vytvoriť novú scénu"
            href="/dashboard/scenes/new"
          />
          <QuickActionCard
            icon={<Film className="h-6 w-6" />}
            title="Generovať storyboard"
            description="AI generácia obrázkov"
            href="/dashboard/storyboard/generate"
          />
          <QuickActionCard
            icon={<Mic className="h-6 w-6" />}
            title="Slovenský dialóg"
            description="Generovať hlas s ElevenLabs"
            href="/dashboard/audio/dialogue"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posledná aktivita</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-center text-muted-foreground py-8">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Zatiaľ žiadna aktivita</p>
            <p className="text-sm mt-1">Začnite vytvorením herca alebo scény</p>
          </div>
        </div>
      </div>

      {/* Free Tier Usage */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Využitie Free Tier</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UsageCard
            service="Higgsfield"
            used={0}
            limit={5}
            period="denne"
          />
          <UsageCard
            service="ElevenLabs"
            used={0}
            limit={10000}
            period="mesačne"
            unit="znakov"
          />
          <UsageCard
            service="Suno"
            used={0}
            limit={50}
            period="denne"
            unit="kreditov"
          />
          <UsageCard
            service="Modal"
            used={0}
            limit={30}
            period="mesačne"
            unit="$"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  href
}: {
  icon: React.ReactNode
  label: string
  value: number
  href: string
}) {
  return (
    <Link
      href={href}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </Link>
  )
}

function QuickActionCard({
  icon,
  title,
  description,
  href
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </Link>
  )
}

function UsageCard({
  service,
  used,
  limit,
  period,
  unit = 'generácií'
}: {
  service: string
  used: number
  limit: number
  period: string
  unit?: string
}) {
  const percentage = (used / limit) * 100

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{service}</span>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{used}</span>
        <span className="text-muted-foreground">/ {limit} {unit}</span>
      </div>
      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
