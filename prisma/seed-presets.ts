/**
 * FilmFlow AI - Preset Seeding Script
 * Seeds demo movie presets into the database
 */

import { PrismaClient, ActorType, SceneType } from '@prisma/client'
import { demoActors } from './presets/actors'
import { demoScenes, genericPresetScenes } from './presets/scenes'
import { storyboardPresets, lightingPresets, cameraPresets } from './presets/storyboards'
import { musicPresets, musicMoods } from './presets/music'
import { cameraMovements } from './presets/camera-movements'
import { demoMovieInfo } from './presets'

const prisma = new PrismaClient()

async function seedPresets() {
  console.log('🎬 Starting FilmFlow AI preset seeding...')
  console.log(`📽️  Demo Movie: "${demoMovieInfo.title}" (${demoMovieInfo.titleEn})`)

  // ==========================================
  // 1. SEED PRESET ACTORS
  // ==========================================
  console.log('\n👥 Seeding actor presets...')

  for (const actor of demoActors) {
    await prisma.actor.upsert({
      where: {
        id: `preset-actor-${actor.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: {
        name: actor.name,
        type: actor.type as ActorType,
        age: actor.age,
        gender: actor.gender,
        description: actor.description,
        backstory: actor.backstory,
        imageUrl: actor.imageUrl,
        voiceId: actor.voiceId,
      },
      create: {
        id: `preset-actor-${actor.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: actor.name,
        type: actor.type as ActorType,
        age: actor.age,
        gender: actor.gender,
        description: actor.description,
        backstory: actor.backstory,
        imageUrl: actor.imageUrl,
        voiceId: actor.voiceId,
      },
    })
    console.log(`  ✓ ${actor.name} (${actor.type})`)
  }

  // ==========================================
  // 2. SEED PRESET SCENES (Demo Movie)
  // ==========================================
  console.log('\n🎭 Seeding demo movie scenes...')

  for (const scene of demoScenes) {
    await prisma.presetScene.upsert({
      where: {
        id: `preset-scene-${scene.order.toString().padStart(2, '0')}-${scene.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`,
      },
      update: {
        title: scene.title,
        titleSk: scene.titleSk,
        description: scene.description,
        descriptionSk: scene.descriptionSk,
        type: scene.type as SceneType,
        location: scene.location,
        mood: scene.mood,
        category: scene.category,
        dialogue: scene.dialogue as any,
        tags: scene.actors,
      },
      create: {
        id: `preset-scene-${scene.order.toString().padStart(2, '0')}-${scene.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`,
        title: scene.title,
        titleSk: scene.titleSk,
        description: scene.description,
        descriptionSk: scene.descriptionSk,
        type: scene.type as SceneType,
        location: scene.location,
        mood: scene.mood,
        category: scene.category,
        dialogue: scene.dialogue as any,
        tags: scene.actors,
      },
    })
    console.log(`  ✓ Scene ${scene.order}: ${scene.titleSk}`)
  }

  // ==========================================
  // 3. SEED GENERIC PRESET SCENES
  // ==========================================
  console.log('\n📝 Seeding generic preset scenes...')

  for (const scene of genericPresetScenes) {
    await prisma.presetScene.upsert({
      where: {
        id: `generic-scene-${scene.title.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: {
        title: scene.title,
        titleSk: scene.titleSk,
        description: scene.description,
        descriptionSk: scene.descriptionSk,
        type: scene.type as SceneType,
        category: scene.category,
        tags: scene.tags,
      },
      create: {
        id: `generic-scene-${scene.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: scene.title,
        titleSk: scene.titleSk,
        description: scene.description,
        descriptionSk: scene.descriptionSk,
        type: scene.type as SceneType,
        category: scene.category,
        tags: scene.tags,
      },
    })
    console.log(`  ✓ ${scene.titleSk}`)
  }

  // ==========================================
  // 4. SEED CAMERA MOVEMENTS
  // ==========================================
  console.log('\n🎥 Seeding camera movements...')

  for (const movement of cameraMovements) {
    await prisma.cameraMovement.upsert({
      where: {
        id: `camera-${movement.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`,
      },
      update: {
        name: movement.name,
        nameSk: movement.nameSk,
        category: movement.category,
        description: movement.description,
        descriptionSk: movement.descriptionSk,
        prompt: movement.prompt,
        dramaticUse: movement.dramaticUse,
        emotionalEffect: movement.emotionalEffect,
      },
      create: {
        id: `camera-${movement.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`,
        name: movement.name,
        nameSk: movement.nameSk,
        category: movement.category,
        description: movement.description,
        descriptionSk: movement.descriptionSk,
        prompt: movement.prompt,
        dramaticUse: movement.dramaticUse,
        emotionalEffect: movement.emotionalEffect,
      },
    })
    console.log(`  ✓ ${movement.nameSk}`)
  }

  // ==========================================
  // SUMMARY
  // ==========================================
  const actorCount = await prisma.actor.count({ where: { type: 'PRESET' } })
  const mainActorCount = await prisma.actor.count({ where: { type: 'MAIN' } })
  const supportingActorCount = await prisma.actor.count({ where: { type: 'SUPPORTING' } })
  const sceneCount = await prisma.presetScene.count()
  const cameraCount = await prisma.cameraMovement.count()

  console.log('\n' + '='.repeat(50))
  console.log('✅ Preset seeding completed!')
  console.log('='.repeat(50))
  console.log(`
📊 Summary:
   • Main actors:       ${mainActorCount}
   • Supporting actors: ${supportingActorCount}
   • Preset actors:     ${actorCount}
   • Demo movie scenes: ${demoScenes.length}
   • Generic scenes:    ${genericPresetScenes.length}
   • Camera movements:  ${cameraCount}
   • Storyboard presets: ${storyboardPresets.length} (in-memory)
   • Music presets:     ${musicPresets.length} (in-memory)

🎬 Demo Movie: "${demoMovieInfo.title}"
   ${demoMovieInfo.synopsis.sk.slice(0, 100)}...
`)
}

seedPresets()
  .catch((e) => {
    console.error('❌ Error seeding presets:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
