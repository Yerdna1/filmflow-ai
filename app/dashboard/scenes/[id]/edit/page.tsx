import { redirect, notFound } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import EditSceneForm from './EditSceneForm'

async function getScene(sceneId: string, userId: string) {
  const scene = await db.scene.findUnique({
    where: { id: sceneId },
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

  // Check if user owns this scene
  if (scene?.userId !== userId) {
    return null
  }

  return scene
}

async function getAllActors(userId: string) {
  return db.actor.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  })
}

export default async function EditScenePage({ params }: { params: { id: string } }) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const [scene, allActors] = await Promise.all([
    getScene(params.id, session.user.id),
    getAllActors(session.user.id),
  ])

  if (!scene) {
    notFound()
  }

  return <EditSceneForm scene={scene} allActors={allActors} />
}
