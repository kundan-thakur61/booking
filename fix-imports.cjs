const fs = require('fs');
const path = require('path');

// Map: state directory name (with spaces) -> data directory name (PascalCase no spaces)
const stateToDataDir = {
  'Andaman and Nicobar': 'AndamanandNicobar',
  'Andhra Pradesh': 'AndhraPradesh',
  'Arunachal Pradesh': 'ArunachalPradesh',
  'Himachal Pradesh': 'HimachalPradesh',
  'Jammu and Kashmir': 'JammuAndKashmir',
  'Madhya Pradesh': 'MadhyaPradesh',
  'Tamil Nadu': 'TamilNadu', // Note: data dir might use 'TamilNadu' or 'Tamil Nadu'
  'Uttar Pradesh': 'UttarPradesh', // Note: data dir might use different casing
  'West Bengal': 'WestBengal',
};

// Verify data directories exist
const dataDir = path.join(__dirname, 'src', 'data');
for (const [spacedName, pascalName] of Object.entries(stateToDataDir)) {
  const dataDirPath = path.join(dataDir, pascalName);
  if (!fs.existsSync(dataDirPath)) {
    // Check if there's a space-version in data too
    const spacedPath = path.join(dataDir, spacedName);
    if (fs.existsSync(spacedPath)) {
      console.log(`Note: data/${spacedName} exists (with spaces)`);
      stateToDataDir[spacedName] = spacedName; // Use as-is
    } else {
      console.log(`WARNING: Neither data/${pascalName} nor data/${spacedName} exists!`);
    }
  }
}

// Also check data dir for exact names
const dataDirs = fs.readdirSync(dataDir).filter(f => fs.statSync(path.join(dataDir, f)).isDirectory());
console.log('\nData directories:', dataDirs.join(', '));

// Fix imports in all state files
const stateBaseDir = path.join(__dirname, 'src', 'state');
let fixCount = 0;

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith('.jsx')) {
      results.push(filePath);
    }
  }
  return results;
}

const stateFiles = walkDir(stateBaseDir);
for (const filePath of stateFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Fix import paths: ../../data/<spaced name>/ -> ../../data/<PascalCase>/
  for (const [spacedName, pascalName] of Object.entries(stateToDataDir)) {
    if (spacedName === pascalName) continue; // Skip if same
    content = content.replaceAll(`../../data/${spacedName}/`, `../../data/${pascalName}/`);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixCount++;
    console.log('Fixed:', path.relative(__dirname, filePath));
  }
}

console.log(`\nTotal state files fixed: ${fixCount}`);
