import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { createGeneration, buildScenePrompt } from '@/lib/services/generation'
import { checkFreeTierLimit } from '@/lib/services/free-tier-tracker'
import { db } from '@/lib/db'

const generateSchema = z.object({
  sceneId: z.string().optional(),
  prompt: z.string().min(10).max(2000).optional(),
  model: z.string().default('bytedance/seedream/v4/text-to-image'),
  resolution: z.enum(['720p', '2K', '4K']).default('2K'),
  aspectRatio: z.enum(['16:9', '4:3', '1:1', '9:16']).default('16:9'),
  actorIds: z.array(z.string()).optional(),
  cameraMovement: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = generateSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Neplatné údaje',
            details: validation.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      )
    }

    // Check free tier limits
    const limitCheck = await checkFreeTierLimit(session.user.id, 'higgsfield')
    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FREE_TIER_EXCEEDED',
            message: `Dosiahli ste denný limit ${limitCheck.limit} generácií. Zostáva: ${limitCheck.remaining}. Limit sa obnoví o polnoci.`,
          },
        },
        { status: 429 }
      )
    }

    const { sceneId, prompt, model, resolution, aspectRatio, actorIds, cameraMovement } = validation.data

    let finalPrompt = prompt || ''

    // Build prompt from scene if provided
    if (sceneId) {
      const scene = await db.scene.findFirst({
        where: { id: sceneId, userId: session.user.id },
        include: {
          sceneActors: {
            include: {
              actor: true,
            },
          },
        },
      })

      if (scene) {
        const actors = scene.sceneActors.map(sa => sa.actor)
        finalPrompt = buildScenePrompt(scene, actors, cameraMovement)
      }
    }

    // Get actor reference images
    let actorRefs: string[] = []
    if (actorIds && actorIds.length > 0) {
      const actors = await db.actor.findMany({
        where: { id: { in: actorIds } },
        select: { imageUrl: true },
      })
      actorRefs = actors
        .map(a => a.imageUrl)
        .filter((url): url is string => url !== null)
    }

    // Create generation record
    const result = await createGeneration(
      session.user.id,
      'IMAGE',
      model,
      finalPrompt,
      { resolution, aspectRatio, actorRefs },
      sceneId
    )

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: { code: 'GENERATION_FAILED', message: result.error } },
        { status: 500 }
      )
    }

    // In production, this would trigger the Modal function
    // For now, we return the generation ID for polling

    return NextResponse.json({
      success: true,
      data: {
        generationId: result.generationId,
        status: 'PENDING',
        prompt: finalPrompt,
        model,
        estimatedTime: '30-60 seconds',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}
