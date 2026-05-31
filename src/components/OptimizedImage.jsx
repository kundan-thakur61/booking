import React, { useState, useRef, useEffect } from 'react';
import { getAspectRatioPadding } from '../utils/coreWebVitals';

/**
 * Optimized Image Component with:
 * - Native lazy loading
 * - WebP support with JPG fallback
 * - Aspect ratio preservation (CLS prevention)
 * - Responsive srcset
 * - Blur-up effect on load
 * - Error handling with fallback
 */
const OptimizedImage = ({
  src,
  alt,
  title,
  width = 400,
  height = 300,
  srcset = null,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  priority = false,
  onLoad = null,
  quality = 'high',
  fetchPriority = 'auto',
  objectFit = 'contain'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Generate WebP version of URL
  const getWebPUrl = (url) => {
    if (!url) return null;
    // For Cloudinary URLs
    if (url.includes('res.cloudinary.com')) {
      return url.replace(/upload\//, 'upload/f_auto,q_auto/');
    }
    // For other URLs, just return as-is (they should serve WebP via Content Negotiation)
    return url;
  };

  // Determine correct loading attribute
  const loadingValue = priority ? 'eager' : 'lazy';
  const webPSrc = getWebPUrl(src);

  // Calculate aspect ratio padding for CLS prevention
  const aspectRatioStyle = getAspectRatioPadding(width, height);

  useEffect(() => {
    // Intersection Observer for lazy loading if native loading not supported
    if (!('loading' in HTMLImageElement.prototype) && imgRef.current && !priority) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.srcset = img.dataset.srcset || '';
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px'
      });

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`bg-neutral-200 flex items-center justify-center ${className}`}
        style={aspectRatioStyle}
      >
        <span className="text-neutral-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-neutral-100 ${isLoaded ? '' : 'animate-pulse'}`}
      style={aspectRatioStyle}
    >
      <picture>
        {/* WebP format for modern browsers */}
        {webPSrc && (
          <source
            srcSet={srcset || webPSrc}
            type="image/webp"
            sizes={sizes}
          />
        )}
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={priority ? src : undefined}
          data-src={priority ? undefined : src}
          data-srcset={priority ? undefined : (srcset || src)}
          alt={alt}
          title={title}
          width={width}
          height={height}
          srcSet={priority ? (srcset || src) : undefined}
          sizes={sizes}
          loading={loadingValue}
          fetchPriority={fetchPriority}
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{ objectFit, objectPosition: 'center', filter: 'blur(8px)' }}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
        />
      </picture>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
      )}
    </div>
  );
};

export default OptimizedImage;
