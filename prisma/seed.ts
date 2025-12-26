import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('tester123', 12)

  const user = await prisma.user.upsert({
    where: { email: 'andrej.galad@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'andrej.galad@gmail.com',
      name: 'Andrej Galád',
      password: hashedPassword,
      plan: 'FREE',
      emailVerified: new Date(),
    },
  })

  console.log('Created demo user:', user.email)

  // Create sample actors
  const actor1 = await prisma.actor.upsert({
    where: { id: 'sample-actor-1' },
    update: {},
    create: {
      id: 'sample-actor-1',
      name: 'Ján Novák',
      type: 'MAIN',
      age: 45,
      gender: 'muž',
      description: 'Skúsený detektív s tajomnou minulosťou',
      userId: user.id,
    },
  })

  const actor2 = await prisma.actor.upsert({
    where: { id: 'sample-actor-2' },
    update: {},
    create: {
      id: 'sample-actor-2',
      name: 'Mária Kováčová',
      type: 'MAIN',
      age: 32,
      gender: 'žena',
      description: 'Ambiciózna novinárka hľadajúca pravdu',
      userId: user.id,
    },
  })

  console.log('Created sample actors:', actor1.name, actor2.name)

  // Create sample scene
  const scene = await prisma.scene.upsert({
    where: { id: 'sample-scene-1' },
    update: {},
    create: {
      id: 'sample-scene-1',
      title: 'Stretnutie v kaviarni',
      description: 'Ján a Mária sa stretávajú v malej kaviarni, aby prediskutovali nové stopy v prípade.',
      type: 'DIALOGUE',
      location: 'Stará kaviareň v centre Bratislavy',
      timeOfDay: 'večer',
      mood: 'napätá',
      userId: user.id,
    },
  })

  // Connect actors to scene
  await prisma.sceneActor.upsert({
    where: {
      sceneId_actorId: {
        sceneId: scene.id,
        actorId: actor1.id,
      },
    },
    update: {},
    create: {
      sceneId: scene.id,
      actorId: actor1.id,
    },
  })

  await prisma.sceneActor.upsert({
    where: {
      sceneId_actorId: {
        sceneId: scene.id,
        actorId: actor2.id,
      },
    },
    update: {},
    create: {
      sceneId: scene.id,
      actorId: actor2.id,
    },
  })

  console.log('Created sample scene:', scene.title)

  // Add sample dialogue
  await prisma.dialogueLine.upsert({
    where: { id: 'sample-dialogue-1' },
    update: {},
    create: {
      id: 'sample-dialogue-1',
      sceneId: scene.id,
      actorId: actor1.id,
      text: 'Máš niečo nové?',
      order: 1,
    },
  })

  await prisma.dialogueLine.upsert({
    where: { id: 'sample-dialogue-2' },
    update: {},
    create: {
      id: 'sample-dialogue-2',
      sceneId: scene.id,
      actorId: actor2.id,
      text: 'Našla som dokumenty, ktoré všetko menia.',
      order: 2,
    },
  })

  console.log('Created sample dialogue lines')

  console.log('Seeding completed!')
  console.log('')
  console.log('='.repeat(50))
  console.log('Demo user credentials:')
  console.log('Email: andrej.galad@gmail.com')
  console.log('Password: tester123')
  console.log('='.repeat(50))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
