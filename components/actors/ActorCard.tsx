'use client'

import Image from 'next/image'
import Link from 'next/link'
import { User, Film, MoreVertical, Edit, Trash2, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Actor {
  id: string
  name: string
  type: 'MAIN' | 'SUPPORTING' | 'PRESET'
  age?: number | null
  gender?: string | null
  description?: string | null
  imageUrl?: string | null
  _count?: {
    sceneActors: number
  }
}

interface ActorCardProps {
  actor: Actor
  isSelected?: boolean
  onSelect?: (actor: Actor) => void
  onEdit?: (actor: Actor) => void
  onDelete?: (actor: Actor) => void
  showActions?: boolean
}

const typeLabels = {
  MAIN: { label: 'Hlavný', color: 'bg-primary' },
  SUPPORTING: { label: 'Vedľajší', color: 'bg-secondary' },
  PRESET: { label: 'Preset', color: 'bg-accent-gold text-black' },
}

export function ActorCard({
  actor,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  showActions = true,
}: ActorCardProps) {
  const typeInfo = typeLabels[actor.type]

  return (
    <div
      className={cn(
        'group relative bg-card border border-border rounded-xl overflow-hidden transition-all',
        isSelected && 'ring-2 ring-primary',
        onSelect && 'cursor-pointer hover:border-primary/50'
      )}
      onClick={() => onSelect?.(actor)}
    >
      {/* Image */}
      <div className="aspect-[3/4] relative bg-muted">
        {actor.imageUrl ? (
          <Image
            src={actor.imageUrl}
            alt={actor.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Type badge */}
        <Badge className={cn('absolute top-3 left-3', typeInfo.color)}>
          {actor.type === 'PRESET' && <Crown className="h-3 w-3 mr-1" />}
          {typeInfo.label}
        </Badge>

        {/* Actions */}
        {showActions && actor.type !== 'PRESET' && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-1">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/50 hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(actor)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/50 hover:bg-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(actor)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-lg text-white">{actor.name}</h3>
          <div className="flex items-center gap-2 text-sm text-white/70 mt-1">
            {actor.age && <span>{actor.age} rokov</span>}
            {actor.gender && <span>{actor.gender}</span>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4">
        {actor.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {actor.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/50 italic">
            Bez popisu
          </p>
        )}

        {actor._count && actor._count.sceneActors > 0 && (
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
            <Film className="h-3 w-3" />
            <span>{actor._count.sceneActors} scén</span>
          </div>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export function ActorCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="aspect-[3/4] skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-1/2" />
      </div>
    </div>
  )
}
