import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const createSceneSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  type: z.enum(['DIALOGUE', 'ACTION', 'EMOTIONAL', 'TRANSITION', 'ESTABLISHING']).default('DIALOGUE'),
  location: z.string().max(200).optional(),
  timeOfDay: z.string().max(50).optional(),
  mood: z.string().max(100).optional(),
  duration: z.number().min(5).max(300).default(30),
  projectId: z.string().optional(),
  actorIds: z.array(z.string()).optional(),
})

// GET - List scenes
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const projectId = searchParams.get('projectId')
    const type = searchParams.get('type') as 'DIALOGUE' | 'ACTION' | 'EMOTIONAL' | 'TRANSITION' | 'ESTABLISHING' | null

    const where = {
      userId: session.user.id,
      ...(projectId && { projectId }),
      ...(type && { type }),
    }

    const [scenes, total] = await Promise.all([
      db.scene.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { order: 'asc' },
        include: {
          sceneActors: {
            include: {
              actor: {
                select: {
                  id: true,
                  name: true,
                  imageUrl: true,
                  type: true,
                },
              },
            },
          },
          dialogueLines: {
            orderBy: { order: 'asc' },
          },
          _count: {
            select: { generations: true },
          },
        },
      }),
      db.scene.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: scenes,
      meta: { page, limit, total },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}

// POST - Create scene
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
    const validation = createSceneSchema.safeParse(body)

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

    const { actorIds, ...sceneData } = validation.data

    // Get next order number
    const lastScene = await db.scene.findFirst({
      where: { userId: session.user.id },
      orderBy: { order: 'desc' },
    })
    const order = (lastScene?.order || 0) + 1

    // Create scene with actors
    const scene = await db.scene.create({
      data: {
        ...sceneData,
        order,
        userId: session.user.id,
        ...(actorIds?.length && {
          sceneActors: {
            create: actorIds.map(actorId => ({ actorId })),
          },
        }),
      },
      include: {
        sceneActors: {
          include: {
            actor: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: scene }, { status: 201 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}
