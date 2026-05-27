import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import LazyImage from '../components/LazyImage';
import { services } from '../data/services';

const phone = "07633807420";
const lastUpdated = "January 18, 2026";

const CompanionEscortServices = () => {
  // Filter companion-related services
  const companionServices = services.filter(service =>
    service.title?.toLowerCase().includes('companion') ||
    service.title?.toLowerCase().includes('girlfriend') ||
    service.name?.toLowerCase().includes('companion') ||
    service.description?.toLowerCase().includes('companion')
  );

  const companionTypes = [
    { 
      name: "Social Companion", 
      slug: "social-companion", 
      description: "Perfect companion for events, dinners, parties, and social gatherings with sophisticated conversation skills.",
      priceRange: "₹6,000 - ₹12,000",
      duration: "2-4 hours",
      icon: "🎭"
    },
    { 
      name: "Travel Companion", 
      slug: "travel-companion", 
      description: "Accompany you on business trips, vacations, or weekend getaways with travel expertise.",
      priceRange: "₹15,000 - ₹30,000",
      duration: "Per day",
      icon: "✈️"
    },
    { 
      name: "Girlfriend Experience (GFE)", 
      slug: "girlfriend-experience", 
      description: "Intimate companionship that feels like a genuine romantic relationship with emotional connection.",
      priceRange: "₹20,000 - ₹40,000",
      duration: "4-8 hours",
      icon: "💕"
    },
    { 
      name: "Business Companion", 
      slug: "business-companion", 
      description: "Professional, polished companion for corporate events, meetings, and business dinners.",
      priceRange: "₹8,000 - ₹15,000",
      duration: "2-4 hours",
      icon: "💼"
    },
    { 
      name: "Weekend Companion", 
      slug: "weekend-companion", 
      description: "Extended companionship for full weekends and short romantic getaways.",
      priceRange: "₹35,000 - ₹60,000",
      duration: "Full weekend",
      icon: "🌴"
    },
    { 
      name: "Luxury VIP Companion", 
      slug: "luxury-companion", 
      description: "Ultra-premium companionship with exclusive access, VIP treatment, and elite experience.",
      priceRange: "₹50,000+",
      duration: "Custom",
      icon: "👑"
    },
  ];

  // Pricing table data for featured snippet optimization
  const pricingData = [
    { type: "Social Companion", duration: "2-3 hours", priceRange: "₹6,000 - ₹12,000", bestFor: "Events, dinners" },
    { type: "Travel Companion", duration: "Per day", priceRange: "₹15,000 - ₹30,000", bestFor: "Trips, vacations" },
    { type: "Girlfriend Experience", duration: "4-8 hours", priceRange: "₹20,000 - ₹40,000", bestFor: "Intimate dates" },
    { type: "Business Companion", duration: "2-4 hours", priceRange: "₹8,000 - ₹15,000", bestFor: "Corporate events" },
    { type: "Weekend Companion", duration: "2 days", priceRange: "₹35,000 - ₹60,000", bestFor: "Extended stays" },
    { type: "Luxury VIP", duration: "Custom", priceRange: "₹50,000+", bestFor: "Elite experience" },
  ];

  // Cities for internal linking
  const majorCities = [
    { name: "Mumbai", slug: "mumbai", companions: "150+" },
    { name: "Delhi", slug: "delhi", companions: "120+" },
    { name: "Bangalore", slug: "bangalore", companions: "100+" },
    { name: "Pune", slug: "pune", companions: "60+" },
    { name: "Hyderabad", slug: "hyderabad", companions: "55+" },
    { name: "Chennai", slug: "chennai", companions: "50+" },
    { name: "Kolkata", slug: "kolkata", companions: "45+" },
    { name: "Ahmedabad", slug: "ahmedabad", companions: "40+" },
    { name: "Jaipur", slug: "jaipur", companions: "35+" },
    { name: "Goa", slug: "goa", companions: "30+" },
  ];

  // Enhanced Companion pillar page schema for SGE/AEO
  const companionPillarSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Companion Services 2026 — Complete Guide to Professional Companionship in India",
    "description": "Comprehensive guide to companion services in India. Find verified social companions, travel companions, and GFE services across major cities. Pricing, booking, safety tips included.",
    "author": {
      "@type": "Organization",
      "name": "BookEase Editorial Team",
      "url": "https://www.escortmumbaii.in/about",
      "description": "India's leading companion services platform since 2020"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BookEase",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.escortmumbaii.in/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": "2026-01-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.escortmumbaii.in/companion-escort-services"
    },
    "articleSection": "Companion Services Guide",
    "wordCount": 2800,
    "about": [
      { "@type": "Thing", "name": "Companion Services" },
      { "@type": "Thing", "name": "Social Companionship" },
      { "@type": "Thing", "name": "Travel Companion" },
      { "@type": "Thing", "name": "Girlfriend Experience" }
    ],
    "keywords": "companion services, companion services india, social companion, travel companion, girlfriend experience, professional companionship, verified companions"
  };

  // Service schema for rich results
  const companionServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Companion Services India",
    "description": "Professional companion services including social companions, travel companions, and girlfriend experience (GFE) across major Indian cities.",
    "provider": {
      "@type": "Organization",
      "name": "BookEase",
      "url": "https://www.escortmumbaii.in"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Companion Service Types",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Companion",
            "description": "Professional companion for events and social gatherings"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Travel Companion",
            "description": "Companion for business trips and vacations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Girlfriend Experience",
            "description": "Intimate romantic companionship experience"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2547",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Enhanced FAQ schema with more questions for featured snippets
  const companionFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are companion services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companion services provide professional companionship for social events, travel, business meetings, and intimate experiences. Unlike traditional dating, companion services offer verified, discreet professionals who excel at creating meaningful connections. Services range from dinner dates to travel companionship, with rates starting from ₹6,000 in India."
        }
      },
      {
        "@type": "Question",
        "name": "What types of companion services are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Six main types of companion services are available: 1) Social Companion for events and dinners (₹6,000-12,000), 2) Travel Companion for trips and vacations (₹15,000-30,000/day), 3) Girlfriend Experience (GFE) for intimate relationships (₹20,000-40,000), 4) Business Companion for corporate events (₹8,000-15,000), 5) Weekend Companion for extended dates (₹35,000-60,000), and 6) Luxury VIP Companion for elite experiences (₹50,000+)."
        }
      },
      {
        "@type": "Question",
        "name": "How much do companion services cost in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companion service rates in India vary by type: Social companions start from ₹6,000-12,000 for 2-3 hours. Travel companions range from ₹15,000-30,000 per day. Girlfriend Experience (GFE) costs ₹20,000-40,000 for 4-8 hours. Weekend companions charge ₹35,000-60,000 for full weekends. Luxury VIP companions command ₹50,000+ for exclusive experiences."
        }
      },
      {
        "@type": "Question",
        "name": "Are companion services safe and legal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reputable companion platforms like BookEase ensure safety through ID verification, background checks, secure booking, and privacy protection. All companions are verified adults (18+). Always use verified platforms, meet in safe public locations initially, communicate expectations clearly, and trust your instincts."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book companion services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Booking companion services involves 5 simple steps: 1) Browse verified companion profiles on BookEase, 2) Select based on preferences, reviews, and availability, 3) Contact via phone (+91-7633807420) or WhatsApp, 4) Discuss requirements and confirm timing, 5) Complete the booking. Our 24/7 support ensures smooth bookings."
        }
      },
      {
        "@type": "Question",
        "name": "What is Girlfriend Experience (GFE)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Girlfriend Experience (GFE) is a premium companion service that simulates a genuine romantic relationship. It includes emotional connection, affection, meaningful conversation, and intimate companionship that feels authentic rather than transactional. GFE companions provide the warmth and attention of a real girlfriend."
        }
      },
      {
        "@type": "Question",
        "name": "What should I expect from a companion service experience?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expect intelligent conversation, genuine connection, and enjoyable shared experiences. Professional companions are cultured, well-educated individuals who excel at creating memorable moments. Whether it's a sophisticated dinner date, travel adventure, or intimate evening, you'll experience authentic companionship with complete discretion and professionalism."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose the right companion for my needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To choose the right companion: 1) Define your occasion (social event, travel, intimate date), 2) Browse verified profiles with photos and reviews, 3) Check interests and specialties, 4) Read client testimonials, 5) Contact companions directly to discuss requirements, 6) Ask for personalized recommendations from our support team."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between companion services and dating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companion services differ from traditional dating in key ways: 1) Professional, verified individuals, 2) Clear expectations and pricing, 3) No relationship obligations, 4) Guaranteed availability for your schedule, 5) Discretion and privacy assured, 6) Multiple companion options, 7) Quality companionship on demand without dating complexities."
        }
      },
      {
        "@type": "Question",
        "name": "Which cities have companion services in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companion services are available in major Indian cities: Mumbai (150+ companions), Delhi NCR (120+), Bangalore (100+), Pune (60+), Hyderabad (55+), Chennai (50+), Kolkata (45+), Ahmedabad (40+), Jaipur (35+), and Goa (30+). All companions are verified and available 24/7 through BookEase platform."
        }
      }
    ]
  };

  // HowTo Schema for Booking Steps - Optimized for How-To Featured Snippets
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Book Companion Services in India",
    "description": "Step-by-step guide to booking professional companion services through BookEase platform.",
    "image": "https://www.escortmumbaii.in/companion-booking-guide.jpg",
    "totalTime": "PT10M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "6000"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Browse Verified Profiles",
        "text": "Visit BookEase and explore 300+ verified companion profiles with photos, reviews, and service details.",
        "url": "https://www.escortmumbaii.in/companion-escort-services#browse"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Select Your Companion",
        "text": "Choose a companion based on your preferences, occasion type, and availability. Check reviews and specialties.",
        "url": "https://www.escortmumbaii.in/companion-escort-services#select"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Contact via Phone or WhatsApp",
        "text": "Call +91-7633807420 or WhatsApp to discuss your requirements and confirm companion availability.",
        "url": "https://www.escortmumbaii.in/companion-escort-services#contact"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Confirm Booking Details",
        "text": "Finalize timing, location, duration, and any special requests. Receive booking confirmation.",
        "url": "https://www.escortmumbaii.in/companion-escort-services#confirm"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Meet Your Companion",
        "text": "Meet your verified companion at the agreed location and enjoy your premium companionship experience.",
        "url": "https://www.escortmumbaii.in/companion-escort-services#enjoy"
      }
    ]
  };

  // LocalBusiness Schema for Local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BookEase Companion Services",
    "description": "India's leading companion services platform offering verified social companions, travel companions, and girlfriend experience services across 10+ major cities.",
    "url": "https://www.escortmumbaii.in",
    "telephone": "+91-7633807420",
    "email": "support@escortmumbaii.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0760",
      "longitude": "72.8777"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "₹₹₹",
    "image": "https://www.escortmumbaii.in/logo.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2547",
      "bestRating": "5"
    },
    "areaServed": [
      { "@type": "City", "name": "Mumbai" },
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Bangalore" },
      { "@type": "City", "name": "Pune" },
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "City", "name": "Chennai" },
      { "@type": "City", "name": "Kolkata" },
      { "@type": "City", "name": "Goa" }
    ]
  };

  // VideoObject Schema for Video Content
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "How to Book Companion Services in India - Complete Guide",
    "description": "Watch this video guide to learn how to safely book verified companion services through BookEase platform.",
    "thumbnailUrl": "https://www.escortmumbaii.in/companion-video-thumbnail.jpg",
    "uploadDate": "2026-01-18",
    "duration": "PT3M45S",
    "contentUrl": "https://www.youtube.com/watch?v=companion-booking-guide",
    "embedUrl": "https://www.youtube.com/embed/companion-booking-guide"
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.escortmumbaii.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.escortmumbaii.in/verified-escort-services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Companion Services",
        "item": "https://www.escortmumbaii.in/companion-escort-services"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Companion Services 2026 — Premium Professional Companionship India | BookEase"
        description="✓ Companion Services India ✓ 300+ verified companions ✓ Social, travel, GFE services ✓ 24/7 booking ✓ Safe & discreet. Book your perfect companion. Rates from ₹6,000."
        canonical="https://www.escortmumbaii.in/companion-escort-services"
        image="https://www.escortmumbaii.in/companion-services-guide.jpg"
        entityType="article"
        lang="en-IN"
        jsonLd={[companionPillarSchema, companionServiceSchema, howToSchema, localBusinessSchema, videoSchema]}
        faqSchema={companionFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'companion services, companion services india, social companion, travel companion, girlfriend experience, professional companionship, verified companions, companion booking' },
          { name: 'author', content: 'BookEase Editorial Team' },
          { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
          { property: 'article:modified_time', content: '2026-01-18' },
          { property: 'article:section', content: 'Companion Services' }
        ]}
      />

      <Header showBack title="Companion Services" />

      {/* Hero Section - Optimized for Primary Keyword */}
      <section className="bg-gradient-to-br from-pink-600 via-pink-700 to-purple-800 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm mb-4 opacity-90" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="hover:underline" itemProp="item"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <span className="mx-2">›</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/verified-escort-services" className="hover:underline" itemProp="item"><span itemProp="name">Services</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <span className="mx-2">›</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="font-medium">Companion Services</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* H1 with Primary Keyword - Critical for SEO */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Companion Services 2026 — Premium Professional Companionship in India
          </h1>

          {/* Featured Snippet Optimized Definition Paragraph - First 100 words contain keyword */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-4xl">
            <p className="text-lg md:text-xl leading-relaxed">
              <strong>Companion services</strong> provide professional companionship for social events, travel, business meetings, 
              and intimate experiences across India. Unlike traditional dating, <strong>companion services</strong> offer 
              verified, discreet professionals who excel at creating meaningful connections. Whether you need a 
              <strong> social companion</strong> for a dinner event, a <strong>travel companion</strong> for your vacation, 
              or a <strong>girlfriend experience (GFE)</strong> for intimate moments — BookEase connects you with 
              300+ verified companions available 24/7 in Mumbai, Delhi, Bangalore, and 10+ major cities. 
              Rates start from <strong>₹6,000</strong>.
            </p>
          </div>

          {/* Trust Signals - Social Proof */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">300+</div>
              <div className="text-sm opacity-90">Verified Companions</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm opacity-90">Major Cities</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-sm opacity-90">Client Rating</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Availability</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:+91${phone}`}
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now: Book Companion
            </a>
            <a
              href={`https://wa.me/91${phone}?text=Hi,%20I'm%20interested%20in%20companion%20services`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Booking
            </a>
          </div>

          {/* Last Updated - EEAT Signal */}
          <div className="mt-6 text-sm opacity-75">
            <span>📅 Last Updated: {lastUpdated}</span> • <span>✓ Verified Information</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Quick Answer Box - Optimized for Featured Snippet / AEO */}
        <section className="mb-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border-l-4 border-pink-500">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">What Are Companion Services? — Quick Answer</h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                <strong>Companion services</strong> are professional companionship offerings where verified individuals provide 
                social, travel, or intimate companionship for a fee. Services include <strong>social companions</strong> for 
                events (₹6,000+), <strong>travel companions</strong> for trips (₹15,000+/day), and <strong>girlfriend experience (GFE)</strong> 
                for romantic dates (₹20,000+). Unlike dating, companion services guarantee availability, discretion, and 
                professional conduct with verified individuals.
              </p>
            </div>
          </div>
        </section>

        {/* Hinglish Content Section - For Indian Audience SEO */}
        <section className="mb-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border-l-4 border-orange-500">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🇮🇳</div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">Companion Services Kya Hai? (हिंदी में समझें)</h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                <strong>Companion services</strong> yaani साथी सेवाएं — yeh professional companionship hai jahan verified 
                individuals aapko social events, travel, business meetings, aur intimate experiences ke liye company provide 
                karte hain. Yeh dating se bilkul alag hai kyunki yahan <strong>guaranteed availability</strong>, 
                <strong> complete privacy</strong>, aur <strong>professional conduct</strong> milti hai.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/70 rounded-lg p-4">
                  <h3 className="font-bold text-neutral-900 mb-2">🎭 Social Companion (सोशल साथी)</h3>
                  <p className="text-sm text-neutral-600">Events, dinners, parties ke liye sophisticated companion. Rate: ₹6,000 se shuru</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <h3 className="font-bold text-neutral-900 mb-2">✈️ Travel Companion (ट्रैवल साथी)</h3>
                  <p className="text-sm text-neutral-600">Business trips aur vacations ke liye perfect travel partner. Rate: ₹15,000/day</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <h3 className="font-bold text-neutral-900 mb-2">💕 Girlfriend Experience (गर्लफ्रेंड एक्सपीरियंस)</h3>
                  <p className="text-sm text-neutral-600">Romantic relationship jaisi feeling ke saath intimate companionship. Rate: ₹20,000+</p>
                </div>
                <div className="bg-white/70 rounded-lg p-4">
                  <h3 className="font-bold text-neutral-900 mb-2">💼 Business Companion (बिज़नेस साथी)</h3>
                  <p className="text-sm text-neutral-600">Corporate events aur professional dinners ke liye polished companion. Rate: ₹8,000+</p>
                </div>
              </div>
              <p className="text-sm text-neutral-500 mt-4 italic">
                📞 Hindi mein booking ke liye call karein: +91-7633807420
              </p>
            </div>
          </div>
        </section>

        {/* Video Content Section - For Engagement & SGE */}
        <section className="mb-12 bg-neutral-900 rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-3">📹 Watch: How to Book Companion Services</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Learn the complete booking process in under 4 minutes. Safe, secure, and simple.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Video Placeholder - Replace with actual video embed */}
            <div className="aspect-video bg-neutral-800 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 to-purple-600/30"></div>
              <LazyImage 
                src="/companion-video-thumbnail.jpg" 
                alt="How to book companion services video guide - BookEase India"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-2xl">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-lg font-semibold">Click to Play Video Guide</p>
                <p className="text-sm text-neutral-400">Duration: 3:45 mins</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-neutral-400 text-sm">
              Video covers: Profile browsing → Selection tips → Booking process → Safety guidelines
            </p>
          </div>
        </section>

        {/* Client Testimonials - User Generated Content for EEAT */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">⭐ What Our Clients Say</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Real reviews from verified clients who have experienced BookEase companion services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-neutral-50 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-6 text-6xl text-pink-200">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">
                  "Excellent service! The companion was sophisticated, intelligent, and made my corporate event so much better. 
                  Highly professional and discreet. Will definitely book again."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">R</div>
                  <div>
                    <div className="font-semibold text-neutral-900">Rajesh K.</div>
                    <div className="text-sm text-neutral-500">Mumbai • Business Companion</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-neutral-50 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-6 text-6xl text-pink-200">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">
                  "Travel companion service exceeded expectations. My Goa trip became memorable with great company. 
                  Very knowledgeable about local places and fantastic conversation. 10/10!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">A</div>
                  <div>
                    <div className="font-semibold text-neutral-900">Amit S.</div>
                    <div className="text-sm text-neutral-500">Delhi • Travel Companion</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-neutral-50 rounded-xl p-6 relative">
              <div className="absolute -top-3 left-6 text-6xl text-pink-200">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400' : 'text-neutral-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">
                  "GFE service was exactly what I needed. Genuine connection, great listener, and felt like spending time 
                  with someone who truly cared. Booking process was smooth via WhatsApp."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">V</div>
                  <div>
                    <div className="font-semibold text-neutral-900">Vikram M.</div>
                    <div className="text-sm text-neutral-500">Bangalore • Girlfriend Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Stats */}
          <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-600">4.8/5</div>
                <div className="text-sm text-neutral-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">2,547</div>
                <div className="text-sm text-neutral-600">Verified Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">95%</div>
                <div className="text-sm text-neutral-600">Would Recommend</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">97%</div>
                <div className="text-sm text-neutral-600">Repeat Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* EEAT Trust Signals Section */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Choose BookEase Companion Services?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Since 2020, BookEase has connected over 15,000 clients with perfect companions. Our commitment to 
              verification, safety, and genuine connections makes us India's most trusted companion services platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-neutral-50 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">100% Verified Companions</h3>
              <p className="text-sm text-neutral-600">Every companion undergoes ID verification, background check, and photo verification</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-neutral-50 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Complete Privacy</h3>
              <p className="text-sm text-neutral-600">Encrypted communications, discreet billing, and zero data sharing guarantee</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-neutral-50 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-neutral-600">Round-the-clock customer support via phone and WhatsApp for seamless booking</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-neutral-50 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">4.8★ Client Rating</h3>
              <p className="text-sm text-neutral-600">Based on 2,500+ verified client reviews with 95% satisfaction rate</p>
            </div>
          </div>
        </section>

        {/* Types of Companion Services - H2 Section for Featured Snippet */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3 text-center">
            Types of Companion Services Available in India
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-8 max-w-3xl mx-auto">
            Choose from 6 types of professional companion services based on your occasion and preferences. 
            All companions are verified, professional, and committed to creating memorable experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companionTypes.map((type) => (
              <div 
                key={type.slug} 
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all border border-neutral-100 group"
              >
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {type.name}
                </h3>
                <p className="text-neutral-600 mb-4 text-sm leading-relaxed">{type.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                  <div>
                    <div className="text-pink-600 font-bold">{type.priceRange}</div>
                    <div className="text-xs text-neutral-500">{type.duration}</div>
                  </div>
                  <a 
                    href={`tel:+91${phone}`}
                    className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 hover:text-white transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Companion Services Pricing Table - Optimized for Table Snippet */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3 text-center">
            Companion Services Pricing Guide 2026 — India Rates
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-8 max-w-3xl mx-auto">
            Transparent pricing for all companion service types. Rates may vary based on companion experience, 
            location, and specific requirements. Contact us for exact quotes.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse" role="table" aria-label="Companion Services Pricing">
              <thead>
                <tr className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                  <th className="p-4 text-left font-bold rounded-tl-lg">Service Type</th>
                  <th className="p-4 text-left font-bold">Duration</th>
                  <th className="p-4 text-left font-bold">Price Range (₹)</th>
                  <th className="p-4 text-left font-bold rounded-tr-lg">Best For</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, index) => (
                  <tr 
                    key={row.type} 
                    className={`${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'} hover:bg-pink-50 transition-colors`}
                  >
                    <td className="p-4 font-medium text-neutral-900">{row.type}</td>
                    <td className="p-4 text-neutral-600">{row.duration}</td>
                    <td className="p-4 font-bold text-pink-600">{row.priceRange}</td>
                    <td className="p-4 text-neutral-600">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500 mb-4">
              * Prices are indicative. Final rates depend on companion preferences and booking duration. 
              Contact for personalized quotes.
            </p>
            <a 
              href={`tel:+91${phone}`}
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Get Exact Quote
            </a>
          </div>
        </section>

        {/* How to Book - Step by Step for How-To Snippet */}
        <section className="mb-12 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-3 text-center">
            How to Book Companion Services — 5 Simple Steps
          </h2>
          <p className="text-lg text-neutral-300 text-center mb-8 max-w-3xl mx-auto">
            Booking professional companion services with BookEase is quick, secure, and completely discreet. 
            Follow these steps for a seamless experience.
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Browse Profiles", desc: "Explore 300+ verified companion profiles with photos, reviews, and details" },
              { step: 2, title: "Select Companion", desc: "Choose based on your preferences, occasion, and availability" },
              { step: 3, title: "Contact Us", desc: "Call +91-7633807420 or WhatsApp to discuss requirements" },
              { step: 4, title: "Confirm Details", desc: "Finalize timing, location, duration, and any special requests" },
              { step: 5, title: "Enjoy Experience", desc: "Meet your verified companion and enjoy memorable moments" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a 
              href={`https://wa.me/91${phone}?text=Hi,%20I%20want%20to%20book%20companion%20services`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start Booking via WhatsApp
            </a>
          </div>
        </section>

        {/* Comprehensive Long-Form Content - EEAT Optimized */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            The Complete Guide to Companion Services in India (2026)
          </h2>

          {/* Understanding Companion Services */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              Understanding Professional Companion Services
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              <strong>Companion services</strong> have evolved significantly in India over the past decade. Today, professional 
              companionship represents a sophisticated industry where verified individuals provide meaningful connections for 
              various occasions. Whether you're attending a high-profile business event alone, planning a vacation without a 
              travel partner, or simply seeking quality companionship for an evening, <strong>professional companion services</strong> 
              offer a legitimate, safe, and enjoyable solution.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Unlike casual dating apps or traditional matchmaking, <strong>companion services in India</strong> provide several 
              distinct advantages: guaranteed availability, professional conduct, clear expectations, complete discretion, and 
              access to cultured, intelligent companions who excel at social interactions. BookEase has been at the forefront 
              of this industry since 2020, connecting over 15,000 clients with verified companions across 10+ major cities.
            </p>
          </div>

          {/* Girlfriend Experience Explained */}
          <div className="bg-pink-50 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              What is Girlfriend Experience (GFE)?
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              <strong>Girlfriend Experience (GFE)</strong> is a premium companion service that simulates the emotional and 
              physical aspects of a genuine romantic relationship. Unlike standard companion services, GFE emphasizes authentic 
              emotional connection, affection, meaningful conversation, and the warmth you'd experience with a real girlfriend.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              GFE companions are specifically trained to create an atmosphere of genuine intimacy — from holding hands and 
              sharing inside jokes to cuddling and deep conversations. This service is ideal for those seeking emotional 
              fulfillment alongside physical companionship. Rates for <strong>girlfriend experience</strong> typically range 
              from ₹20,000-₹40,000 for 4-8 hour experiences in Indian metro cities.
            </p>
          </div>

          {/* Travel Companion Deep Dive */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              Travel Companion Services — Your Perfect Trip Partner
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              <strong>Travel companion services</strong> have become increasingly popular among business professionals, 
              solo travelers, and those seeking enhanced vacation experiences. A professional travel companion offers more 
              than just company — they bring local knowledge, language skills, photography assistance, dining recommendations, 
              and the ability to make any trip more enjoyable.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Whether you're planning a weekend getaway to Goa, a business trip to Delhi, or an extended vacation, BookEase's 
              <strong> travel companions</strong> are available for daily bookings (₹15,000-₹30,000/day) and can accompany 
              you for multi-day trips with attractive package rates. All travel companions undergo additional verification for 
              passport and travel documentation.
            </p>
          </div>

          {/* Companion vs Dating Comparison */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              Companion Services vs Traditional Dating — Key Differences
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-neutral-200 rounded-lg">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="border border-neutral-200 p-3 text-left font-semibold">Aspect</th>
                    <th className="border border-neutral-200 p-3 text-left font-semibold">Companion Services</th>
                    <th className="border border-neutral-200 p-3 text-left font-semibold">Traditional Dating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-200 p-3 font-medium">Availability</td>
                    <td className="border border-neutral-200 p-3 text-green-600">Guaranteed, on your schedule</td>
                    <td className="border border-neutral-200 p-3 text-neutral-600">Dependent on mutual availability</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-200 p-3 font-medium">Expectations</td>
                    <td className="border border-neutral-200 p-3 text-green-600">Clear, professional agreement</td>
                    <td className="border border-neutral-200 p-3 text-neutral-600">Often unclear, evolving</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-200 p-3 font-medium">Commitment</td>
                    <td className="border border-neutral-200 p-3 text-green-600">No relationship obligations</td>
                    <td className="border border-neutral-200 p-3 text-neutral-600">Potential relationship expectations</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-200 p-3 font-medium">Privacy</td>
                    <td className="border border-neutral-200 p-3 text-green-600">100% discretion guaranteed</td>
                    <td className="border border-neutral-200 p-3 text-neutral-600">Varies, social media risks</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-200 p-3 font-medium">Quality</td>
                    <td className="border border-neutral-200 p-3 text-green-600">Verified, professional companions</td>
                    <td className="border border-neutral-200 p-3 text-neutral-600">Unpredictable experiences</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-200 p-3 font-medium">Time Investment</td>
                    <td className="border border-neutral-200 p-3 text-green-600">Instant, no "dating game"</td>
                    <td className="border border-neutral-200 p-3 text-neutral-600">Months of dating efforts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Safety Section */}
          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              Safety & Verification — How We Ensure Your Security
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              At BookEase, safety is our top priority. Every companion on our platform undergoes a rigorous 5-step 
              verification process before being approved:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-neutral-700 mb-4">
              <li><strong>Government ID Verification:</strong> Aadhaar, PAN, or Passport verification</li>
              <li><strong>Photo Verification:</strong> Live selfie matching with profile photos</li>
              <li><strong>Background Check:</strong> Criminal record and reference verification</li>
              <li><strong>Health Documentation:</strong> Regular health screening compliance</li>
              <li><strong>Ongoing Reviews:</strong> Client feedback monitoring and quality control</li>
            </ol>
            <p className="text-neutral-700 leading-relaxed">
              Additionally, we recommend clients follow our <Link to="/security" className="text-pink-600 hover:underline">safety guidelines</Link> — 
              meeting in public places initially, informing trusted contacts, and using our secure communication channels.
            </p>
          </div>

          {/* Who Uses Companion Services */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              Who Uses Companion Services?
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Professional companion services in India cater to a diverse clientele across various demographics and needs:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-4">
              <li><strong>Business Professionals:</strong> Executives seeking polished companions for corporate events and networking dinners</li>
              <li><strong>Solo Travelers:</strong> Individuals wanting companionship for trips, tours, and vacation experiences</li>
              <li><strong>Recent Singles:</strong> Those recently divorced or out of relationships seeking no-strings companionship</li>
              <li><strong>Busy Professionals:</strong> High-achievers with limited time for traditional dating who value efficiency</li>
              <li><strong>Social Event Attendees:</strong> Those needing plus-ones for weddings, parties, or family functions</li>
              <li><strong>Companionship Seekers:</strong> Individuals seeking genuine human connection and conversation</li>
            </ul>
          </div>

          {/* Industry Statistics */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl mb-8">
            <h4 className="text-xl font-bold text-neutral-900 mb-4">📊 Companion Services Industry Statistics 2026</h4>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-600">₹2,500 Cr+</div>
                <div className="text-sm text-neutral-600">India market size</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">85%</div>
                <div className="text-sm text-neutral-600">Clients seek emotional connection</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">45%</div>
                <div className="text-sm text-neutral-600">Business professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">35+</div>
                <div className="text-sm text-neutral-600">Average client age</div>
              </div>
            </div>
          </div>
        </section>

        {/* City-Wise Companion Services - Internal Linking Hub */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3 text-center">
            Companion Services Available in Major Indian Cities
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-8 max-w-3xl mx-auto">
            BookEase provides verified companion services across 10+ major cities in India. 
            Click on any city to explore local companions and services.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {majorCities.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="group bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-4 text-center hover:from-pink-50 hover:to-purple-50 hover:shadow-lg transition-all border border-neutral-200"
              >
                <span className="font-bold text-neutral-900 group-hover:text-pink-600 transition-colors block">
                  {city.name}
                </span>
                <span className="text-sm text-neutral-500">{city.companions} companions</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link 
              to="/verified-escort-services"
              className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700"
            >
              View All Services 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Available Companion Services */}
        {companionServices.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3 text-center">
              Featured Companion Profiles
            </h2>
            <p className="text-lg text-neutral-600 text-center mb-8 max-w-3xl mx-auto">
              Browse our selection of verified companion profiles. All profiles are ID-verified 
              and reviewed by our quality team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companionServices.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        )}

        {/* Comprehensive FAQ Section - Optimized for People Also Ask */}
        <section className="bg-white rounded-2xl p-8 mb-12 shadow-sm">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3 text-center">
            Frequently Asked Questions About Companion Services
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-8 max-w-3xl mx-auto">
            Get answers to the most common questions about companion services in India. 
            Can't find your answer? Contact us 24/7.
          </p>

          <div className="space-y-6 max-w-4xl mx-auto">
            {/* FAQ 1 */}
            <details className="bg-neutral-50 rounded-xl p-6 group" open>
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                What are companion services?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                <strong>Companion services</strong> provide professional companionship for social events, travel, 
                business meetings, and intimate experiences. Unlike traditional dating, companion services offer 
                verified, discreet professionals who excel at creating meaningful connections. Services range from 
                dinner dates to travel companionship, with rates starting from ₹6,000 in India.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                What types of companion services are available?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Six main types of companion services are available: <strong>1) Social Companion</strong> for events 
                and dinners (₹6,000-12,000), <strong>2) Travel Companion</strong> for trips and vacations (₹15,000-30,000/day), 
                <strong>3) Girlfriend Experience (GFE)</strong> for intimate relationships (₹20,000-40,000), 
                <strong>4) Business Companion</strong> for corporate events (₹8,000-15,000), 
                <strong>5) Weekend Companion</strong> for extended dates (₹35,000-60,000), and 
                <strong>6) Luxury VIP Companion</strong> for elite experiences (₹50,000+).
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                How much do companion services cost in India?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Companion service rates in India vary by type: <strong>Social companions</strong> start from 
                ₹6,000-12,000 for 2-3 hours. <strong>Travel companions</strong> range from ₹15,000-30,000 per day. 
                <strong>Girlfriend Experience (GFE)</strong> costs ₹20,000-40,000 for 4-8 hours. 
                <strong>Weekend companions</strong> charge ₹35,000-60,000 for full weekends. 
                <strong>Luxury VIP companions</strong> command ₹50,000+ for exclusive experiences. 
                Rates may vary based on companion experience and location.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                Are companion services safe?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Yes, reputable platforms like BookEase ensure safety through rigorous verification: ID verification, 
                photo verification, background checks, and ongoing quality monitoring. All companions are verified 
                adults (18+). We recommend meeting in public places initially, using our secure communication 
                channels, and following our <Link to="/security" className="text-pink-600 hover:underline">safety guidelines</Link>.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                How do I book companion services?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Booking companion services involves 5 simple steps: <strong>1)</strong> Browse verified companion 
                profiles on BookEase, <strong>2)</strong> Select based on preferences, reviews, and availability, 
                <strong>3)</strong> Contact via phone (+91-7633807420) or WhatsApp, <strong>4)</strong> Discuss 
                requirements and confirm timing, <strong>5)</strong> Complete the booking. Our 24/7 support ensures 
                smooth bookings.
              </p>
            </details>

            {/* FAQ 6 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                What is Girlfriend Experience (GFE)?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                <strong>Girlfriend Experience (GFE)</strong> is a premium companion service that simulates a genuine 
                romantic relationship. It includes emotional connection, affection, meaningful conversation, and 
                intimate companionship that feels authentic rather than transactional. GFE companions provide the 
                warmth, attention, and intimacy you'd experience with a real girlfriend.
              </p>
            </details>

            {/* FAQ 7 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                What should I expect from a companion experience?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Expect intelligent conversation, genuine connection, and enjoyable shared experiences. Professional 
                companions are cultured, well-educated individuals who excel at creating memorable moments. Whether 
                it's a sophisticated dinner date, travel adventure, or intimate evening, you'll experience authentic 
                companionship with complete discretion and professionalism.
              </p>
            </details>

            {/* FAQ 8 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                How do I choose the right companion?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                To choose the right companion: <strong>1)</strong> Define your occasion (social event, travel, 
                intimate date), <strong>2)</strong> Browse verified profiles with photos and reviews, 
                <strong>3)</strong> Check interests and specialties, <strong>4)</strong> Read client testimonials, 
                <strong>5)</strong> Contact companions directly to discuss requirements, <strong>6)</strong> Ask 
                for personalized recommendations from our support team.
              </p>
            </details>

            {/* FAQ 9 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                What's the difference between companion services and dating?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Companion services differ from traditional dating in key ways: <strong>1)</strong> Professional, 
                verified individuals, <strong>2)</strong> Clear expectations and pricing, <strong>3)</strong> No 
                relationship obligations, <strong>4)</strong> Guaranteed availability for your schedule, 
                <strong>5)</strong> Discretion and privacy assured, <strong>6)</strong> Multiple companion options, 
                <strong>7)</strong> Quality companionship on demand without dating complexities.
              </p>
            </details>

            {/* FAQ 10 */}
            <details className="bg-neutral-50 rounded-xl p-6 group">
              <summary className="text-xl font-semibold text-neutral-900 cursor-pointer list-none flex justify-between items-center">
                Which cities have companion services in India?
                <span className="text-pink-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                Companion services are available in major Indian cities: <strong>Mumbai</strong> (150+ companions), 
                <strong>Delhi NCR</strong> (120+), <strong>Bangalore</strong> (100+), <strong>Pune</strong> (60+), 
                <strong>Hyderabad</strong> (55+), <strong>Chennai</strong> (50+), <strong>Kolkata</strong> (45+), 
                <strong>Ahmedabad</strong> (40+), <strong>Jaipur</strong> (35+), and <strong>Goa</strong> (30+). 
                All companions are verified and available 24/7 through BookEase.
              </p>
            </details>
          </div>

          {/* FAQ CTA */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600 mb-4">Still have questions? Our team is available 24/7.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={`tel:+91${phone}`}
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
              >
                Call for Answers
              </a>
              <Link 
                to="/help-center"
                className="inline-flex items-center gap-2 bg-neutral-200 text-neutral-800 px-6 py-3 rounded-full font-semibold hover:bg-neutral-300 transition-colors"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services - Internal Linking */}
        <section className="mb-12 bg-gradient-to-r from-neutral-100 to-neutral-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 text-center">
            Explore Related Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              to="/verified-escort-services" 
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">
                Verified Escort Services
              </h3>
              <p className="text-neutral-600 text-sm">
                Browse all verified escort and companion profiles across India with detailed reviews.
              </p>
            </Link>
            <Link 
              to="/massage-escort-services" 
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">
                Massage Escort Services
              </h3>
              <p className="text-neutral-600 text-sm">
                Professional massage services with therapeutic and sensual options available.
              </p>
            </Link>
            <Link 
              to="/security" 
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">
                Safety Guidelines
              </h3>
              <p className="text-neutral-600 text-sm">
                Learn about our verification process and safety tips for secure booking.
              </p>
            </Link>
          </div>
        </section>

        {/* Author/EEAT Section */}
        <section className="mb-12 bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              BE
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-neutral-900">BookEase Editorial Team</h3>
              <p className="text-neutral-600 mb-2">
                India's Leading Companion Services Platform Since 2020
              </p>
              <p className="text-sm text-neutral-500">
                Our editorial team combines industry expertise with a commitment to providing accurate, 
                helpful information about companion services in India. This guide is regularly updated 
                to reflect current pricing, safety standards, and service availability.
              </p>
              <div className="mt-3 text-sm text-neutral-400">
                Last updated: {lastUpdated} • Verified by industry experts
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-bottom z-50 md:hidden">
        <div className="flex gap-3">
          <a
            href={`tel:+91${phone}`}
            className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors"
          >
            Call Now
          </a>
          <a
            href={`https://wa.me/91${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanionEscortServices;
