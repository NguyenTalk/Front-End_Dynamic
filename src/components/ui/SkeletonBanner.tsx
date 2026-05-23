'use client';

export default function SkeletonBanner() {
  return (
    <div className="relative w-full h-[85vh] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black to-transparent" />
      <div className="absolute bottom-28 left-4 md:left-12 z-10 space-y-4">
        <div className="h-10 bg-gray-600 rounded w-32 animate-pulse" />
        <div className="h-16 bg-gray-600 rounded w-96 animate-pulse" />
        <div className="flex gap-3">
          <div className="h-10 bg-gray-600 rounded w-24 animate-pulse" />
          <div className="h-10 bg-gray-600 rounded w-32 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
