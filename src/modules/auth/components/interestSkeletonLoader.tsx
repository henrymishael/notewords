// Skeleton component for individual interest button
const InterestSkeleton = () => (
  <div className="relative p-4 rounded-lg border-2 border-gray-200 bg-white animate-pulse">
    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
  </div>
);

// Main skeleton loader component
export const InterestsSkeletonLoader = ({ count = 9 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 w-full">
      {Array.from({ length: count }, (_, index) => (
        <InterestSkeleton key={index} />
      ))}
    </div>
  );
};
