# PageSpeed Insights Optimization Guide

**Target Page:** /companion-escort-services  
**Target Scores:** Mobile 90+ | Desktop 95+  
**Last Updated:** January 18, 2026

---

## 🎯 Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Main content visibility |
| **FID** (First Input Delay) | < 100ms | Interactivity response |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |
| **FCP** (First Contentful Paint) | < 1.8s | First content visibility |
| **TTFB** (Time to First Byte) | < 600ms | Server response time |

---

## ✅ Optimizations Already Implemented

### 1. Code Splitting (vite.config.js)
- ✅ Vendor chunk separation (React, React DOM, Router)
- ✅ Page-level code splitting
- ✅ CSS code splitting enabled

### 2. Lazy Loading (Components)
- ✅ LazyImage component for below-fold images
- ✅ React.lazy for route-level code splitting

### 3. Build Optimization
- ✅ Terser minification with console removal
- ✅ ES2015 target for modern browsers
- ✅ Source maps disabled in production

---

## 🚀 Additional Optimizations To Implement

### 1. Preload Critical Resources

Add to `index.html`:

```html
<head>
  <!-- Preload critical fonts -->
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="dns-prefetch" href="https://images.unsplash.com">
  
  <!-- Preload hero image for LCP -->
  <link rel="preload" as="image" href="/companion-services-hero.webp">
</head>
```

### 2. Optimize Images

#### Convert to WebP Format
```bash
# Install sharp for image optimization
npm install sharp --save-dev

# Create optimization script
```

Create file: `scripts/optimize-images.js`

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images/optimized';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image sizes for responsive images
const sizes = [320, 640, 768, 1024, 1280];

async function optimizeImage(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  for (const width of sizes) {
    // WebP format
    await sharp(inputPath)
      .resize(width)
      .webp({ quality: 80 })
      .toFile(`${outputDir}/${filename}-${width}w.webp`);
    
    // AVIF format (even smaller)
    await sharp(inputPath)
      .resize(width)
      .avif({ quality: 65 })
      .toFile(`${outputDir}/${filename}-${width}w.avif`);
  }
  
  console.log(`Optimized: ${filename}`);
}

// Process all images
const images = fs.readdirSync(inputDir)
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

images.forEach(img => optimizeImage(path.join(inputDir, img)));
```

### 3. Implement Critical CSS

Create file: `scripts/extract-critical-css.js`

```javascript
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  target: 'index-critical.html',
  width: 375,
  height: 667,
  penthouse: {
    timeout: 120000
  }
}).then(output => {
  console.log('Critical CSS extracted!');
});
```

### 4. Add Resource Hints to HTML

Update `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Critical performance hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  
  <!-- Preload critical assets -->
  <link rel="preload" as="style" href="/assets/index.css">
  <link rel="modulepreload" href="/assets/vendor.js">
  
  <!-- DNS prefetch for third-party resources -->
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link rel="dns-prefetch" href="https://wa.me">
  
  <title>BookEase</title>
</head>
```

### 5. Lazy Load Routes

Update `App.jsx` for route-level code splitting:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CompanionEscortServices = lazy(() => import('./pages/CompanionEscortServices'));
const MumbaiEscortServices = lazy(() => import('./pages/MumbaiEscortServices'));
// ... other pages

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companion-escort-services" element={<CompanionEscortServices />} />
          {/* ... other routes */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 6. Optimize Third-Party Scripts

```jsx
// Delay non-critical scripts
useEffect(() => {
  // Load analytics after page is interactive
  const timer = setTimeout(() => {
    // Load Google Analytics
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID';
    script.async = true;
    document.head.appendChild(script);
  }, 3000); // 3 second delay
  
  return () => clearTimeout(timer);
}, []);
```

### 7. Implement Service Worker for Caching

Create file: `public/sw.js`

```javascript
const CACHE_NAME = 'bookease-v1';
const urlsToCache = [
  '/',
  '/companion-escort-services',
  '/assets/index.css',
  '/assets/vendor.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

Register in `main.jsx`:

```jsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
```

---

## 📊 Testing PageSpeed

### Method 1: Google PageSpeed Insights (Official)

1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter: `https://www.escortmumbaii.in/companion-escort-services`
3. Wait for analysis
4. Review both Mobile and Desktop scores

### Method 2: Lighthouse CLI (Local)

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://www.escortmumbaii.in/companion-escort-services \
  --output=html \
  --output-path=./reports/lighthouse-report.html \
  --view
```

### Method 3: Chrome DevTools

1. Open Chrome → F12 (DevTools)
2. Go to **Lighthouse** tab
3. Select: Performance, Accessibility, Best Practices, SEO
4. Click **Analyze page load**

---

## 🔧 Quick Fixes for Common Issues

### Issue: Large JavaScript Bundle
**Solution:** Already implemented code splitting in vite.config.js

### Issue: Render-Blocking Resources
**Solution:** Add `defer` to non-critical scripts:
```html
<script src="analytics.js" defer></script>
```

### Issue: Images Not Sized Properly
**Solution:** Always specify width/height:
```jsx
<img src="image.jpg" width="400" height="300" alt="Description" />
```

### Issue: Layout Shifts (CLS)
**Solution:** Reserve space for dynamic content:
```css
.image-container {
  aspect-ratio: 16/9;
  background: #f0f0f0;
}
```

### Issue: Slow Server Response (TTFB)
**Solution:** Enable caching on Vercel:
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 📈 Performance Budget

| Resource Type | Budget |
|---------------|--------|
| Total JS | < 300KB gzipped |
| Total CSS | < 50KB gzipped |
| Total Images | < 500KB |
| Total Page Weight | < 1MB |
| Requests | < 30 |

---

## ✅ Optimization Checklist

### Critical (Do First)
- [x] Code splitting configured
- [x] Terser minification enabled
- [ ] Preload critical resources
- [ ] Convert images to WebP
- [ ] Lazy load routes

### Important (Do Second)
- [ ] Extract critical CSS
- [ ] Implement service worker
- [ ] Add resource hints
- [ ] Defer non-critical JS
- [ ] Optimize third-party scripts

### Nice to Have
- [ ] Implement AVIF images
- [ ] Add HTTP/2 push hints
- [ ] Enable Brotli compression
- [ ] Implement predictive prefetching

---

## 📅 Performance Monitoring

### Weekly Check
1. Run PageSpeed Insights
2. Record scores in tracking sheet
3. Compare to previous week
4. Identify regressions

### Monthly Audit
1. Full Lighthouse audit
2. Bundle size analysis
3. Third-party script review
4. Image optimization review

---

*Current estimated scores: Mobile 75-85 | Desktop 85-95*
*After all optimizations: Mobile 90+ | Desktop 95+*
