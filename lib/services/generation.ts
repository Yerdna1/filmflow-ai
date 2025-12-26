import { db } from '@/lib/db'
import { checkFreeTierLimit, trackUsage } from './free-tier-tracker'

export type GenerationType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'MUSIC'
export type GenerationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'

interface GenerationResult {
  success: boolean
  generationId?: string
  outputUrl?: string
  error?: string
}

/**
 * Create a new generation job
 */
export async function createGeneration(
  userId: string,
  type: GenerationType,
  model: string,
  prompt: string,
  settings?: Record<string, any>,
  sceneId?: string
): Promise<{ success: boolean; generationId?: string; error?: string }> {
  // Check free tier limits
  const limitCheck = await checkFreeTierLimit(userId, 'higgsfield')

  if (!limitCheck.allowed) {
    return {
      success: false,
      error: `Dosiahli ste denný limit ${limitCheck.limit} generácií. Limit sa obnoví o polnoci.`,
    }
  }

  try {
    const generation = await db.generation.create({
      data: {
        type,
        model,
        prompt,
        settings,
        status: 'PENDING',
        userId,
        sceneId,
      },
    })

    // Track usage
    await trackUsage(userId, 'higgsfield', 1)

    return {
      success: true,
      generationId: generation.id,
    }
  } catch (error) {
    console.error('Failed to create generation:', error)
    return {
      success: false,
      error: 'Nepodarilo sa vytvoriť generáciu',
    }
  }
}

/**
 * Update generation status
 */
export async function updateGenerationStatus(
  generationId: string,
  status: GenerationStatus,
  outputUrl?: string,
  errorMessage?: string
): Promise<void> {
  await db.generation.update({
    where: { id: generationId },
    data: {
      status,
      outputUrl,
      errorMessage,
      completedAt: status === 'COMPLETED' ? new Date() : undefined,
    },
  })
}

/**
 * Get user's generations
 */
export async function getUserGenerations(
  userId: string,
  type?: GenerationType,
  limit: number = 20
) {
  return db.generation.findMany({
    where: {
      userId,
      ...(type && { type }),
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      scene: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })
}

/**
 * Build AI prompt from scene data
 */
export function buildScenePrompt(
  scene: {
    title: string
    description?: string | null
    location?: string | null
    timeOfDay?: string | null
    mood?: string | null
  },
  actors?: {
    name: string
    description?: string | null
    age?: number | null
    gender?: string | null
  }[],
  cameraMovement?: string
): string {
  const parts: string[] = []

  // Scene description
  if (scene.description) {
    parts.push(scene.description)
  }

  // Location and time
  if (scene.location) {
    parts.push(`Location: ${scene.location}`)
  }
  if (scene.timeOfDay) {
    parts.push(`Time: ${scene.timeOfDay}`)
  }

  // Mood
  if (scene.mood) {
    parts.push(`Mood: ${scene.mood}, cinematic, dramatic lighting`)
  }

  // Actors
  if (actors && actors.length > 0) {
    const actorDescriptions = actors.map(actor => {
      const parts = [actor.name]
      if (actor.age) parts.push(`${actor.age} years old`)
      if (actor.gender) parts.push(actor.gender)
      if (actor.description) parts.push(actor.description)
      return parts.join(', ')
    })
    parts.push(`Characters: ${actorDescriptions.join('; ')}`)
  }

  // Camera movement
  if (cameraMovement) {
    parts.push(`Camera: ${cameraMovement}`)
  }

  // Add cinematic quality modifiers
  parts.push('high quality, 4K, cinematic film still, professional lighting, Slovak drama')

  return parts.join('. ')
}

/**
 * Available AI models configuration
 */
export const AI_MODELS = {
  image: [
    {
      id: 'higgsfield/soul',
      name: 'Higgsfield Soul',
      price: '$0.05',
      speed: 'fast' as const,
      quality: 'standard' as const,
      minPlan: 'FREE' as const,
    },
    {
      id: 'bytedance/seedream/v4/text-to-image',
      name: 'Seedream 4.0',
      price: '$0.058',
      speed: 'medium' as const,
      quality: 'high' as const,
      minPlan: 'INDIE' as const,
      recommended: true,
    },
    {
      id: 'flux/kontext',
      name: 'Flux Kontext',
      price: '$0.08',
      speed: 'medium' as const,
      quality: 'high' as const,
      minPlan: 'INDIE' as const,
    },
  ],
  video: [
    {
      id: 'minimax/hailuo-02',
      name: 'MiniMax Hailuo',
      price: '$0.20',
      speed: 'fast' as const,
      quality: 'standard' as const,
      minPlan: 'FREE' as const,
    },
    {
      id: 'kuaishou/kling-2.6',
      name: 'Kling 2.6',
      price: '$0.29',
      speed: 'medium' as const,
      quality: 'high' as const,
      minPlan: 'INDIE' as const,
      recommended: true,
    },
    {
      id: 'higgsfield/dop-i2v',
      name: 'Higgsfield DoP',
      price: '$0.30',
      speed: 'medium' as const,
      quality: 'high' as const,
      minPlan: 'INDIE' as const,
    },
  ],
  audio: [
    {
      id: 'elevenlabs/flash-v2.5',
      name: 'ElevenLabs Flash',
      price: '0.5 cr/char',
      speed: 'fast' as const,
      quality: 'high' as const,
      minPlan: 'FREE' as const,
    },
    {
      id: 'elevenlabs/multilingual-v2',
      name: 'ElevenLabs Multilingual',
      price: '1 cr/char',
      speed: 'medium' as const,
      quality: 'premium' as const,
      minPlan: 'INDIE' as const,
      recommended: true,
    },
  ],
}
