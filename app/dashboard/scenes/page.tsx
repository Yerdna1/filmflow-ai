import Link from 'next/link'
import { Plus, Layers, Film, MessageSquare, Sparkles } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { SceneCard } from '@/components/scenes/SceneCard'

async function getScenes(userId: string) {
  return db.scene.findMany({
    where: { userId },
    orderBy: { order: 'asc' },
    include: {
      sceneActors: {
        include: {
          actor: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      },
      dialogueLines: true,
      _count: {
        select: { generations: true },
      },
    },
  })
}

async function getSceneStats(userId: string) {
  const [totalScenes, totalDialogues, totalGenerations] = await Promise.all([
    db.scene.count({ where: { userId } }),
    db.dialogueLine.count({
      where: { scene: { userId } },
    }),
    db.generation.count({
      where: { userId, sceneId: { not: null } },
    }),
  ])

  return { totalScenes, totalDialogues, totalGenerations }
}

export default async function ScenesPage() {
  const session = await auth()
  const [scenes, stats] = await Promise.all([
    getScenes(session!.user.id),
    getSceneStats(session!.user.id),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scény</h1>
          <p className="text-muted-foreground mt-1">
            Vytvárajte a spravujte filmové scény
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/scenes/library">
              <Sparkles className="h-4 w-4 mr-2" />
              Preset knižnica
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/scenes/new">
              <Plus className="h-4 w-4 mr-2" />
              Nová scéna
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Layers className="h-5 w-5" />}
          label="Celkom scén"
          value={stats.totalScenes}
        />
        <StatCard
          icon={<MessageSquare className="h-5 w-5" />}
          label="Dialógových replík"
          value={stats.totalDialogues}
        />
        <StatCard
          icon={<Film className="h-5 w-5" />}
          label="AI generácií"
          value={stats.totalGenerations}
        />
      </div>

      {/* Scenes Grid */}
      {scenes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenes.map(scene => (
            <Link key={scene.id} href={`/dashboard/scenes/${scene.id}`}>
              <SceneCard scene={scene} />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center">
      <Layers className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Zatiaľ nemáte žiadne scény</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Začnite vytvorením novej scény alebo vyberte z našej knižnice predpripravených slovenských dramatických scén.
      </p>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard/scenes/library">
            <Sparkles className="h-4 w-4 mr-2" />
            Preset knižnica
          </Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/scenes/new">
            <Plus className="h-4 w-4 mr-2" />
            Vytvoriť scénu
          </Link>
        </Button>
      </div>
    </div>
  )
}
