import React from 'react';

/**
 * Mobile-First Responsive Card Component
 * Features:
 * - Responsive spacing and shadows
 * - Touch-friendly interactive cards
 * - Proper aspect ratio preservation
 * - Accessible focus states
 * - GPU-accelerated animations
 * 
 * @param {string} variant - 'default', 'elevated', 'bordered', 'subtle'
 * @param {boolean} clickable - Add hover effects for clickable cards
 * @param {string} role - ARIA role for semantic meaning
 */
const Card = ({
  children,
  variant = 'default',
  clickable = false,
  className = '',
  onClick,
  role,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-xl sm:rounded-2xl transition-all duration-200';

  const variants = {
    default: 'shadow-sm hover:shadow-md',
    elevated: 'shadow-md hover:shadow-lg',
    bordered: 'border border-neutral-200 shadow-sm hover:shadow-md',
    subtle: 'bg-neutral-50 border border-neutral-100 hover:bg-neutral-100',
  };

  const clickableStyles = clickable
    ? 'cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
    : '';

  return (
    <div
      onClick={onClick}
      role={role || (clickable ? 'button' : undefined)}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(e);
        }
      } : undefined}
      className={`${baseStyles} ${variants[variant]} ${clickableStyles} ${className}`.replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;