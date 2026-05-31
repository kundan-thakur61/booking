/**
 * Automated Script to Add EnhancedSEO to All Service Detail Pages
 * 
 * This script will:
 * 1. Find all service detail .jsx files in serviceCarDetails directory
 * 2. Add EnhancedSEO import if not present
 * 3. Add EnhancedSEO component with proper schema
 * 4. Generate city-specific metadata
 * 
 * Usage: node update-service-details-seo.cjs
 */

const fs = require('fs');
const path = require('path');

// Base directory
const SERVICE_DETAILS_DIR = path.join(__dirname, 'src', 'serviceCarDetails');

// City coordinates (major cities)
const CITY_COORDINATES = {
  // Maharashtra
  'Mumbai': { lat: 19.0760, lng: 72.8777, state: 'Maharashtra' },
  'Pune': { lat: 18.5204, lng: 73.8567, state: 'Maharashtra' },
  'Nagpur': { lat: 21.1458, lng: 79.0882, state: 'Maharashtra' },
  'Nashik': { lat: 19.9975, lng: 73.7898, state: 'Maharashtra' },
  
  // Delhi
  'ConnaughtPlace': { lat: 28.6315, lng: 77.2167, state: 'Delhi', displayName: 'Connaught Place' },
  'Dwarka': { lat: 28.5921, lng: 77.0460, state: 'Delhi' },
  'Rohini': { lat: 28.7496, lng: 77.0669, state: 'Delhi' },
  'Saket': { lat: 28.5244, lng: 77.2066, state: 'Delhi' },
  'LajpatNagar': { lat: 28.5677, lng: 77.2431, state: 'Delhi', displayName: 'Lajpat Nagar' },
  
  // Karnataka
  'Bangalore': { lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
  'Mysore': { lat: 12.2958, lng: 76.6394, state: 'Karnataka' },
  'Mangalore': { lat: 12.9141, lng: 74.8560, state: 'Karnataka' },
  
  // Tamil Nadu
  'Chennai': { lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
  'Coimbatore': { lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu' },
  'Madurai': { lat: 9.9252, lng: 78.1198, state: 'Tamil Nadu' },
  
  // Telangana
  'Hyderabad': { lat: 17.3850, lng: 78.4867, state: 'Telangana' },
  
  // West Bengal
  'Kolkata': { lat: 22.5726, lng: 88.3639, state: 'West Bengal' },
  
  // Gujarat
  'Ahmedabad': { lat: 23.0225, lng: 72.5714, state: 'Gujarat' },
  'Surat': { lat: 21.1702, lng: 72.8311, state: 'Gujarat' },
  
  // Rajasthan
  'Jaipur': { lat: 26.9124, lng: 75.7873, state: 'Rajasthan' },
  
  // Uttar Pradesh
  'Lucknow': { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
  'Kanpur': { lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh' },
  'Agra': { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh' },
  'Varanasi': { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh' },
  
  // Bihar
  'Patna': { lat: 25.5941, lng: 85.1376, state: 'Bihar' },
  
  // Madhya Pradesh
  'Bhopal': { lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh' },
  'Indore': { lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh' },
  
  // Punjab
  'Chandigarh': { lat: 30.7333, lng: 76.7794, state: 'Chandigarh' },
  
  // Goa
  'Panaji': { lat: 15.4909, lng: 73.8278, state: 'Goa' },
  
  // Kerala
  'Kochi': { lat: 9.9312, lng: 76.2673, state: 'Kerala' },
  'Thiruvananthapuram': { lat: 8.5241, lng: 76.9366, state: 'Kerala' },
  
  // Add more as needed...
};

// Function to get city info
function getCityInfo(cityName) {
  const info = CITY_COORDINATES[cityName];
  if (info) {
    return {
      name: info.displayName || cityName,
      state: info.state,
      latitude: info.lat,
      longitude: info.lng
    };
  }
  // Default fallback
  return {
    name: cityName,
    state: 'India',
    latitude: 20.5937,
    longitude: 78.9629
  };
}

// Function to check if file already has EnhancedSEO
function hasEnhancedSEO(content) {
  return content.includes('EnhancedSEO') || content.includes('from \'../../components/EnhancedSEO\'');
}

// Function to add EnhancedSEO to a service detail file
function addEnhancedSEO(filePath, cityName) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has EnhancedSEO
    if (hasEnhancedSEO(content)) {
      console.log(`✓ Skipped (already has EnhancedSEO): ${path.basename(filePath)}`);
      return false;
    }
    
    const cityInfo = getCityInfo(cityName);
    
    // Add import statement after existing imports
    const importStatement = `import EnhancedSEO from '../../components/EnhancedSEO';\nimport { buildLocalBusinessSchema, buildFAQSchema } from '../../utils/advancedSchema';\n`;
    
    // Find the last import statement
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf(';', lastImportIndex) + 1;
    
    // Insert new imports
    content = content.slice(0, endOfLastImport) + '\n' + importStatement + content.slice(endOfLastImport);
    
    // Add SEO component after the opening <div> tag
    const seoComponent = `
      <EnhancedSEO
        title={\`\${service?.name || 'Service'} in ${cityInfo.name} | BookEase Premium\`}
        description={\`Book \${service?.name || 'premium escort services'} in ${cityInfo.name}. Verified profile, professional service, 24/7 available. Safe and discreet booking.\`}
        canonical={\`https://www.escortmumbaii.in/\${window.location.pathname}\`}
        image={service?.image || 'https://www.escortmumbaii.in/og-image.jpg'}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.escortmumbaii.in' },
          { name: '${cityInfo.name}', url: \`https://www.escortmumbaii.in/\${window.location.pathname.split('/').slice(0, -2).join('/')}\` },
          { name: service?.name || 'Service', url: \`https://www.escortmumbaii.in/\${window.location.pathname}\` }
        ]}
        city="${cityInfo.name}"
        cityData={{
          latitude: ${cityInfo.latitude},
          longitude: ${cityInfo.longitude},
          services: [
            { name: service?.name || 'Escort Services', description: service?.description || 'Professional companion services' }
          ]
        }}
      />
`;
    
    // Find the return statement and first <div>
    const returnIndex = content.indexOf('return (');
    if (returnIndex === -1) {
      console.log(`✗ Could not find return statement in: ${path.basename(filePath)}`);
      return false;
    }
    
    const firstDivIndex = content.indexOf('<div', returnIndex);
    if (firstDivIndex === -1) {
      console.log(`✗ Could not find opening div in: ${path.basename(filePath)}`);
      return false;
    }
    
    const endOfFirstDiv = content.indexOf('>', firstDivIndex) + 1;
    
    // Insert SEO component
    content = content.slice(0, endOfFirstDiv) + seoComponent + content.slice(endOfFirstDiv);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${path.basename(filePath)}`);
    return true;
    
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

// Function to recursively find all .jsx files
function findJsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsxFiles(filePath, fileList);
    } else if (file.endsWith('.jsx') && !file.includes('servicesDetails')) {
      // Extract city name from file path
      const cityName = file.replace('.jsx', '');
      fileList.push({ path: filePath, city: cityName });
    }
  });
  
  return fileList;
}

// Main execution
function main() {
  console.log('🚀 Starting SEO Enhancement for Service Detail Pages...\n');
  console.log(`📁 Scanning directory: ${SERVICE_DETAILS_DIR}\n`);
  
  if (!fs.existsSync(SERVICE_DETAILS_DIR)) {
    console.error(`❌ Directory not found: ${SERVICE_DETAILS_DIR}`);
    process.exit(1);
  }
  
  // Find all JSX files
  const files = findJsxFiles(SERVICE_DETAILS_DIR);
  console.log(`📄 Found ${files.length} service detail files\n`);
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  // Process each file
  files.forEach(({ path: filePath, city }) => {
    const result = addEnhancedSEO(filePath, city);
    if (result === true) {
      updated++;
    } else if (result === false && hasEnhancedSEO(fs.readFileSync(filePath, 'utf8'))) {
      skipped++;
    } else {
      errors++;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Updated: ${updated} files`);
  console.log(`⏭️  Skipped: ${skipped} files (already optimized)`);
  console.log(`❌ Errors: ${errors} files`);
  console.log(`📁 Total: ${files.length} files`);
  console.log('='.repeat(60));
  
  if (updated > 0) {
    console.log('\n✨ Success! Your service detail pages are now SEO-optimized!');
    console.log('\n📋 Next steps:');
    console.log('1. Test a few pages to ensure they load correctly');
    console.log('2. Run: npm run build');
    console.log('3. Check for any errors');
    console.log('4. Deploy to production');
  }
}

// Run the script
main();
