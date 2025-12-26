'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mic, Play, Pause, Download, Loader2, Sparkles } from 'lucide-react'

const voices = [
  { id: 'sk_male_1', name: 'Ján', gender: 'Muž', accent: 'Západoslovenský' },
  { id: 'sk_male_2', name: 'Peter', gender: 'Muž', accent: 'Stredoslovenský' },
  { id: 'sk_female_1', name: 'Mária', gender: 'Žena', accent: 'Západoslovenský' },
  { id: 'sk_female_2', name: 'Eva', gender: 'Žena', accent: 'Východoslovenský' },
]

export default function DialoguePage() {
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [formData, setFormData] = useState({
    text: '',
    voiceId: 'sk_female_1',
    stability: 0.5,
    similarity: 0.8,
    style: 0.6,
  })

  const handleGenerate = async () => {
    setLoading(true)
    setAudioUrl(null)

    try {
      const response = await fetch('/api/generate/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setAudioUrl(data.audioUrl)
      }
    } catch (error) {
      console.error('Failed to generate audio:', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedVoice = voices.find(v => v.id === formData.voiceId)

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Slovenské dialógy</h1>
        <p className="text-muted-foreground mt-1">
          Generujte realistické slovenské hlasy s ElevenLabs
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Text Input */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">Text pre generovanie</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
              placeholder="Napíšte slovenský text ktorý chcete premeniť na hlas..."
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{formData.text.length} znakov</span>
              <span>Limit: 10,000 znakov/mesiac</span>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-medium">Nastavenia hlasu</h3>

            <div>
              <label className="block text-sm mb-2">Stabilita ({formData.stability})</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.stability}
                onChange={(e) => setFormData({ ...formData, stability: parseFloat(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Vyššia stabilita = konzistentnejší hlas
              </p>
            </div>

            <div>
              <label className="block text-sm mb-2">Podobnosť ({formData.similarity})</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.similarity}
                onChange={(e) => setFormData({ ...formData, similarity: parseFloat(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Vyššia podobnosť = vernejšia replika hlasu
              </p>
            </div>

            <div>
              <label className="block text-sm mb-2">Štýl ({formData.style})</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: parseFloat(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Vyšší štýl = expresívnejší prejav
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !formData.text}
            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generujem...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generovať hlas
              </>
            )}
          </button>

          {/* Audio Player */}
          {audioUrl && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium mb-4">Vygenerovaný hlas</h3>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
              <a
                href={audioUrl}
                download="dialog.mp3"
                className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
              >
                <Download className="h-4 w-4" />
                Stiahnuť MP3
              </a>
            </div>
          )}
        </div>

        {/* Voice Selection Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-medium mb-4">Výber hlasu</h3>
            <div className="space-y-2">
              {voices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setFormData({ ...formData, voiceId: voice.id })}
                  className={`w-full p-3 border rounded-lg text-left transition-colors ${
                    formData.voiceId === voice.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{voice.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {voice.gender} • {voice.accent}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedVoice && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium mb-2">Vybraný hlas</h3>
              <p className="text-2xl font-bold">{selectedVoice.name}</p>
              <p className="text-muted-foreground">{selectedVoice.accent} prízvuk</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
