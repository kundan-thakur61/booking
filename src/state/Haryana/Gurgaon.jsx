import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Haryana/Gurgaonservices';

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

const Gurgaon = () => {
  // Filter services available in Gurgaon
  const gurgaonServices = services.slice(0, 6);

  // Gurgaon-specific data
  const gurgaonData = {
    name: "Gurgaon",
    city: "Gurgaon",
    state: "Haryana",
    pinCodes: ["122001"],
    coordinates: {
      latitude: 28.46,
      longitude: 77.03
    },
    areas: [
      "Gurgaon City", "DLF Phase 1", "Sohna Road", "MG Road",
      "Golf Course Road", "Cyber City", "Sector 29", "Udyog Vihar"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Gurgaon using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const gurgaonSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: gurgaonData.name,
    state: gurgaonData.state,
    slug: "gurgaon",
    coordinates: gurgaonData.coordinates,
    areas: gurgaonData.areas,
    services: gurgaonData.services,
    primaryPinCode: gurgaonData.pinCodes[0]
  });

  const localBusinessSchema = gurgaonSchemaPackage.localBusiness;
  const locationFaqSchema = gurgaonSchemaPackage.faq;
  const breadcrumbSchema = gurgaonSchemaPackage.breadcrumb;

  // Product schemas for featured services in Gurgaon
  const gurgaonProductSchemas = gurgaonServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Gurgaon Client", rating: 5, text: "Excellent service in Gurgaon, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Gurgaon City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Gurgaon testimonials
  const gurgaonReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Gurgaon Client",
      rating: 5,
      text: "Outstanding service from BookEase in Gurgaon. Verified companions, safe booking, and professional experience in Gurgaon City.",
      date: "2026-01-16"
    }, "BookEase Gurgaon Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Gurgaon. 24/7 availability and complete discretion guaranteed across DLF Phase 1 and Sohna Road.",
      date: "2026-01-14"
    }, "BookEase Gurgaon Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const gurgaonFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Gurgaon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Gurgaon area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Gurgaon clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Gurgaon do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Gurgaon including Gurgaon City, DLF Phase 1, Sohna Road, MG Road. Our companions are available across the entire Gurgaon region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Gurgaon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Gurgaon escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Gurgaon bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Gurgaon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Gurgaon. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Gurgaon area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Gurgaon?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Gurgaon typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Gurgaon Escorts 2026 \u2014 93+ Verified Profiles | BookEase Haryana"
        description="\u2713 93+ verified Gurgaon escorts \u2713 Gurgaon City & DLF Phase 1 \u2713 Available tonight \u2713 24/7 service. Book premium companions in Gurgaon City, DLF Phase 1, Sohna Road. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/haryana/gurgaon"
        image="https://www.escortmumbaii.in/gurgaon-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...gurgaonProductSchemas, ...gurgaonReviewSchemas]}
        faqSchema={gurgaonFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Gurgaon escorts 2026, escorts in Gurgaon, verified Gurgaon escorts, 93+ profiles, Gurgaon City escorts, DLF Phase 1 escorts, Sohna Road escorts, available tonight' },
          { name: 'geo.position', content: `${gurgaonData.coordinates.latitude};${gurgaonData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Gurgaon, Haryana' },
          { name: 'geo.region', content: 'IN-XX' }
        ]}
        city="Haryana"
        area="Gurgaon"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Gurgaon Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90 bg">
            <Link to="/" className="hover:underline text-white">Home</Link>
            <span className="mx-2"></span>
            <Link to="/haryana" className="hover:underline text-white">Haryana</Link>
            <span className="mx-2"></span>
            <span>Gurgaon</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Gurgaon Escorts 2026  93+ Verified Companions in Gurgaon City & DLF Phase 1
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse 93+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Gurgaon including Gurgaon City, DLF Phase 1, Sohna Road.
            Discreet, safe, and professional service specifically for Gurgaon residents and visitors.
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

        {/* Gurgaon Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in Gurgaon
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gurgaonData.areas.map((area) => (
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
              to={`/haryana/gurgaon/service/${service.id}`}
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

        {/* Gurgaon-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Gurgaon, Haryana</h2>
          <p>
            Gurgaon is a prominent area in Haryana, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Gurgaon region,
            including Gurgaon City, DLF Phase 1, Sohna Road, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Gurgaon Services?</h3>
          <ul>
            <li><strong>Gurgaon-Focused Verification:</strong> All companions serving Gurgaon undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Gurgaon Availability:</strong> Services available round the clock across all Gurgaon areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Gurgaon residents and visitors</li>
            <li><strong>Gurgaon-Specific Safety:</strong> Secure platform with companions trained in Gurgaon area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 93+ verified profiles of independent escorts and professional companions specifically available in Gurgaon</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Gurgaon's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Gurgaon</h3>
          <p>
            Our Gurgaon companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Gurgaon business districts</li>
            <li>Restaurant and dinner dates in Gurgaon's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Gurgaon accommodations</li>
            <li>Body massage services in Gurgaon residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Gurgaon corporate and social events</li>
            <li>Travel companionship from Gurgaon</li>
          </ul>

          <h3>Gurgaon Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Gurgaon zones:
          </p>
          <ul>
            <li><strong>Gurgaon City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>DLF Phase 1:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Sohna Road:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>MG Road:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Golf Course Road:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Cyber City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Sector 29:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Udyog Vihar:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Gurgaon Escorts</h3>
          <p>
            Booking Gurgaon-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Gurgaon area</li>
            <li>Check real-time availability and Gurgaon-specific rates</li>
            <li>Contact via phone or WhatsApp with Gurgaon location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Gurgaon-trained companions</li>
          </ol>

          <h3>Gurgaon Safety & Discretion</h3>
          <p>
            Your safety and privacy in Gurgaon are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Gurgaon area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Gurgaon's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Gurgaon-based bookings</li>
          </ul>

          <h3>Gurgaon Pricing Information</h3>
          <p>
            Competitive rates for Gurgaon services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Gurgaon)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Gurgaon)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Gurgaon accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Gurgaon Services</h3>
          <p>
            For Gurgaon-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Gurgaon, Haryana.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Gurgaon FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Gurgaon Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Gurgaon?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Gurgaon area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Gurgaon's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Gurgaon do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Gurgaon City, DLF Phase 1, Sohna Road, MG Road. 
                Our companions are strategically positioned across all these Gurgaon zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Gurgaon-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Gurgaon escort profiles, specify your preferred area within Gurgaon, 
                and contact us via phone or WhatsApp. Our team specializes in Gurgaon bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Gurgaon?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Gurgaon. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Gurgaon-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Gurgaon services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Gurgaon services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Gurgaon-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Haryana Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Haryana Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Ambala", slug: "ambala", count: 50 },
              { name: "Faridabad", slug: "faridabad", count: 65 },
              { name: "Hisar", slug: "hisar", count: 80 },
              { name: "Karnal", slug: "karnal", count: 95 },
              { name: "Panipat", slug: "panipat", count: 110 },
              { name: "Rohtak", slug: "rohtak", count: 125 },
              { name: "Sonipat", slug: "sonipat", count: 140 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/haryana/${area.slug}`}
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

export default Gurgaon;
