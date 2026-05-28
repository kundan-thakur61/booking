import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildFAQSchema,
  buildEnhancedOrganizationSchema,
  buildArticleSchema
} from '../utils/advancedSchema';
import { getCanonicalUrl, generateHreflangTags } from '../utils/canonicalHelper';
import { generateSocialMediaMetadata } from '../utils/socialMediaManager';

/**
 * Enhanced SEO Component v2.0
 * Features:
 * - Breadcrumb schema generation
 * - Local business schema for city pages
 * - FAQ schema for featured snippets
 * - Article schema for blog posts
 * - Core Web Vitals optimization signals
 * - Mobile-first design signals
 * - Rich snippet support
 */
const EnhancedSEO = ({
  title,
  description,
  canonical,
  image,
  jsonLd = [],
  meta = [],
  lang = 'en',
  faqSchema = null,
  articleSchema = null,
  breadcrumbSchema = null,
  breadcrumbs = null,
  productSchema = null,
  reviewSchema = null,
  howToSchema = null,
  eventSchema = null,
  entityType = 'website',
  currentPath = null,
  preloadResources = [],
  prefetchResources = [],
  dnsPrefetchDomains = [],
  city = '',
  cityData = null,
  serviceName = '',
  socialMediaData = {},
  articleData = null
}) => {
  const defaultTitle = 'BookEase - Premium Companion Services in India';
  const defaultDescription = 'Find verified, discreet companion services across 500+ Indian cities. Safe bookings, verified profiles, professional service. 2000+ verified escorts.';

  const finalCanonical = canonical || getCanonicalUrl(currentPath || window?.location?.pathname || '/');
  const hreflangTags = generateHreflangTags(currentPath || window?.location?.pathname || '/');

  // Enhanced meta tags for Technical SEO II optimization
  const enhancedMeta = [
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'bingbot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-title', content: 'BookEase' },
    { name: 'theme-color', content: '#dc2626' },
    { name: 'msapplication-TileColor', content: '#dc2626' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5' },
    { name: 'format-detection', content: 'telephone=yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ...(meta || [])
  ];

  // Build comprehensive JSON-LD structure with all schema types
  const buildJsonLdStructure = () => {
    const baseJsonLd = [];

    // Add organization schema (required for all pages)
    baseJsonLd.push(buildEnhancedOrganizationSchema({
      name: 'BookEase',
      url: finalCanonical,
      logo: 'https://www.escortmumbaii.in/logo.png',
      description: defaultDescription
    }));

    // Add breadcrumb schema if provided or if breadcrumbs are available
    if (breadcrumbSchema) {
      baseJsonLd.push(breadcrumbSchema);
    } else if (breadcrumbs && breadcrumbs.length > 0) {
      const schema = buildBreadcrumbSchema(breadcrumbs);
      if (schema) baseJsonLd.push(schema);
    }

    // Add local business schema for city pages
    if (city && cityData) {
      const schema = buildLocalBusinessSchema({
        name: 'BookEase',
        city: city,
        ...cityData
      });
      if (schema) baseJsonLd.push(schema);
    } else if (city) {
      const schema = buildLocalBusinessSchema({
        name: 'BookEase',
        city: city,
        description: `Premium verified companion services in ${city}`
      });
      if (schema) baseJsonLd.push(schema);
    }

    // Add article schema if provided or if articleData is available
    if (articleSchema) {
      baseJsonLd.push(articleSchema);
    } else if (articleData) {
      const schema = buildArticleSchema({
        url: finalCanonical,
        ...articleData
      });
      if (schema) baseJsonLd.push(schema);
    }

    // Add advanced schema types
    if (productSchema) baseJsonLd.push(productSchema);
    if (reviewSchema) baseJsonLd.push(reviewSchema);
    if (howToSchema) baseJsonLd.push(howToSchema);
    if (eventSchema) baseJsonLd.push(eventSchema);

    // Add page-specific schemas
    if (faqSchema) baseJsonLd.push(faqSchema);

    // Add custom JSON-LD
    if (Array.isArray(jsonLd)) {
      baseJsonLd.push(...jsonLd);
    } else if (jsonLd) {
      baseJsonLd.push(jsonLd);
    }

    return baseJsonLd;
  };

  const jsonLdStructure = buildJsonLdStructure();

  // Generate AI-optimized social media metadata
  const socialMediaMetadata = generateSocialMediaMetadata({
    title: title || defaultTitle,
    description: description || defaultDescription,
    canonicalUrl: finalCanonical,
    contentType: entityType,
    imageData: { url: image },
    city,
    serviceName,
    ...socialMediaData
  });

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={finalCanonical} />

      {/* Hreflang tags for international SEO */}
      {hreflangTags.map((tag, index) => (
        <link key={`hreflang-${index}`} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
      ))}

      {/* AI-Enhanced Social Media Tags */}
      {socialMediaMetadata.socialTags.map((tag, index) => {
        if (tag.property) {
          return <meta key={`og-${index}`} property={tag.property} content={tag.content} />;
        } else if (tag.name) {
          return <meta key={`twitter-${index}`} name={tag.name} content={tag.content} />;
        }
        return null;
      })}

      {/* Resource Hints for Core Web Vitals Optimization */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />

      {/* Custom DNS prefetch domains */}
      {dnsPrefetchDomains.map((domain, index) => (
        <link key={`dns-prefetch-${index}`} rel="dns-prefetch" href={domain} />
      ))}

      {/* Critical resource preloading */}
      {preloadResources.map((resource, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
          media={resource.media}
        />
      ))}

      {/* Resource prefetching for smooth navigation */}
      {prefetchResources.map((resource, index) => (
        <link
          key={`prefetch-${index}`}
          rel="prefetch"
          href={resource.href}
          as={resource.as}
          media={resource.media}
        />
      ))}

      {/* Enhanced meta tags */}
      {enhancedMeta.map((m, i) => (
        <meta key={`meta-${i}`} {...m} />
      ))}

      {/* Comprehensive JSON-LD structured data */}
      {jsonLdStructure.map((obj, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj, null, 2) }}
        />
      ))}

      {/* Preload hero image for LCP optimization */}
      {image && (
        <link
          rel="preload"
          as="image"
          href={image}
          type="image/jpeg"
          imagesrcset={image}
        />
      )}
    </Helmet>
  );
};

export default EnhancedSEO;
