import React, { useId } from 'react';

/**
 * Mobile-First Responsive Input Component
 * Features:
 * - Touch-friendly input with 44px minimum height
 * - Responsive font sizing (prevents zoom on mobile)
 * - WCAG AAA compliant labels and errors
 * - Accessible descriptions and error messages
 * - Better visual feedback states
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} type - Input type (text, email, tel, date, etc.)
 * @param {string} description - Helper text below input
 * @param {boolean} required - Mark as required
 * @param {string} ariaLabel - Accessible label if visual label not shown
 */
const Input = ({
  label,
  error,
  type = 'text',
  description,
  required = false,
  ariaLabel,
  className = '',
  disabled = false,
  ...props
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  const ariaDescribedBy = [
    error && errorId,
    description && descriptionId,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm sm:text-base font-medium text-neutral-700 mb-2"
        >
          {label}
          {required && <span className="text-error-500 ml-1" aria-label="required">*</span>}
        </label>
      )}

      <input
        id={id}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        aria-invalid={!!error}
        className={`
          w-full px-4 py-3 sm:px-4 sm:py-3
          bg-white border-2 border-neutral-200
          rounded-lg sm:rounded-xl
          text-base sm:text-base placeholder:text-neutral-400
          transition-all duration-200
          focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200
          disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60
          min-h-[44px] sm:min-h-[48px]
          ${
            error
              ? 'border-error-500 focus:border-error-500 focus:ring-error-200'
              : ''
          }
          ${className}
        `.replace(/\s+/g, ' ')}
        {...props}
      />

      {description && (
        <p id={descriptionId} className="mt-1.5 text-xs sm:text-sm text-neutral-500">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="mt-1.5 text-xs sm:text-sm text-error-500 flex items-start gap-1.5"
          role="alert"
        >
          <svg
            className="w-4 h-4 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default Input;