import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateCityFAQSchema } from '../utils/localBusinessSchema';

/**
 * CITY PAGE TEMPLATE
 * 
 * To create a new city page:
 * 1. Copy this file to src/pages/{CityName}.jsx
 * 2. Update CITY_CONFIG object with city-specific data
 * 3. Update popularAreas array
 * 4. Update cityFAQs array
 * 5. Update SEO content in the prose section
 * 6. Add route to App.jsx
 */

const phone = "7633807420";

// ============================================================================
// CONFIGURATION - UPDATE THIS FOR EACH CITY
// ============================================================================
const CITY_CONFIG = {
  name: "Delhi",                    // City name
  slug: "delhi",                    // URL slug
  profileCount: "450+",             // Number of profiles
  state: "Delhi",                   // State name
  rating: 4.7,                      // Average rating
  reviewCount: 1342,                // Number of reviews
  
  // Top 3 areas for H1 and meta description
  topAreas: ["Connaught Place", "Karol Bagh", "South Delhi"],
  
  // Pricing ranges (optional, can be same for all cities)
  pricing: {
    oneHour: "₹5,000 - ₹15,000",
    twoHours: "₹8,000 - ₹25,000",
    fullNight: "₹20,000 - ₹50,000+"
  }
};

const popularAreas = [
  { name: "Connaught Place", slug: "connaught-place", count: 120 },
  { name: "Karol Bagh", slug: "karol-bagh", count: 95 },
  { name: "South Delhi", slug: "south-delhi", count: 85 },
  { name: "Dwarka", slug: "dwarka", count: 70 },
  { name: "Noida", slug: "noida", count: 65 },
  { name: "Gurgaon", slug: "gurgaon", count: 60 },
  { name: "Rohini", slug: "rohini", count: 55 },
  { name: "Lajpat Nagar", slug: "lajpat-nagar", count: 50 },
];

const cityFAQs = [
  {
    question: `Are the escort profiles in ${CITY_CONFIG.name} verified?`,
    answer: `Yes, all profiles on our platform are verified with ID proof and authentic photos. We conduct thorough background checks to ensure safety and authenticity for all ${CITY_CONFIG.name} bookings.`
  },
  {
    question: `What areas do you cover in ${CITY_CONFIG.name}?`,
    answer: `We cover all major areas of ${CITY_CONFIG.name} including ${popularAreas.slice(0, 5).map(a => a.name).join(', ')}, and many more. Our companions are available across the city 24/7.`
  },
  {
    question: `How do I book an escort in ${CITY_CONFIG.name}?`,
    answer: `Simply browse profiles, select your preferred companion, and contact us via phone or WhatsApp at +91-${phone}. Our team will help you complete the booking process securely and discreetly.`
  },
  {
    question: `Is the service discreet in ${CITY_CONFIG.name}?`,
    answer: `Absolutely. Your privacy is our top priority. All bookings are handled with complete confidentiality, and our companions are professional and discreet throughout ${CITY_CONFIG.name}.`
  },
  {
    question: `What are the rates for escorts in ${CITY_CONFIG.name}?`,
    answer: `Rates vary based on duration, service type, and companion experience. Typical ranges: 1 Hour: ${CITY_CONFIG.pricing.oneHour}, 2 Hours: ${CITY_CONFIG.pricing.twoHours}, Full Night: ${CITY_CONFIG.pricing.fullNight}. Contact us for exact pricing.`
  }
];

// ============================================================================
// COMPONENT
// ============================================================================
const CityPageTemplate = () => {
  // Generate structured data
  const localBusinessSchema = generateLocalBusinessSchema({
    city: CITY_CONFIG.name,
    profileCount: CITY_CONFIG.profileCount,
    areas: popularAreas.map(a => a.name),
    phone: `+91-${phone}`,
    rating: CITY_CONFIG.rating,
    reviewCount: CITY_CONFIG.reviewCount
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.escortmumbaii.in/" },
    { name: `${CITY_CONFIG.name} Escorts`, url: `https://www.escortmumbaii.in/${CITY_CONFIG.slug}` }
  ]);

  const faqSchema = generateCityFAQSchema(CITY_CONFIG.name, cityFAQs);

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title={`${CITY_CONFIG.name} Escorts 2026 — ${CITY_CONFIG.profileCount} Verified Profiles | BookEase`}
        description={`✓ ${CITY_CONFIG.profileCount} verified ${CITY_CONFIG.name} escorts ✓ ${CITY_CONFIG.topAreas.join(', ')} ✓ Available tonight ✓ 24/7 service. Book premium companions with verified photos. Safe, discreet, professional. 18+ only.`}
        canonical={`https://www.escortmumbaii.in/${CITY_CONFIG.slug}`}
        image={`https://www.escortmumbaii.in/${CITY_CONFIG.slug}-og.jpg`}
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[localBusinessSchema]}
        faqSchema={faqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: `${CITY_CONFIG.name} escorts 2026, verified ${CITY_CONFIG.name} escorts, ${CITY_CONFIG.profileCount} profiles, ${popularAreas.slice(0, 3).map(a => a.name + ' escorts').join(', ')}, available tonight, ${CITY_CONFIG.name} escort services` },
          { name: 'geo.region', content: `IN-${CITY_CONFIG.state.substring(0, 2).toUpperCase()}` },
          { name: 'geo.placename', content: CITY_CONFIG.name }
        ]}
        city={CITY_CONFIG.name}
        serviceName="Verified Escort Services"
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-700 text-white hero-responsive">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90" aria-label="Breadcrumb">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span>{CITY_CONFIG.name}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            {CITY_CONFIG.name} Escorts 2026 — {CITY_CONFIG.profileCount} Verified Companions in {CITY_CONFIG.topAreas.join(', ')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 max-w-3xl">
            Browse {CITY_CONFIG.profileCount} verified profiles of premium escorts and independent companions
            available 24/7 across all areas of {CITY_CONFIG.name}. Discreet, safe, and professional service.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={`tel:+91${phone}`}
              className="w-full sm:w-auto bg-white text-pink-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors inline-flex items-center justify-center gap-2 text-center"
              aria-label={`Call BookEase ${CITY_CONFIG.name}`}
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
              className="w-full sm:w-auto bg-green-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2 text-center"
              aria-label={`WhatsApp BookEase ${CITY_CONFIG.name}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Popular Areas */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6">
            Popular Areas in {CITY_CONFIG.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {popularAreas.map((area) => (
              <article
                key={area.slug}
                className="bg-white rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow border border-neutral-200"
              >
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{area.name}</h3>
                  <span className="bg-pink-100 text-pink-700 text-xs px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0 ml-1">
                    {area.count}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600">
                  {area.count} verified profiles
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose prose-lg max-w-none mb-8 sm:mb-12 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <h2>About Escort Services in {CITY_CONFIG.name}</h2>
          <p>
            {CITY_CONFIG.name} is a vibrant city with a thriving adult entertainment scene.
            Our platform connects you with verified, professional escorts and companions across all
            major areas of {CITY_CONFIG.name} including {popularAreas.slice(0, 5).map(a => a.name).join(', ')}, and beyond.
          </p>

          <h3>Why Choose BookEase {CITY_CONFIG.name}?</h3>
          <ul>
            <li><strong>Verified Profiles:</strong> All companions are ID verified with authentic photos, ensuring complete transparency and trust for safe bookings</li>
            <li><strong>24/7 Availability:</strong> Services available round the clock with real-time availability updates</li>
            <li><strong>Discreet Service:</strong> Your privacy is our top priority with confidential booking and secure transactions</li>
            <li><strong>Wide Selection:</strong> {CITY_CONFIG.profileCount} verified profiles across {CITY_CONFIG.name}</li>
            <li><strong>Professional Service:</strong> Experienced, courteous companions with background-checked profiles</li>
          </ul>

          <h3>Popular Services in {CITY_CONFIG.name}</h3>
          <p>Our {CITY_CONFIG.name} companions offer a wide range of services including:</p>
          <ul>
            <li>Companionship for social events</li>
            <li>Travel companionship</li>
            <li>Dinner dates</li>
            <li>Hotel visits (incall/outcall)</li>
            <li>Body massage services</li>
            <li>GFE (Girlfriend Experience)</li>
            <li>VIP escort services</li>
          </ul>

          <h3>Coverage Areas</h3>
          <p>
            We serve all major areas of {CITY_CONFIG.name} including: {popularAreas.map(a => a.name).join(', ')}.
          </p>

          <h3>How to Book</h3>
          <ol>
            <li>Browse verified profiles in your preferred area</li>
            <li>Check availability and rates</li>
            <li>Contact via phone or WhatsApp</li>
            <li>Confirm your booking details</li>
            <li>Enjoy professional, discreet service</li>
          </ol>

          <h3>Safety & Discretion</h3>
          <p>Your safety and privacy are paramount. All our companions are:</p>
          <ul>
            <li>ID verified and background checked</li>
            <li>Bound by strict confidentiality agreements</li>
            <li>Professional and experienced</li>
            <li>Health conscious and hygiene focused</li>
          </ul>

          <h3>Pricing Information</h3>
          <p>Rates vary based on duration, service type, and companion experience. Typical ranges:</p>
          <ul>
            <li>1 Hour: {CITY_CONFIG.pricing.oneHour}</li>
            <li>2 Hours: {CITY_CONFIG.pricing.twoHours}</li>
            <li>Full Night: {CITY_CONFIG.pricing.fullNight}</li>
            <li>VIP/Premium: Custom rates</li>
          </ul>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 sm:space-y-6">
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
        <section className="bg-neutral-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6">
            Explore Other Cities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Mumbai", slug: "mumbai" },
              { name: "Delhi", slug: "delhi" },
              { name: "Bangalore", slug: "bangalore" },
              { name: "Pune", slug: "pune" },
              { name: "Hyderabad", slug: "hyderabad" },
              { name: "Chennai", slug: "chennai" },
              { name: "Kolkata", slug: "kolkata" },
              { name: "Ahmedabad", slug: "ahmedabad" },
            ].filter(city => city.slug !== CITY_CONFIG.slug).map((city) => (
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

      {/* Sticky Contact Bar - Mobile */}
      <div className="sticky-bottom-bar md:hidden">
        <div className="flex gap-3">
          <a
            href={`tel:+91${phone}`}
            className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors text-sm sm:text-base"
          >
            Call Now
          </a>
          <a
            href={`https://wa.me/91${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CityPageTemplate;
