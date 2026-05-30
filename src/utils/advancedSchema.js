// Advanced Schema Builders for SEO
// Generates structured data for breadcrumbs, local business, and FAQs

/**
 * Generate Breadcrumb Schema for hierarchical pages
 * Improves SERP CTR by 10-15%
 */
export const buildBreadcrumbSchema = (breadcrumbs = []) => {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  const itemListElement = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': crumb.name,
    'item': crumb.url
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement
  };
};

/**
 * Generate Local Business Schema for city pages
 * Helps with local SEO rankings
 */
export const buildLocalBusinessSchema = (cityData = {}) => {
  const {
    name = 'BookEase',
    city = '',
    state = '',
    country = 'India',
    url = 'https://www.escortmumbaii.in',
    phone = '+91-9324881345',
    description = 'Premium verified companion services',
    services = [],
    hours = null,
    latitude = null,
    longitude = null
  } = cityData;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `${name} - ${city}`,
    'description': `${description} in ${city}, ${state}, ${country}`,
    'url': url,
    'telephone': phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': `${city}`,
      'addressLocality': city,
      'addressRegion': state,
      'postalCode': '',
      'addressCountry': 'IN'
    },
    'image': `${url}/og-image.jpg`,
    'priceRange': '₹₹₹'
  };

  // Add coordinates if available
  if (latitude && longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      'latitude': latitude,
      'longitude': longitude
    };
  }

  // Add business hours if available
  if (hours && Array.isArray(hours)) {
    schema.openingHoursSpecification = hours.map(h => ({
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': h.day,
      'opens': h.opens,
      'closes': h.closes
    }));
  } else {
    // Default: 24/7
    schema.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'opens': '00:00',
      'closes': '23:59'
    };
  }

  // Add services offered
  if (services && services.length > 0) {
    schema.availableService = services.map(service => ({
      '@type': 'Service',
      'name': service.name,
      'description': service.description,
      'areaServed': {
        '@type': 'City',
        'name': city
      }
    }));
  }

  return schema;
};

/**
 * Generate FAQ Schema for featured snippets
 * Can increase CTR by 20-30%
 */
export const buildFAQSchema = (faqs = []) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question || faq.title,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer || faq.content
      }
    }))
  };
};

/**
 * Generate Article/Blog Post Schema
 */
export const buildArticleSchema = (articleData = {}) => {
  const {
    headline = '',
    description = '',
    image = '',
    author = 'BookEase Editorial Team',
    datePublished = new Date().toISOString(),
    dateModified = new Date().toISOString(),
    url = 'https://www.escortmumbaii.in',
    content = '',
    organization = 'BookEase'
  } = articleData;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': headline,
    'description': description,
    'image': image,
    'author': {
      '@type': 'Organization',
      'name': author
    },
    'publisher': {
      '@type': 'Organization',
      'name': organization,
      'logo': {
        '@type': 'ImageObject',
        'url': `${url}/logo.png`
      }
    },
    'datePublished': datePublished,
    'dateModified': dateModified,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'articleBody': content
  };
};

/**
 * Generate Product/Service Schema for escort profiles/services
 */
export const buildServiceSchema = (serviceData = {}) => {
  const {
    name = '',
    description = '',
    image = '',
    price = 0,
    currency = 'INR',
    rating = 4.5,
    reviewCount = 10,
    url = 'https://www.escortmumbaii.in',
    availability = 'InStock'
  } = serviceData;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': name,
    'description': description,
    'image': image,
    'priceSpecification': {
      '@type': 'PriceSpecification',
      'price': price,
      'priceCurrency': currency
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': rating,
      'reviewCount': reviewCount
    },
    'url': url,
    'availability': `https://schema.org/${availability}`
  };
};

/**
 * Generate Review Schema for ratings
 */
export const buildReviewSchema = (reviews = []) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Calculate average rating
  const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    'ratingValue': avgRating,
    'reviewCount': reviews.length,
    'bestRating': 5,
    'worstRating': 1,
    'reviews': reviews.map(review => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.rating
      },
      'reviewBody': review.text,
      'author': {
        '@type': 'Person',
        'name': review.author || 'Anonymous'
      },
      'datePublished': review.date || new Date().toISOString()
    }))
  };
};

/**
 * Generate How-To Schema for instructional content
 */
export const buildHowToSchema = (howToData = {}) => {
  const {
    name = '',
    description = '',
    image = '',
    steps = [],
    estimatedTime = 'PT30M',
    url = 'https://www.escortmumbaii.in'
  } = howToData;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': name,
    'description': description,
    'image': image,
    'estimatedTime': estimatedTime,
    'url': url,
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name || `Step ${index + 1}`,
      'text': step.text,
      'image': step.image || undefined
    }))
  };
};

/**
 * Generate Organization Schema (enhanced)
 */
export const buildEnhancedOrganizationSchema = (orgData = {}) => {
  const {
    name = 'BookEase',
    url = 'https://www.escortmumbaii.in',
    logo = '/logo.png',
    contactPoint = {},
    sameAs = [],
    description = '',
    foundingDate = '2023-01-01',
    areaServed = ['IN']
  } = orgData;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': name,
    'url': url,
    'logo': logo,
    'description': description,
    'foundingDate': foundingDate,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': contactPoint.phone || '+91-9324881345',
      'contactType': contactPoint.type || 'Customer Service',
      'availableLanguage': contactPoint.languages || ['English', 'Hindi']
    },
    'sameAs': sameAs,
    'areaServed': areaServed.map(area => ({
      '@type': 'Country',
      'name': area === 'IN' ? 'India' : area
    }))
  };
};

/**
 * Generate Event Schema (if applicable)
 */
export const buildEventSchema = (eventData = {}) => {
  const {
    name = '',
    description = '',
    url = 'https://www.escortmumbaii.in',
    startDate = new Date().toISOString(),
    endDate = new Date().toISOString(),
    location = {},
    image = '',
    organizer = 'BookEase'
  } = eventData;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': name,
    'description': description,
    'url': url,
    'image': image,
    'startDate': startDate,
    'endDate': endDate,
    'location': {
      '@type': 'Place',
      'name': location.name || '',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': location.address || '',
        'addressLocality': location.city || '',
        'addressRegion': location.state || '',
        'addressCountry': 'IN'
      }
    },
    'organizer': {
      '@type': 'Organization',
      'name': organizer,
      'url': url
    }
  };
};

/**
 * Generate Video Schema
 */
export const buildVideoSchema = (videoData = {}) => {
  const {
    name = '',
    description = '',
    thumbnailUrl = '',
    uploadDate = new Date().toISOString(),
    duration = 'PT5M',
    contentUrl = '',
    embedUrl = ''
  } = videoData;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': name,
    'description': description,
    'thumbnailUrl': thumbnailUrl,
    'uploadDate': uploadDate,
    'duration': duration,
    'contentUrl': contentUrl,
    'embedUrl': embedUrl
  };
};

export default {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildFAQSchema,
  buildArticleSchema,
  buildServiceSchema,
  buildReviewSchema,
  buildHowToSchema,
  buildEnhancedOrganizationSchema,
  buildEventSchema,
  buildVideoSchema
};
