// Core Web Vitals Optimization Utilities
// Optimizes LCP, FID, CLS for maximum SEO performance

/**
 * Calculate Cumulative Layout Shift (CLS) observer
 * Monitors DOM changes that cause layout shifts
 */
export const initCLSObserver = () => {
  if (typeof PerformanceObserver === 'undefined') return null;

  let clsValue = 0;
  let sessionValue = 0;
  let sessionEntries = [];

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

          if (
            entry.startTime - (lastSessionEntry?.startTime || 0) < 1000 &&
            entry.startTime - (firstSessionEntry?.startTime || 0) < 5000
          ) {
            sessionEntries.push(entry);
            sessionValue += entry.value;
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }

          clsValue = Math.max(clsValue, sessionValue);

          // Send to analytics
          if (window.gtag) {
            window.gtag.pageview({
              page_path: window.location.pathname,
              metric_cls: clsValue,
              metric_cls_session: sessionValue
            });
          }
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });
    return observer;
  } catch (e) {
    console.warn('CLS Observer not supported:', e.message);
    return null;
  }
};

/**
 * Monitor First Input Delay (FID)
 */
export const initFIDMonitoring = () => {
  if (typeof PerformanceObserver === 'undefined') return null;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log FID value
        console.log(`FID: ${entry.processingDuration}ms (Processing Time)`);

        if (window.gtag) {
          window.gtag.event('page_view', {
            metric_fid: entry.processingDuration
          });
        }
      }
    });

    observer.observe({ type: 'first-input', buffered: true });
    return observer;
  } catch (e) {
    console.warn('FID Observer not supported:', e.message);
    return null;
  }
};

/**
 * Monitor Largest Contentful Paint (LCP)
 */
export const initLCPMonitoring = () => {
  if (typeof PerformanceObserver === 'undefined') return null;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      if (lastEntry) {
        console.log(`LCP: ${lastEntry.renderTime || lastEntry.loadTime}ms`);

        if (window.gtag) {
          window.gtag.event('page_view', {
            metric_lcp: lastEntry.renderTime || lastEntry.loadTime
          });
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    return observer;
  } catch (e) {
    console.warn('LCP Observer not supported:', e.message);
    return null;
  }
};

/**
 * Reserve layout space for images and ads to prevent CLS
 * Returns CSS class with reserved aspect ratio
 */
export const getAspectRatioPadding = (width, height) => {
  const ratio = (height / width) * 100;
  return {
    paddingBottom: `${ratio}%`,
    position: 'relative',
    overflow: 'hidden'
  };
};

/**
 * Get optimized image dimensions for responsive design
 */
export const getResponsiveImageDimensions = (originalWidth, breakpoints = [480, 768, 1024, 1280]) => {
  return breakpoints.map(bp => ({
    breakpoint: bp,
    width: Math.min(bp, originalWidth),
    srcset: `
      ${Math.min(bp, originalWidth)}w,
      ${Math.min(bp * 1.5, originalWidth)}w,
      ${Math.min(bp * 2, originalWidth)}w
    `
  }));
};

/**
 * Preload critical resources for LCP
 */
export const preloadCriticalResources = (resources = []) => {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as || 'image';
    if (resource.type) link.type = resource.type;
    if (resource.imagesrcset) link.imagesrcset = resource.imagesrcset;
    if (resource.imagesizes) link.imagesizes = resource.imagesizes;
    document.head.appendChild(link);
  });
};

/**
 * Prefetch non-critical resources for smooth navigation
 */
export const prefetchResources = (urls = []) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Initialize Performance API monitoring
 */
export const initPerformanceMonitoring = (callback) => {
  if (typeof window === 'undefined') return;

  // Wait for page load
  if (document.readyState === 'complete') {
    reportMetrics(callback);
  } else {
    window.addEventListener('load', () => reportMetrics(callback));
  }
};

const reportMetrics = (callback) => {
  // Navigation Timing API
  if (performance.timing) {
    const timing = performance.timing;
    const metrics = {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      ttfb: timing.responseStart - timing.navigationStart,
      download: timing.responseEnd - timing.responseStart,
      domInteractive: timing.domInteractive - timing.navigationStart,
      domComplete: timing.domComplete - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart
    };

    if (callback) callback(metrics);

    if (window.gtag) {
      window.gtag.event('page_view', metrics);
    }
  }
};

/**
 * Schedule low-priority tasks to avoid blocking main thread (FID optimization)
 */
export const scheduleTask = (callback, priority = 'normal') => {
  if ('scheduler' in window && window.scheduler.yield) {
    // Use scheduler API if available
    window.scheduler.yield().then(callback);
  } else if ('requestIdleCallback' in window) {
    // Fallback to requestIdleCallback
    window.requestIdleCallback(callback, {
      timeout: priority === 'high' ? 1000 : 5000
    });
  } else {
    // Final fallback to setTimeout
    setTimeout(callback, priority === 'high' ? 0 : 100);
  }
};

export default {
  initCLSObserver,
  initFIDMonitoring,
  initLCPMonitoring,
  getAspectRatioPadding,
  getResponsiveImageDimensions,
  preloadCriticalResources,
  prefetchResources,
  initPerformanceMonitoring,
  scheduleTask
};
