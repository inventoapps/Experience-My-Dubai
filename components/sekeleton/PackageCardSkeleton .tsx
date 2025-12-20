export const PackageCardSkeleton = () => {
  return (
    <div className="min-w-[320px] max-w-[320px] rounded-3xl overflow-hidden shadow-lg bg-white">
      
      {/* Image skeleton */}
      <div className="relative h-64 w-full bg-gray-200 animate-pulse">
        {/* Duration */}
        <div className="absolute bottom-4 left-4 h-4 w-28 bg-gray-300 rounded" />
        {/* Rating */}
        <div className="absolute bottom-4 right-4 h-4 w-16 bg-gray-300 rounded" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />

        {/* Tag */}
        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />

        {/* Price row */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-24 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* CTA */}
        <div className="flex gap-3 mt-4">
          <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-12 flex-1 bg-gray-300 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};
