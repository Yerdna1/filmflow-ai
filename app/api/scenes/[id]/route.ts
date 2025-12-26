import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const updateSceneSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  type: z.enum(['DIALOGUE', 'ACTION', 'EMOTIONAL', 'TRANSITION', 'ESTABLISHING']),
  location: z.string().max(200).optional(),
  timeOfDay: z.string().max(50).optional(),
  mood: z.string().max(100).optional(),
  duration: z.number().min(5).max(300),
  order: z.number().min(0),
})

// GET - Get single scene
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    const { id } = await params

    const scene = await db.scene.findUnique({
      where: { id },
      include: {
        sceneActors: {
          include: {
            actor: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
        dialogueLines: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!scene) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Scéna nebola nájdená' } },
        { status: 404 }
      )
    }

    if (scene.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Nemáte prístup k tejto scéne' } },
        { status: 403 }
      )
    }

    return NextResponse.json({ success: true, data: scene })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}

// PUT - Update scene
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if scene exists and user owns it
    const existingScene = await db.scene.findUnique({
      where: { id },
    })

    if (!existingScene) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Scéna nebola nájdená' } },
        { status: 404 }
      )
    }

    if (existingScene.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Nemáte prístup k tejto scéne' } },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validation = updateSceneSchema.safeParse(body)

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

    // Update scene
    const scene = await db.scene.update({
      where: { id },
      data: validation.data,
      include: {
        sceneActors: {
          include: {
            actor: true,
          },
        },
        dialogueLines: {
          orderBy: { order: 'asc' },
        },
      },
    })

    return NextResponse.json({ success: true, data: scene })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}

// DELETE - Delete scene
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if scene exists and user owns it
    const existingScene = await db.scene.findUnique({
      where: { id },
    })

    if (!existingScene) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Scéna nebola nájdená' } },
        { status: 404 }
      )
    }

    if (existingScene.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Nemáte prístup k tejto scéne' } },
        { status: 403 }
      )
    }

    // Delete scene (cascade delete will handle related records)
    await db.scene.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Scéna bola odstránená' })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}
