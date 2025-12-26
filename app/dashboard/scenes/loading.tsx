import { SceneGridSkeleton } from '@/components/scenes/SceneCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function ScenesLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-56 mt-2" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Scene grid skeleton */}
      <SceneGridSkeleton count={4} />
    </div>
  )
}
