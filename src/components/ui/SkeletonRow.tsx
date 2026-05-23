'use client';

export default function SkeletonRow() {
  return (
    <div className="px-4 md:px-12 my-6 space-y-2">
      <div className="h-8 bg-gray-700 rounded w-48 animate-pulse" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-40 w-64 bg-gray-700 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
