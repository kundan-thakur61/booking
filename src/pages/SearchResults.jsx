import React, { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { useSearch } from '../context/SearchContext';
import { services } from '../data/services';
import { cityPages } from '../data/citySearchIndex';
import ServiceCard from '../components/ServiceCard';
import Header from '../components/Header';

const SearchResults = () => {
  const { searchQuery, updateSearchQuery } = useSearch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    // Update search context when search results page loads
    if (query) {
      updateSearchQuery(query);
    }
  }, [query, updateSearchQuery]);

  const queryLower = query.toLowerCase();

  // Filter services based on search query
  const filteredServices = useMemo(() => services.filter(service => 
    service.name.toLowerCase().includes(queryLower) ||
    (service.category && service.category.toLowerCase().includes(queryLower)) ||
    service.description.toLowerCase().includes(queryLower)
  ), [queryLower]);

  // Filter city pages based on search query
  const filteredCities = useMemo(() => cityPages.filter(city =>
    city.city.toLowerCase().includes(queryLower) ||
    city.state.toLowerCase().includes(queryLower)
  ), [queryLower]);

  const totalResults = filteredServices.length + filteredCities.length;

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title={`Search results for "${query}" — BookEase`}
        description={`Search results for "${query}" across our services. Find and book verified companions and services.`}
        canonical={`https://bookease.com/search?q=${encodeURIComponent(query)}`}
        meta={[{ name: 'keywords', content: `search results, ${query}` }]}
      />
      
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 text-lg">
            {totalResults} result{totalResults !== 1 ? 's' : ''} found
          </p>
        </div>

        {totalResults === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-neutral-600 mb-4">No services found matching your search</p>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* City results */}
            {filteredCities.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-neutral-800">
                  Locations ({filteredCities.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredCities.map((city, index) => (
                    <Link
                      key={city.path}
                      to={city.path}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-pink-300 hover:shadow-md transition-all duration-200"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{city.city}</p>
                        <p className="text-sm text-neutral-500">{city.state}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Service results */}
            {filteredServices.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-neutral-800 mt-8">
                  Services ({filteredServices.length})
                </h2>
                {filteredServices.map((service, index) => (
                  <div key={service.id} style={{animationDelay: `${index * 0.1}s`}}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;