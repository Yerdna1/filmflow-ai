'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Download,
  Upload,
  Check,
  Users,
  Layers,
  Image,
  Music,
  Film,
  CheckCircle,
  Circle,
  FileJson,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react'
import { demoActors } from '@/prisma/presets/actors'
import { demoScenes } from '@/prisma/presets/scenes'
import { storyboardPresets } from '@/prisma/presets/storyboards'
import { musicPresets } from '@/prisma/presets/music'
import { demoMovieInfo, allDemoPresets } from '@/prisma/presets'
import { smallDemoActors, smallDemoScenes, smallDemoStoryboards, smallDemoMusic, smallDemoInfo } from '@/prisma/presets/demo-small'
import { mediumDemoActors, mediumDemoScenes, mediumDemoStoryboards, mediumDemoMusic, mediumDemoInfo } from '@/prisma/presets/demo-medium'

type Tab = 'actors' | 'scenes' | 'storyboards' | 'music'
type PresetSize = 'small' | 'medium' | 'huge'

export default function PresetImportPage() {
  const [presetSize, setPresetSize] = useState<PresetSize>('small')
  const [activeTab, setActiveTab] = useState<Tab>('actors')
  const [selectedActors, setSelectedActors] = useState<string[]>([])
  const [selectedScenes, setSelectedScenes] = useState<number[]>([])
  const [selectedStoryboards, setSelectedStoryboards] = useState<string[]>([])
  const [selectedMusic, setSelectedMusic] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState<'higgsfield' | 'json' | 'filmflow'>('higgsfield')
  const [isExporting, setIsExporting] = useState(false)

  // Get data based on selected preset size
  const presetData = useMemo(() => {
    switch (presetSize) {
      case 'small':
        return {
          info: smallDemoInfo,
          actors: smallDemoActors,
          scenes: smallDemoScenes,
          storyboards: smallDemoStoryboards,
          music: smallDemoMusic,
        }
      case 'medium':
        return {
          info: mediumDemoInfo,
          actors: mediumDemoActors,
          scenes: mediumDemoScenes,
          storyboards: mediumDemoStoryboards,
          music: mediumDemoMusic,
        }
      case 'huge':
      default:
        return {
          info: { title: demoMovieInfo.title, size: 'huge' },
          actors: demoActors,
          scenes: demoScenes,
          storyboards: storyboardPresets,
          music: musicPresets,
        }
    }
  }, [presetSize])

  // Reset selections when preset size changes
  const handlePresetSizeChange = (size: PresetSize) => {
    setPresetSize(size)
    setSelectedActors([])
    setSelectedScenes([])
    setSelectedStoryboards([])
    setSelectedMusic([])
  }

  const tabs = [
    { id: 'actors' as Tab, label: 'Herci', icon: Users, count: presetData.actors.length },
    { id: 'scenes' as Tab, label: 'Scény', icon: Layers, count: presetData.scenes.length },
    { id: 'storyboards' as Tab, label: 'Storyboardy', icon: Image, count: presetData.storyboards.length },
    { id: 'music' as Tab, label: 'Hudba', icon: Music, count: presetData.music.length },
  ]

  const totalSelected =
    selectedActors.length + selectedScenes.length + selectedStoryboards.length + selectedMusic.length

  const selectAllActors = () => {
    if (selectedActors.length === presetData.actors.length) {
      setSelectedActors([])
    } else {
      setSelectedActors(presetData.actors.map(a => a.name))
    }
  }

  const selectAllScenes = () => {
    if (selectedScenes.length === presetData.scenes.length) {
      setSelectedScenes([])
    } else {
      setSelectedScenes(presetData.scenes.map(s => s.order))
    }
  }

  const selectAllStoryboards = () => {
    if (selectedStoryboards.length === presetData.storyboards.length) {
      setSelectedStoryboards([])
    } else {
      setSelectedStoryboards(presetData.storyboards.map(s => s.id))
    }
  }

  const selectAllMusic = () => {
    if (selectedMusic.length === presetData.music.length) {
      setSelectedMusic([])
    } else {
      setSelectedMusic(presetData.music.map(m => m.name))
    }
  }

  const selectAll = () => {
    setSelectedActors(presetData.actors.map(a => a.name))
    setSelectedScenes(presetData.scenes.map(s => s.order))
    setSelectedStoryboards(presetData.storyboards.map(s => s.id))
    setSelectedMusic(presetData.music.map(m => m.name))
  }

  const deselectAll = () => {
    setSelectedActors([])
    setSelectedScenes([])
    setSelectedStoryboards([])
    setSelectedMusic([])
  }

  const allSelected = selectedActors.length === presetData.actors.length &&
    selectedScenes.length === presetData.scenes.length &&
    selectedStoryboards.length === presetData.storyboards.length &&
    selectedMusic.length === presetData.music.length

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const params = new URLSearchParams({
        format: exportFormat,
        type: 'selection',
        preset: presetSize,
      })

      if (selectedScenes.length > 0 && selectedScenes.length < presetData.scenes.length) {
        params.append('scenes', selectedScenes.join(','))
      }
      if (selectedActors.length > 0 && selectedActors.length < presetData.actors.length) {
        params.append('actors', selectedActors.join(','))
      }

      const response = await fetch(`/api/presets/export?${params}`)
      const data = await response.json()

      // Download as file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const filename = presetData.info.title.replace(/\s+/g, '_')
      a.download = `${filename}_${presetSize}_${exportFormat}_export.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  // Quick export entire preset
  const handleQuickExport = async () => {
    setIsExporting(true)
    try {
      const params = new URLSearchParams({
        format: exportFormat,
        preset: presetSize,
      })

      const response = await fetch(`/api/presets/export?${params}`)
      const data = await response.json()

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const filename = presetData.info.title.replace(/\s+/g, '_')
      a.download = `${filename}_${presetSize}_${exportFormat}_full.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/presets"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Import/Export Presetov</h1>
            <p className="text-muted-foreground mt-1">
              Vyberte veľkosť presetu a exportujte do Higgsfield Cinema Studio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {totalSelected} položiek vybraných
          </span>
          <button
            onClick={allSelected ? deselectAll : selectAll}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
          >
            {allSelected ? 'Zrušiť všetko' : 'Vybrať všetko'}
          </button>
        </div>
      </div>

      {/* Preset Size Selection */}
      <div className="bg-gradient-to-br from-primary/10 via-accent-gold/5 to-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Vybrať veľkosť presetu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Small Preset */}
          <button
            onClick={() => handlePresetSizeChange('small')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              presetSize === 'small'
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Malý</span>
              </div>
              {presetSize === 'small' && (
                <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs">Odporúčané</span>
              )}
            </div>
            <div className="text-2xl font-bold text-green-500 mb-1">~2 min</div>
            <p className="text-sm text-muted-foreground mb-3">"{smallDemoInfo.title}"</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{smallDemoActors.length} hercov</span>
              </div>
              <div className="flex items-center gap-1">
                <Layers className="h-3 w-3" />
                <span>{smallDemoScenes.length} scén</span>
              </div>
              <div className="flex items-center gap-1">
                <Image className="h-3 w-3" />
                <span>{smallDemoStoryboards.length} obrázkov</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="h-3 w-3" />
                <span>{smallDemoMusic.length} hudba</span>
              </div>
            </div>
          </button>

          {/* Medium Preset */}
          <button
            onClick={() => handlePresetSizeChange('medium')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              presetSize === 'medium'
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Stredný</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-yellow-500 mb-1">~5 min</div>
            <p className="text-sm text-muted-foreground mb-3">"{mediumDemoInfo.title}"</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{mediumDemoActors.length} hercov</span>
              </div>
              <div className="flex items-center gap-1">
                <Layers className="h-3 w-3" />
                <span>{mediumDemoScenes.length} scén</span>
              </div>
              <div className="flex items-center gap-1">
                <Image className="h-3 w-3" />
                <span>{mediumDemoStoryboards.length} obrázkov</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="h-3 w-3" />
                <span>{mediumDemoMusic.length} hudba</span>
              </div>
            </div>
          </button>

          {/* Huge Preset */}
          <button
            onClick={() => handlePresetSizeChange('huge')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              presetSize === 'huge'
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                <span className="font-semibold">Veľký</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-red-500 mb-1">~30 min</div>
            <p className="text-sm text-muted-foreground mb-3">"{demoMovieInfo.title}"</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{demoActors.length} hercov</span>
              </div>
              <div className="flex items-center gap-1">
                <Layers className="h-3 w-3" />
                <span>{demoScenes.length} scén</span>
              </div>
              <div className="flex items-center gap-1">
                <Image className="h-3 w-3" />
                <span>{storyboardPresets.length} obrázkov</span>
              </div>
              <div className="flex items-center gap-1">
                <Music className="h-3 w-3" />
                <span>{musicPresets.length} hudba</span>
              </div>
            </div>
          </button>
        </div>

        {/* Quick Export Button */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Rýchly export celého presetu "{presetData.info.title}" v {exportFormat.toUpperCase()} formáte
          </p>
          <button
            onClick={handleQuickExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exportujem...' : 'Exportovať celý preset'}
          </button>
        </div>
      </div>

      {/* Export Format Selection */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Formát exportu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setExportFormat('higgsfield')}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              exportFormat === 'higgsfield'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Film className="h-5 w-5 text-primary" />
              <span className="font-medium">Higgsfield</span>
              {exportFormat === 'higgsfield' && (
                <CheckCircle className="h-4 w-4 text-primary ml-auto" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Kompatibilný s Higgsfield Cinema Studio pre AI video generáciu
            </p>
            <a
              href="https://higgsfield.ai/cinema-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              higgsfield.ai <ExternalLink className="h-3 w-3" />
            </a>
          </button>

          <button
            onClick={() => setExportFormat('json')}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              exportFormat === 'json'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <FileJson className="h-5 w-5 text-blue-500" />
              <span className="font-medium">JSON</span>
              {exportFormat === 'json' && (
                <CheckCircle className="h-4 w-4 text-primary ml-auto" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Štandardný JSON formát pre vlastnú integráciu
            </p>
          </button>

          <button
            onClick={() => setExportFormat('filmflow')}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              exportFormat === 'filmflow'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Upload className="h-5 w-5 text-green-500" />
              <span className="font-medium">FilmFlow</span>
              {exportFormat === 'filmflow' && (
                <CheckCircle className="h-4 w-4 text-primary ml-auto" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Natívny formát pre re-import do FilmFlow projektov
            </p>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              <span className="px-2 py-0.5 bg-muted rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-xl p-6">
        {activeTab === 'actors' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Vybrať hercov ({selectedActors.length}/{presetData.actors.length})</h3>
              <button
                onClick={selectAllActors}
                className="text-sm text-primary hover:underline"
              >
                {selectedActors.length === presetData.actors.length ? 'Zrušiť všetko' : 'Vybrať všetko'}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {presetData.actors.map((actor) => {
                const isSelected = selectedActors.includes(actor.name)
                return (
                  <button
                    key={actor.name}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedActors(selectedActors.filter(n => n !== actor.name))
                      } else {
                        setSelectedActors([...selectedActors, actor.name])
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                        {actor.imageUrl ? (
                          <img src={actor.imageUrl} alt={actor.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Users className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      {isSelected ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="font-medium text-sm truncate">{actor.name}</p>
                    <p className="text-xs text-muted-foreground">{actor.type}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'scenes' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Vybrať scény ({selectedScenes.length}/{presetData.scenes.length})</h3>
              <button
                onClick={selectAllScenes}
                className="text-sm text-primary hover:underline"
              >
                {selectedScenes.length === presetData.scenes.length ? 'Zrušiť všetko' : 'Vybrať všetko'}
              </button>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {presetData.scenes.map((scene) => {
                const isSelected = selectedScenes.includes(scene.order)
                return (
                  <button
                    key={scene.order}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedScenes(selectedScenes.filter(o => o !== scene.order))
                      } else {
                        setSelectedScenes([...selectedScenes, scene.order])
                      }
                    }}
                    className={`w-full p-3 rounded-lg border-2 transition-colors text-left flex items-center gap-4 ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-sm font-medium">
                      {scene.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{scene.titleSk}</p>
                      <p className="text-xs text-muted-foreground truncate">{scene.descriptionSk}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      scene.type === 'EMOTIONAL' ? 'bg-pink-500/10 text-pink-500' :
                      scene.type === 'DIALOGUE' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {scene.type}
                    </span>
                    {isSelected ? (
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'storyboards' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Vybrať storyboardy ({selectedStoryboards.length}/{presetData.storyboards.length})</h3>
              <button
                onClick={selectAllStoryboards}
                className="text-sm text-primary hover:underline"
              >
                {selectedStoryboards.length === presetData.storyboards.length ? 'Zrušiť všetko' : 'Vybrať všetko'}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto">
              {presetData.storyboards.map((sb) => {
                const isSelected = selectedStoryboards.includes(sb.id)
                return (
                  <button
                    key={sb.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedStoryboards(selectedStoryboards.filter(id => id !== sb.id))
                      } else {
                        setSelectedStoryboards([...selectedStoryboards, sb.id])
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-8 rounded bg-muted flex items-center justify-center">
                        <Image className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {isSelected ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="font-medium text-xs truncate">{(sb as any).nameSk || sb.id}</p>
                    <p className="text-xs text-muted-foreground">Scéna {sb.sceneOrder}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'music' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Vybrať hudbu ({selectedMusic.length}/{presetData.music.length})</h3>
              <button
                onClick={selectAllMusic}
                className="text-sm text-primary hover:underline"
              >
                {selectedMusic.length === presetData.music.length ? 'Zrušiť všetko' : 'Vybrať všetko'}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {presetData.music.map((music) => {
                const isSelected = selectedMusic.includes(music.name)
                return (
                  <button
                    key={music.name}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedMusic(selectedMusic.filter(n => n !== music.name))
                      } else {
                        setSelectedMusic([...selectedMusic, music.name])
                      }
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Music className="h-5 w-5 text-primary" />
                      {isSelected ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="font-medium text-sm">{music.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{music.mood} • {(music as any).style || (music as any).genre}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Export Button */}
      <div className="flex items-center justify-between bg-card border border-border rounded-xl p-6">
        <div>
          <p className="font-medium">Pripravené na export</p>
          <p className="text-sm text-muted-foreground">
            {selectedActors.length} hercov, {selectedScenes.length} scén, {selectedStoryboards.length} storyboardov, {selectedMusic.length} hudobných presetov
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={totalSelected === 0 || isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-5 w-5" />
          {isExporting ? 'Exportujem...' : `Exportovať (${exportFormat.toUpperCase()})`}
        </button>
      </div>
    </div>
  )
}
