'use client'

import { useState } from 'react'
import { Music, Play, Pause, Download, Loader2, Sparkles } from 'lucide-react'

const genres = [
  { id: 'dramatic', name: 'Dramatická', description: 'Napätie a emócie' },
  { id: 'romantic', name: 'Romantická', description: 'Láska a neha' },
  { id: 'action', name: 'Akčná', description: 'Energia a dynamika' },
  { id: 'mystery', name: 'Záhadná', description: 'Tajomstvo a suspenz' },
  { id: 'sad', name: 'Smutná', description: 'Melanchólia a nostalgia' },
  { id: 'epic', name: 'Epická', description: 'Veľkolepé orchester' },
]

const moods = [
  'Tense', 'Hopeful', 'Dark', 'Uplifting', 'Melancholic', 'Triumphant'
]

export default function MusicPage() {
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    prompt: '',
    genre: 'dramatic',
    mood: 'Tense',
    duration: 30,
  })

  const handleGenerate = async () => {
    setLoading(true)
    setAudioUrl(null)

    try {
      const response = await fetch('/api/generate/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setAudioUrl(data.audioUrl)
      }
    } catch (error) {
      console.error('Failed to generate music:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Filmová hudba</h1>
        <p className="text-muted-foreground mt-1">
          Generujte originálne soundtracky s Suno AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Genre Selection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-4">Žáner</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setFormData({ ...formData, genre: genre.id })}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    formData.genre === genre.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium">{genre.name}</div>
                  <div className="text-xs text-muted-foreground">{genre.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">Popis hudby (voliteľné)</label>
            <textarea
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              placeholder="Popíšte požadovanú hudbu... napr. 'orchestrálna hudba s klavírom, pomalé tempo, emotívna atmosféra'"
            />
          </div>

          {/* Mood Selection */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-4">Nálada</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setFormData({ ...formData, mood })}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    formData.mood === mood
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-4">
              Dĺžka: {formData.duration} sekúnd
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>15s</span>
              <span>120s</span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generujem hudbu...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generovať hudbu
              </>
            )}
          </button>

          {/* Audio Player */}
          {audioUrl && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium mb-4">Vygenerovaná hudba</h3>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
              <a
                href={audioUrl}
                download="soundtrack.mp3"
                className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
              >
                <Download className="h-4 w-4" />
                Stiahnuť MP3
              </a>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-medium mb-4">Súhrn</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Žáner</span>
                <p className="font-medium capitalize">{genres.find(g => g.id === formData.genre)?.name}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Nálada</span>
                <p className="font-medium">{formData.mood}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Dĺžka</span>
                <p className="font-medium">{formData.duration}s</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent-gold/10 border border-primary/20 rounded-xl p-6">
            <Music className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-medium mb-2">Suno AI</h3>
            <p className="text-sm text-muted-foreground">
              50 kreditov denne zadarmo. Každá generácia používa 1 kredit.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
