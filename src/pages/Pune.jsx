import React from 'react'

function Pune() {
  return (
    <div>Pune</div>
  )
}

export default Pune


// import React from 'react';
// import SEO from '../components/SEO';
// import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import ServiceCard from '../components/ServiceCard';
// import { services } from '../data/services';

// const phone = "9324881345";

// const Pune = () => {
//   const puneServices = services.slice(0, 6);

//   const popularAreas = [
//     { name: "Koregaon Park", slug: "koregaon-park", count: 130 },
//     { name: "Viman Nagar", slug: "viman-nagar", count: 110 },
//     { name: "Hinjewadi", slug: "hinjewadi", count: 95 },
//     { name: "Baner", slug: "baner", count: 85 },
//     { name: "Kothrud", slug: "kothrud", count: 75 },
//     { name: "Deccan", slug: "deccan", count: 70 },
//     { name: "FC Road", slug: "fc-road", count: 60 },
//     { name: "Kalyani Nagar", slug: "kalyani-nagar", count: 55 },
//   ];

//   const localBusinessSchema = {
//     "@context": "https://schema.org",
//     "@type": "AdultEntertainment",
//     "name": "BookEase Pune Escorts",
//     "description": "Verified escort and companion services in Pune with 300+ profiles across Koregaon Park, Viman Nagar, Hinjewadi and more areas",
//     "priceRange": "₹₹₹",
//     "address": {
//       "@type": "PostalAddress",
//       "streetAddress": "Multiple locations",
//       "addressLocality": "Pune",
//       "addressRegion": "Maharashtra",
//       "postalCode": "411001",
//       "addressCountry": "IN"
//     },
//     "geo": { "@type": "GeoCoordinates", "latitude": 18.5204, "longitude": 73.8567 },
//     "url": "https://www.escortmumbaii.in/pune",
//     "telephone": `+91-${phone}`,
//     "openingHoursSpecification": {
//       "@type": "OpeningHoursSpecification",
//       "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
//       "opens": "00:00",
//       "closes": "23:59"
//     },
//     "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "235", "bestRating": "5", "worstRating": "1" }
//   };

//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.escortmumbaii.in" },
//       { "@type": "ListItem", "position": 2, "name": "Pune", "item": "https://www.escortmumbaii.in/pune" }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <SEO
//         title="Escorts in Pune — Verified Companions & Discreet Booking | BookEase"
//         description="Browse 300+ verified companion profiles in Pune (Koregaon Park, Viman Nagar, Hinjewadi). Discreet, safe, and professional bookings."
//         canonical="https://www.escortmumbaii.in/pune"
//         jsonLd={[localBusinessSchema]}
//         breadcrumbSchema={breadcrumbSchema}
//       />

//       <Header showBack title="Pune Escorts" />

//       <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
//         <div className="container mx-auto px-4">
//           <nav className="text-sm mb-4 opacity-90">
//             <Link to="/" className="hover:underline">Home</Link>
//             <span className="mx-2">›</span>
//             <span>Pune</span>
//           </nav>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Escorts & Companions in Pune</h1>
//           <p className="text-xl mb-6 max-w-3xl">
//             Browse 300+ verified profiles of premium escorts and independent companions available 24/7 across all areas of Pune.
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
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Popular Areas in Pune</h2>
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
//           <h2 className="text-3xl font-bold text-neutral-900 mb-6">Available Services in Pune</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {puneServices.map((service) => (
//               <ServiceCard key={service.id} service={service} />
//             ))}
//           </div>
//         </section>

//         <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
//           <h2>About Escort Services in Pune</h2>
//           <p>Pune, the Oxford of the East, is a vibrant city with a growing entertainment scene. Our platform connects you with verified, professional escorts and companions across all major areas.</p>
//           <h3>Why Choose BookEase Pune?</h3>
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
//               { name: "Hyderabad", slug: "hyderabad" },
//               { name: "Chennai", slug: "chennai" },
//               { name: "Kolkata", slug: "kolkata" },
//               { name: "Goa", slug: "goa" },
//               { name: "Jaipur", slug: "jaipur" },
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

// export default Pune;
