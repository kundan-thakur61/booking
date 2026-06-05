import React, { useState, useCallback } from 'react';

/**
 * Performance-Optimized Image Component (SEO & Core Web Vitals focused)
 * Features:
 * - Native lazy loading (loading="lazy") - Better for Googlebot than IntersectionObserver
 * - LCP Optimization: fetchpriority="high" for priority images
 * - CLS (Cumulative Layout Shift) prevention via intrinsic aspect ratio container
 * - Responsive image sizing with srcSet
 * - Blur-up / Fade-in placeholder effect
 * - Accessibility: Proper alt text without duplicate sr-only text
 * - Error handling with fallback placeholder
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text (required for accessibility and SEO)
 * @param {number} width - Image width (helps with CLS prevention)
 * @param {number} height - Image height (helps with CLS prevention)
 * @param {string} className - Additional CSS classes
 * @param {string} placeholder - Fallback placeholder image
 * @param {string} loading - 'lazy' or 'eager' (native loading attribute)
 * @param {string} sizes - Responsive sizes hint
 * @param {boolean} priority - Load immediately if true (LCP images)
 */
const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = '/placeholder-image.jpg',
  loading = 'lazy',
  decoding = 'async',
  sizes = '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  objectFit = 'contain',
  objectPosition = 'center',
  srcSet,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle image successful load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  // Handle image load error
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Calculate aspect ratio for CLS prevention
  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 ${className}`}
      style={aspectRatio ? { paddingBottom: `${aspectRatio}%` } : undefined}
    >
      {/* Placeholder/Loading State - Blur/Pulse effect */}
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Error State */}
      {hasError && (
        <div
          className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs sm:text-sm"
          role="img"
          aria-label={`Failed to load: ${alt}`}
        >
          <div className="text-center">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual Image - Native Lazy Loading */}
      {src && (
<img
  src={hasError ? placeholder : src}
  srcSet={hasError ? undefined : srcSet}
  alt={alt}
  loading={priority ? 'eager' : loading}
  decoding={decoding}
  fetchpriority={priority ? 'high' : 'auto'}
  sizes={sizes}
  width={width}
  height={height}
  className={`${
    aspectRatio ? 'absolute inset-0 w-full h-full' : 'w-full h-auto'
  } transition-opacity duration-300 ${
    isLoading ? 'opacity-0' : 'opacity-100'
  } ${hasError ? 'grayscale' : ''}`}
  style={{
    objectFit,
    objectPosition,
  }}
  onLoad={handleLoad}
  onError={handleError}
  {...props}
/>
      )}
    </div>
  );
};

export default LazyImage;
