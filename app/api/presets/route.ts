import { NextResponse } from 'next/server'
import { demoActors, actorVoices } from '@/prisma/presets/actors'
import { demoScenes, genericPresetScenes, sceneCategories } from '@/prisma/presets/scenes'
import { storyboardPresets, stylePresets, lightingPresets, cameraPresets } from '@/prisma/presets/storyboards'
import { musicPresets, musicMoods, instrumentSets } from '@/prisma/presets/music'
import { cameraMovements, movementCategories } from '@/prisma/presets/camera-movements'
import { demoMovieInfo } from '@/prisma/presets'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const category = searchParams.get('category')

  // Return specific preset type
  if (type) {
    switch (type) {
      case 'actors':
        return NextResponse.json({
          actors: demoActors,
          voices: actorVoices,
          categories: ['MAIN', 'SUPPORTING', 'PRESET'],
        })

      case 'scenes':
        let scenes = [...demoScenes, ...genericPresetScenes]
        if (category) {
          scenes = scenes.filter((s: any) => s.category === category)
        }
        return NextResponse.json({
          scenes,
          categories: sceneCategories,
          demoMovie: demoMovieInfo,
        })

      case 'storyboards':
        let storyboards = storyboardPresets
        if (category) {
          storyboards = storyboards.filter((s) => s.category === category)
        }
        return NextResponse.json({
          presets: storyboards,
          styles: stylePresets,
          lighting: lightingPresets,
          cameras: cameraPresets,
        })

      case 'music':
        let music = musicPresets
        if (category) {
          music = music.filter((m) => m.category === category)
        }
        return NextResponse.json({
          presets: music,
          moods: musicMoods,
          instruments: instrumentSets,
        })

      case 'camera':
        let movements = cameraMovements
        if (category) {
          movements = movements.filter((m) => m.category === category)
        }
        return NextResponse.json({
          movements,
          categories: movementCategories,
        })

      case 'movie':
        return NextResponse.json({
          movie: demoMovieInfo,
          scenes: demoScenes,
          actors: demoActors.filter(a => a.type !== 'PRESET'),
        })

      default:
        return NextResponse.json({ error: 'Invalid preset type' }, { status: 400 })
    }
  }

  // Return all presets summary
  return NextResponse.json({
    demoMovie: demoMovieInfo,
    counts: {
      actors: demoActors.length,
      scenes: demoScenes.length + genericPresetScenes.length,
      storyboards: storyboardPresets.length,
      music: musicPresets.length,
      cameraMovements: cameraMovements.length,
    },
    categories: {
      actors: ['MAIN', 'SUPPORTING', 'PRESET'],
      scenes: sceneCategories,
      storyboards: ['dramatic', 'romantic', 'establishing', 'portrait', 'emotional', 'action', 'night', 'flashback'],
      music: ['dramatic', 'romantic', 'melancholic', 'hopeful', 'folk', 'ambient', 'credits'],
      camera: movementCategories,
    },
  })
}
