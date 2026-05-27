import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Gujarat/Vadodaraservices';

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

const phone = "07633807420";

const Vadodara = () => {
  // Filter services available in Vadodara
  const vadodaraServices = services.slice(0, 6);

  // Vadodara-specific data
  const vadodaraData = {
    name: "Vadodara",
    city: "Vadodara",
    state: "Gujarat",
    pinCodes: ["390001", "390007"],
    coordinates: {
      latitude: 22.31,
      longitude: 73.19
    },
    areas: [
      "Vadodara City", "Alkapuri", "Race Course", "Fatehgunj",
      "Sayajigunj", "Manjalpur", "Akota", "Gotri"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Vadodara using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const vadodaraSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: vadodaraData.name,
    state: vadodaraData.state,
    slug: "vadodara",
    coordinates: vadodaraData.coordinates,
    areas: vadodaraData.areas,
    services: vadodaraData.services,
    primaryPinCode: vadodaraData.pinCodes[0]
  });

  const localBusinessSchema = vadodaraSchemaPackage.localBusiness;
  const locationFaqSchema = vadodaraSchemaPackage.faq;
  const breadcrumbSchema = vadodaraSchemaPackage.breadcrumb;

  // Product schemas for featured services in Vadodara
  const vadodaraProductSchemas = vadodaraServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Vadodara Client", rating: 5, text: "Excellent service in Vadodara, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Vadodara City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Vadodara testimonials
  const vadodaraReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Vadodara Client",
      rating: 5,
      text: "Outstanding service from BookEase in Vadodara. Verified companions, safe booking, and professional experience in Vadodara City.",
      date: "2026-01-16"
    }, "BookEase Vadodara Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Vadodara. 24/7 availability and complete discretion guaranteed across Alkapuri and Race Course.",
      date: "2026-01-14"
    }, "BookEase Vadodara Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const vadodaraFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Vadodara?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Vadodara area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Vadodara clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Vadodara do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Vadodara including Vadodara City, Alkapuri, Race Course, Fatehgunj. Our companions are available across the entire Vadodara region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Vadodara?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Vadodara escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Vadodara bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Vadodara?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Vadodara. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Vadodara area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Vadodara?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Vadodara typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Vadodara Escorts 2026 \u2014 65+ Verified Profiles | BookEase Gujarat"
        description="\u2713 65+ verified Vadodara escorts \u2713 Vadodara City & Alkapuri \u2713 Available tonight \u2713 24/7 service. Book premium companions in Vadodara City, Alkapuri, Race Course. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/gujarat/vadodara"
        image="https://www.escortmumbaii.in/vadodara-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...vadodaraProductSchemas, ...vadodaraReviewSchemas]}
        faqSchema={vadodaraFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Vadodara escorts 2026, escorts in Vadodara, verified Vadodara escorts, 65+ profiles, Vadodara City escorts, Alkapuri escorts, Race Course escorts, available tonight' },
          { name: 'geo.position', content: `${vadodaraData.coordinates.latitude};${vadodaraData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Vadodara, Gujarat' },
          { name: 'geo.region', content: 'IN-GJ' }
        ]}
        city="Gujarat"
        area="Vadodara"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Vadodara Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">\u203a</span>
            <Link to="/gujarat" className="hover:underline">Gujarat</Link>
            <span className="mx-2">\u203a</span>
            <span>Vadodara</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vadodara Escorts 2026 \u2014 65+ Verified Companions in Vadodara City & Alkapuri
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse 65+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Vadodara including Vadodara City, Alkapuri, Race Course.
            Discreet, safe, and professional service specifically for Vadodara residents and visitors.
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

        {/* Vadodara Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in Vadodara
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vadodaraData.areas.map((area) => (
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
              to={`/gujarat/vadodara/service/${service.id}`}
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

        {/* Vadodara-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Vadodara, Gujarat</h2>
          <p>
            Vadodara is a prominent area in Gujarat, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Vadodara region,
            including Vadodara City, Alkapuri, Race Course, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Vadodara Services?</h3>
          <ul>
            <li><strong>Vadodara-Focused Verification:</strong> All companions serving Vadodara undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Vadodara Availability:</strong> Services available round the clock across all Vadodara areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Vadodara residents and visitors</li>
            <li><strong>Vadodara-Specific Safety:</strong> Secure platform with companions trained in Vadodara area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 65+ verified profiles of independent escorts and professional companions specifically available in Vadodara</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Vadodara's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Vadodara</h3>
          <p>
            Our Vadodara companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Vadodara business districts</li>
            <li>Restaurant and dinner dates in Vadodara's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Vadodara accommodations</li>
            <li>Body massage services in Vadodara residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Vadodara corporate and social events</li>
            <li>Travel companionship from Vadodara</li>
          </ul>

          <h3>Vadodara Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Vadodara zones:
          </p>
          <ul>
            <li><strong>Vadodara City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Alkapuri:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Race Course:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Fatehgunj:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Sayajigunj:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Manjalpur:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Akota:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Gotri:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Vadodara Escorts</h3>
          <p>
            Booking Vadodara-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Vadodara area</li>
            <li>Check real-time availability and Vadodara-specific rates</li>
            <li>Contact via phone or WhatsApp with Vadodara location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Vadodara-trained companions</li>
          </ol>

          <h3>Vadodara Safety & Discretion</h3>
          <p>
            Your safety and privacy in Vadodara are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Vadodara area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Vadodara's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Vadodara-based bookings</li>
          </ul>

          <h3>Vadodara Pricing Information</h3>
          <p>
            Competitive rates for Vadodara services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Vadodara)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Vadodara)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Vadodara accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Vadodara Services</h3>
          <p>
            For Vadodara-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Vadodara, Gujarat.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Vadodara FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Vadodara Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Vadodara?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Vadodara area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Vadodara's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Vadodara do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Vadodara City, Alkapuri, Race Course, Fatehgunj. 
                Our companions are strategically positioned across all these Vadodara zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Vadodara-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Vadodara escort profiles, specify your preferred area within Vadodara, 
                and contact us via phone or WhatsApp. Our team specializes in Vadodara bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Vadodara?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Vadodara. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Vadodara-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Vadodara services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Vadodara services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Vadodara-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Gujarat Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Gujarat Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Ahmedabad", slug: "ahmedabad", count: 50 },
              { name: "Gandhinagar", slug: "gandhinagar", count: 65 },
              { name: "Rajkot", slug: "rajkot", count: 80 },
              { name: "Surat", slug: "surat", count: 95 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/gujarat/${area.slug}`}
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

export default Vadodara;
