import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Responsive Footer Component
 * Features:
 * - Mobile-first responsive grid (1 col → 2 col → 4 col)
 * - Premium dark gradient design
 * - Touch-friendly links (44px min)
 * - Safe-area-inset-bottom for notched devices
 * - Accessible navigation with ARIA labels
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/verified-escort-services' },
    { label: 'Find All Cities', path: '/find-all-city' },
    { label: 'Help Center', path: '/help-center' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'Blog', path: '/blog' },
  ];

  const cityLinks = [
    { label: 'Mumbai', path: '/mumbai' },
    { label: 'Delhi', path: '/delhi' },
    { label: 'Bangalore', path: '/bangalore' },
    { label: 'Pune', path: '/pune' },
    { label: 'Hyderabad', path: '/hyderabad' },
    { label: 'Chennai', path: '/chennai' },
    { label: 'Kolkata', path: '/kolkata' },
    { label: 'Jaipur', path: '/jaipur' },
    { label: 'Patna', path: '/patna' },
    { label: 'Goa', path: '/goa' },
    { label: 'Jharkhand', path: '/jharkhand' },
    { label: 'All Cities', path: '/find-all-city' },
  ];

  const stateLinks = [
    { label: 'Maharashtra', path: '/maharashtra/mumbai' },
    { label: 'Karnataka', path: '/karnataka/bangalore' },
    { label: 'Tamil Nadu', path: '/tamil-nadu/chennai' },
    { label: 'West Bengal', path: '/west-bengal/kolkata' },
    { label: 'Rajasthan', path: '/rajasthan/jaipur' },
    { label: 'Gujarat', path: '/gujarat/ahmedabad' },
    { label: 'Bihar', path: '/bihar/patna' },
    { label: 'Uttar Pradesh', path: '/uttar-pradesh/lucknow' },
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Cookie Policy', path: '/cookie-policy' },
    { label: 'Safety & Security', path: '/security' },
    { label: 'Legal Information', path: '/legal' },
    { label: 'Sitemap', path: '/sitemap' },
  ];

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-300 safe-bottom" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 no-underline group" aria-label="BookEase Home">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-base">BE</span>
              </div>
              <span className="text-xl font-bold text-white">BookEase</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4 max-w-xs">
              India's most trusted platform for verified adult companion services.
              2000+ profiles across 500+ cities. Safe, discreet, professional. 18+ only.
            </p>
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <a 
                href="tel:+919324881345" 
                className="flex items-center gap-2 text-neutral-400 hover:text-pink-400 transition-colors no-underline"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 93248 81345
              </a>
              <a 
                href="mailto:support@escortmumbaii.in" 
                className="flex items-center gap-2 text-neutral-400 hover:text-pink-400 transition-colors no-underline"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@escortmumbaii.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 list-none ml-0">
              {quickLinks.map((link) => (
                <li key={link.path} className="mb-0">
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-pink-400 transition-colors no-underline py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* City Links */}
          <nav aria-label="City links">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Top Cities</h3>
            <ul className="space-y-2.5 list-none ml-0">
              {cityLinks.map((link) => (
                <li key={link.path} className="mb-0">
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-pink-400 transition-colors no-underline py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* State Links */}
          <nav aria-label="State links">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Browse by State</h3>
            <ul className="space-y-2.5 list-none ml-0">
              {stateLinks.map((link) => (
                <li key={link.path} className="mb-0">
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-pink-400 transition-colors no-underline py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav aria-label="Legal links">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2.5 list-none ml-0">
              {legalLinks.map((link) => (
                <li key={link.path} className="mb-0">
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-pink-400 transition-colors no-underline py-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-neutral-500">
            <p className="text-center sm:text-left mb-0">
              © {currentYear} BookEase. All rights reserved. 18+ only.
            </p>
            <p className="text-center sm:text-right mb-0">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
