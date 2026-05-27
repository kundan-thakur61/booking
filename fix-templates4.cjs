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

  // Fix className={\relative overflow-hidden rounded-xl aspect-square... multiline
  // The \r becomes a carriage return and } is on next line, so use dotAll flag
  content = content.replace(
    /className=\{[\s\S]?relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200[\s\S]*?\}/g,
    "className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? 'ring-2 ring-pink-500' : ''}`}"
  );

  // Fix className={\flex-1 or className={<formfeed>lex-1 multiline
  content = content.replace(
    /className=\{[\s\S]?flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none[\s\S]*?\}/g,
    "className={`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none ${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-60 hover:opacity-90'}`}"
  );

  // Fix href patterns for tel: with any char before
  content = content.replace(
    /href=\{[\s\S]?tel:\+91\}/g,
    'href={`tel:+91${phone}`}'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixCount++;
    console.log('Fixed:', path.relative(__dirname, filePath));
  }
}

console.log('\nTotal files fixed:', fixCount);

// Verify no broken patterns remain
let remaining = 0;
for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Look for className={ NOT followed by ` or " or a JS expression
    if (/className=\{\\/.test(line) || /className=\{\x0C/.test(line) || /className=\{\x09/.test(line)) {
      console.log(`REMAINING: ${path.relative(__dirname, filePath)}:${i+1}: ${line.trim()}`);
      remaining++;
    }
  }
}
if (remaining === 0) {
  console.log('\n✓ All broken patterns fixed!');
}
