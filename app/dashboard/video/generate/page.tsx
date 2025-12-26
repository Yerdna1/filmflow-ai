'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Video, Loader2, Image } from 'lucide-react'

const cameraMovements = [
  { value: 'static', label: 'Statická', description: 'Bez pohybu' },
  { value: 'dolly_in', label: 'Dolly In', description: 'Priblíženie' },
  { value: 'dolly_out', label: 'Dolly Out', description: 'Oddialenie' },
  { value: 'pan_left', label: 'Pan Vľavo', description: 'Panoráma vľavo' },
  { value: 'pan_right', label: 'Pan Vpravo', description: 'Panoráma vpravo' },
  { value: 'tilt_up', label: 'Tilt Hore', description: 'Naklonenie hore' },
  { value: 'tilt_down', label: 'Tilt Dole', description: 'Naklonenie dole' },
  { value: 'tracking', label: 'Tracking', description: 'Sledovací záber' },
  { value: 'crane', label: 'Crane', description: 'Žeriavový záber' },
  { value: 'orbit', label: 'Orbit', description: 'Orbitálny pohyb' },
]

const durations = [
  { value: 3, label: '3s', description: 'Krátke' },
  { value: 5, label: '5s', description: 'Štandardné' },
  { value: 10, label: '10s', description: 'Dlhé' },
]

export default function GenerateVideoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [storyboards, setStoryboards] = useState<any[]>([])
  const [formData, setFormData] = useState({
    storyboardId: '',
    cameraMovement: 'static',
    duration: 5,
    audioPrompt: '',
  })

  useEffect(() => {
    // Fetch completed storyboards
    fetch('/api/generations?type=IMAGE&status=COMPLETED')
      .then(r => r.json())
      .then(data => setStoryboards(data))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/generate/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/dashboard/video')
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to generate video:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedStoryboard = storyboards.find(s => s.id === formData.storyboardId)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/video"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Generovať video</h1>
          <p className="text-muted-foreground">Premeňte storyboard na animované video</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Storyboard Selection */}
        <div className="bg-card border border-border rounded-xl p-6">
          <label className="block text-sm font-medium mb-4">Vyberte storyboard</label>

          {storyboards.length === 0 ? (
            <div className="text-center py-8">
              <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">Nemáte žiadne hotové storyboardy</p>
              <Link
                href="/dashboard/storyboard/generate"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Vytvoriť storyboard
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {storyboards.map((storyboard) => (
                <button
                  key={storyboard.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, storyboardId: storyboard.id })}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                    formData.storyboardId === storyboard.id
                      ? 'border-primary'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                >
                  {storyboard.outputUrl ? (
                    <img
                      src={storyboard.outputUrl}
                      alt={storyboard.prompt || 'Storyboard'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedStoryboard && (
          <>
            {/* Camera Movement */}
            <div className="bg-card border border-border rounded-xl p-6">
              <label className="block text-sm font-medium mb-4">Pohyb kamery</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {cameraMovements.map((movement) => (
                  <button
                    key={movement.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, cameraMovement: movement.value })}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      formData.cameraMovement === movement.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-sm font-medium">{movement.label}</div>
                    <div className="text-xs text-muted-foreground">{movement.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-card border border-border rounded-xl p-6">
              <label className="block text-sm font-medium mb-4">Dĺžka videa</label>
              <div className="grid grid-cols-3 gap-4">
                {durations.map((dur) => (
                  <button
                    key={dur.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, duration: dur.value })}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      formData.duration === dur.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl font-bold">{dur.label}</div>
                    <div className="text-sm text-muted-foreground">{dur.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Prompt */}
            <div className="bg-card border border-border rounded-xl p-6">
              <label className="block text-sm font-medium mb-2">Zvukový popis (voliteľné)</label>
              <textarea
                value={formData.audioPrompt}
                onChange={(e) => setFormData({ ...formData, audioPrompt: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                placeholder="Popíšte zvuky v scéne... napr. 'tiché šumenie vetra, vtáčí spev'"
              />
            </div>
          </>
        )}

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <Link
            href="/dashboard/video"
            className="flex-1 px-6 py-3 border border-border rounded-lg text-center hover:bg-muted transition-colors"
          >
            Zrušiť
          </Link>
          <button
            type="submit"
            disabled={loading || !formData.storyboardId}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generujem...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generovať video
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
