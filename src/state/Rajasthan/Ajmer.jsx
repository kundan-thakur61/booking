import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Rajasthan/Ajmerservices';

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

const Ajmer = () => {
  // Filter services available in Ajmer
  const ajmerServices = services.slice(0, 6);

  // Ajmer-specific data
  const ajmerData = {
    name: "Ajmer",
    city: "Ajmer",
    state: "Rajasthan",
    pinCodes: ["305001"],
    coordinates: {
      latitude: 26.45,
      longitude: 74.64
    },
    areas: [
      "Ajmer City", "Naya Bazaar", "Vaishali Nagar", "Madar Gate",
      "Civil Lines", "Foy Sagar", "Pushkar Road", "Beawar Road"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Ajmer using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const ajmerSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: ajmerData.name,
    state: ajmerData.state,
    slug: "ajmer",
    coordinates: ajmerData.coordinates,
    areas: ajmerData.areas,
    services: ajmerData.services,
    primaryPinCode: ajmerData.pinCodes[0]
  });

  const localBusinessSchema = ajmerSchemaPackage.localBusiness;
  const locationFaqSchema = ajmerSchemaPackage.faq;
  const breadcrumbSchema = ajmerSchemaPackage.breadcrumb;

  // Product schemas for featured services in Ajmer
  const ajmerProductSchemas = ajmerServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Ajmer Client", rating: 5, text: "Excellent service in Ajmer, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Ajmer City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Ajmer testimonials
  const ajmerReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Ajmer Client",
      rating: 5,
      text: "Outstanding service from BookEase in Ajmer. Verified companions, safe booking, and professional experience in Ajmer City.",
      date: "2026-01-16"
    }, "BookEase Ajmer Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Ajmer. 24/7 availability and complete discretion guaranteed across Naya Bazaar and Vaishali Nagar.",
      date: "2026-01-14"
    }, "BookEase Ajmer Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const ajmerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Ajmer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Ajmer area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Ajmer clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Ajmer do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Ajmer including Ajmer City, Naya Bazaar, Vaishali Nagar, Madar Gate. Our companions are available across the entire Ajmer region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Ajmer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Ajmer escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Ajmer bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Ajmer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Ajmer. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Ajmer area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Ajmer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Ajmer typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Ajmer Escorts 2026 \u2014 87+ Verified Profiles | BookEase Rajasthan"
        description="\u2713 87+ verified Ajmer escorts \u2713 Ajmer City & Naya Bazaar \u2713 Available tonight \u2713 24/7 service. Book premium companions in Ajmer City, Naya Bazaar, Vaishali Nagar. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/rajasthan/ajmer"
        image="https://www.escortmumbaii.in/ajmer-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...ajmerProductSchemas, ...ajmerReviewSchemas]}
        faqSchema={ajmerFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Ajmer escorts 2026, escorts in Ajmer, verified Ajmer escorts, 87+ profiles, Ajmer City escorts, Naya Bazaar escorts, Vaishali Nagar escorts, available tonight' },
          { name: 'geo.position', content: `${ajmerData.coordinates.latitude};${ajmerData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Ajmer, Rajasthan' },
          { name: 'geo.region', content: 'IN-XX' }
        ]}
        city="Rajasthan"
        area="Ajmer"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Ajmer Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-red from-pink-600 to-pink-700 text-white py-12">
        <div className="w-full px-1.5 py-8 sm:px-6">
          <nav className="text-sm mb-4 opacity-90 bg">
            <Link to="/" className="hover:underline text-white">Home</Link>
            <span className="mx-2"></span>
            <Link to="/rajasthan" className="hover:underline text-white">Rajasthan</Link>
            <span className="mx-2"></span>
            <span>Ajmer</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 px-1.5">
            Ajmer Escorts 2026  87+ Verified Companions in Ajmer City & Naya Bazaar
          </h1>
          <p className="text-xl mb-6 max-w-3xl text-black px-1.5">
            Browse 87+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Ajmer including Ajmer City, Naya Bazaar, Vaishali Nagar.
            Discreet, safe, and professional service specifically for Ajmer residents and visitors.
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

        {/* Ajmer Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 px-1.5">
            Areas Covered in Ajmer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ajmerData.areas.map((area) => (
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
              to={`/rajasthan/ajmer/service/${service.id}`}
              className="block h-full"
               onClick={() => {
              window.scrollTo(0, 0);
              }}
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
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-3">
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

        {/* Ajmer-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Ajmer, Rajasthan</h2>
          <p>
            Ajmer is a prominent area in Rajasthan, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Ajmer region,
            including Ajmer City, Naya Bazaar, Vaishali Nagar, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Ajmer Services?</h3>
          <ul>
            <li><strong>Ajmer-Focused Verification:</strong> All companions serving Ajmer undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Ajmer Availability:</strong> Services available round the clock across all Ajmer areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Ajmer residents and visitors</li>
            <li><strong>Ajmer-Specific Safety:</strong> Secure platform with companions trained in Ajmer area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 87+ verified profiles of independent escorts and professional companions specifically available in Ajmer</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Ajmer's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Ajmer</h3>
          <p>
            Our Ajmer companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Ajmer business districts</li>
            <li>Restaurant and dinner dates in Ajmer's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Ajmer accommodations</li>
            <li>Body massage services in Ajmer residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Ajmer corporate and social events</li>
            <li>Travel companionship from Ajmer</li>
          </ul>

          <h3>Ajmer Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Ajmer zones:
          </p>
          <ul>
            <li><strong>Ajmer City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Naya Bazaar:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Vaishali Nagar:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Madar Gate:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Civil Lines:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Foy Sagar:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Pushkar Road:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Beawar Road:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Ajmer Escorts</h3>
          <p>
            Booking Ajmer-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Ajmer area</li>
            <li>Check real-time availability and Ajmer-specific rates</li>
            <li>Contact via phone or WhatsApp with Ajmer location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Ajmer-trained companions</li>
          </ol>

          <h3>Ajmer Safety & Discretion</h3>
          <p>
            Your safety and privacy in Ajmer are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Ajmer area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Ajmer's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Ajmer-based bookings</li>
          </ul>

          <h3>Ajmer Pricing Information</h3>
          <p>
            Competitive rates for Ajmer services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Ajmer)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Ajmer)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Ajmer accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Ajmer Services</h3>
          <p>
            For Ajmer-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Ajmer, Rajasthan.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Ajmer FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Ajmer Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Ajmer?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Ajmer area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Ajmer's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Ajmer do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Ajmer City, Naya Bazaar, Vaishali Nagar, Madar Gate. 
                Our companions are strategically positioned across all these Ajmer zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Ajmer-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Ajmer escort profiles, specify your preferred area within Ajmer, 
                and contact us via phone or WhatsApp. Our team specializes in Ajmer bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Ajmer?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Ajmer. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Ajmer-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Ajmer services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Ajmer services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Ajmer-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Rajasthan Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Rajasthan Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1.5">
            {[
              { name: "Bikaner", slug: "bikaner", count: 50 },
              { name: "Jaipur", slug: "jaipur", count: 65 },
              { name: "Jodhpur", slug: "jodhpur", count: 80 },
              { name: "Kota", slug: "kota", count: 95 },
              { name: "Sikar", slug: "sikar", count: 110 },
              { name: "Udaipur", slug: "udaipur", count: 125 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/rajasthan/${area.slug}`}
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

export default Ajmer;
