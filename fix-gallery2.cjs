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

  // Find "relative overflow-hidden rounded-xl" NOT preceded by backtick
  // Use a very broad pattern: className={ followed by anything up to this text, then anything up to }
  const pattern = /className=\{[^`]*?relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200[\s\S]*?\}/g;
  content = content.replace(pattern,
    "className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? 'ring-2 ring-pink-500' : ''}`}");

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
  const idx = content.indexOf('relative overflow-hidden rounded-xl');
  while (idx !== -1) {
    // Check if it's properly wrapped in backticks
    const before = content.substring(Math.max(0, idx - 5), idx);
    if (!before.includes('`')) {
      console.log('ISSUE:', path.relative(__dirname, filePath), 'context:', JSON.stringify(before));
      issues++;
    }
    break;
  }
}
console.log(issues === 0 ? '✓ All clean!' : `⚠ ${issues} issues`);
