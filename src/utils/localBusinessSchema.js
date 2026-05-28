// Local Business Schema Generator for City Pages
// Optimized for local SEO and Google My Business integration

export const CITY_COORDINATES = {
  mumbai: { lat: 19.0760, lng: 72.8777, state: "Maharashtra" },
  delhi: { lat: 28.7041, lng: 77.1025, state: "Delhi" },
  bangalore: { lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  pune: { lat: 18.5204, lng: 73.8567, state: "Maharashtra" },
  hyderabad: { lat: 17.3850, lng: 78.4867, state: "Telangana" },
  chennai: { lat: 13.0827, lng: 80.2707, state: "Tamil Nadu" },
  kolkata: { lat: 22.5726, lng: 88.3639, state: "West Bengal" },
  ahmedabad: { lat: 23.0225, lng: 72.5714, state: "Gujarat" },
  jaipur: { lat: 26.9124, lng: 75.7873, state: "Rajasthan" },
  goa: { lat: 15.2993, lng: 74.1240, state: "Goa" }
};

export const generateLocalBusinessSchema = ({
  city,
  profileCount = "500+",
  areas = [],
  phone = "+91-7633807420",
  rating = 4.8,
  reviewCount = 1500
}) => {
  const cityData = CITY_COORDINATES[city.toLowerCase()];
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.escortmumbaii.in/${city.toLowerCase()}#localbusiness`,
    "name": `BookEase ${cityName} - Verified Escort Services`,
    "description": `Premium verified escort and companion services in ${cityName} with ${profileCount} profiles across ${areas.slice(0, 3).join(', ')}`,
    "url": `https://www.escortmumbaii.in/${city.toLowerCase()}`,
    "telephone": phone,
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressRegion": cityData?.state || cityName,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cityData?.lat.toString() || "0",
      "longitude": cityData?.lng.toString() || "0"
    },
    "areaServed": [
      { "@type": "City", "name": cityName },
      ...areas.map(area => ({ "@type": "AdministrativeArea", "name": area }))
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": phone,
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "IN"
    }
  };
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

export const generateCityFAQSchema = (city, faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
