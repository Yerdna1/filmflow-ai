import Link from 'next/link'
import { Image, Video, Mic, Music, Filter } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function getGenerations(userId: string) {
  return db.generation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      scene: {
        select: { title: true },
      },
    },
  })
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'IMAGE':
      return <Image className="h-5 w-5" />
    case 'VIDEO':
      return <Video className="h-5 w-5" />
    case 'AUDIO':
      return <Mic className="h-5 w-5" />
    case 'MUSIC':
      return <Music className="h-5 w-5" />
    default:
      return <Image className="h-5 w-5" />
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'IMAGE':
      return 'Storyboard'
    case 'VIDEO':
      return 'Video'
    case 'AUDIO':
      return 'Dialóg'
    case 'MUSIC':
      return 'Hudba'
    default:
      return type
  }
}

export default async function GenerationsPage() {
  const session = await auth()
  const generations = await getGenerations(session!.user.id)

  const stats = {
    total: generations.length,
    completed: generations.filter(g => g.status === 'COMPLETED').length,
    pending: generations.filter(g => g.status === 'PENDING').length,
    failed: generations.filter(g => g.status === 'FAILED').length,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Všetky generácie</h1>
          <p className="text-muted-foreground mt-1">
            História vašich AI generácií
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Celkom</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Dokončené</p>
          <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Spracováva sa</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Zlyhané</p>
          <p className="text-2xl font-bold text-red-500">{stats.failed}</p>
        </div>
      </div>

      {/* Generations List */}
      {generations.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Zatiaľ žiadne generácie</h3>
          <p className="text-muted-foreground mb-6">
            Začnite vytvorením storyboardu, videa alebo dialógu
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard/storyboard/generate"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Image className="h-4 w-4" />
              Storyboard
            </Link>
            <Link
              href="/dashboard/audio/dialogue"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Mic className="h-4 w-4" />
              Dialóg
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium">Typ</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Popis</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Scéna</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium">Dátum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {generations.map((generation) => (
                <tr key={generation.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                        {getTypeIcon(generation.type)}
                      </div>
                      <span className="text-sm">{getTypeLabel(generation.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
                      {generation.prompt || 'Bez popisu'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">
                      {generation.scene?.title || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      generation.status === 'COMPLETED'
                        ? 'bg-green-500/10 text-green-500'
                        : generation.status === 'FAILED'
                        ? 'bg-red-500/10 text-red-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {generation.status === 'COMPLETED' ? 'Hotovo' :
                       generation.status === 'FAILED' ? 'Zlyhalo' : 'Spracováva sa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(generation.createdAt).toLocaleDateString('sk-SK', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
