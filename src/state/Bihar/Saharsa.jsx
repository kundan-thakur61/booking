import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Bihar/Saharsaservices';

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

const Saharsa = () => {
  // Filter services available in Saharsa
  const saharsaServices = services.slice(0, 6);

  // Saharsa-specific data
  const saharsaData = {
    name: "Saharsa",
    city: "Saharsa",
    state: "Bihar",
    pinCodes: ["852201"],
    coordinates: {
      latitude: 25.88,
      longitude: 86.6
    },
    areas: [
      "Saharsa City", "Simri Bakhtiyarpur", "Salkhua", "Mahishi",
      "Sonbarsa"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Saharsa using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const saharsaSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: saharsaData.name,
    state: saharsaData.state,
    slug: "saharsa",
    coordinates: saharsaData.coordinates,
    areas: saharsaData.areas,
    services: saharsaData.services,
    primaryPinCode: saharsaData.pinCodes[0]
  });

  const localBusinessSchema = saharsaSchemaPackage.localBusiness;
  const locationFaqSchema = saharsaSchemaPackage.faq;
  const breadcrumbSchema = saharsaSchemaPackage.breadcrumb;

  // Product schemas for featured services in Saharsa
  const saharsaProductSchemas = saharsaServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Saharsa Client", rating: 5, text: "Excellent service in Saharsa, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Saharsa City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Saharsa testimonials
  const saharsaReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Saharsa Client",
      rating: 5,
      text: "Outstanding service from BookEase in Saharsa. Verified companions, safe booking, and professional experience in Saharsa City.",
      date: "2026-01-16"
    }, "BookEase Saharsa Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Saharsa. 24/7 availability and complete discretion guaranteed across Simri Bakhtiyarpur and Salkhua.",
      date: "2026-01-14"
    }, "BookEase Saharsa Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const saharsaFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Saharsa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Saharsa area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Saharsa clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Saharsa do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Saharsa including Saharsa City, Simri Bakhtiyarpur, Salkhua, Mahishi. Our companions are available across the entire Saharsa region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Saharsa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Saharsa escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Saharsa bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Saharsa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Saharsa. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Saharsa area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Saharsa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Saharsa typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Saharsa Escorts 2026 \u2014 20+ Verified Profiles | BookEase Bihar"
        description="\u2713 20+ verified Saharsa escorts \u2713 Saharsa City & Simri Bakhtiyarpur \u2713 Available tonight \u2713 24/7 service. Book premium companions in Saharsa City, Simri Bakhtiyarpur, Salkhua. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/bihar/saharsa"
        image="https://www.escortmumbaii.in/saharsa-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...saharsaProductSchemas, ...saharsaReviewSchemas]}
        faqSchema={saharsaFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Saharsa escorts 2026, escorts in Saharsa, verified Saharsa escorts, 20+ profiles, Saharsa City escorts, Simri Bakhtiyarpur escorts, Salkhua escorts, available tonight' },
          { name: 'geo.position', content: `${saharsaData.coordinates.latitude};${saharsaData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Saharsa, Bihar' },
          { name: 'geo.region', content: 'IN-BR' }
        ]}
        city="Bihar"
        area="Saharsa"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Saharsa Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90 bg">
            <Link to="/" className="hover:underline text-white">Home</Link>
            <span className="mx-2"></span>
            <Link to="/bihar" className="hover:underline text-white">Bihar</Link>
            <span className="mx-2"></span>
            <span>Saharsa</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Saharsa Escorts 2026  20+ Verified Companions in Saharsa City & Simri Bakhtiyarpur
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse 20+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Saharsa including Saharsa City, Simri Bakhtiyarpur, Salkhua.
            Discreet, safe, and professional service specifically for Saharsa residents and visitors.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:+91${phone}`}
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2"
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
              className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2"
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

        {/* Saharsa Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in Saharsa
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {saharsaData.areas.map((area) => (
              <div
                key={area}
                className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200"
              >
                <h3 className="font-bold text-neutral-900">{area}</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Service available 24/7
                </p>
              </div>
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
              to={`/bihar/saharsa/service/${service.id}`}
              className="block h-full"
            >
              <div className="relative overflow-hidden">
                <LazyImage
                  src={service.image}
                  alt={service.description}
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
                  {service.description}
                </h3>

                // <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                //   {service.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.availability}
                  </div>

                  <div className="text-pink-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    View Options
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>

        {/* Saharsa-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Saharsa, Bihar</h2>
          <p>
            Saharsa is a prominent area in Bihar, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Saharsa region,
            including Saharsa City, Simri Bakhtiyarpur, Salkhua, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Saharsa Services?</h3>
          <ul>
            <li><strong>Saharsa-Focused Verification:</strong> All companions serving Saharsa undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Saharsa Availability:</strong> Services available round the clock across all Saharsa areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Saharsa residents and visitors</li>
            <li><strong>Saharsa-Specific Safety:</strong> Secure platform with companions trained in Saharsa area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 20+ verified profiles of independent escorts and professional companions specifically available in Saharsa</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Saharsa's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Saharsa</h3>
          <p>
            Our Saharsa companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Saharsa business districts</li>
            <li>Restaurant and dinner dates in Saharsa's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Saharsa accommodations</li>
            <li>Body massage services in Saharsa residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Saharsa corporate and social events</li>
            <li>Travel companionship from Saharsa</li>
          </ul>

          <h3>Saharsa Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Saharsa zones:
          </p>
          <ul>
            <li><strong>Saharsa City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Simri Bakhtiyarpur:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Salkhua:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Mahishi:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Sonbarsa:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Saharsa Escorts</h3>
          <p>
            Booking Saharsa-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Saharsa area</li>
            <li>Check real-time availability and Saharsa-specific rates</li>
            <li>Contact via phone or WhatsApp with Saharsa location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Saharsa-trained companions</li>
          </ol>

          <h3>Saharsa Safety & Discretion</h3>
          <p>
            Your safety and privacy in Saharsa are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Saharsa area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Saharsa's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Saharsa-based bookings</li>
          </ul>

          <h3>Saharsa Pricing Information</h3>
          <p>
            Competitive rates for Saharsa services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Saharsa)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Saharsa)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Saharsa accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Saharsa Services</h3>
          <p>
            For Saharsa-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Saharsa, Bihar.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Saharsa FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Saharsa Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Saharsa?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Saharsa area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Saharsa's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Saharsa do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Saharsa City, Simri Bakhtiyarpur, Salkhua, Mahishi. 
                Our companions are strategically positioned across all these Saharsa zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Saharsa-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Saharsa escort profiles, specify your preferred area within Saharsa, 
                and contact us via phone or WhatsApp. Our team specializes in Saharsa bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Saharsa?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Saharsa. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Saharsa-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Saharsa services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Saharsa services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Saharsa-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Bihar Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Bihar Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Araria", slug: "araria", count: 50 },
              { name: "Arrah", slug: "arrah", count: 65 },
              { name: "Aurangabad", slug: "aurangabad", count: 80 },
              { name: "Banka", slug: "banka", count: 95 },
              { name: "Begusarai", slug: "begusarai", count: 110 },
              { name: "Bettiah", slug: "bettiah", count: 125 },
              { name: "Bhagalpur", slug: "bhagalpur", count: 140 },
              { name: "Bhojpur", slug: "bhojpur", count: 155 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/bihar/${area.slug}`}
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

export default Saharsa;
