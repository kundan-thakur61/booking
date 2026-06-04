#!/usr/bin/env node
/**
 * Generates {City}servicesDetails.jsx files for all cities
 * in src/serviceCard/{State}/ directories, following the same
 * pattern as AndheriservicesDetails.jsx.
 *
 * Usage: node scripts/generate-service-details.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const SERVICE_CARD_DIR = path.join(ROOT, 'src', 'serviceCard');
const TEMPLATE_PATH = path.join(__dirname, 'ServiceDetail.jsx');

// Read the template
const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Convert CamelCase to display name with spaces: "ConnaughtPlace" -> "Connaught Place"
function camelToDisplay(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

// Convert name to URL slug: "Andhra Pradesh" -> "andhra-pradesh"
function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// Remove spaces to get serviceCard folder name: "Andhra Pradesh" -> "AndhraPradesh"
function toFolderName(stateName) {
  return stateName.replace(/\s+/g, '');
}

// Get all state directories from the data folder
const stateFolders = fs.readdirSync(DATA_DIR).filter(f => {
  const fullPath = path.join(DATA_DIR, f);
  return fs.statSync(fullPath).isDirectory();
});

let created = 0;
let skipped = 0;
let errors = 0;

for (const stateName of stateFolders) {
  const stateDataPath = path.join(DATA_DIR, stateName);
  const serviceCardFolder = toFolderName(stateName);
  const serviceCardStatePath = path.join(SERVICE_CARD_DIR, serviceCardFolder);

  // Skip if no matching serviceCard directory exists
  if (!fs.existsSync(serviceCardStatePath)) {
    console.warn(`  WARN: No serviceCard folder for "${stateName}" (expected ${serviceCardFolder}/)`);
    continue;
  }

  // Get all {City}services.js files in this state's data directory
  const serviceFiles = fs.readdirSync(stateDataPath)
    .filter(f => f.endsWith('services.js'));

  for (const serviceFile of serviceFiles) {
    const cityName = serviceFile.replace('services.js', '');
    const cityDisplay = camelToDisplay(cityName);
    const stateDisplay = stateName; // Already has spaces from data folder
    const stateSlug = slugify(stateName);
    const citySlug = slugify(cityDisplay);

    const outputFileName = `${cityName}servicesDetails.jsx`;
    const outputPath = path.join(serviceCardStatePath, outputFileName);

    // Skip if already exists
    // if (fs.existsSync(outputPath)) {
    //   console.log(`  SKIP: ${serviceCardFolder}/${outputFileName} (already exists)`);
    //   skipped++;
    //   continue;
    // }

    // Generate the file content by replacing placeholders
    const content = template
      .replace(/__STATE_DATA__/g, stateName)
      .replace(/__CITY_NAME__/g, cityName)
      .replace(/__CITY_DISPLAY__/g, cityDisplay)
      .replace(/__STATE_DISPLAY__/g, stateDisplay)
      .replace(/__STATE_SLUG__/g, stateSlug)
      .replace(/__CITY_SLUG__/g, citySlug);

    try {
      fs.writeFileSync(outputPath, content, 'utf8');
      console.log(`  OK: ${serviceCardFolder}/${outputFileName}`);
      created++;
    } catch (err) {
      console.error(`  ERR: ${serviceCardFolder}/${outputFileName} - ${err.message}`);
      errors++;
    }
  }
}

console.log(`\nDone! Created: ${created}, Skipped: ${skipped}, Errors: ${errors}`);
