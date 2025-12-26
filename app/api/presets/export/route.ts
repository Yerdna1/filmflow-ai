/**
 * Higgsfield Cinema Studio Compatible Export API
 * Exports presets in format compatible with Higgsfield.ai
 * Supports: small (2min), medium (5min), huge (30min) presets
 */

import { NextRequest, NextResponse } from 'next/server'
import { demoActors, actorVoices } from '@/prisma/presets/actors'
import { demoScenes } from '@/prisma/presets/scenes'
import { storyboardPresets } from '@/prisma/presets/storyboards'
import { cameraMovements } from '@/prisma/presets/camera-movements'
import { musicPresets } from '@/prisma/presets/music'
import { demoMovieInfo, allDemoPresets, hugeDemoInfo } from '@/prisma/presets'
import {
  smallDemoInfo, smallDemoActors, smallDemoScenes,
  smallDemoStoryboards, smallDemoMusic
} from '@/prisma/presets/demo-small'
import {
  mediumDemoInfo, mediumDemoActors, mediumDemoScenes,
  mediumDemoStoryboards, mediumDemoMusic
} from '@/prisma/presets/demo-medium'

// Higgsfield Cinema Studio compatible format
interface HiggsfieldScene {
  id: string
  title: string
  description: string
  duration: number
  characters: HiggsfieldCharacter[]
  dialogue: HiggsfieldDialogue[]
  visual: HiggsfieldVisual
  audio: HiggsfieldAudio
  metadata: Record<string, any>
}

interface HiggsfieldCharacter {
  id: string
  name: string
  description: string
  age: number
  gender: string
  voice_id?: string
  reference_image?: string
}

interface HiggsfieldDialogue {
  character_id: string
  text: string
  emotion?: string
  timing?: number
}

interface HiggsfieldVisual {
  prompt: string
  negative_prompt?: string
  style: string
  aspect_ratio: string
  camera_movement?: string
  lighting?: string
}

interface HiggsfieldAudio {
  music_prompt?: string
  music_style?: string
  ambient?: string
}

interface HiggsfieldProject {
  version: string
  project_name: string
  created_at: string
  metadata: {
    title: string
    genre: string
    language: string
    duration: string
    synopsis: string
  }
  characters: HiggsfieldCharacter[]
  scenes: HiggsfieldScene[]
  music_library: any[]
  export_settings: {
    format: string
    resolution: string
    fps: number
  }
}

// Helper to get preset data by size
function getPresetData(preset: string) {
  switch (preset) {
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
        info: hugeDemoInfo,
        actors: demoActors,
        scenes: demoScenes,
        storyboards: storyboardPresets,
        music: musicPresets,
      }
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const format = searchParams.get('format') || 'higgsfield'
  const type = searchParams.get('type') || 'full'
  const preset = searchParams.get('preset') || 'huge' // small, medium, huge
  const sceneIds = searchParams.get('scenes')?.split(',').map(Number) || []
  const actorNames = searchParams.get('actors')?.split(',') || []

  // Get preset data based on size
  const presetData = getPresetData(preset)

  try {
    if (format === 'higgsfield') {
      const project = exportToHiggsfield(type, sceneIds, actorNames, presetData)
      return NextResponse.json(project)
    } else if (format === 'json') {
      const data = exportToJSON(type, sceneIds, actorNames, presetData)
      return NextResponse.json(data)
    } else if (format === 'filmflow') {
      const data = exportToFilmFlow(type, sceneIds, actorNames, presetData)
      return NextResponse.json(data)
    } else if (format === 'list') {
      // Return list of available presets
      return NextResponse.json({ presets: allDemoPresets })
    } else {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
    }
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}

function exportToHiggsfield(
  type: string,
  sceneIds: number[],
  actorNames: string[],
  presetData: ReturnType<typeof getPresetData>
): HiggsfieldProject {
  const { info, actors, scenes, storyboards, music } = presetData

  // Filter scenes if specific IDs provided
  const scenesToExport = sceneIds.length > 0
    ? scenes.filter((s: any) => sceneIds.includes(s.order))
    : scenes

  // Get unique actors from selected scenes or filter by names
  const actorNamesInScenes = new Set<string>()
  scenesToExport.forEach((scene: any) => {
    scene.actors?.forEach((actor: string) => actorNamesInScenes.add(actor))
  })

  const actorsToExport = actorNames.length > 0
    ? actors.filter((a: any) => actorNames.includes(a.name))
    : actors.filter((a: any) => actorNamesInScenes.has(a.name) || a.type === 'MAIN')

  // Convert actors to Higgsfield format
  const characters: HiggsfieldCharacter[] = actorsToExport.map((actor: any) => ({
    id: actor.name.toLowerCase().replace(/\s+/g, '_'),
    name: actor.name,
    description: actor.description,
    age: actor.age,
    gender: actor.gender,
    voice_id: actor.voiceId || undefined,
    reference_image: actor.imageUrl || undefined,
  }))

  // Convert scenes to Higgsfield format
  const higgsfieldScenes: HiggsfieldScene[] = scenesToExport.map((scene: any) => {
    // Find matching storyboard
    const storyboard: any = storyboards.find((sb: any) => sb.sceneOrder === scene.order)

    // Find matching music
    const matchingMusic: any = music.find((m: any) =>
      m.mood === scene.mood || m.category === scene.category
    )

    return {
      id: `scene_${scene.order}`,
      title: scene.title,
      description: scene.description,
      duration: scene.duration,
      characters: (scene.actors || []).map((actorName: string) => {
        const actor = actorsToExport.find((a: any) => a.name === actorName)
        return {
          id: actorName.toLowerCase().replace(/\s+/g, '_'),
          name: actorName,
          description: actor?.description || '',
          age: actor?.age || 30,
          gender: actor?.gender || 'unknown',
          voice_id: actor?.voiceId,
          reference_image: actor?.imageUrl,
        }
      }),
      dialogue: (scene.dialogue || []).map((d: any, index: number) => ({
        character_id: d.actor.toLowerCase().replace(/\s+/g, '_'),
        text: d.text,
        emotion: d.emotion,
        timing: index * 3, // rough estimate
      })),
      visual: {
        prompt: storyboard?.prompt || scene.descriptionSk,
        negative_prompt: storyboard?.negativePrompt,
        style: storyboard?.style || 'cinematic',
        aspect_ratio: storyboard?.aspectRatio || '16:9',
        camera_movement: storyboard?.cameraMovement,
        lighting: storyboard?.lighting,
      },
      audio: {
        music_prompt: matchingMusic?.prompt,
        music_style: matchingMusic?.style,
        ambient: scene.location?.includes('Exteriér') ? 'outdoor_ambience' : 'indoor_ambience',
      },
      metadata: {
        type: scene.type,
        location: scene.location,
        timeOfDay: scene.timeOfDay,
        mood: scene.mood,
        category: scene.category,
        titleSk: scene.titleSk,
        descriptionSk: scene.descriptionSk,
      },
    }
  })

  // Build music library
  const musicLibrary = music.map((m: any) => ({
    id: m.name.toLowerCase().replace(/\s+/g, '_'),
    name: m.name,
    prompt: m.prompt,
    style: m.style,
    mood: m.mood,
    duration: m.duration,
    tempo: m.tempo,
  }))

  return {
    version: '1.0.0',
    project_name: info.title,
    created_at: new Date().toISOString(),
    metadata: {
      title: info.title,
      genre: info.genre,
      language: info.language,
      duration: info.duration,
      synopsis: typeof info.description === 'object' ? info.description.en : (info.description as string),
    },
    characters,
    scenes: higgsfieldScenes,
    music_library: musicLibrary,
    export_settings: {
      format: 'mp4',
      resolution: '1920x1080',
      fps: 24,
    },
  }
}

function exportToJSON(
  type: string,
  sceneIds: number[],
  actorNames: string[],
  presetData: ReturnType<typeof getPresetData>
) {
  const { info, actors, scenes, storyboards, music } = presetData

  const scenesToExport = sceneIds.length > 0
    ? scenes.filter((s: any) => sceneIds.includes(s.order))
    : scenes

  const actorsToExport = actorNames.length > 0
    ? actors.filter((a: any) => actorNames.includes(a.name))
    : actors

  const storyboardsToExport = sceneIds.length > 0
    ? storyboards.filter((sb: any) => sceneIds.includes(sb.sceneOrder))
    : storyboards

  return {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    presetSize: info.size,
    movieInfo: info,
    actors: actorsToExport,
    voices: actorVoices,
    scenes: scenesToExport,
    storyboards: storyboardsToExport,
    music: music,
    cameraMovements,
  }
}

function exportToFilmFlow(
  type: string,
  sceneIds: number[],
  actorNames: string[],
  presetData: ReturnType<typeof getPresetData>
) {
  const { info, actors, scenes, storyboards } = presetData

  // FilmFlow native format - designed for re-import
  const scenesToExport = sceneIds.length > 0
    ? scenes.filter((s: any) => sceneIds.includes(s.order))
    : scenes

  const actorsToExport = actorNames.length > 0
    ? actors.filter((a: any) => actorNames.includes(a.name))
    : actors

  return {
    _format: 'filmflow-v1',
    _version: '1.0.0',
    _exportedAt: new Date().toISOString(),
    _presetSize: info.size,
    project: {
      name: info.title,
      description: info.description?.sk || info.description,
      language: 'sk',
    },
    data: {
      actors: actorsToExport.map((actor: any) => ({
        ...actor,
        _importAs: 'actor',
      })),
      scenes: scenesToExport.map((scene: any) => ({
        ...scene,
        _importAs: 'scene',
      })),
      storyboards: storyboards
        .filter((sb: any) => sceneIds.length === 0 || sceneIds.includes(sb.sceneOrder))
        .map((sb: any) => ({
          ...sb,
          _importAs: 'storyboard',
        })),
    },
  }
}
