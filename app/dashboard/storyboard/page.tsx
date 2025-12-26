import Link from 'next/link'
import { Image, Plus, Sparkles } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function getStoryboards(userId: string) {
  return db.generation.findMany({
    where: {
      userId,
      type: 'IMAGE',
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}

export default async function StoryboardPage() {
  const session = await auth()
  const storyboards = await getStoryboards(session!.user.id)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Storyboardy</h1>
          <p className="text-muted-foreground mt-1">
            AI generované obrázky pre vaše scény
          </p>
        </div>
        <Link
          href="/dashboard/storyboard/generate"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="h-5 w-5" />
          Generovať nový
        </Link>
      </div>

      {/* Storyboards Grid */}
      {storyboards.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Zatiaľ žiadne storyboardy</h3>
          <p className="text-muted-foreground mb-6">
            Začnite generovaním vášho prvého AI storyboardu
          </p>
          <Link
            href="/dashboard/storyboard/generate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="h-5 w-5" />
            Generovať storyboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyboards.map((storyboard) => (
            <div
              key={storyboard.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="aspect-video bg-muted flex items-center justify-center">
                {storyboard.outputUrl ? (
                  <img
                    src={storyboard.outputUrl}
                    alt={storyboard.prompt || 'Storyboard'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {storyboard.prompt || 'Bez popisu'}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(storyboard.createdAt).toLocaleDateString('sk-SK')}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    storyboard.status === 'COMPLETED'
                      ? 'bg-green-500/10 text-green-500'
                      : storyboard.status === 'FAILED'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {storyboard.status === 'COMPLETED' ? 'Hotovo' :
                     storyboard.status === 'FAILED' ? 'Zlyhalo' : 'Spracováva sa'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
