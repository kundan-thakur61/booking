import React from 'react'

function Patna() {
  return (
    <div>Patna</div>
  )
}

export default Patna



// import React from 'react';
// import EnhancedSEO from '../components/EnhancedSEO';
import { buildLocalBusinessSchema, buildFAQSchema } from '../utils/advancedSchema';
// import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import ServiceCard from '../components/ServiceCard';
// import { services } from '../data/services';

// const phone = "9324881345";

// const Patna = () => {
//   const patnaServices = services.slice(0, 6);

//   const popularAreas = [
//     { name: "Boring Road", slug: "boring-road", count: 80 },
//     { name: "Kankarbagh", slug: "kankarbagh", count: 70 },
//     { name: "Patna City", slug: "patna-city", count: 65 },
//     { name: "Rajendra Nagar", slug: "rajendra-nagar", count: 60 },
//     { name: "Bailey Road", slug: "bailey-road", count: 55 },
//     { name: "Danapur", slug: "danapur", count: 50 },
//     { name: "Ashok Rajpath", slug: "ashok-rajpath", count: 45 },
//     { name: "Fraser Road", slug: "fraser-road", count: 40 },
//   ];

//   const localBusinessSchema = {
//     "@context": "https://schema.org",
//     "@type": "AdultEntertainment",
//     "name": "BookEase Patna Escorts",
//     "description": "Verified escort and companion services in Patna with 200+ profiles across Boring Road, Kankarbagh, Bailey Road and more areas",
//     "priceRange": "₹₹₹",
//     "address": {
//       "@type": "PostalAddress",
//       "streetAddress": "Multiple locations",
//       "addressLocality": "Patna",
//       "addressRegion": "Bihar",
//       "postalCode": "800001",
//       "addressCountry": "IN"
//     },
//     "geo": { "@type": "GeoCoordinates", "latitude": 25.6093, "longitude": 85.1376 },
//     "url": "https://www.escortmumbaii.in/patna",
//     "telephone": `+91-${phone}`,
//     "openingHoursSpecification": {
//       "@type": "OpeningHoursSpecification",
//       "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
//       "opens": "00:00",
//       "closes": "23:59"
//     },
//     "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.4", "reviewCount": "120", "bestRating": "5", "worstRating": "1" }
//   };

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.escortmumbaii.in" },
//       { "@type": "ListItem", "position": 2, "name": "Patna", "item": "https://www.escortmumbaii.in/patna" }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <EnhancedSEO
        title="Patna Escorts 2026 — 100+ Verified Profiles | BookEase"
        description="✓ 100+ verified Patna escorts ✓ Boring Road, Kankarbagh, Patliputra ✓ Available tonight ✓ 24/7 service. Book premium companions with verified photos. Safe, discreet, professional. 18+ only."
        canonical="https://www.escortmumbaii.in/patna"
        image="https://www.escortmumbaii.in/patna-og.jpg"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.escortmumbaii.in' },
          { name: 'Cities', url: 'https://www.escortmumbaii.in/find-all-city' },
          { name: 'Patna', url: 'https://www.escortmumbaii.in/patna' }
        ]}
        city="Patna"
        cityData={{
          latitude: 25.5941,
          longitude: 85.1376,
          services: [
            { name: 'Verified Escorts', description: 'Professional escorts in Patna' },
            { name: 'Companion Services', description: 'Premium companion services' },
            { name: 'Massage Services', description: 'Professional massage services' }
          ]
        }}
        faqSchema={buildFAQSchema([
          {
            question: 'Are the escort profiles in Patna verified?',
            answer: 'Yes, all profiles on our platform are verified with ID proof and authentic photos. We conduct thorough background checks to ensure safety and authenticity for all Patna bookings.'
          },
          {
            question: 'What areas do you cover in Patna?',
            answer: 'We cover all major areas of Patna including Boring Road, Kankarbagh, Patliputra, Rajendra Nagar, Fraser Road. Our companions are available across the city 24/7.'
          },
          {
            question: 'How do I book an escort in Patna?',
            answer: 'Simply browse profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team will help you complete the booking process securely and discreetly.'
          },
          {
            question: 'Is the service discreet in Patna?',
            answer: 'Absolutely. Your privacy is our top priority. All bookings are handled with complete confidentiality, and our companions are professional and discreet throughout Patna.'
          },
          {
            question: 'What are the rates for escorts in Patna?',
            answer: 'Rates vary based on duration, service type, and companion experience. Contact us for exact pricing and availability in Patna.'
          }
        ])}
        jsonLd={[buildLocalBusinessSchema({
          city: 'Patna',
          state: 'Bihar',
          latitude: 25.5941,
          longitude: 85.1376,
          url: 'https://www.escortmumbaii.in/patna',
          services: [
            { name: 'Verified Escorts', description: 'Professional verified escort services in Patna' },
            { name: 'Companion Services', description: 'Premium companion services for events and occasions' },
            { name: 'Massage Services', description: 'Professional massage and relaxation services' }
          ]
        })]}
      />

//       <Header showBack title="Patna Escorts" />

//       <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
//         <div className="container mx-auto px-4">
//           <nav className="text-sm mb-4 opacity-90">
//             <Link to="/" className="hover:underline">Home</Link>
//             <span className="mx-2">›</span>
//             <span>Patna</span>
//           </nav>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Escorts & Companions in Patna</h1>
//           <p className="text-xl mb-6 max-w-3xl">
//             Browse 200+ verified profiles of premium escorts and independent companions available 24/7 across all areas of Patna.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <a href={`tel:+91${phone}`} className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2">
//               📞 Call Now
//             </a>
//             <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2">
//               💬 WhatsApp
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Popular Areas in Patna</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {popularAreas.map((area) => (
//               <div key={area.slug} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-bold text-neutral-900">{area.name}</h3>
//                   <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">{area.count}</span>
//                 </div>
//                 <p className="text-sm text-neutral-600">{area.count} verified profiles</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="mb-12">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Available Services in Patna</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {patnaServices.map((service) => (
//               <ServiceCard key={service.id} service={service} />
//             ))}
//           </div>
//         </section>

//         <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
//           <h2>About Escort Services in Patna</h2>
//           <p>Patna, the capital of Bihar and one of the oldest cities in India, has a growing adult entertainment scene. Our platform connects you with verified, professional escorts and companions across all major areas.</p>
//           <h3>Why Choose BookEase Patna?</h3>
//           <ul>
//             <li><strong>Verified Profiles:</strong> All companions are verified with ID proof and photos</li>
//             <li><strong>24/7 Availability:</strong> Services available round the clock</li>
//             <li><strong>Discreet Service:</strong> Your privacy is our top priority</li>
//             <li><strong>Safe Booking:</strong> Secure platform with trusted payment options</li>
//           </ul>
//         </section>

//         <section className="bg-neutral-100 rounded-2xl p-8">
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Explore Other Cities</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { name: "Mumbai", slug: "mumbai" },
//               { name: "Delhi", slug: "delhi" },
//               { name: "Bangalore", slug: "bangalore" },
//               { name: "Pune", slug: "pune" },
//               { name: "Hyderabad", slug: "hyderabad" },
//               { name: "Chennai", slug: "chennai" },
//               { name: "Kolkata", slug: "kolkata" },
//               { name: "Goa", slug: "goa" },
//             ].map((city) => (
//               <Link key={city.slug} to={`/${city.slug}`} className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
//                 <span className="font-semibold text-neutral-900">{city.name}</span>
//               </Link>
//             ))}
//           </div>
//         </section>
//       </div>

//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-bottom z-50 md:hidden">
//         <div className="flex gap-3">
//           <a href={`tel:+91${phone}`} className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors">Call Now</a>
//           <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors">WhatsApp</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Patna;
