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
  const buf = fs.readFileSync(filePath);
  let content = buf.toString('utf8');
  const original = content;

  // Fix 1: className with \f (form-feed char 0x0C) for thumbnail strip
  // Pattern: className={\flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none\n                        }
  content = content.replace(
    /className=\{\x0Clex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none\s*\}/g,
    "className={`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none ${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-60 hover:opacity-90'}`}"
  );

  // Fix 2: className with backslash for gallery buttons
  // Pattern: className={\relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200\n                    }
  content = content.replace(
    /className=\{\\relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200\s*\}/g,
    "className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? 'ring-2 ring-pink-500' : ''}`}"
  );

  // Fix 3: href with \t (tab char 0x09) for tel:
  // Pattern: href={\tel:+91}
  content = content.replace(
    /href=\{\x09el:\+91\}/g,
    'href={`tel:+91${phone}`}'
  );

  // Fix 4: href with literal backslash-t for tel:
  content = content.replace(
    /href=\{\\tel:\+91\}/g,
    'href={`tel:+91${phone}`}'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixCount++;
    console.log('Fixed:', path.relative(__dirname, filePath));
  }
}

console.log(`\nTotal files fixed: ${fixCount}`);
