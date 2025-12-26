'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Trash2, Users, MessageSquare, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function EditSceneForm({ scene, allActors }: { scene: any; allActors: any[] }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: scene.title,
    description: scene.description || '',
    location: scene.location || '',
    timeOfDay: scene.timeOfDay || '',
    mood: scene.mood || '',
    type: scene.type,
    duration: scene.duration || 30,
    order: scene.order,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/scenes/${scene.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/dashboard/scenes/${scene.id}`)
        router.refresh()
      } else {
        alert('Chyba pri ukladaní: ' + (data.error?.message || 'Neznáma chyba'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Chyba pri ukladaní')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-2">
            <Link href={`/dashboard/scenes/${scene.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Späť na scénu
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Upraviť scénu</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/scenes/${scene.id}`}>
              Zrušiť
            </Link>
          </Button>
          <Button type="submit" form="scene-form" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Uložiť zmeny
          </Button>
        </div>
      </div>

      {/* Scene Form */}
      <form id="scene-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Scene Details */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Základné informácie</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Názov scény *
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Popis scény
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2">
                      Lokácia
                    </label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="timeOfDay" className="block text-sm font-medium mb-2">
                      Čas
                    </label>
                    <Input
                      id="timeOfDay"
                      value={formData.timeOfDay}
                      onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mood" className="block text-sm font-medium mb-2">
                      Nálada
                    </label>
                    <Input
                      id="mood"
                      value={formData.mood}
                      onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-2">
                      Typ scény
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="DIALOGUE">Dialóg</option>
                      <option value="ACTION">Akčná</option>
                      <option value="EMOTIONAL">Emocionálna</option>
                      <option value="TRANSITION">Prechod</option>
                      <option value="ESTABLISHING">Úvodná</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium mb-2">
                      Trvanie (sekundy)
                    </label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
                      min="1"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="order" className="block text-sm font-medium mb-2">
                      Poradie
                    </label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      min="0"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actors & Dialogue */}
          <div className="space-y-6">
            {/* Actors */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Postavy v scéne
                </h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/actors/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Pridať postavu
                  </Link>
                </Button>
              </div>

              <div className="space-y-3">
                {scene.sceneActors.map((sceneActor: any) => (
                  <div
                    key={sceneActor.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{sceneActor.actor.name}</p>
                        <p className="text-sm text-muted-foreground">{sceneActor.actor.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => {
                        // TODO: Implement remove actor from scene
                        console.log('Remove actor:', sceneActor.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}

                {scene.sceneActors.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Žiadne postavy v tejto scéne
                  </p>
                )}
              </div>
            </div>

            {/* Dialogue Lines */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Dialógy
                </h2>
                <Button variant="outline" size="sm" type="button">
                  <Plus className="h-4 w-4 mr-2" />
                  Pridať dialóg
                </Button>
              </div>

              <div className="space-y-4">
                {scene.dialogueLines.map((line: any, index: number) => (
                  <div
                    key={line.id}
                    className="p-4 bg-muted/50 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium">
                        Replika #{index + 1} - Postava
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => {
                          // TODO: Implement remove dialogue line
                          console.log('Remove dialogue:', line.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <select
                      name={`dialogue_${line.id}_actor`}
                      defaultValue={line.actorId}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm mb-2"
                    >
                      {allActors.map((actor) => (
                        <option key={actor.id} value={actor.id}>
                          {actor.name}
                        </option>
                      ))}
                    </select>
                    <textarea
                      name={`dialogue_${line.id}_text`}
                      defaultValue={line.text}
                      rows={2}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    />
                  </div>
                ))}

                {scene.dialogueLines.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Žiadne dialógy v tejto scéne
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
