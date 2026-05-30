import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Delhi/ConnaughtPlaceservices';

// Enhanced local SEO components
import aeoStrategy from '../../seo/aeo-content-strategy.json';
import structuredDataEnhanced from '../../seo/structured-data-enhanced.json';

// Import enhanced schema utilities for Technical SEO II
import {
  buildEnhancedOrganizationSchema,
  buildProductSchema,
  buildReviewSchema
} from '../../utils/schema';

// Import new Local Business Schema Generator
import { LocalBusinessSchemaGenerator, CITY_DATA } from '../../seo/local-business-schema';

const phone = "9324881345";

const ConnaughtPlace = () => {
  // Filter services available in Connaught Place
  const connaughtPlaceServices = services.slice(0, 6);

  // Connaught Place-specific data
  const connaughtPlaceData = {
    name: "Connaught Place",
    city: "Connaught Place",
    state: "Delhi",
    pinCodes: ["110001"],
    coordinates: {
      latitude: 28.63,
      longitude: 77.22
    },
    areas: [
      "Connaught Place", "Janpath", "Rajiv Chowk", "Barakhamba Road",
      "Kasturba Gandhi Marg", "Parliament Street", "Sansad Marg"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Connaught Place using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const connaughtPlaceSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: connaughtPlaceData.name,
    state: connaughtPlaceData.state,
    slug: "connaught-place",
    coordinates: connaughtPlaceData.coordinates,
    areas: connaughtPlaceData.areas,
    services: connaughtPlaceData.services,
    primaryPinCode: connaughtPlaceData.pinCodes[0]
  });

  const localBusinessSchema = connaughtPlaceSchemaPackage.localBusiness;
  const locationFaqSchema = connaughtPlaceSchemaPackage.faq;
  const breadcrumbSchema = connaughtPlaceSchemaPackage.breadcrumb;

  // Product schemas for featured services in Connaught Place
  const connaughtPlaceProductSchemas = connaughtPlaceServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Connaught Place Client", rating: 5, text: "Excellent service in Connaught Place, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Connaught Place.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Connaught Place testimonials
  const connaughtPlaceReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Connaught Place Client",
      rating: 5,
      text: "Outstanding service from BookEase in Connaught Place. Verified companions, safe booking, and professional experience in Connaught Place.",
      date: "2026-01-16"
    }, "BookEase Connaught Place Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Connaught Place. 24/7 availability and complete discretion guaranteed across Janpath and Rajiv Chowk.",
      date: "2026-01-14"
    }, "BookEase Connaught Place Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const connaughtPlaceFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Connaught Place?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Connaught Place area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Connaught Place clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Connaught Place do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Connaught Place including Connaught Place, Janpath, Rajiv Chowk, Barakhamba Road. Our companions are available across the entire Connaught Place region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Connaught Place?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Connaught Place escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Connaught Place bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Connaught Place?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Connaught Place. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Connaught Place area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Connaught Place?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Connaught Place typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Connaught Place Escorts 2026 \u2014 80+ Verified Profiles | BookEase Delhi"
        description="\u2713 80+ verified Connaught Place escorts \u2713 Connaught Place & Janpath \u2713 Available tonight \u2713 24/7 service. Book premium companions in Connaught Place, Janpath, Rajiv Chowk. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/delhi/connaught-place"
        image="https://www.escortmumbaii.in/connaught-place-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...connaughtPlaceProductSchemas, ...connaughtPlaceReviewSchemas]}
        faqSchema={connaughtPlaceFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Connaught Place escorts 2026, escorts in Connaught Place, verified Connaught Place escorts, 80+ profiles, Connaught Place escorts, Janpath escorts, Rajiv Chowk escorts, available tonight' },
          { name: 'geo.position', content: `${connaughtPlaceData.coordinates.latitude};${connaughtPlaceData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Connaught Place, Delhi' },
          { name: 'geo.region', content: 'IN-DL' }
        ]}
        city="Delhi"
        area="Connaught Place"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Connaught Place Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-6 md:py-10">
        <div className="container mx-auto px-4">
          <nav className="text-xs mb-2 opacity-80">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">\u203a</span>
            <Link to="/delhi" className="hover:underline">Delhi</Link>
            <span className="mx-2">\u203a</span>
            <span>Connaught Place</span>
          </nav>

          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
            Connaught Place Escorts 2026 \u2014 80+ Verified Companions in Connaught Place & Janpath
          </h1>
          <p className="text-sm md:text-base mb-4 max-w-3xl leading-relaxed opacity-90">
            Browse 80+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Connaught Place including Connaught Place, Janpath, Rajiv Chowk.
            Discreet, safe, and professional service specifically for Connaught Place residents and visitors.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:+91${phone}`}
              className="bg-white text-pink-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-1.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <a
              href={`https://wa.me/91${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-1.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Connaught Place Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in Connaught Place
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {connaughtPlaceData.areas.map((area) => (
              <span key={area} className="inline-flex items-center gap-1 bg-pink-50 border border-pink-100 rounded-md px-2.5 py-1 text-xs font-medium text-pink-700">
                <svg className="w-3 h-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Available Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <Link
              to={`/delhi/connaught-place/service/${service.id}`}
              className="block h-full"
            >
              <div className="relative overflow-hidden">
                <LazyImage
                  src={service.image}
                  alt={service.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Price Range Badge */}
                <div className="absolute bottom-4 right-4">
                  <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    views profiles
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {service.name}
                </h3>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.availability}
                  </div>

                  <div className="text-pink-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    View Options \u2192
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>

        {/* Connaught Place-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Connaught Place, Delhi</h2>
          <p>
            Connaught Place is a prominent area in Delhi, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Connaught Place region,
            including Connaught Place, Janpath, Rajiv Chowk, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Connaught Place Services?</h3>
          <ul>
            <li><strong>Connaught Place-Focused Verification:</strong> All companions serving Connaught Place undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Connaught Place Availability:</strong> Services available round the clock across all Connaught Place areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Connaught Place residents and visitors</li>
            <li><strong>Connaught Place-Specific Safety:</strong> Secure platform with companions trained in Connaught Place area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 80+ verified profiles of independent escorts and professional companions specifically available in Connaught Place</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Connaught Place's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Connaught Place</h3>
          <p>
            Our Connaught Place companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Connaught Place business districts</li>
            <li>Restaurant and dinner dates in Connaught Place's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Connaught Place accommodations</li>
            <li>Body massage services in Connaught Place residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Connaught Place corporate and social events</li>
            <li>Travel companionship from Connaught Place</li>
          </ul>

          <h3>Connaught Place Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Connaught Place zones:
          </p>
          <ul>
            <li><strong>Connaught Place:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Janpath:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Rajiv Chowk:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Barakhamba Road:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Kasturba Gandhi Marg:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Parliament Street:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Sansad Marg:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Connaught Place Escorts</h3>
          <p>
            Booking Connaught Place-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Connaught Place area</li>
            <li>Check real-time availability and Connaught Place-specific rates</li>
            <li>Contact via phone or WhatsApp with Connaught Place location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Connaught Place-trained companions</li>
          </ol>

          <h3>Connaught Place Safety & Discretion</h3>
          <p>
            Your safety and privacy in Connaught Place are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Connaught Place area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Connaught Place's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Connaught Place-based bookings</li>
          </ul>

          <h3>Connaught Place Pricing Information</h3>
          <p>
            Competitive rates for Connaught Place services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Connaught Place)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Connaught Place)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Connaught Place accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Connaught Place Services</h3>
          <p>
            For Connaught Place-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Connaught Place, Delhi.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Connaught Place FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Connaught Place Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Connaught Place?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Connaught Place area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Connaught Place's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Connaught Place do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Connaught Place, Janpath, Rajiv Chowk, Barakhamba Road. 
                Our companions are strategically positioned across all these Connaught Place zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Connaught Place-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Connaught Place escort profiles, specify your preferred area within Connaught Place, 
                and contact us via phone or WhatsApp. Our team specializes in Connaught Place bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Connaught Place?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Connaught Place. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Connaught Place-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Connaught Place services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Connaught Place services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Connaught Place-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Delhi Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Delhi Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Dwarka", slug: "dwarka", count: 50 },
              { name: "Lajpat Nagar", slug: "lajpat-nagar", count: 65 },
              { name: "Rohini", slug: "rohini", count: 80 },
              { name: "Saket", slug: "saket", count: 95 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/delhi/${area.slug}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <span className="font-semibold text-neutral-900">{area.name}</span>
                <span className="block text-sm text-neutral-600">{area.count} profiles</span>
              </Link>
            ))}
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

export default ConnaughtPlace;
