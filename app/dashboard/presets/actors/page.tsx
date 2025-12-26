import Link from 'next/link'
import { ArrowLeft, Mic, User, Star, Users } from 'lucide-react'
import { demoActors, actorVoices } from '@/prisma/presets/actors'

export default function PresetActorsPage() {
  const mainActors = demoActors.filter(a => a.type === 'MAIN')
  const supportingActors = demoActors.filter(a => a.type === 'SUPPORTING')
  const presetActors = demoActors.filter(a => a.type === 'PRESET')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/presets"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Preset Herci</h1>
          <p className="text-muted-foreground mt-1">
            {demoActors.length} hercov pre demo film "Stratené Srdcia"
          </p>
        </div>
      </div>

      {/* Main Characters */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-accent-gold" />
          <h2 className="text-xl font-semibold">Hlavné postavy</h2>
          <span className="text-sm text-muted-foreground">({mainActors.length})</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainActors.map((actor) => (
            <ActorCard key={actor.name} actor={actor} featured />
          ))}
        </div>
      </section>

      {/* Supporting Characters */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Vedľajšie postavy</h2>
          <span className="text-sm text-muted-foreground">({supportingActors.length})</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportingActors.map((actor) => (
            <ActorCard key={actor.name} actor={actor} />
          ))}
        </div>
      </section>

      {/* Generic Presets */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Generické presety</h2>
          <span className="text-sm text-muted-foreground">({presetActors.length})</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Univerzálne postavy pre vedľajšie role a štatistov
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {presetActors.map((actor) => (
            <ActorCard key={actor.name} actor={actor} compact />
          ))}
        </div>
      </section>

      {/* Voice Presets */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Mic className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Hlasové presety</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          ElevenLabs hlasy pre slovenské dialógy
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(actorVoices).map(([id, voice]) => (
            <div
              key={id}
              className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Mic className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">{voice.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {voice.accent}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ActorCard({
  actor,
  featured = false,
  compact = false,
}: {
  actor: typeof demoActors[0]
  featured?: boolean
  compact?: boolean
}) {
  const voice = actor.voiceId ? actorVoices[actor.voiceId as keyof typeof actorVoices] : null

  if (compact) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
        <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 overflow-hidden">
          {actor.imageUrl ? (
            <img
              src={actor.imageUrl}
              alt={actor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <h4 className="font-medium text-sm text-center">{actor.name}</h4>
        <p className="text-xs text-muted-foreground text-center">{actor.gender}, {actor.age} rokov</p>
      </div>
    )
  }

  if (featured) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
        <div className="flex">
          <div className="w-48 h-48 bg-muted flex-shrink-0">
            {actor.imageUrl ? (
              <img
                src={actor.imageUrl}
                alt={actor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold">{actor.name}</h3>
              <span className="px-2 py-0.5 bg-accent-gold/10 text-accent-gold rounded text-xs font-medium">
                MAIN
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {actor.gender === 'female' ? 'Žena' : 'Muž'}, {actor.age} rokov
            </p>
            <p className="text-sm mb-4">{actor.description}</p>
            {actor.backstory && (
              <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 mb-3">
                <span className="font-medium">Backstory:</span> {actor.backstory.slice(0, 150)}...
              </div>
            )}
            {voice && (
              <div className="flex items-center gap-2 text-sm">
                <Mic className="h-4 w-4 text-primary" />
                <span>Hlas: {voice.name} ({voice.accent})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
      <div className="aspect-square bg-muted">
        {actor.imageUrl ? (
          <img
            src={actor.imageUrl}
            alt={actor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold">{actor.name}</h4>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
            {actor.type}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{actor.age} rokov</p>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {actor.description}
        </p>
      </div>
    </div>
  )
}
