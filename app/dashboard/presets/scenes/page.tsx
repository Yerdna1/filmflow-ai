'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Users, MapPin, Clock, MessageSquare, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import { demoScenes, sceneCategories } from '@/prisma/presets/scenes'
import { demoMovieInfo } from '@/prisma/presets'

export default function PresetScenesPage() {
  const [selectedAct, setSelectedAct] = useState<number | null>(null)
  const [expandedScene, setExpandedScene] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredScenes = selectedAct
    ? demoScenes.filter((_, index) => {
        const act = demoMovieInfo.acts.find(a => {
          const [start, end] = a.scenes.split('-').map(Number)
          return index + 1 >= start && index + 1 <= end
        })
        return act?.number === selectedAct
      })
    : demoScenes

  const copyDialogue = (scene: typeof demoScenes[0]) => {
    const dialogueText = scene.dialogue
      ?.map((d: any) => `${d.actor}: "${d.text}"`)
      .join('\n')
    navigator.clipboard.writeText(dialogueText || '')
    setCopiedId(scene.title)
    setTimeout(() => setCopiedId(null), 2000)
  }

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
          <h1 className="text-3xl font-bold">Scenár - {demoMovieInfo.title}</h1>
          <p className="text-muted-foreground mt-1">
            {demoScenes.length} scén v 5 aktoch
          </p>
        </div>
      </div>

      {/* Act Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedAct(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedAct === null
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Všetky akty
        </button>
        {demoMovieInfo.acts.map((act) => (
          <button
            key={act.number}
            onClick={() => setSelectedAct(act.number)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedAct === act.number
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Akt {act.number}: {act.title}
          </button>
        ))}
      </div>

      {/* Scenes List */}
      <div className="space-y-4">
        {filteredScenes.map((scene, index) => {
          const sceneNumber = demoScenes.indexOf(scene) + 1
          const isExpanded = expandedScene === sceneNumber

          return (
            <div
              key={scene.title}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Scene Header */}
              <div
                className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedScene(isExpanded ? null : sceneNumber)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {sceneNumber}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{scene.titleSk}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {scene.descriptionSk}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      scene.type === 'EMOTIONAL' ? 'bg-pink-500/10 text-pink-500' :
                      scene.type === 'DIALOGUE' ? 'bg-blue-500/10 text-blue-500' :
                      scene.type === 'ACTION' ? 'bg-orange-500/10 text-orange-500' :
                      scene.type === 'ESTABLISHING' ? 'bg-green-500/10 text-green-500' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {scene.type}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                  {scene.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {scene.location}
                    </div>
                  )}
                  {scene.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {scene.duration}s
                    </div>
                  )}
                  {scene.actors && scene.actors.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {scene.actors.length} hercov
                    </div>
                  )}
                  {scene.dialogue && scene.dialogue.length > 0 && (
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {scene.dialogue.length} replík
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-border p-6 space-y-6 bg-muted/30">
                  {/* English Description */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">English Description</h4>
                    <p className="text-sm">{scene.description}</p>
                  </div>

                  {/* Actors */}
                  {scene.actors && scene.actors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Herci v scéne</h4>
                      <div className="flex flex-wrap gap-2">
                        {scene.actors.map((actor) => (
                          <span
                            key={actor}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {actor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dialogue */}
                  {scene.dialogue && scene.dialogue.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Dialóg</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyDialogue(scene)
                          }}
                          className="flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          {copiedId === scene.title ? (
                            <>
                              <Check className="h-3 w-3" />
                              Skopírované
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Kopírovať dialóg
                            </>
                          )}
                        </button>
                      </div>
                      <div className="space-y-3 bg-background rounded-lg p-4">
                        {scene.dialogue.map((line: any, i: number) => (
                          <div key={i} className="flex gap-3">
                            <span className="font-medium text-primary whitespace-nowrap">
                              {line.actor}:
                            </span>
                            <span className="italic">"{line.text}"</span>
                            {line.emotion && (
                              <span className="text-xs text-muted-foreground">
                                ({line.emotion})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mood & Category */}
                  <div className="flex gap-4">
                    {scene.mood && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Nálada</h4>
                        <span className="px-3 py-1 bg-muted rounded-full text-sm capitalize">
                          {scene.mood}
                        </span>
                      </div>
                    )}
                    {scene.category && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Kategória</h4>
                        <span className="px-3 py-1 bg-muted rounded-full text-sm capitalize">
                          {scene.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Link
                      href={`/dashboard/storyboard/generate?preset=${scene.order}`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      <Play className="h-4 w-4" />
                      Generovať storyboard
                    </Link>
                    <Link
                      href={`/dashboard/scenes/new?preset=${scene.order}`}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                    >
                      Použiť ako šablónu
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
