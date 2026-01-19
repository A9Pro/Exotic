// src/components/ui/Skeleton.jsx
import { motion } from 'framer-motion';

export function Skeleton({ className = '', variant = 'default' }) {
  const variants = {
    default: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded',
  };

  return (
    <div className={`bg-gray-200 dark:bg-gray-800 animate-pulse ${variants[variant]} ${className}`}>
      <div className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent h-full w-full" 
           style={{ animation: 'shimmer 2s infinite' }} />
    </div>
  );
}

// Menu Card Skeleton
export function MenuCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
      <Skeleton className="w-full h-40 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
      <Skeleton className="h-4 w-full mb-1" variant="text" />
      <Skeleton className="h-4 w-5/6 mb-4" variant="text" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-24" variant="text" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
    </div>
  );
}

// Featured Dish Skeleton
export function FeaturedDishSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl" />
        <div className="flex-1">
          <Skeleton className="h-5 w-3/4 mb-2" variant="text" />
          <Skeleton className="h-4 w-full mb-1" variant="text" />
          <Skeleton className="h-4 w-5/6 mb-3" variant="text" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" variant="text" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Order History Skeleton
export function OrderHistorySkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-5 w-32" variant="text" />
        <Skeleton className="h-6 w-24" variant="text" />
      </div>
      <Skeleton className="h-4 w-48 mb-2" variant="text" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" variant="text" />
        <Skeleton className="h-4 w-3/4" variant="text" />
      </div>
    </div>
  );
}

// Profile Stats Skeleton
export function ProfileStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <Skeleton className="h-8 w-16 mb-2" variant="text" />
          <Skeleton className="h-4 w-24" variant="text" />
        </div>
      ))}
    </div>
  );
}

