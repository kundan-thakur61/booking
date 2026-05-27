import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

/**
 * Mobile-First Responsive Service Card Component
 * Features:
 * - Responsive image aspect ratio (16:9 mobile, adjustable desktop)
 * - Touch-friendly link targets
 * - Accessible heading hierarchy and descriptions
 * - Responsive spacing and typography
 * - GPU-accelerated transform animations
 * - Proper color contrast (WCAG AAA)
 */
const ServiceCard = ({ service }) => {
  return (
    <article className="block bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md sm:hover:shadow-xl transition-all duration-300 group focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-600">
      <Link
        to={`/service/${service.id}`}
        className="block h-full focus:outline-none"
        aria-label={`View ${service.name} profiles and details`}
      >
        {/* Image Container with aspect ratio preservation */}
        <div className="relative overflow-hidden bg-neutral-100">
          {/* Aspect ratio container (16:9) */}
          <div className="aspect-video" style={{ paddingBottom: 'calc(9 / 16 * 100%)' }}>
            <LazyImage
              src={service.image}
              alt={`${service.name} service preview`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* CTA Badge - Touch-friendly button */}
          <div className="absolute inset-0 flex items-end justify-end p-3 sm:p-4 pointer-events-none">
            <span className="bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-colors duration-200 pointer-events-auto group-hover:scale-105 transition-transform">
              View Profiles
            </span>
          </div>
        </div>

        {/* Content Section with responsive padding */}
        <div className="p-3 sm:p-6">
          {/* Title */}
          <h3 className="text-base sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 group-focus:text-primary-600 transition-colors line-clamp-2">
            {service.name}
          </h3>

          {/* Description - Truncated at 2 lines */}
          <p className="text-neutral-600 text-xs sm:text-sm mb-4 line-clamp-2">
            {service.description}
          </p>

          {/* Footer: Availability and CTA */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-neutral-100 gap-2">
            {/* Availability Info */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 flex-shrink-0">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="truncate">{service.availability}</span>
            </div>

            {/* Action Indicator */}
            <div className="text-primary-600 font-semibold text-xs sm:text-sm flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap">
              View
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ServiceCard;