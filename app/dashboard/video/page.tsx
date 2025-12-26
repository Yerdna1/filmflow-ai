import Link from 'next/link'
import { Video, Plus, Sparkles, Play } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function getVideos(userId: string) {
  return db.generation.findMany({
    where: {
      userId,
      type: 'VIDEO',
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}

export default async function VideoPage() {
  const session = await auth()
  const videos = await getVideos(session!.user.id)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Videá</h1>
          <p className="text-muted-foreground mt-1">
            AI generované videá z vašich storyboardov
          </p>
        </div>
        <Link
          href="/dashboard/video/generate"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="h-5 w-5" />
          Generovať video
        </Link>
      </div>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Zatiaľ žiadne videá</h3>
          <p className="text-muted-foreground mb-6">
            Najprv vytvorte storyboard a potom ho premeňte na video
          </p>
          <Link
            href="/dashboard/storyboard/generate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="h-5 w-5" />
            Vytvoriť storyboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group"
            >
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                {video.outputUrl ? (
                  <>
                    <video
                      src={video.outputUrl}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </>
                ) : (
                  <Video className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.prompt || 'Bez popisu'}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(video.createdAt).toLocaleDateString('sk-SK')}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    video.status === 'COMPLETED'
                      ? 'bg-green-500/10 text-green-500'
                      : video.status === 'FAILED'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {video.status === 'COMPLETED' ? 'Hotovo' :
                     video.status === 'FAILED' ? 'Zlyhalo' : 'Spracováva sa'}
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
