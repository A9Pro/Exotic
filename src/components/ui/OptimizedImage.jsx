// src/components/ui/OptimizedImage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
  priority = false,
  aspectRatio = 'aspect-video',
  skeleton = true,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Optimize Unsplash URLs (add quality and format parameters)
  const optimizeSrc = (url) => {
    if (!url) return fallbackSrc;
    
    // If it's an Unsplash URL, optimize it
    if (url.includes('unsplash.com')) {
      const hasParams = url.includes('?');
      const separator = hasParams ? '&' : '?';
      return `${url}${separator}q=80&fm=webp&auto=format`;
    }
    return url;
  };

  const optimizedSrc = optimizeSrc(src);

  return (
    <div className={`relative ${aspectRatio} overflow-hidden ${className}`}>
      {/* Skeleton Loader */}
      {isLoading && skeleton && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Actual Image */}
      <motion.img
        src={error ? fallbackSrc : optimizedSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
