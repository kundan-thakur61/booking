import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Punjab/Mohaliservices';

import {
  buildEnhancedOrganizationSchema,
  buildProductSchema,
  buildReviewSchema
} from '../../utils/schema';

import { LocalBusinessSchemaGenerator } from '../../seo/local-business-schema';

const phone = "9324881345";

const Mohali = () => {
  const cityServices = services.slice(0, 6);

  const cityData = {
    name: "Mohali",
    city: "Mohali",
    state: "Punjab",
    pinCodes: ["160062"],
    coordinates: {
      latitude: 30.7,
      longitude: 76.72
    },
    areas: ["Mohali City", "Phase 1", "Phase 5", "Phase 7", "Phase 8", "Sector 68", "IT City", "Aerocity"],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services",
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const schemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: cityData.name,
    state: cityData.state,
    slug: "mohali",
    coordinates: cityData.coordinates,
    areas: cityData.areas,
    services: cityData.services,
    primaryPinCode: cityData.pinCodes[0]
  });

  const localBusinessSchema = schemaPackage.localBusiness;
  const breadcrumbSchema = schemaPackage.breadcrumb;

  const productSchemas = cityServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Mohali Client", rating: 5, text: "Excellent service in Mohali, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Mohali City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  const reviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Mohali Client",
      rating: 5,
      text: "Outstanding service from BookEase in Mohali. Verified companions, safe booking, and professional experience.",
      date: "2026-01-16"
    }, "BookEase Mohali Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Mohali. 24/7 availability and complete discretion guaranteed.",
      date: "2026-01-14"
    }, "BookEase Mohali Escort Services")
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Mohali area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity."
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
          "text": "Browse our verified Mohali escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Mohali. All bookings are handled with complete confidentiality."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Mohali?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Mohali typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Mohali Escorts 2026 \u2014 117+ Verified Profiles | BookEase Punjab"
        description="\u2713 117+ verified Mohali escorts \u2713 Mohali City & Phase 1 \u2713 Available tonight \u2713 24/7 service. Book premium companions in Mohali. 18+ only."
        canonical="https://www.escortmumbaii.in/punjab/mohali"
        image="https://www.escortmumbaii.in/mohali-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...productSchemas, ...reviewSchemas]}
        faqSchema={faqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Mohali escorts 2026, escorts in Mohali, verified Mohali escorts, Mohali City escorts, available tonight' },
          { name: 'geo.position', content: `${cityData.coordinates.latitude};${cityData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Mohali, Punjab' },
          { name: 'geo.region', content: 'IN-PB' }
        ]}
        city="Punjab"
        area="Mohali"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Mohali Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">\u203a</span>
            <Link to="/find-all-city" className="hover:underline">Punjab</Link>
            <span className="mx-2">\u203a</span>
            <span>Mohali</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mohali Escorts 2026 \u2014 117+ Verified Companions in Mohali City & Phase 1
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse 117+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Mohali including Mohali City, Phase 1, Phase 5, Phase 7.
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

        {/* Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in Mohali
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cityData.areas.map((area) => (
              <div key={area} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200">
                <h3 className="font-bold text-neutral-900">{area}</h3>
                <p className="text-sm text-neutral-600 mt-1">Service available 24/7</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="py-12 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Link to={`/punjab/mohali/service/${service.id}`} className="block h-full">
                  <div className="relative overflow-hidden">
                    <LazyImage src={service.image} alt={service.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">View Profiles</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">{service.name}</h3>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.availability}
                      </div>
                      <div className="text-pink-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">View Options \u2192</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Mohali, Punjab</h2>
          <p>
            Mohali is a prominent area in Punjab, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Mohali region,
            including Mohali City, Phase 1, Phase 5, Phase 7, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Mohali Services?</h3>
          <ul>
            <li><strong>Mohali-Focused Verification:</strong> All companions undergo specific background checks and area familiarity training</li>
            <li><strong>24/7 Mohali Availability:</strong> Services available round the clock across all Mohali areas</li>
            <li><strong>Local Discretion:</strong> Confidential booking processes designed for Mohali residents and visitors</li>
            <li><strong>Safe Platform:</strong> Companions trained in Mohali area safety protocols</li>
            <li><strong>Extensive Selection:</strong> 117+ verified profiles available in Mohali</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Mohali's layout and venues</li>
          </ul>

          <h3>Mohali Coverage Areas</h3>
          <ul>
            {cityData.areas.map(area => (
              <li key={area}><strong>{area}:</strong> Full service coverage with verified companions available 24/7</li>
            ))}
          </ul>

          <h3>Mohali Pricing</h3>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+</li>
            <li>VIP/Premium: Custom rates</li>
          </ul>

          <h3>Contact Mohali Services</h3>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Mohali, Punjab.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Mohali Services
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Are the escorts verified in Mohali?</h3>
              <p className="text-neutral-600">Yes, all escorts serving Mohali undergo verification including ID proof, authentic photos, and background checks.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">What areas in Mohali do you cover?</h3>
              <p className="text-neutral-600">We cover Mohali City, Phase 1, Phase 5, Phase 7 and all surrounding areas. Companions are positioned across Mohali for quick response.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">How do I book in Mohali?</h3>
              <p className="text-neutral-600">Browse our Mohali profiles, select your preferred companion, and contact us via phone or WhatsApp.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Is the service discreet?</h3>
              <p className="text-neutral-600">Absolutely. All Mohali bookings are handled with complete confidentiality and professional discretion.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">What payment methods are accepted?</h3>
              <p className="text-neutral-600">We accept cash payments. All rates are confirmed at the time of booking with transparent pricing.</p>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Punjab Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Ludhiana", slug: "ludhiana", count: 50 },
              { name: "Amritsar", slug: "amritsar", count: 65 },
              { name: "Jalandhar", slug: "jalandhar", count: 80 },
              { name: "Patiala", slug: "patiala", count: 95 },
              { name: "Bathinda", slug: "bathinda", count: 110 }
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
          <a href={`tel:+91${phone}`} className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors">
            Call Now
          </a>
          <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Mohali;
