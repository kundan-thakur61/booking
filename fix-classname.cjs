const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  try {
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
  } catch (e) { /* ignore */ }
  return results;
}

const baseDir = path.join(__dirname, 'src', 'serviceCarDetails');
const files = walkDir(baseDir);
let fixCount = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Aggressively find and replace: any line containing "className={" followed by anything 
  // then "relative overflow-hidden rounded-xl" — replace the ENTIRE className attribute
  // This handles all encoding variations
  const lines = content.split('\n');
  let newLines = [];
  let skip = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (skip) {
      // Check if this line is just whitespace + }
      if (lines[i].trim() === '}') {
        skip = false;
        continue; // Skip this closing line too - was part of the broken multiline
      }
      skip = false; // Only skip one line
    }
    
    const line = lines[i];
    
    if (line.includes('relative overflow-hidden rounded-xl aspect-square') && 
        line.includes('className=') && 
        !line.includes('`relative')) {
      // This is a broken className line - replace it entirely
      const indent = line.match(/^\s*/)[0];
      newLines.push(`${indent}className={\`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 \${i === activeImg ? 'ring-2 ring-pink-500' : ''}\`}`);
      // Check if next line is just the closing }
      if (i + 1 < lines.length && lines[i + 1].trim() === '}') {
        skip = true;
      }
    } else if (line.includes('flex-1 aspect-square overflow-hidden rounded') &&
               line.includes('className=') &&
               !line.includes('`flex-1')) {
      const indent = line.match(/^\s*/)[0];
      newLines.push(`${indent}className={\`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none \${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-60 hover:opacity-90'}\`}`);
      if (i + 1 < lines.length && lines[i + 1].trim() === '}') {
        skip = true;
      }
    } else {
      newLines.push(line);
    }
  }
  
  content = newLines.join('\n');
  
  // Also fix double backticks from previous fixes
  content = content.replace(/`\}`\}/g, '`}');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixCount++;
    console.log('Fixed:', path.relative(__dirname, filePath));
  }
}

console.log(`\nTotal files fixed: ${fixCount}`);

// Verify
let issues = 0;
for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('relative overflow-hidden rounded-xl') && 
        lines[i].includes('className=') && 
        !lines[i].includes('`relative')) {
      console.log(`ISSUE: ${path.relative(__dirname, filePath)}:${i+1}`);
      issues++;
    }
    if (lines[i].includes('flex-1 aspect-square overflow-hidden') && 
        lines[i].includes('className=') && 
        !lines[i].includes('`flex-1')) {
      console.log(`ISSUE: ${path.relative(__dirname, filePath)}:${i+1}`);
      issues++;
    }
  }
}
console.log(issues === 0 ? '✓ All clean!' : `⚠ ${issues} issues remaining`);
