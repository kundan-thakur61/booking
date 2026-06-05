import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Punjab/Mohaliservices';

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

const Mohali = () => {
  // Filter services available in Mohali
  const mohaliServices = services.slice(0, 6);

  // Mohali-specific data
  const mohaliData = {
    name: "Mohali",
    city: "Mohali",
    state: "Punjab",
    pinCodes: ["160062"],
    coordinates: {
      latitude: 30.7,
      longitude: 76.72
    },
    areas: [
      "Mohali City", "Phase 1", "Phase 5", "Phase 7",
      "Phase 8", "Sector 68", "IT City", "Aerocity"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Mohali using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const mohaliSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: mohaliData.name,
    state: mohaliData.state,
    slug: "mohali",
    coordinates: mohaliData.coordinates,
    areas: mohaliData.areas,
    services: mohaliData.services,
    primaryPinCode: mohaliData.pinCodes[0]
  });

  const localBusinessSchema = mohaliSchemaPackage.localBusiness;
  const locationFaqSchema = mohaliSchemaPackage.faq;
  const breadcrumbSchema = mohaliSchemaPackage.breadcrumb;

  // Product schemas for featured services in Mohali
  const mohaliProductSchemas = mohaliServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Mohali Client", rating: 5, text: "Excellent service in Mohali, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Mohali City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Mohali testimonials
  const mohaliReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Mohali Client",
      rating: 5,
      text: "Outstanding service from BookEase in Mohali. Verified companions, safe booking, and professional experience in Mohali City.",
      date: "2026-01-16"
    }, "BookEase Mohali Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Mohali. 24/7 availability and complete discretion guaranteed across Phase 1 and Phase 5.",
      date: "2026-01-14"
    }, "BookEase Mohali Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const mohaliFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Mohali area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Mohali clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Mohali do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Mohali including Mohali City, Phase 1, Phase 5, Phase 7. Our companions are available across the entire Mohali region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Mohali escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Mohali bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Mohali. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Mohali area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Mohali typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Mohali Escorts 2026 \u2014 71+ Verified Profiles | BookEase Punjab"
        description="\u2713 71+ verified Mohali escorts \u2713 Mohali City & Phase 1 \u2713 Available tonight \u2713 24/7 service. Book premium companions in Mohali City, Phase 1, Phase 5. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/punjab/mohali"
        image="https://www.escortmumbaii.in/mohali-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...mohaliProductSchemas, ...mohaliReviewSchemas]}
        faqSchema={mohaliFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Mohali escorts 2026, escorts in Mohali, verified Mohali escorts, 71+ profiles, Mohali City escorts, Phase 1 escorts, Phase 5 escorts, available tonight' },
          { name: 'geo.position', content: `${mohaliData.coordinates.latitude};${mohaliData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Mohali, Punjab' },
          { name: 'geo.region', content: 'IN-XX' }
        ]}
        city="Punjab"
        area="Mohali"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Mohali Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-red from-pink-600 to-pink-700 text-white py-12">
        <div className="w-full px-1.5 py-8 sm:px-6">
          <nav className="text-sm mb-4 opacity-90 bg">
            <Link to="/" className="hover:underline text-white">Home</Link>
            <span className="mx-2"></span>
            <Link to="/punjab" className="hover:underline text-white">Punjab</Link>
            <span className="mx-2"></span>
            <span>Mohali</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 px-1.5">
            Mohali Escorts 2026  71+ Verified Companions in Mohali City & Phase 1
          </h1>
          <p className="text-xl mb-6 max-w-3xl text-black px-1.5">
            Browse 71+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Mohali including Mohali City, Phase 1, Phase 5.
            Discreet, safe, and professional service specifically for Mohali residents and visitors.
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

      <div className="w-full px-1.5  sm:px-6 py-8">

        {/* Mohali Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 px-1.5">
            Areas Covered in Mohali
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mohaliData.areas.map((area) => (
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
              to={`/punjab/mohali/service/${service.id}`}
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

        {/* Mohali-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Mohali, Punjab</h2>
          <p>
            Mohali is a prominent area in Punjab, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Mohali region,
            including Mohali City, Phase 1, Phase 5, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Mohali Services?</h3>
          <ul>
            <li><strong>Mohali-Focused Verification:</strong> All companions serving Mohali undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Mohali Availability:</strong> Services available round the clock across all Mohali areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Mohali residents and visitors</li>
            <li><strong>Mohali-Specific Safety:</strong> Secure platform with companions trained in Mohali area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 71+ verified profiles of independent escorts and professional companions specifically available in Mohali</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Mohali's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Mohali</h3>
          <p>
            Our Mohali companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Mohali business districts</li>
            <li>Restaurant and dinner dates in Mohali's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Mohali accommodations</li>
            <li>Body massage services in Mohali residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Mohali corporate and social events</li>
            <li>Travel companionship from Mohali</li>
          </ul>

          <h3>Mohali Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Mohali zones:
          </p>
          <ul>
            <li><strong>Mohali City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Phase 1:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Phase 5:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Phase 7:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Phase 8:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Sector 68:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>IT City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Aerocity:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Mohali Escorts</h3>
          <p>
            Booking Mohali-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Mohali area</li>
            <li>Check real-time availability and Mohali-specific rates</li>
            <li>Contact via phone or WhatsApp with Mohali location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Mohali-trained companions</li>
          </ol>

          <h3>Mohali Safety & Discretion</h3>
          <p>
            Your safety and privacy in Mohali are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Mohali area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Mohali's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Mohali-based bookings</li>
          </ul>

          <h3>Mohali Pricing Information</h3>
          <p>
            Competitive rates for Mohali services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Mohali)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Mohali)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Mohali accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Mohali Services</h3>
          <p>
            For Mohali-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Mohali, Punjab.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Mohali FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Mohali Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Mohali?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Mohali area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Mohali's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Mohali do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Mohali City, Phase 1, Phase 5, Phase 7. 
                Our companions are strategically positioned across all these Mohali zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Mohali-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Mohali escort profiles, specify your preferred area within Mohali, 
                and contact us via phone or WhatsApp. Our team specializes in Mohali bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Mohali?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Mohali. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Mohali-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Mohali services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Mohali services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Mohali-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Punjab Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Punjab Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1.5">
            {[
              { name: "Amritsar", slug: "amritsar", count: 50 },
              { name: "Bathinda", slug: "bathinda", count: 65 },
              { name: "Jalandhar", slug: "jalandhar", count: 80 },
              { name: "Ludhiana", slug: "ludhiana", count: 95 },
              { name: "Patiala", slug: "patiala", count: 110 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/punjab/${area.slug}`}
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

export default Mohali;
