#!/usr/bin/env node

/**
 * Auto-Discovery Sitemap Generator for BookEase
 * Scans src/state/ and src/serviceCarDetails/ to build complete sitemaps
 * Mirrors the slugify logic from stateRoutes.jsx for URL consistency
 */

const fs = require('fs');
const path = require('path');
const glob = require('path'); // We'll use custom glob

// Configuration
const SITE_URL = 'https://www.escortmumbaii.in';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SRC_DIR = path.join(__dirname, '..', 'src');
const TODAY = new Date().toISOString().split('T')[0];

// ─── Slugify (mirrors stateRoutes.jsx exactly) ──────────────────────────────

const SLUG_OVERRIDES = {
  'JammuandKashmir': 'jammu-and-kashmir',
  'AndhraPradesh': 'andhra-pradesh',
  'ArunachalPradesh': 'arunachal-pradesh',
  'HimachalPradesh': 'himachal-pradesh',
  'MadhyaPradesh': 'madhya-pradesh',
  'UttarPradesh': 'uttar-pradesh',
  'Andaman and Nicobar': 'andaman-and-nicobar',
  'WestBengal': 'west-bengal',
  'TamilNadu': 'tamil-nadu',
};

function slugify(name) {
  if (SLUG_OVERRIDES[name]) return SLUG_OVERRIDES[name];
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

// ─── Recursive file finder ──────────────────────────────────────────────────

function findFiles(dir, ext, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(fullPath, ext, results);
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

// ─── Excluded service detail patterns (same as stateRoutes.jsx) ─────────────

function isExcludedServiceDetail(filePath) {
  const excludePatterns = [
    /ServiceDetail\.jsx$/,
    /servicesDetails\.jsx$/,
    /Goa[\/\\]ConnaughtPlace\.jsx$/,
    /Goa[\/\\]Dwarka\.jsx$/,
    /Goa[\/\\]LajpatNagar\.jsx$/,
    /Goa[\/\\]Rohini\.jsx$/,
    /Goa[\/\\]Saket\.jsx$/,
  ];
  return excludePatterns.some(pattern => pattern.test(filePath));
}

// ─── Discover state/city pages ──────────────────────────────────────────────

function discoverStateCityPages() {
  const stateDir = path.join(SRC_DIR, 'state');
  const jsxFiles = findFiles(stateDir, '.jsx');
  const urls = [];

  for (const filePath of jsxFiles) {
    const relativePath = path.relative(stateDir, filePath).replace(/\\/g, '/');
    const match = relativePath.match(/^(.+?)\/(.+?)\.jsx$/);
    if (!match) continue;

    const [, stateName, cityName] = match;
    const stateSlug = slugify(stateName);
    const citySlug = slugify(cityName);

    urls.push({
      path: `/${stateSlug}/${citySlug}`,
      priority: 0.8,
      changefreq: 'daily',
      lastmod: TODAY,
    });
  }

  return urls;
}

// ─── Discover service detail pages ──────────────────────────────────────────

function discoverServiceDetailPages() {
  const detailDir = path.join(SRC_DIR, 'serviceCarDetails');
  const jsxFiles = findFiles(detailDir, '.jsx');
  const urls = [];

  for (const filePath of jsxFiles) {
    if (isExcludedServiceDetail(filePath)) continue;

    const relativePath = path.relative(detailDir, filePath).replace(/\\/g, '/');
    const match = relativePath.match(/^(.+?)\/(.+?)\.jsx$/);
    if (!match) continue;

    const [, stateName, cityName] = match;
    const stateSlug = slugify(stateName);
    const citySlug = slugify(cityName);

    // Each city has services with IDs from data files
    // We can't easily know IDs without importing, so we add the city detail page
    // The service/:id routes are dynamic — we add representative URLs
    // Check if corresponding data file exists to count services
    const dataDir = path.join(SRC_DIR, 'data');
    const dataFiles = [
      path.join(dataDir, stateName, `${cityName}services.js`),
      path.join(dataDir, stateName, `${cityName}services.jsx`),
    ];
    
    let serviceCount = 6; // Default assumption
    for (const dataFile of dataFiles) {
      if (fs.existsSync(dataFile)) {
        try {
          const content = fs.readFileSync(dataFile, 'utf8');
          // Count service entries by looking for id: patterns
          const idMatches = content.match(/id:\s*\d+/g);
          if (idMatches) serviceCount = idMatches.length;
        } catch (e) { /* ignore */ }
        break;
      }
    }

    // Add individual service detail URLs
    for (let i = 1; i <= serviceCount; i++) {
      urls.push({
        path: `/${stateSlug}/${citySlug}/service/${i}`,
        priority: 0.6,
        changefreq: 'weekly',
        lastmod: TODAY,
      });
    }
  }

  return urls;
}

// ─── Static / hardcoded pages ───────────────────────────────────────────────

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'daily', lastmod: TODAY },
  { path: '/find-all-city', priority: 0.7, changefreq: 'weekly', lastmod: TODAY },
  { path: '/search', priority: 0.5, changefreq: 'daily', lastmod: TODAY },
  { path: '/blog', priority: 0.7, changefreq: 'weekly', lastmod: TODAY },
  { path: '/contact-us', priority: 0.6, changefreq: 'monthly', lastmod: TODAY },
  { path: '/help-center', priority: 0.6, changefreq: 'weekly', lastmod: TODAY },
  { path: '/support', priority: 0.5, changefreq: 'monthly', lastmod: TODAY },
  { path: '/how-to-report-scam', priority: 0.5, changefreq: 'monthly', lastmod: TODAY },
  { path: '/network', priority: 0.5, changefreq: 'monthly', lastmod: TODAY },
  { path: '/company', priority: 0.5, changefreq: 'monthly', lastmod: TODAY },
  { path: '/security', priority: 0.5, changefreq: 'monthly', lastmod: TODAY },
  { path: '/legal', priority: 0.4, changefreq: 'monthly', lastmod: TODAY },
  { path: '/privacy-policy', priority: 0.5, changefreq: 'monthly', lastmod: TODAY },
  { path: '/terms-and-conditions', priority: 0.5, changefreq: 'monthly', lastmod: TODAY },
  { path: '/cookie-policy', priority: 0.4, changefreq: 'monthly', lastmod: TODAY },
  { path: '/sitemap', priority: 0.3, changefreq: 'monthly', lastmod: TODAY },
];

const TOP_CITY_PAGES = [
  { path: '/mumbai', priority: 0.9, changefreq: 'daily', lastmod: TODAY },
  { path: '/delhi', priority: 0.9, changefreq: 'daily', lastmod: TODAY },
  { path: '/bangalore', priority: 0.9, changefreq: 'daily', lastmod: TODAY },
  { path: '/pune', priority: 0.9, changefreq: 'daily', lastmod: TODAY },
  { path: '/hyderabad', priority: 0.9, changefreq: 'daily', lastmod: TODAY },
  { path: '/chennai', priority: 0.9, changefreq: 'daily', lastmod: TODAY },
  { path: '/kolkata', priority: 0.9, changefreq: 'daily', lastmod: TODAY },
  { path: '/jaipur', priority: 0.8, changefreq: 'daily', lastmod: TODAY },
  { path: '/patna', priority: 0.8, changefreq: 'daily', lastmod: TODAY },
  { path: '/goa', priority: 0.8, changefreq: 'daily', lastmod: TODAY },
  { path: '/jharkhand', priority: 0.8, changefreq: 'daily', lastmod: TODAY },
];

const SERVICE_LANDING_PAGES = [
  { path: '/verified-escort-services', priority: 0.8, changefreq: 'weekly', lastmod: TODAY },
  { path: '/mumbai-escort-services', priority: 0.8, changefreq: 'weekly', lastmod: TODAY },
  { path: '/delhi-escort-services', priority: 0.8, changefreq: 'weekly', lastmod: TODAY },
  { path: '/massage-escort-services', priority: 0.8, changefreq: 'weekly', lastmod: TODAY },
  { path: '/companion-escort-services', priority: 0.8, changefreq: 'weekly', lastmod: TODAY },
  { path: '/bakeca-incontri', priority: 0.7, changefreq: 'daily', lastmod: TODAY },
  { path: '/master-seo-ranking', priority: 0.4, changefreq: 'monthly', lastmod: TODAY },
];

// ─── XML generators ─────────────────────────────────────────────────────────

function generateSitemapXml(urls) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const entries = urls.map(url => `
  <url>
    <loc>${SITE_URL}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('');

  return header + entries + '\n</urlset>';
}

function generateSitemapIndex(sitemapFiles) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const entries = sitemapFiles.map(file => `
  <sitemap>
    <loc>${SITE_URL}/${file}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`).join('');

  return header + entries + '\n</sitemapindex>';
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  console.log('🗺️  BookEase Sitemap Generator (Auto-Discovery)');
  console.log('='.repeat(50) + '\n');

  // Ensure public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // 1. Static/info pages
  console.log('📄 Static pages...');
  const pagesXml = generateSitemapXml(STATIC_PAGES);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-pages.xml'), pagesXml);
  console.log(`   ✅ sitemap-pages.xml: ${STATIC_PAGES.length} URLs`);

  // 2. Top-level city pages + auto-discovered state/city pages
  console.log('🏙️  City pages...');
  const autoDiscoveredCities = discoverStateCityPages();
  // Deduplicate: some top-level cities might also exist as state/city routes
  const cityPathSet = new Set(TOP_CITY_PAGES.map(p => p.path));
  const uniqueAutoDiscovered = autoDiscoveredCities.filter(p => !cityPathSet.has(p.path));
  const allCityUrls = [...TOP_CITY_PAGES, ...uniqueAutoDiscovered];
  const citiesXml = generateSitemapXml(allCityUrls);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-cities.xml'), citiesXml);
  console.log(`   ✅ sitemap-cities.xml: ${allCityUrls.length} URLs (${TOP_CITY_PAGES.length} top-level + ${uniqueAutoDiscovered.length} state/city)`);

  // 3. Service landing pages + auto-discovered service detail pages
  console.log('🔧 Service pages...');
  const autoDiscoveredServices = discoverServiceDetailPages();
  const allServiceUrls = [...SERVICE_LANDING_PAGES, ...autoDiscoveredServices];
  
  // Split into multiple sitemaps if > 2000 URLs (Google limit is 50,000 but best practice is smaller)
  if (allServiceUrls.length > 2000) {
    const chunks = [];
    for (let i = 0; i < allServiceUrls.length; i += 2000) {
      chunks.push(allServiceUrls.slice(i, i + 2000));
    }
    chunks.forEach((chunk, idx) => {
      const fileName = idx === 0 ? 'sitemap-services.xml' : `sitemap-services-${idx + 1}.xml`;
      fs.writeFileSync(path.join(PUBLIC_DIR, fileName), generateSitemapXml(chunk));
      console.log(`   ✅ ${fileName}: ${chunk.length} URLs`);
    });
  } else {
    const servicesXml = generateSitemapXml(allServiceUrls);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-services.xml'), servicesXml);
    console.log(`   ✅ sitemap-services.xml: ${allServiceUrls.length} URLs (${SERVICE_LANDING_PAGES.length} landing + ${autoDiscoveredServices.length} detail)`);
  }

  // 4. Generate combined sitemap.xml (all URLs in one file for simple robots.txt reference)
  console.log('📦 Combined sitemap...');
  const allUrls = [...STATIC_PAGES, ...allCityUrls, ...allServiceUrls];
  const combinedXml = generateSitemapXml(allUrls);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), combinedXml);
  console.log(`   ✅ sitemap.xml: ${allUrls.length} total URLs`);

  // 5. Sitemap index
  console.log('📋 Sitemap index...');
  const sitemapFiles = ['sitemap-pages.xml', 'sitemap-cities.xml', 'sitemap-services.xml'];
  const indexXml = generateSitemapIndex(sitemapFiles);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-index.xml'), indexXml);
  console.log(`   ✅ sitemap-index.xml: ${sitemapFiles.length} sub-sitemaps`);

  // Summary
  const totalUrls = allUrls.length;
  console.log('\n' + '='.repeat(50));
  console.log(`🎉 Done! Generated ${totalUrls} total URLs across all sitemaps`);
  console.log(`   📄 Pages: ${STATIC_PAGES.length}`);
  console.log(`   🏙️  Cities: ${allCityUrls.length}`);
  console.log(`   🔧 Services: ${allServiceUrls.length}`);
  console.log(`   📅 Date: ${TODAY}`);
  console.log(`   🌐 Domain: ${SITE_URL}`);
}

main();