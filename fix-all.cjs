// Comprehensive fix script for all broken JSX patterns across serviceCarDetails AND state files
const fs = require('fs');
const path = require('path');

function walkDir(dir, filter) {
  let results = [];
  try {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) results = results.concat(walkDir(full, filter));
      else if (filter(entry)) results.push(full);
    }
  } catch (e) { /* skip */ }
  return results;
}

let totalFixed = 0;

// ═══════════════════════════════════════════════════════════════════
// PART 1: Fix broken className in serviceCarDetails (line-by-line)
// ═══════════════════════════════════════════════════════════════════
console.log('=== PART 1: Fixing broken className in serviceCarDetails ===\n');

const scdDir = path.join(__dirname, 'src', 'serviceCarDetails');
const scdFiles = walkDir(scdDir, f => f.endsWith('.jsx') && !f.includes('servicesDetails') && f !== 'ServiceDetail.jsx');

let part1Count = 0;
for (const filePath of scdFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  let changed = false;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    // Normalize: strip non-printable chars for matching
    const stripped = line.replace(/[^\x20-\x7E]/g, '');

    // Pattern 1: className={<garbage>relative overflow-hidden rounded-xl ...
    if (stripped.includes('className={') &&
        stripped.includes('relative overflow-hidden rounded-xl aspect-square') &&
        !stripped.includes('`relative overflow-hidden')) {
      const indent = line.match(/^(\s*)/)[1];
      newLines.push(indent + "className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? 'ring-2 ring-pink-500' : ''}`}");
      changed = true;
      // Skip next line if it's just a closing brace
      if (i + 1 < lines.length && lines[i + 1].trim().replace(/[^\x20-\x7E]/g, '') === '}') {
        i += 2;
        continue;
      }
      i++;
      continue;
    }

    // Pattern 2: className={<garbage>flex-1 aspect-square overflow-hidden rounded ...
    if (stripped.includes('className={') &&
        stripped.includes('flex-1 aspect-square overflow-hidden rounded') &&
        !stripped.includes('`flex-1 aspect-square')) {
      const indent = line.match(/^(\s*)/)[1];
      newLines.push(indent + "className={`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none ${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-60 hover:opacity-90'}`}");
      changed = true;
      if (i + 1 < lines.length && lines[i + 1].trim().replace(/[^\x20-\x7E]/g, '') === '}') {
        i += 2;
        continue;
      }
      i++;
      continue;
    }

    // Pattern 3: href={<garbage>tel:+91}
    if (stripped.includes('href={') && stripped.includes('tel:+91}') && !stripped.includes('`tel:')) {
      const indent = line.match(/^(\s*)/)[1];
      newLines.push(indent + "href={`tel:+91${phone}`}");
      changed = true;
      i++;
      continue;
    }

    // Pattern 4: double-backtick at end: `}`}  ->  `}
    if (line.includes('`}`}')) {
      newLines.push(line.replace(/`\}`\}/g, '`}'));
      changed = true;
      i++;
      continue;
    }

    newLines.push(line);
    i++;
  }

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    part1Count++;
    console.log('  Fixed:', path.relative(__dirname, filePath));
  }
}
console.log(`\n  Part 1 total: ${part1Count} files fixed\n`);
totalFixed += part1Count;

// ═══════════════════════════════════════════════════════════════════
// PART 2: Fix import paths in state files (spaces → PascalCase)
// ═══════════════════════════════════════════════════════════════════
console.log('=== PART 2: Fixing import paths in state files ===\n');

const pathMap = {
  'Andaman and Nicobar': 'AndamanandNicobar',
  'Andhra Pradesh': 'AndhraPradesh',
  'Arunachal Pradesh': 'ArunachalPradesh',
  'Himachal Pradesh': 'HimachalPradesh',
  'Jammu and Kashmir': 'JammuAndKashmir',
  'Madhya Pradesh': 'MadhyaPradesh',
};

// Check which data dirs actually exist with spaces vs PascalCase
const dataDir = path.join(__dirname, 'src', 'data');
for (const [spaced, pascal] of Object.entries(pathMap)) {
  if (!fs.existsSync(path.join(dataDir, pascal))) {
    if (fs.existsSync(path.join(dataDir, spaced))) {
      delete pathMap[spaced]; // Data dir uses spaces too, no fix needed
    } else {
      console.log(`  WARNING: data/${pascal} and data/${spaced} both missing!`);
    }
  }
}

const stateDir = path.join(__dirname, 'src', 'state');
const stateFiles = walkDir(stateDir, f => f.endsWith('.jsx'));
let part2Count = 0;

for (const filePath of stateFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const [spaced, pascal] of Object.entries(pathMap)) {
    content = content.replaceAll(`/data/${spaced}/`, `/data/${pascal}/`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    part2Count++;
    console.log('  Fixed:', path.relative(__dirname, filePath));
  }
}
console.log(`\n  Part 2 total: ${part2Count} files fixed\n`);
totalFixed += part2Count;

// ═══════════════════════════════════════════════════════════════════
// VERIFICATION
// ═══════════════════════════════════════════════════════════════════
console.log('=== VERIFICATION ===\n');
let issues = 0;

for (const filePath of scdFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  for (let li = 0; li < lines.length; li++) {
    const s = lines[li].replace(/[^\x20-\x7E]/g, '');
    if (s.includes('className={') && s.includes('relative overflow-hidden rounded-xl') && !s.includes('`relative')) {
      console.log(`  BROKEN className: ${path.relative(__dirname, filePath)}:${li+1}`);
      issues++;
    }
    if (s.includes('className={') && s.includes('flex-1 aspect-square overflow-hidden') && !s.includes('`flex-1')) {
      console.log(`  BROKEN className: ${path.relative(__dirname, filePath)}:${li+1}`);
      issues++;
    }
    if (s.includes('href={') && s.includes('tel:+91}') && !s.includes('`tel:')) {
      console.log(`  BROKEN href: ${path.relative(__dirname, filePath)}:${li+1}`);
      issues++;
    }
    if (s.includes('`}`}')) {
      console.log(`  DOUBLE BACKTICK: ${path.relative(__dirname, filePath)}:${li+1}`);
      issues++;
    }
  }
}

for (const filePath of stateFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const [spaced] of Object.entries(pathMap)) {
    if (content.includes(`/data/${spaced}/`)) {
      console.log(`  BROKEN import: ${path.relative(__dirname, filePath)} still has /data/${spaced}/`);
      issues++;
    }
  }
}

console.log(issues === 0
  ? '\n✅ All patterns verified clean!'
  : `\n❌ ${issues} issues remaining`);
console.log(`\nTotal files fixed: ${totalFixed}`);
