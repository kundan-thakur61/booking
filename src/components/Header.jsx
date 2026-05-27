import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

/**
 * Mobile-First Responsive Header Component
 * Features:
 * - Hamburger menu for mobile (< 768px)
 * - Touch-friendly tap targets (44px min)
 * - Accessible navigation with ARIA labels
 * - Smooth CSS transitions
 * - Focus management for keyboard navigation
 */
const Header = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, updateSearchQuery } = useSearch();
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Initialize query with current searchQuery
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle click outside menu (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      updateSearchQuery(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setMobileMenuOpen(false);
    } else {
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    updateSearchQuery('');
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Navigation menu items
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/verified-escort-services' },
    { label: 'Security', path: '/security' },
    { label: 'Help Center', path: '/help-center' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 safe-top">
      {/* Main header container */}
      <div className="container mx-auto px-responsive">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left section: Back button or Logo */}
          <div className="flex items-center flex-shrink-0">
            {showBack ? (
              <button
                onClick={handleBack}
                className="touch-target p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 -ml-2"
                aria-label="Go back"
              >
                <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => handleNavigate('/')}
                className="flex items-center gap-2 -ml-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                aria-label="BookEase Home"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">BE</span>
                </div>
                <span className="hidden sm:inline text-lg font-bold text-neutral-900">BookEase</span>
              </button>
            )}
          </div>

          {/* Center section: Search bar (hidden on small mobile, shown on tablet+ */}
          {!title && !showBack && (
            <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <input
                  type="search"
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search..."
                  aria-label="Search services"
                  className="w-full bg-neutral-100 rounded-full py-2.5 px-4 pl-10 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 p-1"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Right section: Title, Desktop nav, or Hamburger menu */}
          {title ? (
            <h1 className="text-lg md:text-xl font-bold text-neutral-900 truncate flex-1 text-center px-4">{title}</h1>
          ) : (
            <>
              {/* Desktop Navigation (hidden on mobile) */}
              <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 rounded px-2 py-1"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Hamburger Button */}
              <button
                ref={menuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden touch-target flex items-center justify-center p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 -mr-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className={`w-6 h-6 text-neutral-700 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile Search Bar (shown on small mobile when not title view) */}
        {!title && !showBack && (
          <form onSubmit={handleSearch} className="sm:hidden pb-4">
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search services..."
                aria-label="Search services"
                className="w-full bg-neutral-100 rounded-full py-2.5 px-4 pl-10 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 p-1"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Mobile Navigation Menu - Animated slide-down */}
      {!title && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 origin-top ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible h-0'
          }`}
        >
          <nav className="bg-neutral-50 border-t border-neutral-200 py-2">
            {navItems.map((item, index) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="w-full text-left px-4 py-3 text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 block"
                style={{
                  animation: mobileMenuOpen ? `slideDown 0.3s ease-out ${index * 0.05}s both` : 'none'
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Additional mobile menu sections */}
            <div className="border-t border-neutral-200 mt-2 pt-2">
              <button
                onClick={() => handleNavigate('/security')}
                className="w-full text-left px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors duration-200"
              >
                Security & Safety
              </button>
              <button
                onClick={() => handleNavigate('/legal')}
                className="w-full text-left px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors duration-200"
              >
                Legal Information
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;