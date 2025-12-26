import Link from 'next/link'
import {
  Users,
  Layers,
  Image,
  Music,
  Video,
  Film,
  Play,
  Sparkles,
  Download,
  Upload,
  Clock,
} from 'lucide-react'
import { demoMovieInfo, allDemoPresets } from '@/prisma/presets'
import { demoActors } from '@/prisma/presets/actors'
import { demoScenes } from '@/prisma/presets/scenes'

export default function PresetsPage() {
  const mainActors = demoActors.filter(a => a.type === 'MAIN')
  const supportingActors = demoActors.filter(a => a.type === 'SUPPORTING')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Demo Presety</h1>
        <p className="text-muted-foreground mt-1">
          Vyberte si demo preset na otestovanie aplikácie
        </p>
      </div>

      {/* Demo Presets Selection */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dostupné demo presety</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allDemoPresets.map((preset) => (
            <DemoPresetCard key={preset.id} preset={preset} />
          ))}
        </div>
      </div>

      {/* Current Demo Preview */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Náhľad: {demoMovieInfo.title}</h2>
      </div>

      {/* Demo Movie Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent-gold/10 to-primary/5 border border-primary/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative p-8">
          <div className="flex items-center gap-2 mb-4">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-primary">Demo Film</span>
          </div>
          <h2 className="text-4xl font-bold mb-2">{demoMovieInfo.title}</h2>
          <p className="text-lg text-muted-foreground mb-4">{demoMovieInfo.titleEn}</p>
          <p className="text-muted-foreground max-w-2xl mb-6">
            {demoMovieInfo.synopsis.sk}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Žáner:</span>
              <span className="font-medium">{demoMovieInfo.genre}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Dĺžka:</span>
              <span className="font-medium">{demoMovieInfo.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Scén:</span>
              <span className="font-medium">{demoScenes.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Acts */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Štruktúra filmu - 5 aktov</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {demoMovieInfo.acts.map((act) => (
            <div
              key={act.number}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
            >
              <div className="text-sm text-muted-foreground mb-1">Akt {act.number}</div>
              <div className="font-semibold">{act.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{act.titleEn}</div>
              <div className="text-xs text-primary mt-2">Scény {act.scenes}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Cast */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Hlavné postavy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainActors.map((actor) => (
            <div
              key={actor.name}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="aspect-square bg-muted">
                {actor.imageUrl && (
                  <img
                    src={actor.imageUrl}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{actor.name}</h4>
                <p className="text-sm text-muted-foreground">{actor.age} rokov</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {actor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supporting Cast */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Vedľajšie postavy</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {supportingActors.map((actor) => (
            <div
              key={actor.name}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3 overflow-hidden">
                {actor.imageUrl && (
                  <img
                    src={actor.imageUrl}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h4 className="font-semibold text-center text-sm">{actor.name}</h4>
              <p className="text-xs text-muted-foreground text-center">{actor.age} rokov</p>
            </div>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Témy filmu</h3>
        <div className="flex flex-wrap gap-2">
          {demoMovieInfo.themes.map((theme) => (
            <span
              key={theme}
              className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>

      {/* Preset Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Všetky presety</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PresetCard
            icon={<Users className="h-6 w-6" />}
            title="Herci"
            count={demoActors.length}
            description="Hlavné, vedľajšie a generické postavy"
            href="/dashboard/presets/actors"
          />
          <PresetCard
            icon={<Layers className="h-6 w-6" />}
            title="Scény"
            count={demoScenes.length}
            description="Kompletný scenár s dialógmi"
            href="/dashboard/presets/scenes"
          />
          <PresetCard
            icon={<Image className="h-6 w-6" />}
            title="Storyboardy"
            count={50}
            description="Vizuálne šablóny pre AI generovanie"
            href="/dashboard/presets/storyboards"
          />
          <PresetCard
            icon={<Music className="h-6 w-6" />}
            title="Hudba"
            count={18}
            description="Soundtrack presety pre Suno AI"
            href="/dashboard/presets/music"
          />
          <PresetCard
            icon={<Video className="h-6 w-6" />}
            title="Pohyby kamery"
            count={30}
            description="Profesionálne filmové pohyby"
            href="/dashboard/presets/camera"
          />
          <PresetCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Demo scéna"
            count={1}
            description="Vyskúšajte celý workflow"
            href="/dashboard/presets/demo"
            highlighted
          />
          <PresetCard
            icon={<Download className="h-6 w-6" />}
            title="Import / Export"
            count={0}
            description="Higgsfield kompatibilný export"
            href="/dashboard/presets/import"
          />
        </div>
      </div>
    </div>
  )
}

function DemoPresetCard({ preset }: { preset: { id: string; title: string; titleEn: string; size: string; duration: string; genre: string; description: { sk: string } | string; stats: { actors: number; scenes: number; storyboards: number; dialogueLines: number }; recommended: boolean } }) {
  const sizeColors: Record<string, string> = {
    small: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50',
    medium: 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50',
    huge: 'bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50',
  }

  const sizeBadges: Record<string, string> = {
    small: 'bg-blue-500 text-white',
    medium: 'bg-purple-500 text-white',
    huge: 'bg-amber-500 text-white',
  }

  const presetSize = preset.size as 'small' | 'medium' | 'huge'
  const description = typeof preset.description === 'string' ? preset.description : preset.description?.sk

  return (
    <div className={`bg-card border rounded-xl p-6 transition-colors ${sizeColors[presetSize]} ${
      preset.recommended ? 'ring-2 ring-primary' : ''
    }`}>
      {preset.recommended && (
        <div className="flex items-center gap-1 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary">Odporúčané</span>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{preset.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${sizeBadges[presetSize]}`}>
          {presetSize.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{preset.titleEn}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Clock className="h-4 w-4" />
        <span>{preset.duration}</span>
        <span>•</span>
        <span>{preset.genre}</span>
      </div>
      <p className="text-sm mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div className="flex flex-col">
          <span className="text-muted-foreground">Herci</span>
          <span className="font-semibold">{preset.stats.actors}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Scény</span>
          <span className="font-semibold">{preset.stats.scenes}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Storyboardy</span>
          <span className="font-semibold">{preset.stats.storyboards}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Dialógy</span>
          <span className="font-semibold">{preset.stats.dialogueLines}</span>
        </div>
      </div>
      <Link
        href={`/dashboard/presets/import?preset=${preset.id}`}
        className="block w-full text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Importovať
      </Link>
    </div>
  )
}

function PresetCard({
  icon,
  title,
  count,
  description,
  href,
  highlighted = false,
}: {
  icon: React.ReactNode
  title: string
  count: number
  description: string
  href: string
  highlighted?: boolean
}) {
  return (
    <Link
      href={href}
      className={`bg-card border rounded-xl p-6 hover:border-primary/50 transition-colors ${
        highlighted ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
        highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
      }`}>
        {icon}
      </div>
      <div className="flex items-baseline justify-between mb-2">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-2xl font-bold text-primary">{count}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}
