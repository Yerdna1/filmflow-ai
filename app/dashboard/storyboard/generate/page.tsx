'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Sparkles,
  Image,
  Loader2,
  Wand2,
  Camera,
  Sun,
  Film,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Lightbulb,
  RefreshCw,
  Users,
  MapPin,
  Clock,
  Heart,
  Zap,
} from 'lucide-react'

// Scene templates for quick selection
const sceneTemplates = [
  {
    id: 'romantic-meeting',
    name: 'Romantické stretnutie',
    icon: Heart,
    prompt: 'Two people meeting eyes across a room, warm lighting, intimate atmosphere',
    promptSk: 'Dvaja ľudia, stretnutie pohľadov, teplé osvetlenie, intímna atmosféra',
    mood: 'romantic',
    lighting: 'warm',
    camera: 'medium',
  },
  {
    id: 'dramatic-confrontation',
    name: 'Dramatická konfrontácia',
    icon: Zap,
    prompt: 'Intense face-to-face confrontation, dramatic shadows, tension in the air',
    promptSk: 'Intenzívna konfrontácia tvárou v tvár, dramatické tiene, napätie',
    mood: 'tense',
    lighting: 'dramatic',
    camera: 'close-up',
  },
  {
    id: 'establishing-village',
    name: 'Slovenská dedina',
    icon: MapPin,
    prompt: 'Picturesque Slovak village with traditional houses, rolling hills, golden hour',
    promptSk: 'Malebná slovenská dedina s tradičnými domami, kopcovitá krajina, zlatá hodina',
    mood: 'nostalgic',
    lighting: 'golden-hour',
    camera: 'wide',
  },
  {
    id: 'emotional-moment',
    name: 'Emotívny moment',
    icon: Heart,
    prompt: 'Character with tears in eyes, soft backlighting, vulnerable expression',
    promptSk: 'Postava so slzami v očiach, jemné zadné osvetlenie, zraniteľný výraz',
    mood: 'emotional',
    lighting: 'backlight',
    camera: 'close-up',
  },
  {
    id: 'vineyard-sunset',
    name: 'Vinica pri západe',
    icon: Sun,
    prompt: 'Slovak vineyard at sunset, silhouettes against orange sky, romantic mood',
    promptSk: 'Slovenská vinica pri západe slnka, siluety proti oranžovej oblohe, romantická nálada',
    mood: 'romantic',
    lighting: 'sunset',
    camera: 'wide',
  },
  {
    id: 'family-dinner',
    name: 'Rodinná večera',
    icon: Users,
    prompt: 'Family gathered around dinner table, warm candlelight, traditional Slovak interior',
    promptSk: 'Rodina pri večeri, teplé svetlo sviečok, tradičný slovenský interiér',
    mood: 'warm',
    lighting: 'candlelight',
    camera: 'medium',
  },
]

// Style presets
const stylePresets = [
  { id: 'cinematic', name: 'Filmový', prompt: 'cinematic, film grain, movie still, 35mm photography' },
  { id: 'dramatic', name: 'Dramatický', prompt: 'dramatic lighting, high contrast, moody atmosphere' },
  { id: 'romantic', name: 'Romantický', prompt: 'soft focus, warm tones, dreamy atmosphere, romantic mood' },
  { id: 'noir', name: 'Noir', prompt: 'film noir style, black and white, deep shadows, mysterious' },
  { id: 'natural', name: 'Prírodný', prompt: 'natural lighting, authentic, documentary style' },
  { id: 'artistic', name: 'Umelecký', prompt: 'artistic composition, painterly, visually stunning' },
]

// Camera angles
const cameraPresets = [
  { id: 'wide', name: 'Celkový', prompt: 'wide establishing shot' },
  { id: 'medium', name: 'Polocelok', prompt: 'medium shot' },
  { id: 'close-up', name: 'Detail', prompt: 'close-up shot, detailed face' },
  { id: 'extreme-close-up', name: 'Extrémny detail', prompt: 'extreme close-up, eyes detail' },
  { id: 'over-shoulder', name: 'Cez plece', prompt: 'over the shoulder shot' },
  { id: 'low-angle', name: 'Podhľad', prompt: 'low angle shot, looking up' },
  { id: 'high-angle', name: 'Nadhľad', prompt: 'high angle shot, looking down' },
  { id: 'dutch', name: 'Dutch angle', prompt: 'dutch angle, tilted frame' },
]

// Lighting presets
const lightingPresets = [
  { id: 'golden-hour', name: 'Zlatá hodina', prompt: 'golden hour lighting, warm sunlight' },
  { id: 'blue-hour', name: 'Modrá hodina', prompt: 'blue hour, twilight, soft blue tones' },
  { id: 'dramatic', name: 'Dramatické', prompt: 'dramatic side lighting, deep shadows' },
  { id: 'soft', name: 'Jemné', prompt: 'soft diffused lighting, no harsh shadows' },
  { id: 'backlight', name: 'Zadné svetlo', prompt: 'backlit, rim lighting, silhouette edges' },
  { id: 'candlelight', name: 'Sviečky', prompt: 'candlelight, warm flickering light, intimate' },
  { id: 'overcast', name: 'Zamračené', prompt: 'overcast day, soft even lighting' },
  { id: 'night', name: 'Nočné', prompt: 'night scene, moonlight, dark atmosphere' },
]

// Mood presets
const moodPresets = [
  { id: 'romantic', name: 'Romantický', prompt: 'romantic atmosphere, love in the air' },
  { id: 'tense', name: 'Napätý', prompt: 'tense atmosphere, suspenseful mood' },
  { id: 'nostalgic', name: 'Nostalgický', prompt: 'nostalgic feeling, memories, bittersweet' },
  { id: 'joyful', name: 'Radostný', prompt: 'joyful mood, happiness, celebration' },
  { id: 'melancholic', name: 'Melancholický', prompt: 'melancholic mood, sad, reflective' },
  { id: 'mysterious', name: 'Tajomný', prompt: 'mysterious atmosphere, enigmatic' },
  { id: 'peaceful', name: 'Pokojný', prompt: 'peaceful, serene, calm atmosphere' },
  { id: 'dramatic', name: 'Dramatický', prompt: 'high drama, intense emotions' },
]

const resolutions = [
  { value: '720p', label: '720p', description: 'Rýchlejšie' },
  { value: '2K', label: '2K', description: 'Odporúčané' },
  { value: '4K', label: '4K', description: 'Najvyššia kvalita' },
]

const aspectRatios = [
  { value: '16:9', label: '16:9', description: 'Filmové' },
  { value: '4:3', label: '4:3', description: 'Klasické' },
  { value: '1:1', label: '1:1', description: 'Štvorcové' },
  { value: '9:16', label: '9:16', description: 'Vertikálne' },
]

// Dialogue suggestions based on scene type
const dialogueSuggestions = {
  romantic: [
    { actor: 'Žena', text: 'Nikdy som na teba nezabudla.', emotion: 'loving' },
    { actor: 'Muž', text: 'Prečo si odišla?', emotion: 'hurt' },
    { actor: 'Žena', text: 'Bála som sa... tej lásky.', emotion: 'vulnerable' },
    { actor: 'Muž', text: 'A teraz? Ešte sa bojíš?', emotion: 'hopeful' },
  ],
  dramatic: [
    { actor: 'Postava 1', text: 'Toto nemôžeš urobiť!', emotion: 'angry' },
    { actor: 'Postava 2', text: 'Už som sa rozhodol.', emotion: 'determined' },
    { actor: 'Postava 1', text: 'Zradil si nás všetkých.', emotion: 'betrayed' },
    { actor: 'Postava 2', text: 'Niekedy musíš zradiť, aby si ochránil.', emotion: 'conflicted' },
  ],
  emotional: [
    { actor: 'Postava', text: 'Prečo mi to nikto nepovedal?', emotion: 'hurt' },
    { actor: 'Postava', text: 'Celý život som žila v klamstve.', emotion: 'devastated' },
    { actor: 'Postava', text: 'Odpusť mi. Prosím.', emotion: 'pleading' },
    { actor: 'Postava', text: 'Potrebujem čas.', emotion: 'processing' },
  ],
  nostalgic: [
    { actor: 'Postava', text: 'Pamätáš si, ako sme tu sedávali?', emotion: 'wistful' },
    { actor: 'Postava', text: 'Všetko sa zmenilo.', emotion: 'melancholic' },
    { actor: 'Postava', text: 'Niektoré veci zostávajú navždy.', emotion: 'hopeful' },
  ],
}

export default function GenerateStoryboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [enhancing, setEnhancing] = useState(false)
  const [actors, setActors] = useState<any[]>([])
  const [scenes, setScenes] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showDialogueHelper, setShowDialogueHelper] = useState(false)
  const [generatedDialogues, setGeneratedDialogues] = useState<any[]>([])

  const [formData, setFormData] = useState({
    prompt: '',
    resolution: '2K',
    aspectRatio: '16:9',
    actorId: '',
    sceneId: '',
    style: '',
    camera: '',
    lighting: '',
    mood: '',
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  useEffect(() => {
    // Fetch actors and scenes
    Promise.all([
      fetch('/api/actors').then(r => r.json()).catch(() => []),
      fetch('/api/scenes').then(r => r.json()).catch(() => []),
    ]).then(([actorsData, scenesData]) => {
      setActors(Array.isArray(actorsData) ? actorsData : [])
      setScenes(Array.isArray(scenesData) ? scenesData : [])
    })
  }, [])

  // Build enhanced prompt from all selections
  const buildEnhancedPrompt = () => {
    const parts: string[] = []

    // Base prompt
    if (formData.prompt) {
      parts.push(formData.prompt)
    }

    // Style
    const style = stylePresets.find(s => s.id === formData.style)
    if (style) parts.push(style.prompt)

    // Camera
    const camera = cameraPresets.find(c => c.id === formData.camera)
    if (camera) parts.push(camera.prompt)

    // Lighting
    const lighting = lightingPresets.find(l => l.id === formData.lighting)
    if (lighting) parts.push(lighting.prompt)

    // Mood
    const mood = moodPresets.find(m => m.id === formData.mood)
    if (mood) parts.push(mood.prompt)

    // Always add quality boosters
    parts.push('highly detailed, professional photography, 8k quality')

    return parts.join(', ')
  }

  // Auto-enhance basic prompt with AI suggestions
  const enhancePrompt = async () => {
    if (!formData.prompt.trim()) return

    setEnhancing(true)
    try {
      // Simulate AI enhancement (in production, call an API)
      await new Promise(resolve => setTimeout(resolve, 800))

      const basicPrompt = formData.prompt.trim()
      let enhanced = basicPrompt

      // Add cinematic elements if missing
      if (!basicPrompt.toLowerCase().includes('cinematic') && !basicPrompt.toLowerCase().includes('film')) {
        enhanced += ', cinematic composition, film still'
      }

      // Add lighting if not specified
      if (!basicPrompt.toLowerCase().includes('light') && !basicPrompt.toLowerCase().includes('osvetl')) {
        enhanced += ', professional lighting'
      }

      // Add quality boosters
      if (!basicPrompt.toLowerCase().includes('quality') && !basicPrompt.toLowerCase().includes('detailed')) {
        enhanced += ', highly detailed, 8k quality'
      }

      // Add negative prompt hints
      enhanced += ', masterpiece'

      setFormData({ ...formData, prompt: enhanced })
    } finally {
      setEnhancing(false)
    }
  }

  // Apply scene template
  const applyTemplate = (template: typeof sceneTemplates[0]) => {
    setSelectedTemplate(template.id)
    setFormData({
      ...formData,
      prompt: template.promptSk,
      mood: template.mood,
      lighting: template.lighting,
      camera: template.camera,
    })
  }

  // Generate dialogue suggestions
  const generateDialogues = () => {
    const moodKey = formData.mood || 'dramatic'
    const suggestions = dialogueSuggestions[moodKey as keyof typeof dialogueSuggestions] || dialogueSuggestions.dramatic
    setGeneratedDialogues(suggestions)
    setShowDialogueHelper(true)
  }

  // Copy prompt to clipboard
  const copyPrompt = () => {
    const fullPrompt = buildEnhancedPrompt()
    navigator.clipboard.writeText(fullPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const enhancedPrompt = buildEnhancedPrompt()
      const response = await fetch('/api/generate/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          prompt: enhancedPrompt,
        }),
      })

      if (response.ok) {
        router.push('/dashboard/storyboard')
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to generate storyboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const fullPrompt = buildEnhancedPrompt()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/storyboard"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Generovať storyboard</h1>
          <p className="text-muted-foreground">Vytvorte AI obrázok pre vašu scénu s pomocou asistenta</p>
        </div>
      </div>

      {/* Scene Templates */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h2 className="font-semibold">Rýchle šablóny scén</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sceneTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => applyTemplate(template)}
              className={`p-3 border rounded-lg text-left transition-all ${
                selectedTemplate === template.id
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <template.icon className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">{template.name}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{template.promptSk}</p>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Scene Selection */}
        {scenes.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-2">Prepojiť s existujúcou scénou</label>
            <select
              value={formData.sceneId}
              onChange={(e) => {
                const scene = scenes.find(s => s.id === e.target.value)
                if (scene) {
                  setFormData({
                    ...formData,
                    sceneId: e.target.value,
                    prompt: scene.description || formData.prompt,
                    mood: scene.mood || formData.mood,
                  })
                  setSelectedTemplate(null)
                } else {
                  setFormData({ ...formData, sceneId: '' })
                }
              }}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Vlastný prompt (bez prepojenia)</option>
              {scenes.map((scene) => (
                <option key={scene.id} value={scene.id}>
                  {scene.order ? `${scene.order}. ` : ''}{scene.title}
                </option>
              ))}
            </select>
            {formData.sceneId && (
              <p className="text-xs text-muted-foreground mt-2">
                Storyboard bude prepojený s touto scénou vo vašom projekte.
              </p>
            )}
          </div>
        )}

        {/* Main Prompt */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Popis scény</label>
            <button
              type="button"
              onClick={enhancePrompt}
              disabled={enhancing || !formData.prompt.trim()}
              className="flex items-center gap-1 text-xs text-primary hover:underline disabled:opacity-50"
            >
              {enhancing ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Wand2 className="h-3 w-3" />
              )}
              Vylepšiť prompt
            </button>
          </div>
          <textarea
            value={formData.prompt}
            onChange={(e) => {
              setFormData({ ...formData, prompt: e.target.value })
              setSelectedTemplate(null)
            }}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
            placeholder="Popíšte scénu ktorú chcete vygenerovať...&#10;&#10;Napr: 'Žena stojí pri okne, pozerá von na dážď, zamyslený výraz'"
            required
          />

          {/* Quick prompt tips */}
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Tip:</strong> Dobrý prompt obsahuje:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• <strong>Kto</strong> - popis postavy (vek, výraz, oblečenie)</li>
              <li>• <strong>Kde</strong> - prostredie (interiér, exteriér, lokácia)</li>
              <li>• <strong>Čo</strong> - akcia alebo emócia</li>
              <li>• <strong>Ako</strong> - osvetlenie, nálada, štýl</li>
            </ul>
          </div>
        </div>

        {/* Style, Camera, Lighting, Mood Selection */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              Filmové nastavenia
            </h3>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {showAdvanced ? 'Skryť' : 'Zobraziť'} pokročilé
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium mb-2">Štýl</label>
            <div className="flex flex-wrap gap-2">
              {stylePresets.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, style: formData.style === style.id ? '' : style.id })}
                  className={`px-3 py-1.5 text-sm border rounded-full transition-colors ${
                    formData.style === style.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Camera */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Záber kamery
            </label>
            <div className="flex flex-wrap gap-2">
              {cameraPresets.map((camera) => (
                <button
                  key={camera.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, camera: formData.camera === camera.id ? '' : camera.id })}
                  className={`px-3 py-1.5 text-sm border rounded-full transition-colors ${
                    formData.camera === camera.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {camera.name}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Osvetlenie
            </label>
            <div className="flex flex-wrap gap-2">
              {lightingPresets.map((light) => (
                <button
                  key={light.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, lighting: formData.lighting === light.id ? '' : light.id })}
                  className={`px-3 py-1.5 text-sm border rounded-full transition-colors ${
                    formData.lighting === light.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {light.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-medium mb-2">Nálada</label>
            <div className="flex flex-wrap gap-2">
              {moodPresets.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: formData.mood === mood.id ? '' : mood.id })}
                  className={`px-3 py-1.5 text-sm border rounded-full transition-colors ${
                    formData.mood === mood.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {mood.name}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced options */}
          {showAdvanced && (
            <>
              {/* Actor Selection */}
              {actors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Herec pre referenciu
                  </label>
                  <select
                    value={formData.actorId}
                    onChange={(e) => setFormData({ ...formData, actorId: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Bez referencie herca</option>
                    {actors.map((actor) => (
                      <option key={actor.id} value={actor.id}>{actor.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Resolution & Aspect Ratio */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rozlíšenie</label>
                  <div className="flex gap-2">
                    {resolutions.map((res) => (
                      <button
                        key={res.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, resolution: res.value })}
                        className={`flex-1 p-2 border rounded-lg text-center text-sm transition-colors ${
                          formData.resolution === res.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {res.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pomer strán</label>
                  <div className="flex gap-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, aspectRatio: ratio.value })}
                        className={`flex-1 p-2 border rounded-lg text-center text-sm transition-colors ${
                          formData.aspectRatio === ratio.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Dialogue Helper */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Pomocník pre dialógy
            </h3>
            <button
              type="button"
              onClick={generateDialogues}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Generovať návrhy
            </button>
          </div>

          {showDialogueHelper && generatedDialogues.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-3">
                Návrhy dialógov pre náladu: <strong>{moodPresets.find(m => m.id === formData.mood)?.name || 'Dramatický'}</strong>
              </p>
              {generatedDialogues.map((dialogue, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-primary">{dialogue.actor}</span>
                      <span className="text-xs text-muted-foreground ml-2">({dialogue.emotion})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(dialogue.text)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm mt-1">"{dialogue.text}"</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-3">
                Tieto dialógy môžete použiť vo vašej scéne alebo ich upraviť podľa potreby.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Kliknite na "Generovať návrhy" pre získanie návrhov dialógov na základe zvolenej nálady scény.
            </p>
          )}
        </div>

        {/* Preview of final prompt */}
        <div className="bg-muted/50 border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Finálny prompt</h3>
            <button
              type="button"
              onClick={copyPrompt}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Skopírované!' : 'Kopírovať'}
            </button>
          </div>
          <p className="text-sm text-muted-foreground break-words">
            {fullPrompt || 'Zadajte popis scény...'}
          </p>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Link
            href="/dashboard/storyboard"
            className="flex-1 px-6 py-3 border border-border rounded-lg text-center hover:bg-muted transition-colors"
          >
            Zrušiť
          </Link>
          <button
            type="submit"
            disabled={loading || !formData.prompt}
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
                Generovať storyboard
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
