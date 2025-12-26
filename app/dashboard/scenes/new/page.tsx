'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Layers, Save } from 'lucide-react'

const scenePresets = [
  { id: 'romance', name: 'Romantická scéna', description: 'Intímny moment medzi dvoma postavami' },
  { id: 'drama', name: 'Dramatická konfrontácia', description: 'Emotívny konflikt a napätie' },
  { id: 'action', name: 'Akčná sekvencia', description: 'Dynamická akčná scéna' },
  { id: 'mystery', name: 'Záhadná atmosféra', description: 'Napínavá mysteriózna scéna' },
  { id: 'comedy', name: 'Komediálna situácia', description: 'Humorná scéna' },
  { id: 'custom', name: 'Vlastná scéna', description: 'Vytvorte vlastný popis' },
]

export default function NewScenePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preset: '',
    location: '',
    mood: '',
    cameraMovement: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/scenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/dashboard/scenes')
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to create scene:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/scenes"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Nová scéna</h1>
          <p className="text-muted-foreground">Vytvorte novú filmovú scénu</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Názov scény</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="napr. Stretnutie v kaviarni"
            required
          />
        </div>

        {/* Preset Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Typ scény</label>
          <div className="grid grid-cols-2 gap-3">
            {scenePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setFormData({ ...formData, preset: preset.id })}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  formData.preset === preset.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium">{preset.name}</div>
                <div className="text-sm text-muted-foreground">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Popis scény</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
            placeholder="Popíšte, čo sa v scéne odohráva..."
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Lokácia</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="napr. Interiér - kaviareň, večer"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium mb-2">Nálada</label>
          <select
            value={formData.mood}
            onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Vyberte náladu</option>
            <option value="romantic">Romantická</option>
            <option value="tense">Napätá</option>
            <option value="melancholic">Melancholická</option>
            <option value="joyful">Radostná</option>
            <option value="mysterious">Záhadná</option>
            <option value="dramatic">Dramatická</option>
          </select>
        </div>

        {/* Camera Movement */}
        <div>
          <label className="block text-sm font-medium mb-2">Pohyb kamery</label>
          <select
            value={formData.cameraMovement}
            onChange={(e) => setFormData({ ...formData, cameraMovement: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Vyberte pohyb kamery</option>
            <option value="static">Statická</option>
            <option value="dolly_in">Dolly in</option>
            <option value="dolly_out">Dolly out</option>
            <option value="pan_left">Pan vľavo</option>
            <option value="pan_right">Pan vpravo</option>
            <option value="tilt_up">Tilt hore</option>
            <option value="tilt_down">Tilt dole</option>
            <option value="tracking">Tracking shot</option>
            <option value="crane">Crane shot</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <Link
            href="/dashboard/scenes"
            className="flex-1 px-6 py-3 border border-border rounded-lg text-center hover:bg-muted transition-colors"
          >
            Zrušiť
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {loading ? 'Ukladám...' : 'Vytvoriť scénu'}
          </button>
        </div>
      </form>
    </div>
  )
}
