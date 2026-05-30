const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');
const STATE_DIR = path.join(BASE_DIR, 'src', 'state');
const DATA_DIR = path.join(BASE_DIR, 'src', 'data');

// ─── Utilities ───────────────────────────────────────────────
function toCamelCase(str) {
  const words = str.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/);
  return words.map((w, i) => i === 0 ? w.charAt(0).toLowerCase() + w.slice(1) : w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toPascalCase(str) {
  const words = str.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toSlug(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// ─── State Codes ─────────────────────────────────────────────
const STATE_CODES = {
  'Andaman and Nicobar': 'IN-AN',
  'Andhra Pradesh': 'IN-AP',
  'Arunachal Pradesh': 'IN-AR',
  'Assam': 'IN-AS',
  'Bihar': 'IN-BR',
  'Delhi': 'IN-DL',
  'Gujarat': 'IN-GJ',
  'Karnataka': 'IN-KA',
  'Maharashtra': 'IN-MH',
  'Mumbai': 'IN-MH',
  'Tamil Nadu': 'IN-TN',
  'Uttar Pradesh': 'IN-UP',
  'West Bengal': 'IN-WB'
};

// ─── Extract data from existing files ────────────────────────
function extractData(content, fileName, stateDir) {
  const name = extractStr(content, /name:\s*"([^"]+)"/) || fileName.replace('.jsx', '');
  const city = extractStr(content, /city:\s*"([^"]+)"/) || name;
  const state = extractStr(content, /state:\s*"([^"]+)"/) || stateDir;
  const lat = extractStr(content, /latitude:\s*([\d.]+)/) || '20.0';
  const lng = extractStr(content, /longitude:\s*([\d.]+)/) || '78.0';

  const pinCodes = extractArray(content, 'pinCodes').length > 0
    ? extractArray(content, 'pinCodes')
    : ['000000'];

  const areas = extractMultilineArray(content, 'areas');
  const profileCount = extractStr(content, /(\d+)\+?\s*[Vv]erified/) || '100';

  // Extract component name from const X = () =>
  const compMatch = content.match(/const\s+(\w+)\s*=\s*\(\s*\)\s*=>/);
  const componentName = compMatch ? compMatch[1] : toPascalCase(name);

  return {
    name, city, state,
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
    pinCodes, areas,
    profileCount: parseInt(profileCount),
    componentName
  };
}

function extractStr(content, pattern) {
  const m = content.match(pattern);
  return m ? m[1] : null;
}

function extractArray(content, field) {
  const pattern = new RegExp(`${field}:\\s*\\[([^\\]]+)\\]`);
  const m = content.match(pattern);
  if (!m) return [];
  const items = [];
  const strPat = /"([^"]+)"/g;
  let mm;
  while ((mm = strPat.exec(m[1])) !== null) items.push(mm[1]);
  return items;
}

function extractMultilineArray(content, field) {
  const pattern = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const m = content.match(pattern);
  if (!m) return [];
  const items = [];
  const strPat = /"([^"]+)"/g;
  let mm;
  while ((mm = strPat.exec(m[1])) !== null) items.push(mm[1]);
  return items;
}

// ─── Generate services data file ─────────────────────────────
function generateServicesFile(name, slug) {
  return `export const services = [
  {
    id: "${slug}-001",
    name: "VIP Escort Service",
    description: "Premium escort service for high-profile clients in ${name}. Discreet and professional companionship for any occasion.",
    image: "https://picsum.photos/seed/${slug.replace(/-/g, '')}vip/400/500",
    availability: "24/7 Available"
  },
  {
    id: "${slug}-002",
    name: "Premium Companion",
    description: "Elegant and sophisticated companions for corporate events, dinners, and social gatherings in ${name} area.",
    image: "https://picsum.photos/seed/${slug.replace(/-/g, '')}premium/400/500",
    availability: "Available Today"
  },
  {
    id: "${slug}-003",
    name: "Body Massage Service",
    description: "Relaxing therapeutic massage services with premium companionship. Full body massage experience in ${name}.",
    image: "https://picsum.photos/seed/${slug.replace(/-/g, '')}massage/400/500",
    availability: "24/7 Available"
  },
  {
    id: "${slug}-004",
    name: "Dinner Date Companion",
    description: "Charming companions for dinner dates, romantic evenings, and special occasions throughout ${name}.",
    image: "https://picsum.photos/seed/${slug.replace(/-/g, '')}dinner/400/500",
    availability: "Evenings Available"
  },
  {
    id: "${slug}-005",
    name: "GFE (Girlfriend Experience)",
    description: "Authentic girlfriend experience with genuine emotional connection and companionship in ${name}.",
    image: "https://picsum.photos/seed/${slug.replace(/-/g, '')}gfe/400/500",
    availability: "Available Today"
  },
  {
    id: "${slug}-006",
    name: "Travel Companion",
    description: "Professional travel companions for business trips, vacations, and weekend getaways departing from ${name}.",
    image: "https://picsum.photos/seed/${slug.replace(/-/g, '')}travel/400/500",
    availability: "24/7 Available"
  }
];
`;
}

// ─── Generate JSX file (Andheri pattern) ─────────────────────
function generateJSX(data, stateDir, siblings) {
  const {
    name, city, state, latitude, longitude,
    pinCodes, areas, profileCount, componentName
  } = data;

  const prefix = toCamelCase(name);
  const slug = toSlug(name);
  const parentSlug = toSlug(stateDir);
  const parentName = stateDir;
  const stateCode = STATE_CODES[stateDir] || 'IN-XX';
  const servicesImportPath = `../../data/${stateDir}/${componentName}services`;

  const topAreas = areas.slice(0, 3).join(', ');
  const first4Areas = areas.slice(0, 4).join(', ');
  const area0 = areas[0] || name;
  const area1 = areas[1] || name;
  const area2 = areas[2] || name;

  // Format areas array for code
  const areasFormatted = formatAreasArray(areas);

  // Format pinCodes
  const pinCodesStr = pinCodes.map(p => `"${p}"`).join(', ');

  // Related areas from siblings
  const relatedAreas = siblings
    .filter(s => s.name !== name)
    .slice(0, 8)
    .map((s, i) => `              { name: "${s.name}", slug: "${toSlug(s.name)}", count: ${50 + (i * 15)} }`)
    .join(',\n');

  // Coverage areas list
  const coverageAreas = areas.map(a =>
    `            <li><strong>${a}:</strong> Full service coverage with verified companions available 24/7</li>`
  ).join('\n');

  return `import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '${servicesImportPath}';

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

const ${componentName} = () => {
  // Filter services available in ${name}
  const ${prefix}Services = services.slice(0, 6);

  // ${name}-specific data
  const ${prefix}Data = {
    name: "${name}",
    city: "${city}",
    state: "${state}",
    pinCodes: [${pinCodesStr}],
    coordinates: {
      latitude: ${latitude},
      longitude: ${longitude}
    },
    areas: [
${areasFormatted}
    ],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services", 
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Generate enhanced Local Business Schema for ${name} using new generator
  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const ${prefix}SchemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: ${prefix}Data.name,
    state: ${prefix}Data.state,
    slug: "${slug}",
    coordinates: ${prefix}Data.coordinates,
    areas: ${prefix}Data.areas,
    services: ${prefix}Data.services,
    primaryPinCode: ${prefix}Data.pinCodes[0]
  });

  const localBusinessSchema = ${prefix}SchemaPackage.localBusiness;
  const locationFaqSchema = ${prefix}SchemaPackage.faq;
  const breadcrumbSchema = ${prefix}SchemaPackage.breadcrumb;

  // Product schemas for featured services in ${name}
  const ${prefix}ProductSchemas = ${prefix}Services.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "${name} Client", rating: 5, text: "Excellent service in ${name}, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in ${area0}.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for ${name} testimonials
  const ${prefix}ReviewSchemas = [
    buildReviewSchema({
      author: "Satisfied ${name} Client",
      rating: 5,
      text: "Outstanding service from BookEase in ${name}. Verified companions, safe booking, and professional experience in ${area0}.",
      date: "2026-01-16"
    }, "BookEase ${name} Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in ${name}. 24/7 availability and complete discretion guaranteed across ${area1} and ${area2}.",
      date: "2026-01-14"
    }, "BookEase ${name} Escort Services")
  ];

  // Area-specific FAQ schema for AEO
  const ${prefix}FaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in ${name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving ${name} area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity specifically for ${name} clients."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in ${name} do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of ${name} including ${first4Areas}. Our companions are available across the entire ${name} region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in ${name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified ${name} escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team specializes in ${name} bookings and will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in ${name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in ${name}. All bookings are handled with complete confidentiality, and our companions are professional and discreet specifically trained for ${name} area meetings."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in ${name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in ${name} typically range from \\u20b95,000-\\u20b915,000 per hour, \\u20b98,000-\\u20b925,000 for 2 hours, and \\u20b920,000-\\u20b950,000+ for full night services. Premium companions and VIP services may have custom rates."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="${name} Escorts 2026 \\u2014 ${profileCount}+ Verified Profiles | BookEase ${parentName}"
        description="\\u2713 ${profileCount}+ verified ${name} escorts \\u2713 ${area0} & ${area1} \\u2713 Available tonight \\u2713 24/7 service. Book premium companions in ${topAreas}. 18+ only. Verified profiles."
        canonical="https://www.escortmumbaii.in/${parentSlug}/${slug}"
        image="https://www.escortmumbaii.in/${slug}-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...${prefix}ProductSchemas, ...${prefix}ReviewSchemas]}
        faqSchema={${prefix}FaqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: '${name} escorts 2026, escorts in ${name}, verified ${name} escorts, ${profileCount}+ profiles, ${area0} escorts, ${area1} escorts, ${area2} escorts, available tonight' },
          { name: 'geo.position', content: \`\${${prefix}Data.coordinates.latitude};\${${prefix}Data.coordinates.longitude}\` },
          { name: 'geo.placename', content: '${name}, ${parentName}' },
          { name: 'geo.region', content: '${stateCode}' }
        ]}
        city="${parentName}"
        area="${name}"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="${name} Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">\\u203a</span>
            <Link to="/${parentSlug}" className="hover:underline">${parentName}</Link>
            <span className="mx-2">\\u203a</span>
            <span>${name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ${name} Escorts 2026 \\u2014 ${profileCount}+ Verified Companions in ${area0} & ${area1}
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse ${profileCount}+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of ${name} including ${topAreas}.
            Discreet, safe, and professional service specifically for ${name} residents and visitors.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={\`tel:+91\${phone}\`}
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <a
              href={\`https://wa.me/91\${phone}\`}
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

        {/* ${name} Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in ${name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {${prefix}Data.areas.map((area) => (
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
              to={\`/${parentSlug}/${slug}/service/\${service.id}\`}
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
                    View Options \\u2192
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>

        {/* ${name}-Specific SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in ${name}, ${parentName}</h2>
          <p>
            ${name} is a prominent area in ${parentName}, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the ${name} region,
            including ${topAreas}, and surrounding areas.
          </p>

          <h3>Why Choose BookEase ${name} Services?</h3>
          <ul>
            <li><strong>${name}-Focused Verification:</strong> All companions serving ${name} undergo specific background checks and area familiarity training for local safety and convenience</li>
            <li><strong>24/7 ${name} Availability:</strong> Services available round the clock across all ${name} areas with real-time location-based availability updates</li>
            <li><strong>Local Discretion:</strong> Your privacy is paramount with confidential booking processes specifically designed for ${name} residents and visitors</li>
            <li><strong>${name}-Specific Safety:</strong> Secure platform with companions trained in ${name} area safety protocols and local meeting point recommendations</li>
            <li><strong>Extensive Selection:</strong> ${profileCount}+ verified profiles of independent escorts and professional companions specifically available in ${name}</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with ${name}'s layout, transportation, and preferred meeting venues</li>
          </ul>

          <h3>Popular Services in ${name}</h3>
          <p>
            Our ${name} companions offer specialized services tailored to the area's lifestyle:
          </p>
          <ul>
            <li>Corporate event companionship for ${name} business districts</li>
            <li>Restaurant and dinner dates in ${name}'s dining hubs</li>
            <li>Hotel visits (incall/outcall) in ${name} accommodations</li>
            <li>Body massage services in ${name} residential areas</li>
            <li>GFE (Girlfriend Experience) with local area knowledge</li>
            <li>VIP escort services for ${name} corporate and social events</li>
            <li>Travel companionship from ${name}</li>
          </ul>

          <h3>${name} Coverage Areas</h3>
          <p>
            We provide comprehensive coverage across all major ${name} zones:
          </p>
          <ul>
${coverageAreas}
          </ul>

          <h3>How to Book ${name} Escorts</h3>
          <p>
            Booking ${name}-specific services is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles available specifically in your ${name} area</li>
            <li>Check real-time availability and ${name}-specific rates</li>
            <li>Contact via phone or WhatsApp with ${name} location preferences</li>
            <li>Confirm your booking details with area-specific meeting arrangements</li>
            <li>Enjoy professional, discreet service with ${name}-trained companions</li>
          </ol>

          <h3>${name} Safety & Discretion</h3>
          <p>
            Your safety and privacy in ${name} are our highest priorities:
          </p>
          <ul>
            <li>ID verified companions with ${name} area experience and training</li>
            <li>Strict confidentiality agreements with area-specific privacy protocols</li>
            <li>Professional companions familiar with ${name}'s safe meeting locations</li>
            <li>Health-conscious and hygiene-focused service standards</li>
            <li>Emergency support system for ${name}-based bookings</li>
          </ul>

          <h3>${name} Pricing Information</h3>
          <p>
            Competitive rates for ${name} services with area-specific pricing:
          </p>
          <ul>
            <li>1 Hour: \\u20b95,000 - \\u20b915,000 (varies by location within ${name})</li>
            <li>2 Hours: \\u20b98,000 - \\u20b925,000 (includes transportation within ${name})</li>
            <li>Full Night: \\u20b920,000 - \\u20b950,000+ (overnight ${name} accommodation)</li>
            <li>VIP/Premium: Custom rates for corporate and special events</li>
          </ul>

          <h3>Contact ${name} Services</h3>
          <p>
            For ${name}-specific bookings and inquiries:
          </p>
          <p>
            \\ud83d\\udcde Phone: <a href={\`tel:+91\${phone}\`}>+91-{phone}</a><br />
            \\ud83d\\udcac WhatsApp: <a href={\`https://wa.me/91\${phone}\`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in ${name}, ${parentName}.
            Please ensure you are of legal age before accessing our services.
          </p>
        </section>

        {/* ${name} FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About ${name} Services
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the escorts verified specifically for ${name}?
              </h3>
              <p className="text-neutral-600">
                Yes, all escorts serving the ${name} area undergo specific verification processes including area familiarity assessment, 
                local safety training, and background checks tailored for ${name}'s unique requirements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas in ${name} do you cover?
              </h3>
              <p className="text-neutral-600">
                We comprehensively cover ${first4Areas}. 
                Our companions are strategically positioned across all these ${name} zones for quick response times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a ${name}-specific booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse our ${name} escort profiles, specify your preferred area within ${name}, 
                and contact us via phone or WhatsApp. Our team specializes in ${name} bookings and understands the local logistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet in ${name}?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority in ${name}. All bookings are handled with complete
                confidentiality, and our companions are professionally trained in ${name}-specific discretion protocols.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept for ${name} services?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments for ${name} services. All rates are confirmed at the time of booking, 
                with transparent pricing that includes any ${name}-specific transportation costs.
              </p>
            </div>
          </div>
        </section>

        {/* Related ${parentName} Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other ${parentName} Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
${relatedAreas}
            ].map((area) => (
              <Link
                key={area.slug}
                to={\`/${parentSlug}/\${area.slug}\`}
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
            href={\`tel:+91\${phone}\`}
            className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors"
          >
            Call Now
          </a>
          <a
            href={\`https://wa.me/91\${phone}\`}
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

export default ${componentName};
`;
}

function formatAreasArray(areas) {
  if (areas.length === 0) return '      "City Center"';
  const lines = [];
  for (let i = 0; i < areas.length; i += 4) {
    const chunk = areas.slice(i, i + 4).map(a => `"${a}"`).join(', ');
    lines.push('      ' + chunk);
  }
  return lines.join(',\n');
}

// ─── Main Execution ──────────────────────────────────────────
function main() {
  const stateDirs = fs.readdirSync(STATE_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  let totalUpdated = 0;
  let totalServices = 0;

  for (const stateDir of stateDirs) {
    const dirPath = path.join(STATE_DIR, stateDir);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jsx'));

    // Collect sibling info for related areas
    const siblings = files.map(f => ({
      name: f.replace('.jsx', ''),
      file: f
    }));

    // Create data directory for this state
    const dataDir = path.join(DATA_DIR, stateDir);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    for (const file of files) {
      // Skip Andheri.jsx - it's already the template
      if (stateDir === 'Mumbai' && file === 'Andheri.jsx') {
        console.log(`  SKIP: ${stateDir}/${file} (template)`);
        continue;
      }

      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract existing data
      const data = extractData(content, file, stateDir);

      // Generate and write services file
      const slug = toSlug(data.name);
      const servicesContent = generateServicesFile(data.name, slug);
      const servicesFileName = `${data.componentName}services.js`;
      const servicesPath = path.join(dataDir, servicesFileName);
      
      // Don't overwrite existing Andheri services
      if (!(stateDir === 'Mumbai' && servicesFileName === 'Andheriservices.js')) {
        fs.writeFileSync(servicesPath, servicesContent, 'utf-8');
        totalServices++;
      }

      // Generate and write new JSX file
      const jsxContent = generateJSX(data, stateDir, siblings);
      fs.writeFileSync(filePath, jsxContent, 'utf-8');
      totalUpdated++;

      console.log(`  OK: ${stateDir}/${file} -> ${servicesFileName}`);
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Updated ${totalUpdated} JSX files`);
  console.log(`Created ${totalServices} services files`);
}

main();
