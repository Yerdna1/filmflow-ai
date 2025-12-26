/**
 * Preset Import API
 * Import presets from Higgsfield or FilmFlow format into project
 * Note: Storyboards are not persisted to database (no model), only actors and scenes
 */

import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { format, projectId, data, selectedItems } = body

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    let importedCount = {
      actors: 0,
      scenes: 0,
    }

    if (format === 'filmflow' || format === 'filmflow-v1') {
      importedCount = await importFilmFlowFormat(projectId, data, selectedItems)
    } else if (format === 'higgsfield') {
      importedCount = await importHiggsfieldFormat(projectId, data, selectedItems)
    } else if (format === 'preset-selection') {
      // Direct preset import (from UI selection)
      importedCount = await importPresetSelection(projectId, selectedItems)
    } else {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      imported: importedCount,
      message: `Imported ${importedCount.actors} actors, ${importedCount.scenes} scenes`,
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json({ error: 'Import failed' }, { status: 500 })
  }
}

async function importFilmFlowFormat(
  projectId: string,
  data: any,
  selectedItems?: { actors?: string[]; scenes?: number[] }
) {
  const importedCount = { actors: 0, scenes: 0 }

  // Import actors
  if (data.data?.actors) {
    const actorsToImport = selectedItems?.actors
      ? data.data.actors.filter((a: any) => selectedItems.actors!.includes(a.name))
      : data.data.actors

    for (const actor of actorsToImport) {
      await prisma.actor.create({
        data: {
          name: actor.name,
          description: actor.description,
          age: actor.age,
          gender: actor.gender,
          type: actor.type || 'SUPPORTING',
          voiceId: actor.voiceId,
          imageUrl: actor.imageUrl,
          projectId,
        },
      })
      importedCount.actors++
    }
  }

  // Import scenes
  if (data.data?.scenes) {
    const scenesToImport = selectedItems?.scenes
      ? data.data.scenes.filter((s: any) => selectedItems.scenes!.includes(s.order))
      : data.data.scenes

    for (const scene of scenesToImport) {
      await prisma.scene.create({
        data: {
          title: scene.title || scene.titleSk,
          description: scene.description || scene.descriptionSk,
          type: scene.type || 'DIALOGUE',
          order: scene.order,
          duration: scene.duration,
          projectId,
        },
      })
      importedCount.scenes++
    }
  }

  return importedCount
}

async function importHiggsfieldFormat(
  projectId: string,
  data: any,
  selectedItems?: { characters?: string[]; scenes?: string[] }
) {
  const importedCount = { actors: 0, scenes: 0 }

  // Import characters as actors
  if (data.characters) {
    const charactersToImport = selectedItems?.characters
      ? data.characters.filter((c: any) => selectedItems.characters!.includes(c.id))
      : data.characters

    for (const character of charactersToImport) {
      await prisma.actor.create({
        data: {
          name: character.name,
          description: character.description,
          age: character.age || 30,
          gender: character.gender || 'unknown',
          type: 'SUPPORTING',
          voiceId: character.voice_id,
          imageUrl: character.reference_image,
          projectId,
        },
      })
      importedCount.actors++
    }
  }

  // Import scenes
  if (data.scenes) {
    const scenesToImport = selectedItems?.scenes
      ? data.scenes.filter((s: any) => selectedItems.scenes!.includes(s.id))
      : data.scenes

    for (let i = 0; i < scenesToImport.length; i++) {
      const scene = scenesToImport[i]
      await prisma.scene.create({
        data: {
          title: scene.title,
          description: scene.description,
          type: scene.metadata?.type || 'DIALOGUE',
          order: i + 1,
          duration: scene.duration,
          projectId,
        },
      })
      importedCount.scenes++
    }
  }

  return importedCount
}

async function importPresetSelection(
  projectId: string,
  selectedItems: { actors?: string[]; scenes?: number[] }
) {
  // Import directly from preset files
  const { demoActors } = await import('@/prisma/presets/actors')
  const { demoScenes } = await import('@/prisma/presets/scenes')

  const importedCount = { actors: 0, scenes: 0 }

  // Import selected actors
  if (selectedItems.actors && selectedItems.actors.length > 0) {
    const actorsToImport = demoActors.filter(a => selectedItems.actors!.includes(a.name))

    for (const actor of actorsToImport) {
      await prisma.actor.create({
        data: {
          name: actor.name,
          description: actor.description,
          age: actor.age,
          gender: actor.gender,
          type: actor.type as any || 'SUPPORTING',
          voiceId: actor.voiceId,
          imageUrl: actor.imageUrl,
          projectId,
        },
      })
      importedCount.actors++
    }
  }

  // Import selected scenes
  if (selectedItems.scenes && selectedItems.scenes.length > 0) {
    const scenesToImport = demoScenes.filter(s => selectedItems.scenes!.includes(s.order))

    for (const scene of scenesToImport) {
      await prisma.scene.create({
        data: {
          title: scene.title,
          description: scene.description,
          type: scene.type as any || 'DIALOGUE',
          order: scene.order,
          duration: scene.duration,
          projectId,
        },
      })
      importedCount.scenes++
    }
  }

  return importedCount
}
