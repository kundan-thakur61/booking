const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith('.jsx') && !file.includes('servicesDetails') && file !== 'ServiceDetail.jsx') {
      results.push(filePath);
    }
  }
  return results;
}

const baseDir = path.join(__dirname, 'src', 'serviceCarDetails');
const files = walkDir(baseDir);
let fixCount = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix 1: Double backtick at end of className template: `...`}`}  -> `...`}
  // Pattern: ends with `}`}  should be just `}
  content = content.replace(/`\}`\}/g, '`}');

  // Fix 2: Gallery button className with backslash (any encoding) - use char-by-char matching
  // Pattern across 2 lines:
  //   className={\relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200
  //                     }
  // Replace the entire 2-line block
  const galleryPattern = /className=\{[^\n]*relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200\s*\}/g;
  content = content.replace(galleryPattern, 
    "className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? 'ring-2 ring-pink-500' : ''}`}");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixCount++;
    console.log('Fixed:', path.relative(__dirname, filePath));
  }
}

console.log('\nTotal files fixed:', fixCount);

// Final verification - search for any remaining broken patterns
let issues = 0;
for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check for broken className, href, alt patterns
    if (/className=\{[^`"A-Za-z(]/.test(line) && !/className=\{[`"]/.test(line)) {
      console.log(`ISSUE: ${path.relative(__dirname, filePath)}:${i+1}: ${line.trim().substring(0, 100)}`);
      issues++;
    }
    if (/`\}`\}/.test(line)) {
      console.log(`DOUBLE-BT: ${path.relative(__dirname, filePath)}:${i+1}: ${line.trim().substring(0, 100)}`);
      issues++;
    }
  }
}
if (issues === 0) {
  console.log('✓ All patterns verified clean!');
} else {
  console.log(`\n⚠ ${issues} issues remaining`);
}
