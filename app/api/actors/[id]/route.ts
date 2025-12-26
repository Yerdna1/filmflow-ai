import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const updateActorSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  type: z.enum(['MAIN', 'SUPPORTING', 'PRESET']).optional(),
  age: z.number().min(1).max(120).optional().nullable(),
  gender: z.string().optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  backstory: z.string().max(5000).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  voiceId: z.string().optional().nullable(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Single actor
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    const actor = await db.actor.findFirst({
      where: {
        id,
        OR: [
          { userId: session.user.id },
          { type: 'PRESET', userId: null },
        ],
      },
      include: {
        sceneActors: {
          include: {
            scene: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    })

    if (!actor) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Herec nenájdený' } },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: actor })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}

// PATCH - Update actor
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    // Check ownership
    const existingActor = await db.actor.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existingActor) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Herec nenájdený alebo nemáte oprávnenie' } },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validation = updateActorSchema.safeParse(body)

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

    const actor = await db.actor.update({
      where: { id },
      data: validation.data,
    })

    return NextResponse.json({ success: true, data: actor })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}

// DELETE - Delete actor
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Nie ste prihlásený' } },
        { status: 401 }
      )
    }

    // Check ownership
    const existingActor = await db.actor.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!existingActor) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Herec nenájdený alebo nemáte oprávnenie' } },
        { status: 404 }
      )
    }

    await db.actor.delete({ where: { id } })

    return NextResponse.json({ success: true, data: { deleted: true } })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Interná chyba servera' } },
      { status: 500 }
    )
  }
}
