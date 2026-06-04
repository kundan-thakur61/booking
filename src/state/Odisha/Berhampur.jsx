import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Odisha/Berhampurservices';

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

const Berhampur = () => {
  // Filter services available in Berhampur
  const berhampurServices = services.slice(0, 6);

  // Berhampur-specific data
  const berhampurData = {
    name: "Berhampur",
    city: "Berhampur",
    state: "Odisha",
    pinCodes: ["760001"],
    coordinates: {
      latitude: 19.31,
      longitude: 84.79
    },
    areas: [
      "Berhampur City", "Gandhi Nagar", "Ambapua", "Tumb",
      "Engineering School", "Court Road", "Giri Road", "Lanjipalli"
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for Berhampur using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const berhampurSchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: berhampurData.name,
    state: berhampurData.state,
    slug: "berhampur",
    coordinates: berhampurData.coordinates,
    areas: berhampurData.areas,
    services: berhampurData.services,
    primaryPinCode: berhampurData.pinCodes[0]
  });

  const localBusinessSchema = berhampurSchemaPackage.localBusiness;
  const locationFaqSchema = berhampurSchemaPackage.faq;
  const breadcrumbSchema = berhampurSchemaPackage.breadcrumb;

  // Product schemas for featured services in Berhampur
  const berhampurProductSchemas = berhampurServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Berhampur Client", rating: 5, text: "Excellent service in Berhampur, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Berhampur City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for Berhampur testimonials
  const berhampurReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Berhampur Client",
      rating: 5,
      text: "Outstanding service from BookEase in Berhampur. Verified companions, safe booking, and professional experience in Berhampur City.",
      date: "2026-01-16"
    }, "BookEase Berhampur Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Berhampur. 24/7 availability and complete discretion guaranteed across Gandhi Nagar and Ambapua.",
      date: "2026-01-14"
    }, "BookEase Berhampur Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const berhampurFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Berhampur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Berhampur area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for Berhampur clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Berhampur do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Berhampur including Berhampur City, Gandhi Nagar, Ambapua, Tumb. Our companions are available across the entire Berhampur region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Berhampur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Berhampur escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in Berhampur bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Berhampur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Berhampur. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for Berhampur area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Berhampur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Berhampur typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Berhampur Escorts 2026 \u2014 68+ Verified Profiles | BookEase Odisha"
        description="\u2713 68+ verified Berhampur escorts \u2713 Berhampur City & Gandhi Nagar \u2713 Available tonight \u2713 24/7 service. Book premium companions in Berhampur City, Gandhi Nagar, Ambapua. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/odisha/berhampur"
        image="https://www.escortmumbaii.in/berhampur-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...berhampurProductSchemas, ...berhampurReviewSchemas]}
        faqSchema={berhampurFaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Berhampur escorts 2026, escorts in Berhampur, verified Berhampur escorts, 68+ profiles, Berhampur City escorts, Gandhi Nagar escorts, Ambapua escorts, available tonight' },
          { name: 'geo.position', content: `${berhampurData.coordinates.latitude};${berhampurData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Berhampur, Odisha' },
          { name: 'geo.region', content: 'IN-XX' }
        ]}
        city="Odisha"
        area="Berhampur"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Berhampur Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90 bg">
            <Link to="/" className="hover:underline text-white">Home</Link>
            <span className="mx-2"></span>
            <Link to="/odisha" className="hover:underline text-white">Odisha</Link>
            <span className="mx-2"></span>
            <span>Berhampur</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Berhampur Escorts 2026  68+ Verified Companions in Berhampur City & Gandhi Nagar
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse 68+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Berhampur including Berhampur City, Gandhi Nagar, Ambapua.
            Discreet, safe, and professional service specifically for Berhampur residents and visitors.
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

        {/* Berhampur Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in Berhampur
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {berhampurData.areas.map((area) => (
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
              to={`/odisha/berhampur/service/${service.id}`}
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

        {/* Berhampur-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Berhampur, Odisha</h2>
          <p>
            Berhampur is a prominent area in Odisha, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Berhampur region,
            including Berhampur City, Gandhi Nagar, Ambapua, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Berhampur Services?</h3>
          <ul>
            <li><strong>Berhampur-Focused Verification:</strong> All companions serving Berhampur undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 Berhampur Availability:</strong> Services available round the clock across all Berhampur areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for Berhampur residents and visitors</li>
            <li><strong>Berhampur-Specific Safety:</strong> Secure platform with companions trained in Berhampur area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> 68+ verified profiles of independent escorts and professional companions specifically available in Berhampur</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Berhampur's layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in Berhampur</h3>
          <p>
            Our Berhampur companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for Berhampur business districts</li>
            <li>Restaurant and dinner dates in Berhampur's dining hubs</li>
            <li>Hotel visits (incall/outcall) in Berhampur accommodations</li>
            <li>Body massage services in Berhampur residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for Berhampur corporate and social events</li>
            <li>Travel companionship from Berhampur</li>
          </ul>

          <h3>Berhampur Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major Berhampur zones:
          </p>
          <ul>
            <li><strong>Berhampur City:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Gandhi Nagar:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Ambapua:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Tumb:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Engineering School:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Court Road:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Giri Road:</strong> Full service coverage with verified companions available 24/7</li>
            <li><strong>Lanjipalli:</strong> Full service coverage with verified companions available 24/7</li>
          </ul>

          <h3>How to Book Berhampur Escorts</h3>
          <p>
            Booking Berhampur-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your Berhampur area</li>
            <li>Check real-time availability and Berhampur-specific rates</li>
            <li>Contact via phone or WhatsApp with Berhampur location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with Berhampur-trained companions</li>
          </ol>

          <h3>Berhampur Safety & Discretion</h3>
          <p>
            Your safety and privacy in Berhampur are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with Berhampur area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with Berhampur's safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for Berhampur-based bookings</li>
          </ul>

          <h3>Berhampur Pricing Information</h3>
          <p>
            Competitive rates for Berhampur services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000 (varies by location within Berhampur)</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000 (includes transportation within Berhampur)</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+ (overnight Berhampur accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact Berhampur Services</h3>
          <p>
            For Berhampur-specific bookings and inquiries:
          </p>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Berhampur, Odisha.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* Berhampur FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Berhampur Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for Berhampur?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the Berhampur area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for Berhampur's unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in Berhampur do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover Berhampur City, Gandhi Nagar, Ambapua, Tumb. 
                Our companions are strategically positioned across all these Berhampur zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a Berhampur-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our Berhampur escort profiles, specify your preferred area within Berhampur, 
                and contact us via phone or WhatsApp. Our team specializes in Berhampur bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in Berhampur?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in Berhampur. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in Berhampur-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for Berhampur services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for Berhampur services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any Berhampur-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related Odisha Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Odisha Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Bhubaneswar", slug: "bhubaneswar", count: 50 },
              { name: "Cuttack", slug: "cuttack", count: 65 },
              { name: "Puri", slug: "puri", count: 80 },
              { name: "Rourkela", slug: "rourkela", count: 95 },
              { name: "Sambalpur", slug: "sambalpur", count: 110 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/odisha/${area.slug}`}
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

export default Berhampur;
