const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = [
  'Bangalore.jsx',
  'Chennai.jsx',
  'Delhi.jsx',
  'Goa.jsx',
  'Hyderabad.jsx',
  'Jaipur.jsx',
  'Jharkhand.jsx',
  'Kolkata.jsx',
  'Mumbai.jsx',
  'Patna.jsx',
  'Pune.jsx'
];

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file has the problematic pattern
  if (content.includes('import { buildLocalBusinessSchema, buildFAQSchema }') && 
      content.includes('function ' + file.replace('.jsx', ''))) {
    
    console.log(`Fixing ${file}...`);
    
    // Uncomment all the commented code
    content = content.replace(/^\/\/ /gm, '');
    
    // Remove the simple component at the top
    const componentName = file.replace('.jsx', '');
    const simpleComponentRegex = new RegExp(
      `import React from 'react'\\s*\\n\\s*function ${componentName}\\(\\) {[\\s\\S]*?}\\s*\\n\\s*export default ${componentName}\\s*\\n\\s*\\n\\s*\\n\\s*`,
      'g'
    );
    content = content.replace(simpleComponentRegex, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${file}`);
  } else {
    console.log(`Skipping ${file} - already fixed or different structure`);
  }
});

console.log('Done!');
