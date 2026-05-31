import React from 'react';
import EnhancedSEO from '../components/EnhancedSEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { buildLocalBusinessSchema, buildFAQSchema } from '../utils/advancedSchema';

const phone = "9324881345";

const Hyderabad = () => {
  const popularAreas = [
    {
        "name": "Banjara Hills",
        "slug": "banjara-hills",
        "count": 70
    },
    {
        "name": "Jubilee Hills",
        "slug": "jubilee-hills",
        "count": 65
    },
    {
        "name": "Hitech City",
        "slug": "hitech-city",
        "count": 60
    },
    {
        "name": "Gachibowli",
        "slug": "gachibowli",
        "count": 55
    },
    {
        "name": "Madhapur",
        "slug": "madhapur",
        "count": 50
    },
    {
        "name": "Secunderabad",
        "slug": "secunderabad",
        "count": 45
    },
    {
        "name": "Kukatpally",
        "slug": "kukatpally",
        "count": 40
    },
    {
        "name": "Kondapur",
        "slug": "kondapur",
        "count": 35
    }
];

  const cityFAQs = [
    {
      question: "Are the escort profiles in Hyderabad verified?",
      answer: "Yes, all profiles on our platform are verified with ID proof and authentic photos. We conduct thorough background checks to ensure safety and authenticity for all Hyderabad bookings."
    },
    {
      question: "What areas do you cover in Hyderabad?",
      answer: "We cover all major areas of Hyderabad including Banjara Hills, Jubilee Hills, Hitech City, Gachibowli, Madhapur. Our companions are available across the city 24/7."
    },
    {
      question: "How do I book an escort in Hyderabad?",
      answer: "Simply browse profiles, select your preferred companion, and contact us via phone or WhatsApp at +91-9324881345. Our team will help you complete the booking process securely and discreetly."
    },
    {
      question: "Is the service discreet in Hyderabad?",
      answer: "Absolutely. Your privacy is our top priority. All bookings are handled with complete confidentiality, and our companions are professional and discreet throughout Hyderabad."
    },
    {
      question: "What are the rates for escorts in Hyderabad?",
      answer: "Rates vary based on duration, service type, and companion experience. Typical ranges: 1 Hour: ₹5,000-₹15,000, 2 Hours: ₹8,000-₹25,000, Full Night: ₹20,000-₹50,000+. Contact us for exact pricing."
    }
  ];

  const localBusinessSchema = buildLocalBusinessSchema({
    city: "Hyderabad",
    state: "Telangana",
    latitude: 17.385,
    longitude: 78.4867,
    url: "https://www.escortmumbaii.in/hyderabad",
    services: [
      { name: "Verified Escorts", description: "Professional verified escort services in Hyderabad with ID-verified profiles" },
      { name: "Companion Services", description: "Premium companion services for events, dinners, and social occasions" },
      { name: "Massage Services", description: "Professional massage and relaxation services by verified companions" }
    ]
  });

  const faqSchema = buildFAQSchema(cityFAQs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));

  return (
    <div className="min-h-screen bg-neutral-50">
      <EnhancedSEO
        title="Hyderabad Escorts 2026 — 250+ Verified Profiles | BookEase"
        description="✓ 250+ verified Hyderabad escorts ✓ Banjara Hills, Jubilee Hills, Hitech City ✓ Available tonight ✓ 24/7 service. Book premium companions with verified photos. Safe, discreet, professional. 18+ only."
        canonical="https://www.escortmumbaii.in/hyderabad"
        image="https://www.escortmumbaii.in/hyderabad-og.jpg"
        breadcrumbs={[
          { name: "Home", url: "https://www.escortmumbaii.in/" },
          { name: "Hyderabad Escorts", url: "https://www.escortmumbaii.in/hyderabad" }
        ]}
        city="Hyderabad"
        cityData={{
          latitude: 17.385,
          longitude: 78.4867,
          services: [
            { name: "Verified Escorts", description: "Professional escorts in Hyderabad" },
            { name: "Companions", description: "Premium companion services" }
          ]
        }}
        faqSchema={faqSchema}
        jsonLd={[localBusinessSchema]}
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90" aria-label="Breadcrumb">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span>Hyderabad</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hyderabad Escorts 2026 — 250+ Verified Companions
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse 250+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Hyderabad. Discreet, safe, and professional service.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:+91${phone}`}
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2"
              aria-label="Call BookEase Hyderabad"
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
              aria-label="WhatsApp BookEase Hyderabad"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">

        {/* Popular Areas */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Popular Areas in Hyderabad
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularAreas.map((area) => (
              <article
                key={area.slug}
                className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-neutral-900">{area.name}</h3>
                  <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
                    {area.count}
                  </span>
                </div>
                <p className="text-sm text-neutral-600">
                  {area.count} verified profiles
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Hyderabad</h2>
          <p>
            Hyderabad, City of Pearls and IT hub, offers premium adult entertainment services.
            Our platform connects you with verified, professional escorts and companions across all
            major areas of Hyderabad.
          </p>

          <h3>Why Choose BookEase Hyderabad?</h3>
          <ul>
            <li><strong>Verified Profiles:</strong> All companions are ID verified with authentic photos</li>
            <li><strong>24/7 Availability:</strong> Services available round the clock</li>
            <li><strong>Discreet Service:</strong> Your privacy is our top priority</li>
            <li><strong>Wide Selection:</strong> 250+ verified profiles</li>
            <li><strong>Professional Service:</strong> Experienced, courteous companions</li>
          </ul>

          <h3>Coverage Areas</h3>
          <p>
            We serve all major areas of Hyderabad including: Banjara Hills, Jubilee Hills, Hitech City, Gachibowli, Madhapur, Secunderabad, Kukatpally, Kondapur.
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {cityFAQs.map((faq, index) => (
              <article key={index} className="border-b border-neutral-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-neutral-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Other Cities */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Mumbai", slug: "mumbai" },
              { name: "Delhi", slug: "delhi" },
              { name: "Bangalore", slug: "bangalore" },
              { name: "Pune", slug: "pune" },
              { name: "Hyderabad", slug: "hyderabad" },
              { name: "Chennai", slug: "chennai" },
              { name: "Kolkata", slug: "kolkata" },
              { name: "Goa", slug: "goa" },
            ].filter(city => city.name !== "Hyderabad").map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <span className="font-semibold text-neutral-900">{city.name}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Sticky Bottom Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-50 md:hidden">
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

export default Hyderabad;
