import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './styles/index.css'
import { initGA } from './utils/analytics'
import {
  initCLSObserver,
  initFIDMonitoring,
  initLCPMonitoring,
  initPerformanceMonitoring,
  preloadCriticalResources
} from './utils/coreWebVitals'

// Initialize GA if the measurement ID is provided via env
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_MEASUREMENT_ID) {
  initGA(GA_MEASUREMENT_ID);
}

// Initialize Core Web Vitals monitoring for SEO
if (typeof window !== 'undefined') {
  // Monitor Cumulative Layout Shift
  initCLSObserver();

  // Monitor First Input Delay
  initFIDMonitoring();

  // Monitor Largest Contentful Paint
  initLCPMonitoring();

  // Monitor overall performance metrics
  initPerformanceMonitoring((metrics) => {
    if (window.gtag) {
      window.gtag.event('page_view', {
        metric_dns: metrics.dns,
        metric_tcp: metrics.tcp,
        metric_ttfb: metrics.ttfb,
        metric_download: metrics.download,
        metric_dom_interactive: metrics.domInteractive,
        metric_page_load: metrics.loadComplete
      });
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)
