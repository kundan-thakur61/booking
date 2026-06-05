import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Delhi/Rohiniservices';

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

const Rohini = () => {
  // Filter services available in Rohini
  const rohiniServices = services.slice(0, 6);

  // Rohini-specific data
  const rohiniData = {
    name: "Rohini",
    city: "Rohini",
    state: "Delhi",
    pinCodes: ["110085", "110086"],
    coordinates: {
      latitude: 28.74,
      longitude: 77.11
    },
    areas: [
      "Rohini Sector 1-25", "Pitampura", "Shalimar Bagh", "Prashant Vihar",
      "Budh Vihar", "Begumpur"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Rohini using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const rohiniSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: rohiniData.name,
    state: rohiniData.state,
    slug: "rohini",
    coordinates: rohiniData.coordinates,
    areas: rohiniData.areas,
    services: rohiniData.services,
    primaryPinCode: rohiniData.pinCodes[0]
  });

  const localBusinessSchema = rohiniSchemaPackage.localBusiness;
  const locationFaqSchema = rohiniSchemaPackage.faq;
  const breadcrumbSchema = rohiniSchemaPackage.breadcrumb;

  // Product schemas for featured services in Rohini
  const rohiniProductSchemas = rohiniServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Rohini Client", rating: 5, text: "Excellent service in Rohini, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Rohini Sector 1-25.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Rohini testimonials
  const rohiniReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Rohini Client",
      rating: 5,
      text: "Outstanding service from BookEase in Rohini. Verified companions, safe booking, and professional experience in Rohini Sector 1-25.",
      date: "2026-01-16"
    }, "BookEase Rohini Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Rohini. 24/7 availability and complete discretion guaranteed across Pitampura and Shalimar Bagh.",
      date: "2026-01-14"
    }, "BookEase Rohini Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const rohiniFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Rohini?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Rohini area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Rohini clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Rohini do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Rohini including Rohini Sector 1-25, Pitampura, Shalimar Bagh, Prashant Vihar. Our companions are available across the entire Rohini region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Rohini?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Rohini escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Rohini bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Rohini?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Rohini. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Rohini area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Rohini?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Rohini typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Rohini Escorts 2026 \u2014 70+ Verified Profiles | BookEase Delhi"
        description="\u2713 70+ verified Rohini escorts \u2713 Rohini Sector 1-25 & Pitampura \u2713 Available tonight \u2713 24/7 service. Book premium companions in Rohini Sector 1-25, Pitampura, Shalimar Bagh. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/delhi/rohini"
        image="https://www.escortmumbaii.in/rohini-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...rohiniProductSchemas, ...rohiniReviewSchemas]}
        faqSchema={rohiniFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Rohini escorts 2026, escorts in Rohini, verified Rohini escorts, 70+ profiles, Rohini Sector 1-25 escorts, Pitampura escorts, Shalimar Bagh escorts, available tonight' },
          { name: 'geo.position', content: `${rohiniData.coordinates.latitude};${rohiniData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Rohini, Delhi' },
          { name: 'geo.region', content: 'IN-DL' }
        ]}
        city="Delhi"
        area="Rohini"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Rohini Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-red from-pink-600 to-pink-700 text-white py-12">
        <div className="w-full px-1.5 py-8 sm:px-6">
          <nav className="text-sm mb-4 opacity-90 bg">
            <Link to="/" className="hover:underline text-white">Home</Link>
            <span className="mx-2"></span>
            <Link to="/delhi" className="hover:underline text-white">Delhi</Link>
            <span className="mx-2"></span>
            <span>Rohini</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 px-1.5">
            Rohini Escorts 2026  70+ Verified Companions in Rohini Sector 1-25 & Pitampura
          </h1>
          <p className="text-xl mb-6 max-w-3xl text-black px-1.5">
            Browse 70+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Rohini including Rohini Sector 1-25, Pitampura, Shalimar Bagh.
            Discreet, safe, and professional service specifically for Rohini residents and visitors.
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

        {/* Rohini Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 px-1.5">
            Areas Covered in Rohini
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rohiniData.areas.map((area) => (
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
              to={`/delhi/rohini/service/${service.id}`}
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

        {/* Rohini-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Rohini, Delhi</h2>
          <p>
            Rohini is a prominent area in Delhi, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Rohini region,
            including Rohini Sector 1-25, Pitampura, Shalimar Bagh, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Rohini Services?</h3>
          <ul>
            <li><strong>Rohini-Focused Verification:</strong> All companions serving Rohini undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Rohini Availability:</strong> Services available round the clock across all Rohini areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Rohini residents and visitors</li>
            <li><strong>Rohini-Specific Safety:</strong> Secure platform with companions trained in Rohini area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 70+ verified profiles of independent escorts and professional companions specifically available in Rohini</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Rohini's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Rohini</h3>
          <p>
            Our Rohini companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Rohini business districts</li>
            <li>Restaurant and dinner dates in Rohini's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Rohini accommodations</li>
            <li>Body massage services in Rohini residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Rohini corporate and social events</li>
            <li>Travel companionship from Rohini</li>
          </ul>

          <h3>Rohini Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Rohini zones:
          </p>
          <ul>
            <li><strong>Rohini Sector 1-25:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Pitampura:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Shalimar Bagh:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Prashant Vihar:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Budh Vihar:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Begumpur:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Rohini Escorts</h3>
          <p>
            Booking Rohini-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Rohini area</li>
            <li>Check real-time availability and Rohini-specific rates</li>
            <li>Contact via phone or WhatsApp with Rohini location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Rohini-trained companions</li>
          </ol>

          <h3>Rohini Safety & Discretion</h3>
          <p>
            Your safety and privacy in Rohini are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Rohini area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Rohini's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Rohini-based bookings</li>
          </ul>

          <h3>Rohini Pricing Information</h3>
          <p>
            Competitive rates for Rohini services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Rohini)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Rohini)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Rohini accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Rohini Services</h3>
          <p>
            For Rohini-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Rohini, Delhi.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Rohini FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Rohini Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Rohini?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Rohini area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Rohini's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Rohini do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Rohini Sector 1-25, Pitampura, Shalimar Bagh, Prashant Vihar. 
                Our companions are strategically positioned across all these Rohini zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Rohini-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Rohini escort profiles, specify your preferred area within Rohini, 
                and contact us via phone or WhatsApp. Our team specializes in Rohini bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Rohini?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Rohini. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Rohini-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Rohini services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Rohini services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Rohini-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Delhi Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Delhi Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1.5">
            {[
              { name: "Connaught Place", slug: "connaught-place", count: 50 },
              { name: "Dwarka", slug: "dwarka", count: 65 },
              { name: "Lajpat Nagar", slug: "lajpat-nagar", count: 80 },
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

export default Rohini;
