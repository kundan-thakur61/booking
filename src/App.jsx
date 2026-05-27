import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Context Providers
import { BookingProvider } from './context/BookingContext';
import { SearchProvider } from './context/SearchContext';

// Auto-generated state/city + service-detail routes
import { stateRoutes, serviceDetailRoutes } from './stateRoutes';

// ─── Eagerly loaded (above the fold / critical path) ──────────────────────────
import Home from './pages/Home';

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const Booking                 = lazy(() => import('./pages/Booking'));
const Confirmation            = lazy(() => import('./pages/Confirmation'));
const Success                 = lazy(() => import('./pages/Success'));
const SearchResults           = lazy(() => import('./pages/SearchResults'));
const FindAllCity             = lazy(() => import('./pages/findAllCity'));

// City / region hubs
const Mumbai                  = lazy(() => import('./pages/Mumbai'));
const Delhi                   = lazy(() => import('./pages/Delhi'));
const Bangalore               = lazy(() => import('./pages/Bangalore'));
const Pune                    = lazy(() => import('./pages/Pune'));
const Chennai                 = lazy(() => import('./pages/Chennai'));
const Hyderabad               = lazy(() => import('./pages/Hyderabad'));
const Kolkata                 = lazy(() => import('./pages/Kolkata'));
const Jaipur                  = lazy(() => import('./pages/Jaipur'));
const Patna                   = lazy(() => import('./pages/Patna'));
const Goa                     = lazy(() => import('./pages/Goa'));
const Jharkhand               = lazy(() => import('./pages/Jharkhand'));

// Escort / companion service pages
const VerifiedEscortServices  = lazy(() => import('./pages/VerifiedEscortServices'));
const MumbaiEscortServices    = lazy(() => import('./pages/MumbaiEscortServices'));
const MassageEscortServices   = lazy(() => import('./pages/MassageEscortServices'));
const CompanionEscortServices = lazy(() => import('./pages/CompanionEscortServices'));
const BakecaIncontri          = lazy(() => import('./pages/BakecaIncontri'));

// Info / legal / support pages
const Blog                    = lazy(() => import('./pages/Blog'));
const ContactUs               = lazy(() => import('./pages/ContactUs'));
const HelpCenter              = lazy(() => import('./pages/HelpCenter'));
const Support                 = lazy(() => import('./pages/Support'));
const HowToReportScam         = lazy(() => import('./pages/HowToReportScam'));
const Network                 = lazy(() => import('./pages/Network'));
const Company                 = lazy(() => import('./pages/Company'));
const Security                = lazy(() => import('./pages/Security'));
const Legal                   = lazy(() => import('./pages/Legal'));
const PrivacyPolicy           = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions      = lazy(() => import('./pages/TermsAndConditions'));
const CookiePolicy            = lazy(() => import('./pages/CookiePolicy'));
const SitemapPage             = lazy(() => import('./pages/Sitemap'));
const Custom404               = lazy(() => import('./pages/Custom404'));

// ─── Loading fallback ─────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
      <p className="text-neutral-500 text-sm font-medium">Loading…</p>
    </div>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BookingProvider>
      <SearchProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* ── Home ───────────────────────────────────────────────────── */}
            <Route path="/" element={<Home />} />

            {/* ── Booking flow ───────────────────────────────────────────── */}
            <Route path="/booking"      element={<Booking />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/success"      element={<Success />} />

            {/* ── Search ─────────────────────────────────────────────────── */}
            <Route path="/search" element={<SearchResults />} />

            {/* ── All cities / states directory ──────────────────────────── */}
            <Route path="/find-all-city" element={<FindAllCity />} />

            {/* ── City hubs (top-level shortcuts) ────────────────────────── */}
            <Route path="/mumbai"     element={<Mumbai />} />
            <Route path="/delhi"      element={<Delhi />} />
            <Route path="/bangalore"  element={<Bangalore />} />
            <Route path="/pune"       element={<Pune />} />
            <Route path="/chennai"    element={<Chennai />} />
            <Route path="/hyderabad"  element={<Hyderabad />} />
            <Route path="/kolkata"    element={<Kolkata />} />
            <Route path="/jaipur"     element={<Jaipur />} />
            <Route path="/patna"      element={<Patna />} />
            <Route path="/goa"        element={<Goa />} />
            <Route path="/jharkhand"  element={<Jharkhand />} />

            {/* ── Escort / companion service landing pages ────────────────── */}
            <Route path="/verified-escort-services"  element={<VerifiedEscortServices />} />
            <Route path="/mumbai-escort-services"    element={<MumbaiEscortServices />} />
            <Route path="/delhi-escort-services"     element={<Delhi />} />
            <Route path="/massage-escort-services"   element={<MassageEscortServices />} />
            <Route path="/companion-escort-services" element={<CompanionEscortServices />} />
            <Route path="/bakeca-incontri"           element={<BakecaIncontri />} />

            {/* ── Info / support / legal ─────────────────────────────────── */}
            <Route path="/blog"               element={<Blog />} />
            <Route path="/contact-us"         element={<ContactUs />} />
            <Route path="/help-center"        element={<HelpCenter />} />
            <Route path="/support"            element={<Support />} />
            <Route path="/how-to-report-scam" element={<HowToReportScam />} />
            <Route path="/network"            element={<Network />} />
            <Route path="/company"            element={<Company />} />
            <Route path="/safety"             element={<Security />} />
            <Route path="/security"           element={<Security />} />
            <Route path="/legal"              element={<Legal />} />
            <Route path="/privacy-policy"     element={<PrivacyPolicy />} />
            <Route path="/terms"              element={<TermsAndConditions />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookie-policy"      element={<CookiePolicy />} />
            <Route path="/sitemap"            element={<SitemapPage />} />

            {/* ── Auto-generated state/city routes (from stateRoutes.jsx) ── */}
            {stateRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}

            {/* ── Auto-generated service-detail routes ──────────────────── */}
            {serviceDetailRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}

            {/* ── 404 catch-all ─────────────────────────────────────────── */}
            <Route path="*" element={<Custom404 />} />

          </Routes>
        </Suspense>
      </SearchProvider>
    </BookingProvider>
  );
}
