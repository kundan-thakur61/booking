import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEO from '../components/SEO';

// Auto-discover all state/city pages via Vite glob
const stateModules = import.meta.glob('../state/**/*.jsx');

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

// Build state -> cities map from file paths
function buildStateMap() {
  const map = {};
  Object.keys(stateModules).forEach((filePath) => {
    const match = filePath.match(/^\.\.\/state\/(.+?)\/(.+?)\.jsx$/);
    if (!match) return;
    const [, stateName, cityName] = match;
    if (!map[stateName]) map[stateName] = [];
    map[stateName].push(cityName);
  });
  // Sort states and cities alphabetically
  const sorted = {};
  Object.keys(map)
    .sort()
    .forEach((state) => {
      sorted[state] = map[state].sort();
    });
  return sorted;
}

const stateMap = buildStateMap();
const allStates = Object.keys(stateMap);

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

function FindAllCity() {
  const [search, setSearch] = useState('');
  const [expandedState, setExpandedState] = useState(null);

  // Filter states and cities based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return stateMap;
    const q = search.toLowerCase();
    const result = {};
    allStates.forEach((state) => {
      const stateMatch = state.toLowerCase().includes(q);
      const matchingCities = stateMap[state].filter((city) =>
        city.toLowerCase().includes(q)
      );
      if (stateMatch || matchingCities.length > 0) {
        result[state] = stateMatch ? stateMap[state] : matchingCities;
      }
    });
    return result;
  }, [search]);

  const filteredStates = Object.keys(filtered);
  const totalCities = Object.values(stateMap).reduce((sum, cities) => sum + cities.length, 0);

  const toggleState = (state) => {
    setExpandedState((prev) => (prev === state ? null : state));
  };

  // When searching, auto-expand all matching states
  const isExpanded = (state) => {
    if (search.trim()) return true;
    return expandedState === state;
  };

  return (
    <>
      <SEO
        title="All Cities & States - Find Services Near You | BookEase"
        description={`Browse escort services across ${allStates.length} states and ${totalCities}+ cities in India. Find verified services near your location.`}
        canonical="/find-all-city"
      />
      <Header title="All Cities" showBack />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Explore All Cities
            </h1>
            <p className="text-pink-100 text-base md:text-lg mb-6">
              {allStates.length} States &middot; {totalCities}+ Cities
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search state or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-pink-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-3 flex items-center text-pink-200 hover:text-white"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Quick Access - Popular States */}
        {!search.trim() && (
          <section className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Access
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Maharashtra', 'Mumbai', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Kerala', 'Punjab', 'Haryana', 'Telangana', 'Bihar', 'West Bengal', 'Madhya Pradesh', 'Jharkhand', 'Odisha', 'Goa', 'Uttarakhand'].filter(s => stateMap[s]).map((state) => (
                <button
                  key={state}
                  onClick={() => {
                    setExpandedState(state);
                    document.getElementById(`state-${slugify(state)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 transition shadow-sm"
                >
                  {state}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* State & City Listing */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          {filteredStates.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No states or cities match "{search}"</p>
              <button onClick={() => setSearch('')} className="mt-3 text-pink-600 hover:underline text-sm">
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              {filteredStates.map((state) => {
                const cities = filtered[state];
                const open = isExpanded(state);

                return (
                  <div
                    key={state}
                    id={`state-${slugify(state)}`}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                  >
                    {/* State Header */}
                    <button
                      onClick={() => toggleState(state)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
                      aria-expanded={open}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 text-pink-600">
                          <MapPinIcon />
                        </span>
                        <div>
                          <h2 className="text-base font-semibold text-gray-900">{state}</h2>
                          <p className="text-xs text-gray-500">{cities.length} {cities.length === 1 ? 'city' : 'cities'}</p>
                        </div>
                      </div>
                      <span className={`transform transition-transform duration-200 text-gray-400 ${open ? 'rotate-90' : ''}`}>
                        <ChevronRightIcon />
                      </span>
                    </button>

                    {/* City Grid */}
                    {open && (
                      <div className="px-5 pb-4 border-t border-gray-100">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-3">
                          {cities.map((city) => (
                            <Link
                              key={city}
                              to={`/${slugify(state)}/${slugify(city)}`}
                              className="group flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-pink-50 border border-transparent hover:border-pink-200 transition"
                            >
                              <span className="w-2 h-2 rounded-full bg-pink-400 group-hover:bg-pink-600 transition flex-shrink-0" />
                              <span className="text-sm text-gray-700 group-hover:text-pink-700 font-medium truncate">
                                {city}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Bottom Stats */}
        <section className="bg-gray-50 border-t border-gray-200 py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-pink-600">{allStates.length}</p>
              <p className="text-xs text-gray-500 mt-1">States</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-pink-600">{totalCities}+</p>
              <p className="text-xs text-gray-500 mt-1">Cities</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-pink-600">24/7</p>
              <p className="text-xs text-gray-500 mt-1">Available</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FindAllCity;