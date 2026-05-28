/**
 * Batch Responsive Fix Script
 * Applies mobile-first responsive fixes to all service detail pages across all states.
 * 
 * Changes:
 * 1. object-cover → object-contain on all img tags inside service detail pages
 * 2. Fixed heights (h-80, h-96) → responsive max-height
 * 3. Sticky bottom bar → safe-area-aware class
 * 4. Gallery images → object-contain
 */

const fs = require('fs');
const path = require('path');

const SERVICE_DETAILS_DIR = path.join(__dirname, 'src', 'serviceCarDetails');

let totalFiles = 0;
let modifiedFiles = 0;

function processFile(filePath) {
  // Only process .jsx files
  if (!filePath.endsWith('.jsx')) return;
  // Skip non-detail pages (the small stub files)
  const stat = fs.statSync(filePath);
  if (stat.size < 1000) return; // Skip tiny files (stubs)
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  totalFiles++;

  // 1. Replace object-cover with object-contain on image className strings
  //    But only in img tag contexts (not buttons, divs, etc.)
  content = content.replace(
    /className="([^"]*?)object-cover([^"]*?)"/g,
    (match, before, after) => {
      // Only apply to img-related class strings
      if (match.includes('w-full') && (match.includes('h-full') || match.includes('h-80') || match.includes('h-96') || match.includes('h-48'))) {
        return `className="${before}object-contain${after}"`;
      }
      return match;
    }
  );

  // 2. Replace fixed h-80 md:h-96 with responsive max-height (in img className)
  content = content.replace(
    /className="w-full h-80 md:h-96 object-contain/g,
    'className="w-full h-auto max-h-[320px] sm:max-h-[400px] md:max-h-[480px] object-contain'
  );

  // 3. Replace fixed minHeight: 320 with 280
  content = content.replace(
    /style=\{\{ minHeight: 320 \}\}/g,
    'style={{ minHeight: 280 }}'
  );

  // 4. Add flex centering to main image container
  content = content.replace(
    /className="relative overflow-hidden bg-neutral-900"/g,
    'className="relative overflow-hidden bg-neutral-900 flex items-center justify-center"'
  );

  // 5. Replace fixed sticky bottom bar with safe-area-aware version
  content = content.replace(
    /className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-50 md:hidden"/g,
    'className="sticky-bottom-bar md:hidden"'
  );
  content = content.replace(
    /className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-50 md:hidden"/g,
    'className="sticky-bottom-bar md:hidden"'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
    console.log(`  ✅ Modified: ${path.relative(__dirname, filePath)}`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile()) {
      processFile(fullPath);
    }
  }
}

console.log('🔧 Batch Responsive Fix Script');
console.log('━'.repeat(50));
console.log(`Scanning: ${SERVICE_DETAILS_DIR}`);
console.log('');

walkDir(SERVICE_DETAILS_DIR);

console.log('');
console.log('━'.repeat(50));
console.log(`📊 Results: ${modifiedFiles} of ${totalFiles} files modified`);
console.log('✨ Done!');
