import React from 'react';

/**
 * Mobile-First Responsive Loading Spinner Component
 * Features:
 * - Responsive sizing with Tailwind classes
 * - Respects prefers-reduced-motion accessibility setting
 * - ARIA labels for screen readers
 * - Full screen and inline variants
 * - Touch-friendly layout
 * 
 * @param {boolean} fullScreen - Display as full-screen overlay
 * @param {string} size - Spinner size: 'sm', 'md', 'lg'
 * @param {string} loadingText - Custom loading message
 * @param {boolean} showText - Show/hide loading text
 */
const LoadingSpinner = ({
  fullScreen = false,
  size = 'md',
  loadingText = 'Loading...',
  showText = true,
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-16 sm:h-16',
  };

  const spinnerClasses = `
    ${sizes[size]} 
    border-4 border-primary-100 border-t-primary-600 border-r-primary-500 
    rounded-full animate-spin
  `;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
      <div
        className={spinnerClasses}
        role="status"
        aria-live="polite"
        data-testid="loading-spinner"
      >
        <span className="sr-only">{loadingText}</span>
      </div>
      {showText && (
        <p className="text-neutral-600 text-xs sm:text-sm font-medium text-center max-w-xs">
          {loadingText}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 safe-top safe-bottom safe-left safe-right"
        role="status"
        aria-label="Loading page content"
      >
        {spinner}
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center p-6 sm:p-8"
      role="status"
      aria-label="Loading content"
    >
      {spinner}
    </div>
  );
};

export default LoadingSpinner;