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

  // Use dotAll flag (s) to match across line breaks including \r\n
  // Fix className={<any-chars-including-newlines>relative overflow-hidden rounded-xl aspect-square...}
  content = content.replace(
    /className=\{[\s\S]?relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200[\s\S]*?\}/g,
    "className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? 'ring-2 ring-pink-500' : ''}`}"
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixCount++;
  }
}

console.log('Fixed:', fixCount, 'files');

// Verify
let issues = 0;
for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Look for the broken pattern in raw bytes
  if (content.includes('relative overflow-hidden rounded-xl') && !content.includes('`relative overflow-hidden rounded-xl')) {
    console.log('STILL BROKEN:', path.relative(__dirname, filePath));
    // Show the bytes around the match
    const idx = content.indexOf('relative overflow-hidden rounded-xl');
    const before = content.substring(Math.max(0, idx - 20), idx);
    console.log('  Context before:', JSON.stringify(before));
    issues++;
  }
}
if (issues === 0) {
  console.log('✓ All gallery className patterns fixed!');
}
