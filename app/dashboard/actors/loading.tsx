import { ActorGridSkeleton } from '@/components/actors/ActorCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function ActorsLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-28" />
      </div>

      {/* Actor grid skeleton */}
      <ActorGridSkeleton count={6} />
    </div>
  )
}
