'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Key, Eye, EyeOff, Save, Trash2, CheckCircle, AlertCircle,
  Image, MessageSquare, BookOpen, Mic, Music, Video,
  ExternalLink, Info, Loader2, Settings, Sparkles, Zap
} from 'lucide-react'

interface ModelOption {
  id: string
  name: string
  provider: string
  description: string
  speed: string
}

interface AvailableModels {
  image: ModelOption[]
  dialogue: ModelOption[]
  story: ModelOption[]
  voice: ModelOption[]
  music: ModelOption[]
  video: ModelOption[]
}

interface UserSettings {
  id: string
  // API Keys (masked)
  openaiApiKey: string | null
  anthropicApiKey: string | null
  replicateApiKey: string | null
  stabilityApiKey: string | null
  elevenLabsApiKey: string | null
  sunoApiKey: string | null
  higgsfieldApiKey: string | null
  runwayApiKey: string | null
  pikaApiKey: string | null
  lumaApiKey: string | null
  falApiKey: string | null
  // Model preferences
  imageModel: string
  dialogueLlmModel: string
  storyLlmModel: string
  voiceModel: string
  musicModel: string
  videoModel: string
  // Generation preferences
  defaultImageStyle: string | null
  defaultAspectRatio: string
  defaultVideoLength: number
  preferSlovakOutput: boolean
}

const API_PROVIDERS = [
  {
    id: 'openai',
    name: 'OpenAI',
    field: 'openaiApiKey',
    description: 'GPT-4, DALL-E 3, TTS',
    url: 'https://platform.openai.com/api-keys',
    color: 'bg-green-500/10 border-green-500/30 text-green-400',
    icon: '🤖',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    field: 'anthropicApiKey',
    description: 'Claude 3.5 Sonnet, Claude 3 Opus',
    url: 'https://console.anthropic.com/settings/keys',
    color: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    icon: '🧠',
  },
  {
    id: 'replicate',
    name: 'Replicate',
    field: 'replicateApiKey',
    description: 'Flux, SDXL, Llama, Whisper',
    url: 'https://replicate.com/account/api-tokens',
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    icon: '🔄',
  },
  {
    id: 'stability',
    name: 'Stability AI',
    field: 'stabilityApiKey',
    description: 'Stable Diffusion, SDXL',
    url: 'https://platform.stability.ai/account/keys',
    color: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    icon: '🎨',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    field: 'elevenLabsApiKey',
    description: 'Text-to-Speech, Voice Cloning',
    url: 'https://elevenlabs.io/app/settings/api-keys',
    color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    icon: '🎙️',
  },
  {
    id: 'suno',
    name: 'Suno',
    field: 'sunoApiKey',
    description: 'AI Music Generation',
    url: 'https://suno.com/account',
    color: 'bg-pink-500/10 border-pink-500/30 text-pink-400',
    icon: '🎵',
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    field: 'higgsfieldApiKey',
    description: 'Cinematic AI Video',
    url: 'https://higgsfield.ai/settings',
    color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    icon: '🎬',
  },
  {
    id: 'runway',
    name: 'Runway ML',
    field: 'runwayApiKey',
    description: 'Gen-3 Alpha Video',
    url: 'https://app.runwayml.com/settings',
    color: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    icon: '🛤️',
  },
  {
    id: 'pika',
    name: 'Pika Labs',
    field: 'pikaApiKey',
    description: 'Creative Video Generation',
    url: 'https://pika.art/settings',
    color: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    icon: '⚡',
  },
  {
    id: 'luma',
    name: 'Luma AI',
    field: 'lumaApiKey',
    description: 'Dream Machine Video',
    url: 'https://lumalabs.ai/dream-machine',
    color: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
    icon: '💫',
  },
  {
    id: 'fal',
    name: 'Fal.ai',
    field: 'falApiKey',
    description: 'Fast Image & Video Models',
    url: 'https://fal.ai/dashboard/keys',
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    icon: '🚀',
  },
]

const MODEL_CATEGORIES = [
  {
    id: 'image',
    field: 'imageModel',
    name: 'Generovanie obrázkov',
    description: 'Model pre storyboardy a vizuály',
    icon: Image,
    color: 'text-purple-400',
  },
  {
    id: 'dialogue',
    field: 'dialogueLlmModel',
    name: 'Generovanie dialógov',
    description: 'LLM pre písanie dialógov',
    icon: MessageSquare,
    color: 'text-blue-400',
  },
  {
    id: 'story',
    field: 'storyLlmModel',
    name: 'Generovanie príbehu',
    description: 'LLM pre scenáre a príbehy',
    icon: BookOpen,
    color: 'text-green-400',
  },
  {
    id: 'voice',
    field: 'voiceModel',
    name: 'Text-to-Speech',
    description: 'Model pre hlasový výstup',
    icon: Mic,
    color: 'text-cyan-400',
  },
  {
    id: 'music',
    field: 'musicModel',
    name: 'Generovanie hudby',
    description: 'Model pre filmovú hudbu',
    icon: Music,
    color: 'text-pink-400',
  },
  {
    id: 'video',
    field: 'videoModel',
    name: 'Generovanie videa',
    description: 'Model pre AI video',
    icon: Video,
    color: 'text-yellow-400',
  },
]

export default function ApiKeysPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [availableModels, setAvailableModels] = useState<AvailableModels | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [editedKeys, setEditedKeys] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'keys' | 'models' | 'preferences'>('keys')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data.settings) {
        setSettings(data.settings)
        setAvailableModels(data.availableModels)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      setMessage({ type: 'error', text: 'Nepodarilo sa načítať nastavenia' })
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    if (!settings) return
    setSaving(true)
    setMessage(null)

    try {
      const updateData = {
        ...settings,
        ...editedKeys,
      }

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      })

      const data = await res.json()
      if (data.success) {
        setSettings(data.settings)
        setEditedKeys({})
        setMessage({ type: 'success', text: 'Nastavenia boli uložené' })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      setMessage({ type: 'error', text: 'Nepodarilo sa uložiť nastavenia' })
    } finally {
      setSaving(false)
    }
  }

  const deleteApiKey = async (field: string) => {
    try {
      const res = await fetch(`/api/settings?key=${field}`, { method: 'DELETE' })
      if (res.ok) {
        setSettings(prev => prev ? { ...prev, [field]: null } : null)
        setEditedKeys(prev => {
          const { [field]: _, ...rest } = prev
          return rest
        })
        setMessage({ type: 'success', text: 'API kľúč bol odstránený' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Nepodarilo sa odstrániť API kľúč' })
    }
  }

  const toggleKeyVisibility = (field: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(field)) {
        newSet.delete(field)
      } else {
        newSet.add(field)
      }
      return newSet
    })
  }

  const handleKeyChange = (field: string, value: string) => {
    setEditedKeys(prev => ({ ...prev, [field]: value }))
  }

  const handleModelChange = (field: string, value: string) => {
    setSettings(prev => prev ? { ...prev, [field]: value } : null)
  }

  const handlePreferenceChange = (field: string, value: any) => {
    setSettings(prev => prev ? { ...prev, [field]: value } : null)
  }

  const getKeyValue = (field: string): string => {
    if (editedKeys[field] !== undefined) return editedKeys[field]
    return (settings as any)?.[field] || ''
  }

  const hasApiKey = (field: string): boolean => {
    const value = (settings as any)?.[field]
    return value && value.length > 0
  }

  const getRequiredKeysForModel = (modelId: string): string[] => {
    const allModels = availableModels ? [
      ...availableModels.image,
      ...availableModels.dialogue,
      ...availableModels.story,
      ...availableModels.voice,
      ...availableModels.music,
      ...availableModels.video,
    ] : []

    const model = allModels.find(m => m.id === modelId)
    if (!model) return []

    const providerToField: Record<string, string> = {
      openai: 'openaiApiKey',
      anthropic: 'anthropicApiKey',
      replicate: 'replicateApiKey',
      stability: 'stabilityApiKey',
      elevenlabs: 'elevenLabsApiKey',
      suno: 'sunoApiKey',
      higgsfield: 'higgsfieldApiKey',
      runway: 'runwayApiKey',
      pika: 'pikaApiKey',
      luma: 'lumaApiKey',
      fal: 'falApiKey',
    }

    return providerToField[model.provider] ? [providerToField[model.provider]] : []
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Key className="h-8 w-8 text-primary" />
            API Kľúče & Modely
          </h1>
          <p className="text-muted-foreground mt-1">
            Spravujte svoje API kľúče a vyberte preferované AI modely
          </p>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Uložiť zmeny
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`flex items-center gap-2 p-4 rounded-lg ${
          message.type === 'success'
            ? 'bg-green-500/10 border border-green-500/30 text-green-400'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('keys')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'keys'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Key className="h-4 w-4" />
          API Kľúče
        </button>
        <button
          onClick={() => setActiveTab('models')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'models'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          AI Modely
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === 'preferences'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Settings className="h-4 w-4" />
          Predvoľby
        </button>
      </div>

      {/* API Keys Tab */}
      {activeTab === 'keys' && (
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <Info className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-400">Bezpečnosť API kľúčov</p>
              <p className="text-muted-foreground mt-1">
                Vaše API kľúče sú bezpečne uložené a nikdy nie sú zdieľané. Pre zobrazenie kliknite na ikonu oka.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {API_PROVIDERS.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 rounded-lg border ${provider.color}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{provider.name}</h3>
                        {hasApiKey(provider.field) && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{provider.description}</p>
                    </div>
                  </div>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Získať kľúč
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="mt-4 flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={visibleKeys.has(provider.field) ? 'text' : 'password'}
                      value={getKeyValue(provider.field)}
                      onChange={(e) => handleKeyChange(provider.field, e.target.value)}
                      placeholder={`Zadajte ${provider.name} API kľúč...`}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                    />
                    <button
                      onClick={() => toggleKeyVisibility(provider.field)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {visibleKeys.has(provider.field) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {hasApiKey(provider.field) && (
                    <button
                      onClick={() => deleteApiKey(provider.field)}
                      className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Odstrániť kľúč"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Models Tab */}
      {activeTab === 'models' && availableModels && (
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <Sparkles className="h-5 w-5 text-purple-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-purple-400">Výber AI modelov</p>
              <p className="text-muted-foreground mt-1">
                Vyberte preferované modely pre rôzne úlohy. Uistite sa, že máte potrebný API kľúč pre vybraný model.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {MODEL_CATEGORIES.map((category) => {
              const Icon = category.icon
              const models = (availableModels as any)[category.id] as ModelOption[]
              const currentValue = (settings as any)?.[category.field] || ''
              const requiredKeys = getRequiredKeysForModel(currentValue)
              const hasRequiredKey = requiredKeys.every(key => hasApiKey(key))

              return (
                <div key={category.id} className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-background ${category.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    {models.map((model) => {
                      const isSelected = currentValue === model.id
                      const modelRequiredKeys = getRequiredKeysForModel(model.id)
                      const modelHasKey = modelRequiredKeys.every(key => hasApiKey(key))

                      return (
                        <label
                          key={model.id}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          } ${!modelHasKey ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={category.field}
                              value={model.id}
                              checked={isSelected}
                              onChange={() => handleModelChange(category.field, model.id)}
                              className="w-4 h-4 text-primary"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{model.name}</span>
                                {!modelHasKey && (
                                  <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded">
                                    Chýba API kľúč
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{model.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              model.speed === 'fast' ? 'bg-green-500/10 text-green-400' :
                              model.speed === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              <Zap className="h-3 w-3 inline mr-1" />
                              {model.speed === 'fast' ? 'Rýchly' : model.speed === 'medium' ? 'Stredný' : 'Pomalý'}
                            </span>
                          </div>
                        </label>
                      )
                    })}
                  </div>

                  {!hasRequiredKey && currentValue && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-yellow-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>Pre tento model potrebujete pridať API kľúč</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && settings && (
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <Settings className="h-5 w-5 text-green-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-400">Predvolené nastavenia</p>
              <p className="text-muted-foreground mt-1">
                Tieto nastavenia sa použijú ako predvolené hodnoty pri generovaní obsahu.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Default Image Style */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <label className="block font-medium mb-2">Predvolený štýl obrázkov</label>
              <select
                value={settings.defaultImageStyle || ''}
                onChange={(e) => handlePreferenceChange('defaultImageStyle', e.target.value || null)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Bez predvoleného štýlu</option>
                <option value="cinematic">Filmový (Cinematic)</option>
                <option value="realistic">Realistický</option>
                <option value="artistic">Umelecký</option>
                <option value="dramatic">Dramatický</option>
                <option value="romantic">Romantický</option>
                <option value="noir">Film Noir</option>
              </select>
            </div>

            {/* Default Aspect Ratio */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <label className="block font-medium mb-2">Predvolený pomer strán</label>
              <select
                value={settings.defaultAspectRatio}
                onChange={(e) => handlePreferenceChange('defaultAspectRatio', e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="16:9">16:9 (Filmový)</option>
                <option value="21:9">21:9 (Cinemascope)</option>
                <option value="4:3">4:3 (Klasický)</option>
                <option value="1:1">1:1 (Štvorcový)</option>
                <option value="9:16">9:16 (Vertikálny)</option>
              </select>
            </div>

            {/* Default Video Length */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <label className="block font-medium mb-2">Predvolená dĺžka videa (sekundy)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={settings.defaultVideoLength}
                onChange={(e) => handlePreferenceChange('defaultVideoLength', parseInt(e.target.value) || 5)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-sm text-muted-foreground mt-1">1-60 sekúnd</p>
            </div>

            {/* Slovak Output Preference */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium">Preferovať slovenský výstup</span>
                  <p className="text-sm text-muted-foreground">
                    Dialógy a príbehy budú primárne v slovenčine
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.preferSlovakOutput}
                    onChange={(e) => handlePreferenceChange('preferSlovakOutput', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    settings.preferSlovakOutput ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      settings.preferSlovakOutput ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h3 className="font-medium mb-3">Rýchle odkazy</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/storyboard/generate"
            className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm hover:border-primary transition-colors"
          >
            Generovať storyboard
          </Link>
          <Link
            href="/dashboard/audio/dialogue"
            className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm hover:border-primary transition-colors"
          >
            Generovať dialógy
          </Link>
          <Link
            href="/dashboard/video/generate"
            className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm hover:border-primary transition-colors"
          >
            Generovať video
          </Link>
        </div>
      </div>
    </div>
  )
}
