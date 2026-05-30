import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/Jharkhand/Ranchiservices';

import {
  buildEnhancedOrganizationSchema,
  buildProductSchema,
  buildReviewSchema
} from '../../utils/schema';

import { LocalBusinessSchemaGenerator } from '../../seo/local-business-schema';

const phone = "9324881345";

const Ranchi = () => {
  const cityServices = services.slice(0, 6);

  const cityData = {
    name: "Ranchi",
    city: "Ranchi",
    state: "Jharkhand",
    pinCodes: ["834001"],
    coordinates: {
      latitude: 23.34,
      longitude: 85.31
    },
    areas: ["Ranchi City", "Main Road", "Doranda", "Morabadi", "Lalpur", "Bariatu", "Kanke", "Ratu Road"],
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
    slug: "ranchi",
    coordinates: cityData.coordinates,
    areas: cityData.areas,
    services: cityData.services,
    primaryPinCode: cityData.pinCodes[0]
  });

  const localBusinessSchema = schemaPackage.localBusiness;
  const breadcrumbSchema = schemaPackage.breadcrumb;

  const productSchemas = cityServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Ranchi Client", rating: 5, text: "Excellent service in Ranchi, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Ranchi City.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  const reviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Ranchi Client",
      rating: 5,
      text: "Outstanding service from BookEase in Ranchi. Verified companions, safe booking, and professional experience.",
      date: "2026-01-16"
    }, "BookEase Ranchi Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in Ranchi. 24/7 availability and complete discretion guaranteed.",
      date: "2026-01-14"
    }, "BookEase Ranchi Escort Services")
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in Ranchi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving Ranchi area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in Ranchi do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of Ranchi including Ranchi City, Main Road, Doranda, Morabadi. Our companions are available across the entire Ranchi region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in Ranchi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified Ranchi escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in Ranchi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in Ranchi. All bookings are handled with complete confidentiality."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in Ranchi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in Ranchi typically range from \u20b95,000-\u20b915,000 per hour, \u20b98,000-\u20b925,000 for 2 hours, and \u20b920,000-\u20b950,000+ for full night services."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Ranchi Escorts 2026 \u2014 67+ Verified Profiles | BookEase Jharkhand"
        description="\u2713 67+ verified Ranchi escorts \u2713 Ranchi City & Main Road \u2713 Available tonight \u2713 24/7 service. Book premium companions in Ranchi. 18+ only."
        canonical="https://www.escortmumbaii.in/jharkhand/ranchi"
        image="https://www.escortmumbaii.in/ranchi-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...productSchemas, ...reviewSchemas]}
        faqSchema={faqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: 'Ranchi escorts 2026, escorts in Ranchi, verified Ranchi escorts, Ranchi City escorts, available tonight' },
          { name: 'geo.position', content: `${cityData.coordinates.latitude};${cityData.coordinates.longitude}` },
          { name: 'geo.placename', content: 'Ranchi, Jharkhand' },
          { name: 'geo.region', content: 'IN-JH' }
        ]}
        city="Jharkhand"
        area="Ranchi"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="Ranchi Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-6 md:py-10">
        <div className="container mx-auto px-4">
          <nav className="text-xs mb-2 opacity-80">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">\u203a</span>
            <Link to="/find-all-city" className="hover:underline">Jharkhand</Link>
            <span className="mx-2">\u203a</span>
            <span>Ranchi</span>
          </nav>

          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
            Ranchi Escorts 2026 \u2014 67+ Verified Companions in Ranchi City & Main Road
          </h1>
          <p className="text-sm md:text-base mb-4 max-w-3xl leading-relaxed opacity-90">
            Browse 67+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of Ranchi including Ranchi City, Main Road, Doranda, Morabadi.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:+91${phone}`}
              className="bg-white text-pink-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-1.5"
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
              className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-1.5"
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
            Areas Covered in Ranchi
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {cityData.areas.map((area) => (
              <span key={area} className="inline-flex items-center gap-1 bg-pink-50 border border-pink-100 rounded-md px-2.5 py-1 text-xs font-medium text-pink-700">
                <svg className="w-3 h-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="py-12 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Link to={`/jharkhand/ranchi/service/${service.id}`} className="block h-full">
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
          <h2>About Escort Services in Ranchi, Jharkhand</h2>
          <p>
            Ranchi is a prominent area in Jharkhand, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the Ranchi region,
            including Ranchi City, Main Road, Doranda, Morabadi, and surrounding areas.
          </p>

          <h3>Why Choose BookEase Ranchi Services?</h3>
          <ul>
            <li><strong>Ranchi-Focused Verification:</strong> All companions undergo specific background checks and area familiarity training</li>
            <li><strong>24/7 Ranchi Availability:</strong> Services available round the clock across all Ranchi areas</li>
            <li><strong>Local Discretion:</strong> Confidential booking processes designed for Ranchi residents and visitors</li>
            <li><strong>Safe Platform:</strong> Companions trained in Ranchi area safety protocols</li>
            <li><strong>Extensive Selection:</strong> 67+ verified profiles available in Ranchi</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with Ranchi's layout and venues</li>
          </ul>

          <h3>Ranchi Coverage Areas</h3>
          <ul>
            {cityData.areas.map(area => (
              <li key={area}><strong>{area}:</strong> Full service coverage with verified companions available 24/7</li>
            ))}
          </ul>

          <h3>Ranchi Pricing</h3>
          <ul>
            <li>1 Hour: \u20b95,000 - \u20b915,000</li>
            <li>2 Hours: \u20b98,000 - \u20b925,000</li>
            <li>Full Night: \u20b920,000 - \u20b950,000+</li>
            <li>VIP/Premium: Custom rates</li>
          </ul>

          <h3>Contact Ranchi Services</h3>
          <p>
            \ud83d\udcde Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            \ud83d\udcac WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in Ranchi, Jharkhand.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Ranchi Services
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Are the escorts verified in Ranchi?</h3>
              <p className="text-neutral-600">Yes, all escorts serving Ranchi undergo verification including ID proof, authentic photos, and background checks.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">What areas in Ranchi do you cover?</h3>
              <p className="text-neutral-600">We cover Ranchi City, Main Road, Doranda, Morabadi and all surrounding areas. Companions are positioned across Ranchi for quick response.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">How do I book in Ranchi?</h3>
              <p className="text-neutral-600">Browse our Ranchi profiles, select your preferred companion, and contact us via phone or WhatsApp.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Is the service discreet?</h3>
              <p className="text-neutral-600">Absolutely. All Ranchi bookings are handled with complete confidentiality and professional discretion.</p>
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
            Explore Other Jharkhand Areas
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: "Jamshedpur", slug: "jamshedpur", count: 50 },
              { name: "Dhanbad", slug: "dhanbad", count: 65 },
              { name: "Bokaro", slug: "bokaro", count: 80 },
              { name: "Hazaribagh", slug: "hazaribagh", count: 95 },
              { name: "Deoghar", slug: "deoghar", count: 110 },
              { name: "Giridih", slug: "giridih", count: 125 }
            ].map((area) => (
              <Link
                key={area.slug}
                to={`/jharkhand/${area.slug}`}
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

export default Ranchi;


// import React, { useState } from 'react';
// import SEO from '../../components/SEO';
// import { Link } from 'react-router-dom';
// import Header from '../../components/Header';
// import LazyImage from '../../components/LazyImage';
// import { services } from '../../data/Jharkhand/Ranchiservices';

// import {
//   buildEnhancedOrganizationSchema,
//   buildProductSchema,
//   buildReviewSchema
// } from '../../utils/schema';

// import { LocalBusinessSchemaGenerator } from '../../seo/local-business-schema';

// const phone = "9324881345";

// /* ─────────────────────────────────────────
//    ServiceCard — maps every field from the
//    services data object
// ───────────────────────────────────────── */
// function ServiceCard({ service }) {
//   const allImages = [service.image, ...(service.images || [])];
//   const [activeImg, setActiveImg] = useState(0);

//   const serviceTypes  = service.service?.split(",").map(s => s.trim()).filter(Boolean) || [];
//   const attentionList = service.attentionTo?.split(",").map(s => s.trim()).filter(Boolean) || [];
//   const placesList    = service.placeOfService?.split(",").map(s => s.trim()).filter(Boolean) || [];
//   const tags          = service.tag?.split(",").map(t => t.trim()).filter(Boolean) || [];

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-neutral-100 flex flex-col">

//       {/* ── Main image ── */}
//       <div className="relative overflow-hidden">
//         <LazyImage
//           src={allImages[activeImg]}
//           alt={`${service.name} — view ${activeImg + 1}`}
//           className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//         />

//         {/* Age badge — top-left */}
//         <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
//           Age {service.age}+
//         </span>

//         {/* Availability badge — top-right */}
//         <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
//           {service.availability}
//         </span>

//         {/* View-profiles CTA — bottom-right */}
//         <div className="absolute bottom-3 right-3">
//           <span className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
//             View Profiles
//           </span>
//         </div>
//       </div>

//       {/* ── Thumbnail strip ── */}
//       {allImages.length > 1 && (
//         <div className="flex gap-1 p-1 bg-neutral-900">
//           {allImages.map((img, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveImg(i)}
//               onMouseEnter={() => setActiveImg(i)}
//               aria-label={`View image ${i + 1}`}
//               className={`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none
//                 ${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-50 hover:opacity-80'}`}
//             >
//               <img
//                 src={img}
//                 alt={`Thumbnail ${i + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* ── Card body ── */}
//       <div className="p-5 flex flex-col gap-3 flex-1">

//         {/* Name + location */}
//         <div className="flex items-start justify-between gap-2">
//           <h3 className="text-xl font-bold text-neutral-900 group-hover:text-pink-600 transition-colors leading-tight">
//             {service.name}
//           </h3>
//           <span className="shrink-0 inline-flex items-center gap-1 bg-pink-50 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
//             📍 {service.location}
//           </span>
//         </div>

//         {/* About me / description */}
//         <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
//           {service.aboutme || service.description}
//         </p>

//         <hr className="border-neutral-100" />

//         {/* Info grid — services · for · places */}
//         <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">

//           {serviceTypes.length > 0 && (
//             <div className="col-span-2 sm:col-span-1">
//               <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
//                 Services
//               </dt>
//               <dd className="flex flex-wrap gap-1">
//                 {serviceTypes.map(s => (
//                   <span key={s} className="bg-neutral-100 text-neutral-700 text-xs px-2 py-0.5 rounded-full font-medium">
//                     {s}
//                   </span>
//                 ))}
//               </dd>
//             </div>
//           )}

//           {attentionList.length > 0 && (
//             <div className="col-span-2 sm:col-span-1">
//               <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
//                 For
//               </dt>
//               <dd className="flex flex-wrap gap-1">
//                 {attentionList.map(a => (
//                   <span key={a} className="bg-pink-50 text-pink-700 text-xs px-2 py-0.5 rounded-full font-medium capitalize">
//                     {a}
//                   </span>
//                 ))}
//               </dd>
//             </div>
//           )}

//           {placesList.length > 0 && (
//             <div className="col-span-2">
//               <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
//                 Available In
//               </dt>
//               <dd className="flex flex-wrap gap-1">
//                 {placesList.map(p => (
//                   <span key={p} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium capitalize">
//                     📍 {p}
//                   </span>
//                 ))}
//               </dd>
//             </div>
//           )}
//         </dl>

//         {/* Tags */}
//         {tags.length > 0 && (
//           <div className="flex flex-wrap gap-1.5 pt-1">
//             {tags.map(t => (
//               <span key={t} className="text-[11px] bg-neutral-50 border border-neutral-200 text-neutral-500 px-2.5 py-0.5 rounded-full capitalize">
//                 #{t}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Availability row */}
//         <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1">
//           <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           {service.availability}
//         </div>

//         {/* CTA buttons */}
//         <div className="flex gap-2 mt-auto pt-2">
//           <a
//             href={`tel:+91${phone}`}
//             className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition-colors"
//           >
//             Call Now
//           </a>
//           <a
//             href={`https://wa.me/91${phone}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition-colors"
//           >
//             WhatsApp
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    Main page component
// ───────────────────────────────────────── */
// const Ranchi = () => {
//   const cityServices = services.slice(0, 6);

//   const cityData = {
//     name: "Ranchi",
//     city: "Ranchi",
//     state: "Jharkhand",
//     pinCodes: ["834001"],
//     coordinates: { latitude: 23.34, longitude: 85.31 },
//     areas: ["Ranchi City", "Main Road", "Doranda", "Morabadi", "Lalpur", "Bariatu", "Kanke", "Ratu Road"],
//     services: [
//       "Verified Escorts", "Companion Services", "Massage Services",
//       "VIP Escorts", "Travel Companions", "Social Event Companions"
//     ]
//   };

//   const enhancedOrgSchema = buildEnhancedOrganizationSchema();

//   const schemaGenerator = new LocalBusinessSchemaGenerator();
//   const schemaPackage = schemaGenerator.generateCompleteCitySchema({
//     city: cityData.name,
//     state: cityData.state,
//     slug: "ranchi",
//     coordinates: cityData.coordinates,
//     areas: cityData.areas,
//     services: cityData.services,
//     primaryPinCode: cityData.pinCodes[0]
//   });

//   const localBusinessSchema = schemaPackage.localBusiness;
//   const breadcrumbSchema    = schemaPackage.breadcrumb;

//   const productSchemas = cityServices.slice(0, 3).map(service => {
//     const sampleReviews = [
//       { author: "Ranchi Client",  rating: 5, text: "Excellent service in Ranchi, highly professional and discreet.", date: "2026-01-15" },
//       { author: "Verified User",  rating: 5, text: "Verified profile, safe and trustworthy experience in Ranchi City.", date: "2026-01-12" }
//     ];
//     return buildProductSchema(service, sampleReviews);
//   });

//   const reviewSchemas = [
//     buildReviewSchema({
//       author: "Satisfied Ranchi Client",
//       rating: 5,
//       text: "Outstanding service from BookEase in Ranchi. Verified companions, safe booking, and professional experience.",
//       date: "2026-01-16"
//     }, "BookEase Ranchi Escort Services"),
//     buildReviewSchema({
//       author: "Premium Member",
//       rating: 5,
//       text: "Best platform for verified escorts in Ranchi. 24/7 availability and complete discretion guaranteed.",
//       date: "2026-01-14"
//     }, "BookEase Ranchi Escort Services")
//   ];

//   const faqSchema = {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     "mainEntity": [
//       {
//         "@type": "Question",
//         "name": "Are the escorts verified in Ranchi?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "Yes, all escorts serving Ranchi area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "What areas in Ranchi do you cover?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "We cover all major areas of Ranchi including Ranchi City, Main Road, Doranda, Morabadi. Our companions are available across the entire Ranchi region 24/7."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "How do I book an escort in Ranchi?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "Browse our verified Ranchi escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team will help you complete the process securely and discreetly."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "Is the service discreet in Ranchi?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "Absolutely. Your privacy is our top priority in Ranchi. All bookings are handled with complete confidentiality."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "What are the typical rates in Ranchi?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "Rates in Ranchi typically range from ₹5,000–₹15,000 per hour, ₹8,000–₹25,000 for 2 hours, and ₹20,000–₹50,000+ for full night services."
//         }
//       }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <SEO
//         title="Ranchi Escorts 2026 — 67+ Verified Profiles | BookEase Jharkhand"
//         description="✓ 67+ verified Ranchi escorts ✓ Ranchi City & Main Road ✓ Available tonight ✓ 24/7 service. Book premium companions in Ranchi. 18+ only."
//         canonical="https://www.escortmumbaii.in/jharkhand/ranchi"
//         image="https://www.escortmumbaii.in/ranchi-og.jpg"
//         entityType="localBusiness"
//         lang="en-IN"
//         jsonLd={[enhancedOrgSchema, localBusinessSchema, ...productSchemas, ...reviewSchemas]}
//         faqSchema={faqSchema}
//         breadcrumbSchema={breadcrumbSchema}
//         meta={[
//           { name: 'keywords', content: 'Ranchi escorts 2026, escorts in Ranchi, verified Ranchi escorts, Ranchi City escorts, available tonight' },
//           { name: 'geo.position', content: `${cityData.coordinates.latitude};${cityData.coordinates.longitude}` },
//           { name: 'geo.placename', content: 'Ranchi, Jharkhand' },
//           { name: 'geo.region', content: 'IN-JH' }
//         ]}
//         city="Jharkhand"
//         area="Ranchi"
//         serviceName="Verified Escort Services"
//       />

//       <Header showBack title="Ranchi Escorts" />

//       {/* ── Hero ── */}
//       <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-6 md:py-10">
//         <div className="container mx-auto px-4">
//           <nav className="text-xs mb-2 opacity-80">
//             <Link to="/" className="hover:underline">Home</Link>
//             <span className="mx-2">›</span>
//             <Link to="/find-all-city" className="hover:underline">Jharkhand</Link>
//             <span className="mx-2">›</span>
//             <span>Ranchi</span>
//           </nav>

//           <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
//             Ranchi Escorts 2026 — 67+ Verified Companions in Ranchi City &amp; Main Road
//           </h1>
//           <p className="text-sm md:text-base mb-4 max-w-3xl leading-relaxed opacity-90">
//             Browse 67+ verified profiles of premium escorts and independent companions
//             available 24/7 across all areas of Ranchi including Ranchi City, Main Road, Doranda, Morabadi.
//           </p>

//           <div className="flex flex-wrap gap-3">
//             <a
//               href={`tel:+91${phone}`}
//               className="bg-white text-pink-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-1.5"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                   d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//               Call Now
//             </a>
//             <a
//               href={`https://wa.me/91${phone}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-1.5"
//             >
//               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//               </svg>
//               WhatsApp
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">

//         {/* ── Areas Coverage ── */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Areas Covered in Ranchi</h2>
//           <div className="flex flex-wrap gap-1.5">
//             {cityData.areas.map((area) => (
//               <div key={area} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200">
//                 <h3 className="font-bold text-neutral-900">{area}</h3>
//                 <p className="text-sm text-neutral-600 mt-1">Service available 24/7</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── Services ── */}
//         <section className="py-12 bg-gray-50 rounded-2xl px-4 mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h2>
//           <p className="text-neutral-500 text-sm mb-8">
//             {services.length} service{services.length !== 1 ? 's' : ''} listed · hover a thumbnail to preview
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service) => (
//               <ServiceCard key={service.id} service={service} />
//             ))}
//           </div>
//         </section>

//         {/* ── SEO Content ── */}
//         <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
//           <h2>About Escort Services in Ranchi, Jharkhand</h2>
//           <p>
//             Ranchi is a prominent area in Jharkhand, known for its vibrant community and bustling lifestyle.
//             Our platform connects you with verified, professional escorts and companions specifically serving the Ranchi region,
//             including Ranchi City, Main Road, Doranda, Morabadi, and surrounding areas.
//           </p>

//           <h3>Why Choose BookEase Ranchi Services?</h3>
//           <ul>
//             <li><strong>Ranchi-Focused Verification:</strong> All companions undergo specific background checks and area familiarity training</li>
//             <li><strong>24/7 Ranchi Availability:</strong> Services available round the clock across all Ranchi areas</li>
//             <li><strong>Local Discretion:</strong> Confidential booking processes designed for Ranchi residents and visitors</li>
//             <li><strong>Safe Platform:</strong> Companions trained in Ranchi area safety protocols</li>
//             <li><strong>Extensive Selection:</strong> 67+ verified profiles available in Ranchi</li>
//             <li><strong>Area Expertise:</strong> Experienced companions familiar with Ranchi's layout and venues</li>
//           </ul>

//           <h3>Ranchi Coverage Areas</h3>
//           <ul>
//             {cityData.areas.map(area => (
//               <li key={area}><strong>{area}:</strong> Full service coverage with verified companions available 24/7</li>
//             ))}
//           </ul>

//           <h3>Ranchi Pricing</h3>
//           <ul>
//             <li>1 Hour: ₹5,000 – ₹15,000</li>
//             <li>2 Hours: ₹8,000 – ₹25,000</li>
//             <li>Full Night: ₹20,000 – ₹50,000+</li>
//             <li>VIP/Premium: Custom rates</li>
//           </ul>

//           <h3>Contact Ranchi Services</h3>
//           <p>
//             📞 Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
//             💬 WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
//           </p>

//           <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
//             <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
//             We strictly comply with all applicable laws and regulations in Ranchi, Jharkhand.
//           </p>
//         </section>

//         {/* ── FAQ ── */}
//         <section className="bg-white rounded-2xl p-8 mb-12">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">
//             Frequently Asked Questions About Ranchi Services
//           </h2>
//           <div className="space-y-6">
//             {[
//               {
//                 q: "Are the escorts verified in Ranchi?",
//                 a: "Yes, all escorts serving Ranchi undergo verification including ID proof, authentic photos, and background checks."
//               },
//               {
//                 q: "What areas in Ranchi do you cover?",
//                 a: "We cover Ranchi City, Main Road, Doranda, Morabadi and all surrounding areas. Companions are positioned across Ranchi for quick response."
//               },
//               {
//                 q: "How do I book in Ranchi?",
//                 a: "Browse our Ranchi profiles, select your preferred companion, and contact us via phone or WhatsApp."
//               },
//               {
//                 q: "Is the service discreet?",
//                 a: "Absolutely. All Ranchi bookings are handled with complete confidentiality and professional discretion."
//               },
//               {
//                 q: "What payment methods are accepted?",
//                 a: "We accept cash payments. All rates are confirmed at the time of booking with transparent pricing."
//               }
//             ].map(({ q, a }) => (
//               <div key={q}>
//                 <h3 className="text-xl font-semibold text-neutral-900 mb-2">{q}</h3>
//                 <p className="text-neutral-600">{a}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── Related Areas ── */}
//         <section className="bg-neutral-100 rounded-2xl p-8">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Explore Other Jharkhand Areas</h2>
//           <div className="flex flex-wrap gap-1.5">
//             {[
//               { name: "Jamshedpur",  slug: "jamshedpur",  count: 50  },
//               { name: "Dhanbad",     slug: "dhanbad",     count: 65  },
//               { name: "Bokaro",      slug: "bokaro",      count: 80  },
//               { name: "Hazaribagh",  slug: "hazaribagh",  count: 95  },
//               { name: "Deoghar",     slug: "deoghar",     count: 110 },
//               { name: "Giridih",     slug: "giridih",     count: 125 }
//             ].map((area) => (
//               <Link
//                 key={area.slug}
//                 to={`/jharkhand/${area.slug}`}
//                 className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
//               >
//                 <span className="font-semibold text-neutral-900">{area.name}</span>
//                 <span className="block text-sm text-neutral-600">{area.count} profiles</span>
//               </Link>
//             ))}
//           </div>
//         </section>

//       </div>

//       {/* ── Sticky Contact Bar (mobile) ── */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-bottom z-50 md:hidden">
//         <div className="flex gap-3">
//           <a
//             href={`tel:+91${phone}`}
//             className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors"
//           >
//             Call Now
//           </a>
//           <a
//             href={`https://wa.me/91${phone}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors"
//           >
//             WhatsApp
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Ranchi;


// import React, { useState, useEffect, useCallback } from 'react';
// import SEO from '../../components/SEO';
// import { Link } from 'react-router-dom';
// import Header from '../../components/Header';
// import LazyImage from '../../components/LazyImage';
// import { services } from '../../data/Jharkhand/Ranchiservices';

// import {
//   buildEnhancedOrganizationSchema,
//   buildProductSchema,
//   buildReviewSchema
// } from '../../utils/schema';

// import { LocalBusinessSchemaGenerator } from '../../seo/local-business-schema';

// const phone = "9324881345";

// /* ─────────────────────────────────────────
//    ServiceModal — full-screen detail drawer
//    opens when user clicks a card image
// ───────────────────────────────────────── */
// function ServiceModal({ service, onClose }) {
//   const allImages = [service.image, ...(service.images || [])];
//   const [activeImg, setActiveImg] = useState(0);

//   const serviceTypes  = service.service?.split(",").map(s => s.trim()).filter(Boolean) || [];
//   const attentionList = service.attentionTo?.split(",").map(s => s.trim()).filter(Boolean) || [];
//   const placesList    = service.placeOfService?.split(",").map(s => s.trim()).filter(Boolean) || [];
//   const tags          = service.tag?.split(",").map(t => t.trim()).filter(Boolean) || [];

//   /* close on Escape key */
//   const handleKey = useCallback((e) => {
//     if (e.key === 'Escape') onClose();
//     if (e.key === 'ArrowRight') setActiveImg(i => Math.min(i + 1, allImages.length - 1));
//     if (e.key === 'ArrowLeft')  setActiveImg(i => Math.max(i - 1, 0));
//   }, [onClose, allImages.length]);

//   useEffect(() => {
//     document.addEventListener('keydown', handleKey);
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.removeEventListener('keydown', handleKey);
//       document.body.style.overflow = '';
//     };
//   }, [handleKey]);

//   return (
//     /* Backdrop */
//     <div
//       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
//       onClick={onClose}
//     >
//       {/* Modal panel — stop propagation so clicks inside don't close */}
//       <div
//         className="relative bg-white w-full sm:max-w-2xl max-h-[95vh] sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
//         onClick={e => e.stopPropagation()}
//       >

//         {/* ── Close button ── */}
//         <button
//           onClick={onClose}
//           aria-label="Close"
//           className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* ── Active image ── */}
//         <div className="relative bg-neutral-900 overflow-hidden" style={{ aspectRatio: '4/3' }}>
//           <img
//             key={activeImg}
//             src={allImages[activeImg]}
//             alt={`${service.name} — photo ${activeImg + 1}`}
//             className="w-full h-full object-cover"
//             style={{ animation: 'fadeIn 0.25s ease' }}
//           />
//           {/* Age + availability overlays */}
//           <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
//             Age {service.age}+
//           </span>
//           <span className="absolute top-3 right-10 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
//             {service.availability}
//           </span>

//           {/* Prev / Next arrows */}
//           {activeImg > 0 && (
//             <button
//               onClick={() => setActiveImg(i => i - 1)}
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
//               aria-label="Previous image"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//           )}
//           {activeImg < allImages.length - 1 && (
//             <button
//               onClick={() => setActiveImg(i => i + 1)}
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
//               aria-label="Next image"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           )}

//           {/* Image counter */}
//           <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
//             {activeImg + 1} / {allImages.length}
//           </span>
//         </div>

//         {/* ── Thumbnail strip ── */}
//         {allImages.length > 1 && (
//           <div className="flex gap-1.5 p-2 bg-neutral-900">
//             {allImages.map((img, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveImg(i)}
//                 aria-label={`Photo ${i + 1}`}
//                 className={`flex-1 overflow-hidden rounded transition-all duration-200 focus:outline-none
//                   ${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-45 hover:opacity-75'}`}
//                 style={{ aspectRatio: '1/1' }}
//               >
//                 <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>
//         )}

//         {/* ── Scrollable detail body ── */}
//         <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-4">

//           {/* Name + location */}
//           <div className="flex items-start justify-between gap-2">
//             <h2 className="text-xl font-bold text-neutral-900 leading-tight">{service.name}</h2>
//             <span className="shrink-0 inline-flex items-center gap-1 bg-pink-50 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
//               📍 {service.location}
//             </span>
//           </div>

//           {/* About */}
//           <p className="text-sm text-neutral-500 leading-relaxed">
//             {service.aboutme || service.description}
//           </p>

//           <hr className="border-neutral-100" />

//           {/* Info grid */}
//           <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">

//             {serviceTypes.length > 0 && (
//               <div className="col-span-2 sm:col-span-1">
//                 <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1.5">Services</dt>
//                 <dd className="flex flex-wrap gap-1">
//                   {serviceTypes.map(s => (
//                     <span key={s} className="bg-neutral-100 text-neutral-700 text-xs px-2.5 py-0.5 rounded-full font-medium">{s}</span>
//                   ))}
//                 </dd>
//               </div>
//             )}

//             {attentionList.length > 0 && (
//               <div className="col-span-2 sm:col-span-1">
//                 <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1.5">For</dt>
//                 <dd className="flex flex-wrap gap-1">
//                   {attentionList.map(a => (
//                     <span key={a} className="bg-pink-50 text-pink-700 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize">{a}</span>
//                   ))}
//                 </dd>
//               </div>
//             )}

//             {placesList.length > 0 && (
//               <div className="col-span-2">
//                 <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1.5">Available In</dt>
//                 <dd className="flex flex-wrap gap-1">
//                   {placesList.map(p => (
//                     <span key={p} className="bg-green-50 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize">📍 {p}</span>
//                   ))}
//                 </dd>
//               </div>
//             )}
//           </dl>

//           {/* Tags */}
//           {tags.length > 0 && (
//             <div className="flex flex-wrap gap-1.5">
//               {tags.map(t => (
//                 <span key={t} className="text-[11px] bg-neutral-50 border border-neutral-200 text-neutral-500 px-2.5 py-0.5 rounded-full capitalize">
//                   #{t}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* CTA buttons */}
//           <div className="flex gap-3 pt-1">
//             <a
//               href={`tel:+91${phone}`}
//               className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-3 rounded-xl text-center transition-colors"
//             >
//               📞 Call Now
//             </a>
//             <a
//               href={`https://wa.me/91${phone}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl text-center transition-colors"
//             >
//               💬 WhatsApp
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Fade-in keyframe injected once */}
//       <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    ServiceCard — listing card (main image only)
//    Click image → opens ServiceModal
// ───────────────────────────────────────── */
// function ServiceCard({ service, onOpen }) {
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-neutral-100 flex flex-col">

//       {/* ── Main image (clickable) ── */}
//       <div
//         className="relative overflow-hidden cursor-pointer"
//         onClick={onOpen}
//         role="button"
//         aria-label={`View details for ${service.name}`}
//         tabIndex={0}
//         onKeyDown={e => e.key === 'Enter' && onOpen()}
//       >
//         <LazyImage
//           src={service.image}
//           alt={service.name}
//           className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
//         />

//         {/* Age badge */}
//         <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
//           Age {service.age}+
//         </span>

//         {/* Availability badge */}
//         <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
//           {service.availability}
//         </span>

//         {/* Sub-image count pill */}
//         {service.images?.length > 0 && (
//           <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
//             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             +{service.images.length} photos
//           </span>
//         )}

//         {/* Click-to-view overlay hint */}
//         <div className="absolute bottom-3 right-3">
//           <span className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
//             View Details →
//           </span>
//         </div>
//       </div>

//       {/* ── Card body (name, description, availability only) ── */}
//       <div className="p-5 flex flex-col gap-3 flex-1">
//         <div className="flex items-start justify-between gap-2">
//           <h3
//             className="text-xl font-bold text-neutral-900 group-hover:text-pink-600 transition-colors leading-tight cursor-pointer"
//             onClick={onOpen}
//           >
//             {service.name}
//           </h3>
//           <span className="shrink-0 inline-flex items-center gap-1 bg-pink-50 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
//             📍 {service.location}
//           </span>
//         </div>

//         <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
//           {service.aboutme || service.description}
//         </p>

//         <div className="flex items-center gap-2 text-xs text-neutral-400 mt-auto pt-1">
//           <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           {service.availability}
//         </div>

//         <button
//           onClick={onOpen}
//           className="w-full mt-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
//         >
//           View Profiles &amp; Book
//         </button>
//       </div>
//     </div>
//   );
// }

/* ─────────────────────────────────────────
   Main page component
───────────────────────────────────────── */
// const Ranchi = () => {
//   const [selectedService, setSelectedService] = useState(null);

//   const cityData = {
//     name: "Ranchi",
//     city: "Ranchi",
//     state: "Jharkhand",
//     pinCodes: ["834001"],
//     coordinates: { latitude: 23.34, longitude: 85.31 },
//     areas: ["Ranchi City", "Main Road", "Doranda", "Morabadi", "Lalpur", "Bariatu", "Kanke", "Ratu Road"],
//     services: [
//       "Verified Escorts", "Companion Services", "Massage Services",
//       "VIP Escorts", "Travel Companions", "Social Event Companions"
//     ]
//   };

//   const enhancedOrgSchema = buildEnhancedOrganizationSchema();
//   const schemaGenerator   = new LocalBusinessSchemaGenerator();
//   const schemaPackage     = schemaGenerator.generateCompleteCitySchema({
//     city: cityData.name,
//     state: cityData.state,
//     slug: "ranchi",
//     coordinates: cityData.coordinates,
//     areas: cityData.areas,
//     services: cityData.services,
//     primaryPinCode: cityData.pinCodes[0]
//   });

//   const localBusinessSchema = schemaPackage.localBusiness;
//   const breadcrumbSchema    = schemaPackage.breadcrumb;

//   const cityServices   = services.slice(0, 6);
//   const productSchemas = cityServices.slice(0, 3).map(service => {
//     const sampleReviews = [
//       { author: "Ranchi Client", rating: 5, text: "Excellent service in Ranchi, highly professional and discreet.", date: "2026-01-15" },
//       { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in Ranchi City.", date: "2026-01-12" }
//     ];
//     return buildProductSchema(service, sampleReviews);
//   });

//   const reviewSchemas = [
//     buildReviewSchema({
//       author: "Satisfied Ranchi Client",
//       rating: 5,
//       text: "Outstanding service from BookEase in Ranchi. Verified companions, safe booking, and professional experience.",
//       date: "2026-01-16"
//     }, "BookEase Ranchi Escort Services"),
//     buildReviewSchema({
//       author: "Premium Member",
//       rating: 5,
//       text: "Best platform for verified escorts in Ranchi. 24/7 availability and complete discretion guaranteed.",
//       date: "2026-01-14"
//     }, "BookEase Ranchi Escort Services")
//   ];

//   const faqSchema = {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     "mainEntity": [
//       {
//         "@type": "Question",
//         "name": "Are the escorts verified in Ranchi?",
//         "acceptedAnswer": { "@type": "Answer", "text": "Yes, all escorts serving Ranchi area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity." }
//       },
//       {
//         "@type": "Question",
//         "name": "What areas in Ranchi do you cover?",
//         "acceptedAnswer": { "@type": "Answer", "text": "We cover all major areas of Ranchi including Ranchi City, Main Road, Doranda, Morabadi. Our companions are available across the entire Ranchi region 24/7." }
//       },
//       {
//         "@type": "Question",
//         "name": "How do I book an escort in Ranchi?",
//         "acceptedAnswer": { "@type": "Answer", "text": "Browse our verified Ranchi escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team will help you complete the process securely and discreetly." }
//       },
//       {
//         "@type": "Question",
//         "name": "Is the service discreet in Ranchi?",
//         "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Your privacy is our top priority in Ranchi. All bookings are handled with complete confidentiality." }
//       },
//       {
//         "@type": "Question",
//         "name": "What are the typical rates in Ranchi?",
//         "acceptedAnswer": { "@type": "Answer", "text": "Rates in Ranchi typically range from ₹5,000–₹15,000 per hour, ₹8,000–₹25,000 for 2 hours, and ₹20,000–₹50,000+ for full night services." }
//       }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <SEO
//         title="Ranchi Escorts 2026 — 67+ Verified Profiles | BookEase Jharkhand"
//         description="✓ 67+ verified Ranchi escorts ✓ Ranchi City & Main Road ✓ Available tonight ✓ 24/7 service. Book premium companions in Ranchi. 18+ only."
//         canonical="https://www.escortmumbaii.in/jharkhand/ranchi"
//         image="https://www.escortmumbaii.in/ranchi-og.jpg"
//         entityType="localBusiness"
//         lang="en-IN"
//         jsonLd={[enhancedOrgSchema, localBusinessSchema, ...productSchemas, ...reviewSchemas]}
//         faqSchema={faqSchema}
//         breadcrumbSchema={breadcrumbSchema}
//         meta={[
//           { name: 'keywords', content: 'Ranchi escorts 2026, escorts in Ranchi, verified Ranchi escorts, Ranchi City escorts, available tonight' },
//           { name: 'geo.position', content: `${cityData.coordinates.latitude};${cityData.coordinates.longitude}` },
//           { name: 'geo.placename', content: 'Ranchi, Jharkhand' },
//           { name: 'geo.region', content: 'IN-JH' }
//         ]}
//         city="Jharkhand"
//         area="Ranchi"
//         serviceName="Verified Escort Services"
//       />

//       <Header showBack title="Ranchi Escorts" />

//       {/* ── Hero ── */}
//       <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-6 md:py-10">
//         <div className="container mx-auto px-4">
//           <nav className="text-xs mb-2 opacity-80">
//             <Link to="/" className="hover:underline">Home</Link>
//             <span className="mx-2">›</span>
//             <Link to="/find-all-city" className="hover:underline">Jharkhand</Link>
//             <span className="mx-2">›</span>
//             <span>Ranchi</span>
//           </nav>

//           <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3">
//             Ranchi Escorts 2026 — 67+ Verified Companions in Ranchi City &amp; Main Road
//           </h1>
//           <p className="text-sm md:text-base mb-4 max-w-3xl leading-relaxed opacity-90">
//             Browse 67+ verified profiles of premium escorts and independent companions
//             available 24/7 across all areas of Ranchi including Ranchi City, Main Road, Doranda, Morabadi.
//           </p>

//           <div className="flex flex-wrap gap-3">
//             <a
//               href={`tel:+91${phone}`}
//               className="bg-white text-pink-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-1.5"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                   d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//               Call Now
//             </a>
//             <a
//               href={`https://wa.me/91${phone}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-1.5"
//             >
//               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//               </svg>
//               WhatsApp
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">

//         {/* ── Areas Coverage ── */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Areas Covered in Ranchi</h2>
//           <div className="flex flex-wrap gap-1.5">
//             {cityData.areas.map((area) => (
//               <div key={area} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200">
//                 <h3 className="font-bold text-neutral-900">{area}</h3>
//                 <p className="text-sm text-neutral-600 mt-1">Service available 24/7</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── Services grid ── */}
//         <section className="py-12 bg-gray-50 rounded-2xl px-4 mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h2>
//           <p className="text-neutral-500 text-sm mb-8">
//             {services.length} service{services.length !== 1 ? 's' : ''} · tap a card to view photos &amp; full details
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service) => (
//               <ServiceCard
//                 key={service.id}
//                 service={service}
//                 onOpen={() => setSelectedService(service)}
//               />
//             ))}
//           </div>
//         </section>

//         {/* ── SEO Content ── */}
//         <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
//           <h2>About Escort Services in Ranchi, Jharkhand</h2>
//           <p>
//             Ranchi is a prominent area in Jharkhand, known for its vibrant community and bustling lifestyle.
//             Our platform connects you with verified, professional escorts and companions specifically serving the Ranchi region,
//             including Ranchi City, Main Road, Doranda, Morabadi, and surrounding areas.
//           </p>
//           <h3>Why Choose BookEase Ranchi Services?</h3>
//           <ul>
//             <li><strong>Ranchi-Focused Verification:</strong> All companions undergo specific background checks and area familiarity training</li>
//             <li><strong>24/7 Ranchi Availability:</strong> Services available round the clock across all Ranchi areas</li>
//             <li><strong>Local Discretion:</strong> Confidential booking processes designed for Ranchi residents and visitors</li>
//             <li><strong>Safe Platform:</strong> Companions trained in Ranchi area safety protocols</li>
//             <li><strong>Extensive Selection:</strong> 67+ verified profiles available in Ranchi</li>
//             <li><strong>Area Expertise:</strong> Experienced companions familiar with Ranchi's layout and venues</li>
//           </ul>
//           <h3>Ranchi Coverage Areas</h3>
//           <ul>
//             {cityData.areas.map(area => (
//               <li key={area}><strong>{area}:</strong> Full service coverage with verified companions available 24/7</li>
//             ))}
//           </ul>
//           <h3>Ranchi Pricing</h3>
//           <ul>
//             <li>1 Hour: ₹5,000 – ₹15,000</li>
//             <li>2 Hours: ₹8,000 – ₹25,000</li>
//             <li>Full Night: ₹20,000 – ₹50,000+</li>
//             <li>VIP/Premium: Custom rates</li>
//           </ul>
//           <h3>Contact Ranchi Services</h3>
//           <p>
//             📞 Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
//             💬 WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
//           </p>
//           <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
//             <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
//             We strictly comply with all applicable laws and regulations in Ranchi, Jharkhand.
//           </p>
//         </section>

//         {/* ── FAQ ── */}
//         <section className="bg-white rounded-2xl p-8 mb-12">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">
//             Frequently Asked Questions About Ranchi Services
//           </h2>
//           <div className="space-y-6">
//             {[
//               { q: "Are the escorts verified in Ranchi?",  a: "Yes, all escorts serving Ranchi undergo verification including ID proof, authentic photos, and background checks." },
//               { q: "What areas in Ranchi do you cover?",   a: "We cover Ranchi City, Main Road, Doranda, Morabadi and all surrounding areas. Companions are positioned across Ranchi for quick response." },
//               { q: "How do I book in Ranchi?",             a: "Browse our Ranchi profiles, select your preferred companion, and contact us via phone or WhatsApp." },
//               { q: "Is the service discreet?",             a: "Absolutely. All Ranchi bookings are handled with complete confidentiality and professional discretion." },
//               { q: "What payment methods are accepted?",   a: "We accept cash payments. All rates are confirmed at the time of booking with transparent pricing." }
//             ].map(({ q, a }) => (
//               <div key={q}>
//                 <h3 className="text-xl font-semibold text-neutral-900 mb-2">{q}</h3>
//                 <p className="text-neutral-600">{a}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── Related Areas ── */}
//         <section className="bg-neutral-100 rounded-2xl p-8">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Explore Other Jharkhand Areas</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { name: "Jamshedpur", slug: "jamshedpur", count: 50  },
//               { name: "Dhanbad",    slug: "dhanbad",    count: 65  },
//               { name: "Bokaro",     slug: "bokaro",     count: 80  },
//               { name: "Hazaribagh", slug: "hazaribagh", count: 95  },
//               { name: "Deoghar",    slug: "deoghar",    count: 110 },
//               { name: "Giridih",    slug: "giridih",    count: 125 }
//             ].map((area) => (
//               <Link key={area.slug} to={`/jharkhand/${area.slug}`}
//                 className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
//               >
//                 <span className="font-semibold text-neutral-900">{area.name}</span>
//                 <span className="block text-sm text-neutral-600">{area.count} profiles</span>
//               </Link>
//             ))}
//           </div>
//         </section>

//       </div>

//       {/* ── Sticky Contact Bar (mobile) ── */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-bottom z-40 md:hidden">
//         <div className="flex gap-3">
//           <a href={`tel:+91${phone}`}
//             className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors">
//             Call Now
//           </a>
//           <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer"
//             className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors">
//             WhatsApp
//           </a>
//         </div>
//       </div>

//       {/* ── Detail Modal ── */}
//       {selectedService && (
//         <ServiceModal
//           service={selectedService}
//           onClose={() => setSelectedService(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Ranchi;