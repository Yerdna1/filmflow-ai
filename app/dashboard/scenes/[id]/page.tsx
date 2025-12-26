import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2, Users, MessageSquare, Clock, MapPin, Tag, Film, Sparkles } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'

async function getScene(sceneId: string, userId: string) {
  const scene = await db.scene.findUnique({
    where: { id: sceneId },
    include: {
      sceneActors: {
        include: {
          actor: {
            select: {
              id: true,
              name: true,
              age: true,
              gender: true,
              description: true,
              imageUrl: true,
              type: true,
            },
          },
        },
      },
      dialogueLines: {
        orderBy: { order: 'asc' },
        include: {
          scene: {
            select: {
              userId: true,
            },
          },
        },
      },
      generations: {
        where: { userId },
        take: 3,
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  return scene
}

export default async function SceneDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const scene = await getScene(params.id, session.user.id)

  if (!scene) {
    return (
      <div className="space-y-8">
        <div className="bg-card border border-red-500/20 rounded-xl p-12 text-center">
          <Film className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Scéna nenájdená</h1>
          <p className="text-muted-foreground mb-6">
            Scéna, ktorú hľadáte, buď neexistuje alebo k nej nemáte prístup.
          </p>
          <Button asChild>
            <Link href="/dashboard/scenes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Späť na scény
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-2">
            <Link href="/dashboard/scenes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Späť na scény
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{scene.title}</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/scenes/${scene.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Upraviť
            </Link>
          </Button>
          <Button variant="destructive" asChild>
            <Link href={`/dashboard/scenes/${scene.id}/delete`}>
              <Trash2 className="h-4 w-4 mr-2" />
              Odstrániť
            </Link>
          </Button>
        </div>
      </div>

      {/* Scene Info */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Informácie o scéne</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lokácia</p>
              <p className="font-medium">{scene.location || 'Nespecifikované'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Čas</p>
              <p className="font-medium">{scene.timeOfDay || 'Nespecifikované'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nálada</p>
              <p className="font-medium">{scene.mood || 'Nespecifikované'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Film className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Typ</p>
              <p className="font-medium">{scene.type}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trvanie</p>
              <p className="font-medium">{scene.duration}s</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Poradie</p>
              <p className="font-medium">{scene.order}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {scene.description && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Popis scény</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">{scene.description}</p>
        </div>
      )}

      {/* Actors */}
      {scene.sceneActors.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Postavy ({scene.sceneActors.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scene.sceneActors.map((sceneActor) => (
              <div
                key={sceneActor.id}
                className="bg-muted/50 border border-border rounded-lg p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    {sceneActor.actor.imageUrl && (
                      <img
                        src={sceneActor.actor.imageUrl}
                        alt={sceneActor.actor.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{sceneActor.actor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {sceneActor.actor.age} rokov • {sceneActor.actor.type}
                    </p>
                  </div>
                </div>
                {sceneActor.actor.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {sceneActor.actor.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dialogue Lines */}
      {scene.dialogueLines.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Dialógy ({scene.dialogueLines.length})
          </h2>
          <div className="space-y-4">
            {scene.dialogueLines.map((line) => (
              <div
                key={line.id}
                className="flex gap-4 p-4 bg-muted/30 rounded-lg"
              >
                <div className="w-16 h-16 rounded-full bg-muted overflow-hidden flex-shrink-0">
                  {scene.sceneActors.find(
                    sa => sa.actorId === line.actorId
                  )?.actor.imageUrl && (
                    <img
                      src={
                        scene.sceneActors.find(
                          sa => sa.actorId === line.actorId
                        )?.actor.imageUrl || ''
                      }
                      alt={line.text}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    {scene.sceneActors.find(sa => sa.actorId === line.actorId)?.actor.name}
                  </p>
                  <p className="text-foreground">{line.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Generations */}
      {scene.generations && scene.generations.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Posledné generácie ({scene.generations.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scene.generations.map((generation) => (
              <div
                key={generation.id}
                className="bg-muted/50 border border-border rounded-lg overflow-hidden"
              >
                {generation.outputUrl && (
                  <div className="aspect-video bg-muted">
                    <img
                      src={generation.outputUrl}
                      alt={generation.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(generation.createdAt).toLocaleDateString('sk-SK')}
                  </p>
                  <p className="text-sm line-clamp-2 text-foreground">
                    {generation.prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button asChild className="flex-1">
          <Link href={`/dashboard/scenes/${scene.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Upraviť scénu
          </Link>
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link href={`/dashboard/storyboard/generate?sceneId=${scene.id}`}>
            <Sparkles className="h-4 w-4 mr-2" />
            Generovať storyboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
