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
let stillBroken = [];

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix ALL variations of className={<anything>relative overflow-hidden rounded-xl aspect-square...
  // Match className={ followed by any single char, then "relative overflow-hidden..."
  content = content.replace(
    /className=\{.relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200\s*\}/g,
    "className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? 'ring-2 ring-pink-500' : ''}`}"
  );

  // Fix ALL variations of className={<anything>flex-1 aspect-square overflow-hidden rounded...
  content = content.replace(
    /className=\{.flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none\s*\}/g,
    "className={`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none ${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-60 hover:opacity-90'}`}"
  );

  // Fix href={<any-char>tel:+91} patterns (tab, backslash, etc)
  content = content.replace(
    /href=\{.tel:\+91\}/g,
    'href={`tel:+91${phone}`}'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixCount++;
    console.log('Fixed:', path.relative(__dirname, filePath));
  }

  // Check if any broken patterns remain
  if (/className=\{[^`"]\S/.test(content) && /className=\{[^`"]/.test(content)) {
    // Check for non-expression className patterns
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/className=\{[^`"(]/.test(line) && !/className=\{[A-Za-z]/.test(line) && !/className=\{`/.test(line)) {
        stillBroken.push(`${path.relative(__dirname, filePath)}:${i+1}: ${line.trim()}`);
      }
    }
  }
}

console.log(`\nTotal files fixed: ${fixCount}`);
if (stillBroken.length > 0) {
  console.log(`\nStill broken (${stillBroken.length}):`);
  stillBroken.forEach(s => console.log('  ' + s));
}
