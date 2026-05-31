# 🚀 COMPLETE PERFORMANCE FIX PLAN
## Target: 39 → 90+ Performance Score in 30 Days

**Current Scores:**
- Performance: 39/100 ❌
- LCP: 16.1s (Target: <2.5s) ❌
- FCP: 8.9s (Target: <1.8s) ❌
- TBT: 720ms (Target: <200ms) ❌
- CLS: 0 ✅

**Tech Stack Identified:**
- React 19.2.0 + Vite 7.2.4
- React Router 7.11.0
- Tailwind CSS 4.1.18
- 500+ lazy-loaded city routes
- No service worker
- No image optimization

---

## 📊 PRIORITY MATRIX

| Fix | Impact | Effort | Priority | Time |
|-----|--------|--------|----------|------|
| Route-based code splitting | 🔥🔥🔥 | Medium | CRITICAL | 2h |
| Image optimization | 🔥🔥🔥 | Low | CRITICAL | 1h |
| Critical CSS extraction | 🔥🔥 | Medium | HIGH | 2h |
| Service Worker + Cache | 🔥🔥 | Medium | HIGH | 3h |
| Font optimization | 🔥 | Low | HIGH | 30min |
| Preload critical resources | 🔥 | Low | QUICK WIN | 15min |
| Remove unused JS | 🔥🔥🔥 | High | CRITICAL | 4h |
| Minify & compress | 🔥 | Low | QUICK WIN | 30min |

---

## 🎯 PHASE 1: QUICK WINS (Day 1 - 2 hours)

### 1.1 Preload Critical Resources
**Impact:** LCP -2s, FCP -1s | **Time:** 15 minutes


**File:** `index.html`

```html
<head>
  <!-- CRITICAL: Preload hero image (LCP element) -->
  <link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high">
  
  <!-- Preload critical fonts -->
  <link rel="preload" as="font" type="font/woff2" 
        href="/fonts/inter-var.woff2" crossorigin>
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="//res.cloudinary.com">
  
  <!-- Preload critical CSS -->
  <link rel="preload" as="style" href="/src/styles/index.css">
</head>
```

**Expected Improvement:** LCP: 16.1s → 14s, FCP: 8.9s → 7.5s

---

### 1.2 Font Optimization with font-display: swap
**Impact:** FCP -1.5s | **Time:** 30 minutes

**Problem:** Google Fonts blocking render

**Solution:** Self-host fonts + font-display: swap


**Step 1:** Download fonts
```bash
# Install google-webfonts-helper
npx google-webfonts-helper download Inter
```

**Step 2:** Update CSS (`src/styles/index.css`)
```css
/* Self-hosted fonts with font-display: swap */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* CRITICAL for FCP */
  src: url('/fonts/inter-v12-latin-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-700.woff2') format('woff2');
}
```

**Step 3:** Remove Google Fonts from `index.html`
```html
<!-- DELETE THESE LINES -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Expected Improvement:** FCP: 7.5s → 6s

---

### 1.3 Defer Non-Critical JavaScript
**Impact:** TBT -200ms | **Time:** 15 minutes


**File:** `index.html`

```html
<body>
  <div id="root"></div>
  
  <!-- Main app - keep as module -->
  <script type="module" src="/src/main.jsx"></script>
  
  <!-- Defer analytics until after load -->
  <script>
    window.addEventListener('load', () => {
      // Load GA after page is interactive
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID';
      script.async = true;
      document.head.appendChild(script);
    });
  </script>
</body>
```

**Expected Improvement:** TBT: 720ms → 520ms

---

### 1.4 Enable Compression in Vite
**Impact:** Bundle size -40% | **Time:** 10 minutes

**File:** `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip', threshold: 1024 }),
    compression({ algorithm: 'brotliCompress', threshold: 1024 })
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    }
  }
})
```


**Install plugin:**
```bash
npm install -D vite-plugin-compression2
```

**Expected Improvement:** Bundle: 1157 KB → 695 KB

---

### 1.5 Remove Unused Imports
**Impact:** Bundle -50 KB | **Time:** 20 minutes

**File:** `src/pages/Home.jsx`

```javascript
// REMOVE these unused imports
import React from 'react'; // ❌ Not needed in React 19
import ServiceCard from '../components/ServiceCard'; // ❌ Not used
const faqSchema = aeoStrategy.faqSections.generalSafety; // ❌ Not used
```

**Run ESLint to find all unused imports:**
```bash
npm run lint -- --fix
```

**Expected Improvement:** Bundle -50 KB

---

## 🔥 PHASE 2: CRITICAL FIXES (Days 2-5)

### 2.1 MASSIVE CODE SPLITTING FIX
**Impact:** Unused JS: 901 KB → 50 KB | **Time:** 4 hours

**PROBLEM:** You're loading 500+ city routes upfront!

**Current bundle analysis:**
```
vendor.js: 450 KB (React, Router)
pages.js: 1200 KB (ALL 500+ cities loaded!)
```


**SOLUTION: Dynamic imports with React.lazy**

**File:** `src/App.jsx` - REPLACE static imports

```javascript
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// ✅ ONLY Home is eager-loaded
import Home from './pages/Home';

// ✅ Everything else is lazy-loaded
const Booking = lazy(() => import('./pages/Booking'));
const Mumbai = lazy(() => import('./pages/Mumbai'));
const Delhi = lazy(() => import('./pages/Delhi'));
// ... rest of lazy imports

// ✅ CRITICAL: Lazy load city routes dynamically
const CityPageTemplate = lazy(() => import('./pages/CityPageTemplate'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Dynamic city routes - loaded on demand */}
        {stateRoutes.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={
              <Suspense fallback={<PageLoader />}>
                {React.createElement(lazy(() => route.Component))}
              </Suspense>
            } 
          />
        ))}
      </Routes>
    </Suspense>
  );
}
```

**Expected Improvement:** 
- Initial bundle: 1200 KB → 250 KB
- Unused JS: 901 KB → 50 KB
- LCP: 14s → 8s

---


### 2.2 Advanced Vite Code Splitting
**Impact:** Chunk optimization | **Time:** 1 hour

**File:** `vite.config.js` - REPLACE rollupOptions

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk - React core
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          
          // Router chunk
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          
          // UI libraries
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          
          // City pages - split by state
          if (id.includes('/src/state/')) {
            const state = id.split('/src/state/')[1].split('/')[0];
            return `state-${state}`;
          }
          
          // Service details - split separately
          if (id.includes('/src/serviceCard/')) {
            return 'services';
          }
          
          // SEO utilities - lazy load
          if (id.includes('/src/seo/')) {
            return 'seo-utils';
          }
        }
      }
    },
    chunkSizeWarningLimit: 300 // Warn if chunk > 300 KB
  }
})
```

**Expected Improvement:** 
- Parallel loading of chunks
- Better caching (vendor chunks don't change)

---


### 2.3 Image Optimization - CRITICAL for LCP
**Impact:** LCP: 8s → 3.5s | **Time:** 2 hours

**PROBLEM:** No image optimization, no WebP, no lazy loading

**SOLUTION 1: Install Vite Image Plugin**

```bash
npm install -D vite-plugin-image-optimizer sharp
```

**File:** `vite.config.js`

```javascript
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 }
    })
  ]
})
```

**SOLUTION 2: Create Optimized Image Component**

**File:** `src/components/OptimizedImage.jsx` (REPLACE EXISTING)

```javascript
import { useState, useEffect } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className = '' 
}) {
  const [loaded, setLoaded] = useState(false);
  
  // Generate WebP and fallback URLs
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ filter: loaded ? 'none' : 'blur(8px)' }}
      />
    </picture>
  );
}
```


**SOLUTION 3: Update Home.jsx Hero Section**

```javascript
// In Home.jsx - Hero section
<section className="relative bg-gradient-to-r from-pink-600/90 to-pink-700/90">
  {/* Background image with priority loading */}
  <OptimizedImage
    src="/hero-image.jpg"
    alt="Premium escort services"
    width={1920}
    height={600}
    priority={true}
    className="absolute inset-0 w-full h-full object-cover -z-10"
  />
  
  <div className="container mx-auto px-4 relative z-10">
    {/* Hero content */}
  </div>
</section>
```

**SOLUTION 4: Batch Convert Images to WebP**

```bash
# Install sharp CLI
npm install -g sharp-cli

# Convert all images to WebP
npx sharp -i "public/**/*.{jpg,jpeg,png}" -o "public/" -f webp
```

**Expected Improvement:** 
- LCP: 8s → 3.5s
- Image size: -60%
- FCP: 6s → 4s

---

### 2.4 Critical CSS Extraction
**Impact:** FCP: 4s → 2.5s | **Time:** 2 hours

**PROBLEM:** 100+ KB CSS blocking render

**SOLUTION: Extract above-the-fold CSS**

**Install Critical CSS plugin:**
```bash
npm install -D vite-plugin-critical
```


**File:** `vite.config.js`

```javascript
import critical from 'vite-plugin-critical';

export default defineConfig({
  plugins: [
    react(),
    critical({
      pages: [
        { uri: '/', template: 'index' },
        { uri: '/mumbai', template: 'city' },
        { uri: '/delhi', template: 'city' }
      ],
      dimensions: [
        { width: 375, height: 667 },  // Mobile
        { width: 1920, height: 1080 } // Desktop
      ],
      inline: true,
      minify: true,
      extract: true
    })
  ]
})
```

**Manual Critical CSS (Alternative):**

**File:** `index.html` - Add inline critical CSS

```html
<head>
  <style>
    /* Critical CSS - Above the fold only */
    body{margin:0;font-family:Inter,sans-serif;background:#fafafa}
    .hero-responsive{min-height:280px;padding:3rem 1rem}
    .container{max-width:1280px;margin:0 auto;padding:0 1rem}
    h1{font-size:clamp(1.75rem,5vw,3rem);font-weight:700;line-height:1.25}
    .bg-pink-600{background-color:#db2777}
    .text-white{color:#fff}
    /* Add only styles needed for first paint */
  </style>
  
  <!-- Load full CSS async -->
  <link rel="preload" as="style" href="/src/styles/index.css" 
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/src/styles/index.css"></noscript>
</head>
```

**Expected Improvement:** FCP: 4s → 2.5s

---


## 🚀 PHASE 3: SERVICE WORKER & CACHING (Days 6-8)

### 3.1 Workbox Service Worker
**Impact:** Repeat visits: 90+ score | **Time:** 3 hours

**Install Workbox:**
```bash
npm install -D workbox-build workbox-window
```

**File:** `vite.config.js`

```javascript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'robots.txt'],
      manifest: {
        name: 'BookEase - Verified Escorts India',
        short_name: 'BookEase',
        description: 'Premium escort services directory',
        theme_color: '#db2777',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          }
        ]
      }
    })
  ]
})
```


**File:** `src/main.jsx` - Register service worker

```javascript
import { registerSW } from 'virtual:pwa-register';

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  }
});
```

**Expected Improvement:**
- Repeat visits: LCP < 1s
- Offline functionality
- bfcache compatibility ✅

---

### 3.2 Fix Back/Forward Cache (bfcache)
**Impact:** Instant back navigation | **Time:** 30 minutes

**PROBLEM:** Page prevented bfcache restoration

**File:** `src/utils/coreWebVitals.js` - FIX

```javascript
// ❌ REMOVE: unload event breaks bfcache
window.addEventListener('unload', () => {
  // Don't do this!
});

// ✅ USE: pagehide event instead
window.addEventListener('pagehide', (event) => {
  if (!event.persisted) {
    // Page is being unloaded, not cached
    // Send analytics here
  }
});

// ✅ USE: visibilitychange for tracking
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // Send analytics beacon
    navigator.sendBeacon('/analytics', data);
  }
});
```

**Expected Improvement:** bfcache: ❌ → ✅

---


## ⚡ PHASE 4: ADVANCED OPTIMIZATIONS (Days 9-15)

### 4.1 Reduce DOM Size
**Impact:** TBT -100ms | **Time:** 2 hours

**Current DOM:** Likely 3000+ nodes (too many!)
**Target:** < 1500 nodes

**SOLUTION 1: Virtualize Long Lists**

```bash
npm install react-window
```

**File:** `src/pages/findAllCity.jsx` - Virtualize city list

```javascript
import { FixedSizeList as List } from 'react-window';

function CityList({ cities }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <Link to={cities[index].slug}>
        {cities[index].name}
      </Link>
    </div>
  );

  return (
    <List
      height={600}
      itemCount={cities.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

**SOLUTION 2: Pagination for Service Cards**

```javascript
// In Home.jsx - Limit initial render
const [visibleServices, setVisibleServices] = useState(6);

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {services.slice(0, visibleServices).map((service) => (
    <ServiceCard key={service.id} service={service} />
  ))}
</div>

<button onClick={() => setVisibleServices(prev => prev + 6)}>
  Load More
</button>
```

**Expected Improvement:** 
- DOM nodes: 3000+ → 1200
- TBT: 520ms → 420ms

---


### 4.2 Third-Party Script Management
**Impact:** TBT -150ms | **Time:** 1 hour

**PROBLEM:** Google Analytics blocking main thread

**SOLUTION: Use Partytown for Web Workers**

```bash
npm install @builder.io/partytown
```

**File:** `vite.config.js`

```javascript
import { partytownVite } from '@builder.io/partytown/utils';

export default defineConfig({
  plugins: [
    react(),
    partytownVite({
      dest: path.join(__dirname, 'dist', '~partytown')
    })
  ]
})
```

**File:** `index.html` - Move GA to worker

```html
<head>
  <!-- Partytown script -->
  <script>
    partytown = {
      forward: ['dataLayer.push', 'gtag']
    };
  </script>
  <script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
  <script type="text/partytown">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</head>
```

**Expected Improvement:** TBT: 420ms → 270ms

---

### 4.3 Lazy Load Below-the-Fold Content
**Impact:** LCP -500ms | **Time:** 1 hour

**File:** `src/pages/Home.jsx`

```javascript
import { lazy, Suspense } from 'react';

// Lazy load FAQ section (below fold)
const FAQSection = lazy(() => import('../components/FAQSection'));
const FooterSection = lazy(() => import('../components/Footer'));

function Home() {
  return (
    <>
      <Header />
      <HeroSection /> {/* Above fold - eager */}
      <TopCities /> {/* Above fold - eager */}
      
      {/* Below fold - lazy */}
      <Suspense fallback={<div>Loading...</div>}>
        <FAQSection />
        <FooterSection />
      </Suspense>
    </>
  );
}
```

**Expected Improvement:** LCP: 3.5s → 3s

---


### 4.4 Resource Hints Strategy
**Impact:** LCP -300ms | **Time:** 30 minutes

**File:** `src/components/SEO.jsx` - Add to SEO component

```javascript
export default function SEO({ preloadResources = [], prefetchResources = [] }) {
  return (
    <Helmet>
      {/* Preload critical resources */}
      {preloadResources.map((resource, i) => (
        <link
          key={i}
          rel="preload"
          as={resource.as}
          href={resource.href}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
          fetchpriority={resource.priority || 'auto'}
        />
      ))}
      
      {/* Prefetch next likely pages */}
      {prefetchResources.map((resource, i) => (
        <link key={i} rel="prefetch" href={resource.href} as={resource.as} />
      ))}
    </Helmet>
  );
}
```

**Usage in Home.jsx:**

```javascript
<SEO
  preloadResources={[
    { href: '/hero-image.webp', as: 'image', type: 'image/webp', priority: 'high' },
    { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
  ]}
  prefetchResources={[
    { href: '/mumbai', as: 'document' },
    { href: '/delhi', as: 'document' }
  ]}
/>
```

**Expected Improvement:** LCP: 3s → 2.7s

---


## 🔧 PHASE 5: MONITORING & TESTING (Days 16-20)

### 5.1 Lighthouse CI Setup
**Impact:** Automated performance tracking | **Time:** 2 hours

**Install Lighthouse CI:**
```bash
npm install -D @lhci/cli
```

**File:** `lighthouserc.json`

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:4173/", "http://localhost:4173/mumbai"],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1800}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "total-blocking-time": ["error", {"maxNumericValue": 200}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Add to package.json:**
```json
{
  "scripts": {
    "lighthouse": "lhci autorun",
    "lighthouse:mobile": "lhci autorun --preset=mobile"
  }
}
```

**Run tests:**
```bash
npm run build
npm run preview
npm run lighthouse
```

---


### 5.2 Real User Monitoring (RUM)
**Impact:** Track real-world performance | **Time:** 1 hour

**File:** `src/utils/webVitalsReporting.js` (NEW)

```javascript
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics({ name, value, id, rating }) {
  // Send to Google Analytics
  if (window.gtag) {
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      non_interaction: true
    });
  }
  
  // Send to custom endpoint
  navigator.sendBeacon('/api/vitals', JSON.stringify({
    name,
    value,
    id,
    rating,
    url: window.location.href,
    timestamp: Date.now()
  }));
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

**File:** `src/main.jsx` - Add tracking

```javascript
import { initWebVitals } from './utils/webVitalsReporting';

// Initialize Web Vitals
if (typeof window !== 'undefined') {
  initWebVitals();
}
```

---

### 5.3 Bundle Analysis
**Impact:** Identify bloat | **Time:** 30 minutes

```bash
npm install -D rollup-plugin-visualizer
```

**File:** `vite.config.js`

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ]
})
```

**Run analysis:**
```bash
npm run build
# Opens stats.html in browser
```

---


## 📈 PHASE 6: CDN & HOSTING (Days 21-25)

### 6.1 Cloudflare CDN Setup
**Impact:** TTFB -500ms for India | **Time:** 2 hours

**Steps:**

1. **Sign up for Cloudflare** (free tier)
2. **Add your domain** to Cloudflare
3. **Update nameservers** at your registrar
4. **Enable optimizations:**

**Cloudflare Dashboard Settings:**

```
Speed > Optimization:
✅ Auto Minify: HTML, CSS, JS
✅ Brotli compression
✅ Early Hints
✅ HTTP/2 to Origin
✅ HTTP/3 (with QUIC)
✅ Rocket Loader (OFF - we handle JS loading)

Caching > Configuration:
✅ Browser Cache TTL: 4 hours
✅ Caching Level: Standard
✅ Always Online: ON

Page Rules:
Rule 1: *.js, *.css, *.woff2, *.webp
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 week

Rule 2: /api/*
  - Cache Level: Bypass
```

**Expected Improvement:** 
- TTFB: 800ms → 300ms (India)
- LCP: 3s → 2.3s

---

### 6.2 Vercel Deployment Optimization
**Impact:** Edge caching | **Time:** 1 hour

**File:** `vercel.json` (NEW)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).webp",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2592000"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---


### 6.3 HTTP/2 Server Push (if self-hosting)
**Impact:** Parallel resource loading | **Time:** 1 hour

**File:** `.htaccess` (Apache) or `nginx.conf`

**Apache:**
```apache
<IfModule mod_http2.c>
  H2Push on
  H2PushPriority * after
  H2PushPriority text/css before
  H2PushPriority image/webp after
  
  <FilesMatch "\.html$">
    Header add Link "</assets/vendor-react.js>; rel=preload; as=script"
    Header add Link "</assets/index.css>; rel=preload; as=style"
    Header add Link "</hero-image.webp>; rel=preload; as=image"
  </FilesMatch>
</IfModule>
```

**Nginx:**
```nginx
server {
  listen 443 ssl http2;
  
  location / {
    http2_push /assets/vendor-react.js;
    http2_push /assets/index.css;
    http2_push /hero-image.webp;
  }
}
```

---

## 🎯 PHASE 7: FINAL OPTIMIZATIONS (Days 26-30)

### 7.1 Prefetch Next Pages
**Impact:** Instant navigation | **Time:** 1 hour

**File:** `src/components/PrefetchLink.jsx` (NEW)

```javascript
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function PrefetchLink({ to, children, ...props }) {
  const linkRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Prefetch when link is visible
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = to;
          document.head.appendChild(link);
          observer.disconnect();
        }
      });
    });
    
    if (linkRef.current) {
      observer.observe(linkRef.current);
    }
    
    return () => observer.disconnect();
  }, [to]);
  
  return (
    <Link ref={linkRef} to={to} {...props}>
      {children}
    </Link>
  );
}
```

**Usage in Home.jsx:**
```javascript
import PrefetchLink from '../components/PrefetchLink';

<PrefetchLink to="/mumbai">Mumbai Escorts</PrefetchLink>
```

---


### 7.2 Reduce Third-Party Impact
**Impact:** TBT -100ms | **Time:** 2 hours

**Audit third-party scripts:**
```bash
# Check what's loading
npm run build
npx lighthouse http://localhost:4173 --view --only-categories=performance
```

**Remove/defer unnecessary scripts:**

1. **Google Analytics** → Already moved to Partytown ✅
2. **Social media widgets** → Load on interaction
3. **Chat widgets** → Load after 5 seconds

**File:** `src/components/ChatWidget.jsx`

```javascript
import { useEffect, useState } from 'react';

export default function ChatWidget() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Load chat widget after 5 seconds
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://chat-widget.com/widget.js';
      script.async = true;
      document.body.appendChild(script);
      setLoaded(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return loaded ? <div id="chat-widget"></div> : null;
}
```

---

### 7.3 Implement Resource Hints Everywhere
**Impact:** Faster navigation | **Time:** 1 hour

**File:** `src/App.jsx` - Add global prefetch

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    // Prefetch likely next pages based on current page
    const prefetchMap = {
      '/': ['/mumbai', '/delhi', '/bangalore'],
      '/mumbai': ['/maharashtra/pune', '/booking'],
      '/delhi': ['/delhi/connaught-place', '/booking']
    };
    
    const nextPages = prefetchMap[location.pathname] || [];
    nextPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }, [location]);
  
  return <Routes>...</Routes>;
}
```

---


### 7.4 Final CSS Optimization
**Impact:** CSS size -30% | **Time:** 1 hour

**Install PurgeCSS:**
```bash
npm install -D @fullhuman/postcss-purgecss
```

**File:** `postcss.config.cjs` (NEW)

```javascript
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
      content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [/^animate-/, /^transition-/, /^duration-/],
        deep: [/^hover:/, /^focus:/, /^active:/],
        greedy: [/^bg-/, /^text-/, /^border-/]
      }
    })
  ].filter(Boolean)
};
```

**Expected Improvement:** CSS: 100 KB → 70 KB

---

## 📊 EXPECTED RESULTS TIMELINE

### Week 1 (Days 1-7):
- **Performance Score:** 39 → 65
- **LCP:** 16.1s → 4.5s
- **FCP:** 8.9s → 3.2s
- **TBT:** 720ms → 350ms

**Completed:**
- ✅ Quick wins (preload, fonts, compression)
- ✅ Code splitting
- ✅ Image optimization
- ✅ Critical CSS

### Week 2 (Days 8-14):
- **Performance Score:** 65 → 80
- **LCP:** 4.5s → 2.8s
- **FCP:** 3.2s → 2.0s
- **TBT:** 350ms → 220ms

**Completed:**
- ✅ Service Worker
- ✅ bfcache fix
- ✅ DOM optimization
- ✅ Third-party scripts

### Week 3 (Days 15-21):
- **Performance Score:** 80 → 88
- **LCP:** 2.8s → 2.3s
- **FCP:** 2.0s → 1.6s
- **TBT:** 220ms → 180ms

**Completed:**
- ✅ Monitoring setup
- ✅ CDN configuration
- ✅ Advanced caching

### Week 4 (Days 22-30):
- **Performance Score:** 88 → 92+
- **LCP:** 2.3s → 2.0s
- **FCP:** 1.6s → 1.4s
- **TBT:** 180ms → 150ms

**Completed:**
- ✅ Prefetching
- ✅ Final optimizations
- ✅ Testing & validation

---

