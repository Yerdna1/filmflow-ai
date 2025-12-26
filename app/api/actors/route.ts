import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const createActorSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['MAIN', 'SUPPORTING', 'PRESET']),
  age: z.number().min(1).max(120).optional(),
  gender: z.string().optional(),
  description: z.string().max(2000).optional(),
  backstory: z.string().max(5000).optional(),
  imageUrl: z.string().url().optional(),
  voiceId: z.string().optional(),
  projectId: z.string().optional(),
})

// GET - List actors
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
    const type = searchParams.get('type') as 'MAIN' | 'SUPPORTING' | 'PRESET' | null
    const projectId = searchParams.get('projectId')

    const where = {
      OR: [
        { userId: session.user.id },
        { type: 'PRESET' as const, userId: null }, // Include preset actors
      ],
      ...(type && { type }),
      ...(projectId && { projectId }),
    }

    const [actors, total] = await Promise.all([
      db.actor.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          { type: 'asc' },
          { createdAt: 'desc' },
        ],
        include: {
          _count: {
            select: { sceneActors: true },
          },
        },
      }),
      db.actor.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: actors,
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

// POST - Create actor
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
    const validation = createActorSchema.safeParse(body)

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

    // Check actor limits based on plan
    const userActors = await db.actor.count({
      where: { userId: session.user.id, type: validation.data.type },
    })

    const limits = {
      FREE: { MAIN: 2, SUPPORTING: 5 },
      INDIE: { MAIN: 4, SUPPORTING: 10 },
      PRO: { MAIN: 6, SUPPORTING: 15 },
      STUDIO: { MAIN: 10, SUPPORTING: 20 },
    }

    const userPlan = (session.user as any).plan || 'FREE'
    const typeLimit = limits[userPlan as keyof typeof limits]?.[validation.data.type as 'MAIN' | 'SUPPORTING'] || 0

    if (validation.data.type !== 'PRESET' && userActors >= typeLimit) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'LIMIT_EXCEEDED',
            message: `Dosiahli ste limit ${typeLimit} hercov typu ${validation.data.type}. Upgradujte váš plán.`,
          },
        },
        { status: 403 }
      )
    }

    const actor = await db.actor.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ success: true, data: actor }, { status: 201 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}
