/**
 * User Settings API
 * Manages API keys and model preferences
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

// Available models configuration
export const AVAILABLE_MODELS = {
  image: [
    { id: 'flux-schnell', name: 'Flux Schnell', provider: 'replicate', description: 'Rýchly, kvalitný (Replicate)', speed: 'fast' },
    { id: 'flux-pro', name: 'Flux Pro', provider: 'replicate', description: 'Najvyššia kvalita (Replicate)', speed: 'slow' },
    { id: 'sdxl', name: 'Stable Diffusion XL', provider: 'stability', description: 'Stabilný, flexibilný (Stability AI)', speed: 'medium' },
    { id: 'dall-e-3', name: 'DALL-E 3', provider: 'openai', description: 'OpenAI najnovší model', speed: 'medium' },
    { id: 'midjourney', name: 'Midjourney', provider: 'midjourney', description: 'Umelecký štýl', speed: 'slow' },
  ],
  dialogue: [
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', description: 'Najlepšia kvalita dialógov', speed: 'medium' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', description: 'Rýchly a lacný', speed: 'fast' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic', description: 'Kreatívne písanie', speed: 'medium' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'anthropic', description: 'Rýchly a efektívny', speed: 'fast' },
    { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', provider: 'replicate', description: 'Open source alternatíva', speed: 'medium' },
  ],
  story: [
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', description: 'Komplexné príbehy', speed: 'medium' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'anthropic', description: 'Kreatívne scenáre', speed: 'medium' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic', description: 'Najvyššia kvalita', speed: 'slow' },
  ],
  voice: [
    { id: 'elevenlabs-turbo', name: 'ElevenLabs Turbo', provider: 'elevenlabs', description: 'Rýchly TTS', speed: 'fast' },
    { id: 'elevenlabs-v2', name: 'ElevenLabs V2', provider: 'elevenlabs', description: 'Vysoká kvalita', speed: 'medium' },
    { id: 'openai-tts', name: 'OpenAI TTS', provider: 'openai', description: 'OpenAI hlasy', speed: 'fast' },
  ],
  music: [
    { id: 'suno-v3', name: 'Suno V3', provider: 'suno', description: 'Generovanie hudby', speed: 'medium' },
    { id: 'suno-v4', name: 'Suno V4', provider: 'suno', description: 'Najnovšia verzia', speed: 'medium' },
    { id: 'udio', name: 'Udio', provider: 'udio', description: 'Alternatíva k Suno', speed: 'medium' },
  ],
  video: [
    { id: 'higgsfield', name: 'Higgsfield', provider: 'higgsfield', description: 'Filmové AI video', speed: 'slow' },
    { id: 'runway-gen3', name: 'Runway Gen-3', provider: 'runway', description: 'Profesionálne video', speed: 'slow' },
    { id: 'pika', name: 'Pika Labs', provider: 'pika', description: 'Kreatívne video', speed: 'medium' },
    { id: 'luma', name: 'Luma Dream Machine', provider: 'luma', description: 'Realistické video', speed: 'medium' },
    { id: 'kling', name: 'Kling AI', provider: 'kling', description: 'Čínska alternatíva', speed: 'fast' },
  ],
}

// API key field mapping
const API_KEY_FIELDS = {
  openai: 'openaiApiKey',
  anthropic: 'anthropicApiKey',
  replicate: 'replicateApiKey',
  stability: 'stabilityApiKey',
  elevenlabs: 'elevenLabsApiKey',
  suno: 'sunoApiKey',
  higgsfield: 'higgsfieldApiKey',
  runway: 'runwayApiKey',
  pika: 'pikaApiKey',
  luma: 'lumaApiKey',
  fal: 'falApiKey',
} as const

// GET - Fetch user settings
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let settings = await db.userSettings.findUnique({
      where: { userId: session.user.id },
    })

    // Create default settings if not exist
    if (!settings) {
      settings = await db.userSettings.create({
        data: {
          userId: session.user.id,
        },
      })
    }

    // Mask API keys for security (only show last 4 chars)
    const maskedSettings = {
      ...settings,
      openaiApiKey: maskApiKey(settings.openaiApiKey),
      anthropicApiKey: maskApiKey(settings.anthropicApiKey),
      replicateApiKey: maskApiKey(settings.replicateApiKey),
      stabilityApiKey: maskApiKey(settings.stabilityApiKey),
      elevenLabsApiKey: maskApiKey(settings.elevenLabsApiKey),
      sunoApiKey: maskApiKey(settings.sunoApiKey),
      higgsfieldApiKey: maskApiKey(settings.higgsfieldApiKey),
      runwayApiKey: maskApiKey(settings.runwayApiKey),
      pikaApiKey: maskApiKey(settings.pikaApiKey),
      lumaApiKey: maskApiKey(settings.lumaApiKey),
      falApiKey: maskApiKey(settings.falApiKey),
    }

    return NextResponse.json({
      settings: maskedSettings,
      availableModels: AVAILABLE_MODELS,
      apiKeyFields: API_KEY_FIELDS,
    })
  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT - Update user settings
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      // API Keys (only update if provided and not masked)
      openaiApiKey,
      anthropicApiKey,
      replicateApiKey,
      stabilityApiKey,
      elevenLabsApiKey,
      sunoApiKey,
      higgsfieldApiKey,
      runwayApiKey,
      pikaApiKey,
      lumaApiKey,
      falApiKey,
      // Model preferences
      imageModel,
      dialogueLlmModel,
      storyLlmModel,
      voiceModel,
      musicModel,
      videoModel,
      // Generation preferences
      defaultImageStyle,
      defaultAspectRatio,
      defaultVideoLength,
      preferSlovakOutput,
    } = body

    // Build update data, only including non-masked API keys
    const updateData: Record<string, any> = {}

    // Only update API keys if they're actual new values (not masked)
    if (openaiApiKey && !openaiApiKey.includes('•')) updateData.openaiApiKey = openaiApiKey
    if (anthropicApiKey && !anthropicApiKey.includes('•')) updateData.anthropicApiKey = anthropicApiKey
    if (replicateApiKey && !replicateApiKey.includes('•')) updateData.replicateApiKey = replicateApiKey
    if (stabilityApiKey && !stabilityApiKey.includes('•')) updateData.stabilityApiKey = stabilityApiKey
    if (elevenLabsApiKey && !elevenLabsApiKey.includes('•')) updateData.elevenLabsApiKey = elevenLabsApiKey
    if (sunoApiKey && !sunoApiKey.includes('•')) updateData.sunoApiKey = sunoApiKey
    if (higgsfieldApiKey && !higgsfieldApiKey.includes('•')) updateData.higgsfieldApiKey = higgsfieldApiKey
    if (runwayApiKey && !runwayApiKey.includes('•')) updateData.runwayApiKey = runwayApiKey
    if (pikaApiKey && !pikaApiKey.includes('•')) updateData.pikaApiKey = pikaApiKey
    if (lumaApiKey && !lumaApiKey.includes('•')) updateData.lumaApiKey = lumaApiKey
    if (falApiKey && !falApiKey.includes('•')) updateData.falApiKey = falApiKey

    // Clear API key if explicitly set to empty
    if (openaiApiKey === '') updateData.openaiApiKey = null
    if (anthropicApiKey === '') updateData.anthropicApiKey = null
    if (replicateApiKey === '') updateData.replicateApiKey = null
    if (stabilityApiKey === '') updateData.stabilityApiKey = null
    if (elevenLabsApiKey === '') updateData.elevenLabsApiKey = null
    if (sunoApiKey === '') updateData.sunoApiKey = null
    if (higgsfieldApiKey === '') updateData.higgsfieldApiKey = null
    if (runwayApiKey === '') updateData.runwayApiKey = null
    if (pikaApiKey === '') updateData.pikaApiKey = null
    if (lumaApiKey === '') updateData.lumaApiKey = null
    if (falApiKey === '') updateData.falApiKey = null

    // Model preferences
    if (imageModel) updateData.imageModel = imageModel
    if (dialogueLlmModel) updateData.dialogueLlmModel = dialogueLlmModel
    if (storyLlmModel) updateData.storyLlmModel = storyLlmModel
    if (voiceModel) updateData.voiceModel = voiceModel
    if (musicModel) updateData.musicModel = musicModel
    if (videoModel) updateData.videoModel = videoModel

    // Generation preferences
    if (defaultImageStyle !== undefined) updateData.defaultImageStyle = defaultImageStyle
    if (defaultAspectRatio) updateData.defaultAspectRatio = defaultAspectRatio
    if (defaultVideoLength !== undefined) updateData.defaultVideoLength = defaultVideoLength
    if (preferSlovakOutput !== undefined) updateData.preferSlovakOutput = preferSlovakOutput

    const settings = await db.userSettings.upsert({
      where: { userId: session.user.id },
      update: updateData,
      create: {
        userId: session.user.id,
        ...updateData,
      },
    })

    // Return masked version
    const maskedSettings = {
      ...settings,
      openaiApiKey: maskApiKey(settings.openaiApiKey),
      anthropicApiKey: maskApiKey(settings.anthropicApiKey),
      replicateApiKey: maskApiKey(settings.replicateApiKey),
      stabilityApiKey: maskApiKey(settings.stabilityApiKey),
      elevenLabsApiKey: maskApiKey(settings.elevenLabsApiKey),
      sunoApiKey: maskApiKey(settings.sunoApiKey),
      higgsfieldApiKey: maskApiKey(settings.higgsfieldApiKey),
      runwayApiKey: maskApiKey(settings.runwayApiKey),
      pikaApiKey: maskApiKey(settings.pikaApiKey),
      lumaApiKey: maskApiKey(settings.lumaApiKey),
      falApiKey: maskApiKey(settings.falApiKey),
    }

    return NextResponse.json({
      success: true,
      settings: maskedSettings,
    })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

// DELETE - Clear specific API key
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const keyName = searchParams.get('key')

    if (!keyName || !Object.values(API_KEY_FIELDS).includes(keyName as any)) {
      return NextResponse.json({ error: 'Invalid key name' }, { status: 400 })
    }

    await db.userSettings.update({
      where: { userId: session.user.id },
      data: { [keyName]: null },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings delete error:', error)
    return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 })
  }
}

// Helper to mask API keys
function maskApiKey(key: string | null): string | null {
  if (!key) return null
  if (key.length <= 8) return '•'.repeat(key.length)
  return '•'.repeat(key.length - 4) + key.slice(-4)
}
