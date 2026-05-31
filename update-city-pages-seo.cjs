/**
 * Automated Script to Update Main City Pages with EnhancedSEO
 * 
 * This script will update:
 * - Delhi.jsx
 * - Bangalore.jsx
 * - Pune.jsx
 * - Hyderabad.jsx
 * - Chennai.jsx
 * - Kolkata.jsx
 * - Goa.jsx
 * - Jaipur.jsx
 * - Patna.jsx
 * - Jharkhand.jsx
 * 
 * Usage: node update-city-pages-seo.cjs
 */

const fs = require('fs');
const path = require('path');

// City data with coordinates
const CITY_DATA = {
  'Delhi': {
    state: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    description: 'India\'s capital and political hub',
    profileCount: '450+',
    areas: ['Connaught Place', 'Karol Bagh', 'Dwarka', 'Rohini', 'Saket']
  },
  'Bangalore': {
    state: 'Karnataka',
    latitude: 12.9716,
    longitude: 77.5946,
    description: 'India\'s Silicon Valley and tech capital',
    profileCount: '400+',
    areas: ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'MG Road']
  },
  'Pune': {
    state: 'Maharashtra',
    latitude: 18.5204,
    longitude: 73.8567,
    description: 'Cultural capital of Maharashtra',
    profileCount: '300+',
    areas: ['Koregaon Park', 'Hinjewadi', 'Viman Nagar', 'Kothrud', 'Deccan']
  },
  'Hyderabad': {
    state: 'Telangana',
    latitude: 17.3850,
    longitude: 78.4867,
    description: 'City of Pearls and IT hub',
    profileCount: '250+',
    areas: ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Gachibowli', 'Madhapur']
  },
  'Chennai': {
    state: 'Tamil Nadu',
    latitude: 13.0827,
    longitude: 80.2707,
    description: 'Gateway to South India',
    profileCount: '200+',
    areas: ['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'OMR']
  },
  'Kolkata': {
    state: 'West Bengal',
    latitude: 22.5726,
    longitude: 88.3639,
    description: 'City of Joy and cultural capital',
    profileCount: '180+',
    areas: ['Park Street', 'Salt Lake', 'Ballygunge', 'Alipore', 'New Town']
  },
  'Goa': {
    state: 'Goa',
    latitude: 15.2993,
    longitude: 74.1240,
    description: 'Beach paradise and tourist destination',
    profileCount: '150+',
    areas: ['Panaji', 'Calangute', 'Baga', 'Anjuna', 'Candolim']
  },
  'Jaipur': {
    state: 'Rajasthan',
    latitude: 26.9124,
    longitude: 75.7873,
    description: 'Pink City and royal heritage',
    profileCount: '120+',
    areas: ['C Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'Raja Park']
  },
  'Patna': {
    state: 'Bihar',
    latitude: 25.5941,
    longitude: 85.1376,
    description: 'Ancient city and Bihar\'s capital',
    profileCount: '100+',
    areas: ['Boring Road', 'Kankarbagh', 'Patliputra', 'Rajendra Nagar', 'Fraser Road']
  },
  'Jharkhand': {
    state: 'Jharkhand',
    latitude: 23.6102,
    longitude: 85.2799,
    description: 'Land of forests and minerals',
    profileCount: '80+',
    areas: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'],
    displayName: 'Ranchi'
  }
};

// Function to check if file already has EnhancedSEO
function hasEnhancedSEO(content) {
  return content.includes('EnhancedSEO') && content.includes('from \'../components/EnhancedSEO\'');
}

// Function to update a city page
function updateCityPage(cityName) {
  const filePath = path.join(__dirname, 'src', 'pages', `${cityName}.jsx`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${cityName}.jsx`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has EnhancedSEO
    if (hasEnhancedSEO(content)) {
      console.log(`✓ Skipped (already has EnhancedSEO): ${cityName}.jsx`);
      return false;
    }
    
    const cityInfo = CITY_DATA[cityName];
    const displayName = cityInfo.displayName || cityName;
    
    // Replace old SEO import with EnhancedSEO
    if (content.includes("import SEO from '../components/SEO';")) {
      content = content.replace(
        "import SEO from '../components/SEO';",
        "import EnhancedSEO from '../components/EnhancedSEO';"
      );
    } else {
      // Add import after other imports
      const lastImportIndex = content.lastIndexOf('import ');
      const endOfLastImport = content.indexOf(';', lastImportIndex) + 1;
      content = content.slice(0, endOfLastImport) + "\nimport EnhancedSEO from '../components/EnhancedSEO';" + content.slice(endOfLastImport);
    }
    
    // Add schema imports if not present
    if (!content.includes('buildLocalBusinessSchema')) {
      const enhancedSEOImportIndex = content.indexOf("import EnhancedSEO");
      const endOfEnhancedSEOImport = content.indexOf(';', enhancedSEOImportIndex) + 1;
      content = content.slice(0, endOfEnhancedSEOImport) + "\nimport { buildLocalBusinessSchema, buildFAQSchema } from '../utils/advancedSchema';" + content.slice(endOfEnhancedSEOImport);
    }
    
    // Replace old SEO component with EnhancedSEO
    // Find the SEO component usage
    const seoComponentRegex = /<SEO\s+[\s\S]*?\/>/g;
    const match = content.match(seoComponentRegex);
    
    if (match && match[0]) {
      const newSEOComponent = `<EnhancedSEO
        title="${displayName} Escorts 2026 — ${cityInfo.profileCount} Verified Profiles | BookEase"
        description="✓ ${cityInfo.profileCount} verified ${displayName} escorts ✓ ${cityInfo.areas.slice(0, 3).join(', ')} ✓ Available tonight ✓ 24/7 service. Book premium companions with verified photos. Safe, discreet, professional. 18+ only."
        canonical="https://www.escortmumbaii.in/${cityName.toLowerCase()}"
        image="https://www.escortmumbaii.in/${cityName.toLowerCase()}-og.jpg"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.escortmumbaii.in' },
          { name: 'Cities', url: 'https://www.escortmumbaii.in/find-all-city' },
          { name: '${displayName}', url: 'https://www.escortmumbaii.in/${cityName.toLowerCase()}' }
        ]}
        city="${displayName}"
        cityData={{
          latitude: ${cityInfo.latitude},
          longitude: ${cityInfo.longitude},
          services: [
            { name: 'Verified Escorts', description: 'Professional escorts in ${displayName}' },
            { name: 'Companion Services', description: 'Premium companion services' },
            { name: 'Massage Services', description: 'Professional massage services' }
          ]
        }}
        faqSchema={buildFAQSchema([
          {
            question: 'Are the escort profiles in ${displayName} verified?',
            answer: 'Yes, all profiles on our platform are verified with ID proof and authentic photos. We conduct thorough background checks to ensure safety and authenticity for all ${displayName} bookings.'
          },
          {
            question: 'What areas do you cover in ${displayName}?',
            answer: 'We cover all major areas of ${displayName} including ${cityInfo.areas.join(', ')}. Our companions are available across the city 24/7.'
          },
          {
            question: 'How do I book an escort in ${displayName}?',
            answer: 'Simply browse profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team will help you complete the booking process securely and discreetly.'
          },
          {
            question: 'Is the service discreet in ${displayName}?',
            answer: 'Absolutely. Your privacy is our top priority. All bookings are handled with complete confidentiality, and our companions are professional and discreet throughout ${displayName}.'
          },
          {
            question: 'What are the rates for escorts in ${displayName}?',
            answer: 'Rates vary based on duration, service type, and companion experience. Contact us for exact pricing and availability in ${displayName}.'
          }
        ])}
        jsonLd={[buildLocalBusinessSchema({
          city: '${displayName}',
          state: '${cityInfo.state}',
          latitude: ${cityInfo.latitude},
          longitude: ${cityInfo.longitude},
          url: 'https://www.escortmumbaii.in/${cityName.toLowerCase()}',
          services: [
            { name: 'Verified Escorts', description: 'Professional verified escort services in ${displayName}' },
            { name: 'Companion Services', description: 'Premium companion services for events and occasions' },
            { name: 'Massage Services', description: 'Professional massage and relaxation services' }
          ]
        })]}
      />`;
      
      content = content.replace(match[0], newSEOComponent);
    }
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${cityName}.jsx`);
    return true;
    
  } catch (error) {
    console.error(`✗ Error processing ${cityName}.jsx:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  console.log('🚀 Starting SEO Enhancement for Main City Pages...\n');
  
  const cities = Object.keys(CITY_DATA);
  console.log(`📄 Found ${cities.length} city pages to update\n`);
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  cities.forEach(city => {
    const result = updateCityPage(city);
    if (result === true) {
      updated++;
    } else if (result === false) {
      const filePath = path.join(__dirname, 'src', 'pages', `${city}.jsx`);
      if (fs.existsSync(filePath) && hasEnhancedSEO(fs.readFileSync(filePath, 'utf8'))) {
        skipped++;
      } else {
        errors++;
      }
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Updated: ${updated} files`);
  console.log(`⏭️  Skipped: ${skipped} files (already optimized)`);
  console.log(`❌ Errors: ${errors} files`);
  console.log(`📁 Total: ${cities.length} files`);
  console.log('='.repeat(60));
  
  if (updated > 0) {
    console.log('\n✨ Success! Your main city pages are now SEO-optimized!');
    console.log('\n📋 Next steps:');
    console.log('1. Test the updated pages in browser');
    console.log('2. Run: npm run build');
    console.log('3. Check for any errors');
    console.log('4. Deploy to production');
  }
}

// Run the script
main();
