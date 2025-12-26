'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Film, Clock, MapPin, Users, MessageSquare, Edit, Trash2, Video } from 'lucide-react'
import { cn, formatDuration } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Scene {
  id: string
  title: string
  description?: string | null
  type: 'DIALOGUE' | 'ACTION' | 'EMOTIONAL' | 'TRANSITION' | 'ESTABLISHING'
  location?: string | null
  timeOfDay?: string | null
  mood?: string | null
  duration?: number | null
  sceneActors?: {
    actor: {
      id: string
      name: string
      imageUrl?: string | null
    }
  }[]
  dialogueLines?: { id: string }[]
  _count?: {
    generations: number
  }
}

interface SceneCardProps {
  scene: Scene
  isSelected?: boolean
  onSelect?: (scene: Scene) => void
  onEdit?: (scene: Scene) => void
  onDelete?: (scene: Scene) => void
  showActions?: boolean
}

const typeLabels = {
  DIALOGUE: { label: 'Dialóg', color: 'bg-blue-500' },
  ACTION: { label: 'Akcia', color: 'bg-red-500' },
  EMOTIONAL: { label: 'Emotívna', color: 'bg-pink-500' },
  TRANSITION: { label: 'Prechod', color: 'bg-yellow-500' },
  ESTABLISHING: { label: 'Úvodná', color: 'bg-green-500' },
}

export function SceneCard({
  scene,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
}: SceneCardProps) {
  const typeInfo = typeLabels[scene.type]
  const actors = scene.sceneActors || []
  const dialogueCount = scene.dialogueLines?.length || 0

  return (
    <div
      className={cn(
        'group bg-card border border-border rounded-xl overflow-hidden transition-all',
        isSelected && 'ring-2 ring-primary',
        onSelect && 'cursor-pointer hover:border-primary/50'
      )}
      onClick={() => onSelect?.(scene)}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
              {scene.mood && (
                <span className="text-xs text-muted-foreground">{scene.mood}</span>
              )}
            </div>
            <h3 className="font-semibold truncate">{scene.title}</h3>
          </div>

          {showActions && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(scene)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(scene)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {scene.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {scene.description}
          </p>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {scene.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {scene.location}
            </span>
          )}
          {scene.timeOfDay && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {scene.timeOfDay}
            </span>
          )}
          {scene.duration && (
            <span className="flex items-center gap-1">
              <Film className="h-3 w-3" />
              {formatDuration(scene.duration)}
            </span>
          )}
        </div>

        {/* Actors */}
        {actors.length > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {actors.slice(0, 4).map(({ actor }) => (
                <div
                  key={actor.id}
                  className="w-6 h-6 rounded-full bg-muted border-2 border-card overflow-hidden"
                  title={actor.name}
                >
                  {actor.imageUrl ? (
                    <Image
                      src={actor.imageUrl}
                      alt={actor.name}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      {actor.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
              {actors.length > 4 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">
                  +{actors.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 pt-2 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {dialogueCount} replík
          </span>
          {scene._count && scene._count.generations > 0 && (
            <span className="flex items-center gap-1">
              <Video className="h-3 w-3" />
              {scene._count.generations} generácií
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function SceneCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="h-5 skeleton rounded w-16 mb-2" />
        <div className="h-5 skeleton rounded w-3/4" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton rounded w-full" />
        <div className="h-4 skeleton rounded w-2/3" />
        <div className="flex gap-4">
          <div className="h-3 skeleton rounded w-20" />
          <div className="h-3 skeleton rounded w-16" />
        </div>
      </div>
    </div>
  )
}
