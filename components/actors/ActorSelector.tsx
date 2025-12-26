'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ActorCard, ActorCardSkeleton } from './ActorCard'

interface Actor {
  id: string
  name: string
  type: 'MAIN' | 'SUPPORTING' | 'PRESET'
  age?: number | null
  gender?: string | null
  description?: string | null
  imageUrl?: string | null
}

interface ActorSelectorProps {
  selectedActors: Actor[]
  onSelect: (actors: Actor[]) => void
  maxSelections?: number
  filterType?: 'MAIN' | 'SUPPORTING' | 'PRESET' | null
}

export function ActorSelector({
  selectedActors,
  onSelect,
  maxSelections = 6,
  filterType = null,
}: ActorSelectorProps) {
  const [actors, setActors] = useState<Actor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState<'MAIN' | 'SUPPORTING' | 'PRESET' | null>(filterType)

  useEffect(() => {
    fetchActors()
  }, [activeType])

  const fetchActors = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeType) params.set('type', activeType)

      const response = await fetch(`/api/actors?${params}`)
      const data = await response.json()

      if (data.success) {
        setActors(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch actors:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActor = (actor: Actor) => {
    const isSelected = selectedActors.some(a => a.id === actor.id)

    if (isSelected) {
      onSelect(selectedActors.filter(a => a.id !== actor.id))
    } else if (selectedActors.length < maxSelections) {
      onSelect([...selectedActors, actor])
    }
  }

  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Selected actors */}
      {selectedActors.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg">
          {selectedActors.map(actor => (
            <Badge
              key={actor.id}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              {actor.name}
              <button
                onClick={() => toggleActor(actor)}
                className="ml-1 p-0.5 hover:bg-background rounded"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <span className="text-xs text-muted-foreground self-center ml-2">
            {selectedActors.length} / {maxSelections}
          </span>
        </div>
      )}

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hľadať hercov..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeType === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveType(null)}
          >
            Všetci
          </Button>
          <Button
            variant={activeType === 'MAIN' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveType('MAIN')}
          >
            Hlavní
          </Button>
          <Button
            variant={activeType === 'SUPPORTING' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveType('SUPPORTING')}
          >
            Vedľajší
          </Button>
          <Button
            variant={activeType === 'PRESET' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveType('PRESET')}
          >
            Presety
          </Button>
        </div>
      </div>

      {/* Actor grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <ActorCardSkeleton key={i} />
          ))
        ) : filteredActors.length > 0 ? (
          filteredActors.map(actor => (
            <ActorCard
              key={actor.id}
              actor={actor}
              isSelected={selectedActors.some(a => a.id === actor.id)}
              onSelect={toggleActor}
              showActions={false}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p>Žiadni herci nenájdení</p>
            <Button variant="outline" className="mt-4" asChild>
              <a href="/dashboard/actors/new">
                <Plus className="h-4 w-4 mr-2" />
                Pridať herca
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
