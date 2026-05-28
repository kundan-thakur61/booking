import { lazy } from 'react';

// Auto-discover all state/city page components via Vite glob
const stateModules = import.meta.glob('./state/**/*.jsx');

// Auto-discover all city service-detail components
// e.g. './serviceCarDetails/Delhi/ConnaughtPlace.jsx'
// NOTE: We exclude the broken *servicesDetails.jsx stubs (they lack a default export).
const serviceDetailModules = import.meta.glob([
  './serviceCarDetails/**/*.jsx',
  '!./serviceCarDetails/**/ServiceDetail.jsx',
  '!./serviceCarDetails/**/*servicesDetails.jsx',
  '!./serviceCarDetails/Goa/ConnaughtPlace.jsx',
  '!./serviceCarDetails/Goa/Dwarka.jsx',
  '!./serviceCarDetails/Goa/LajpatNagar.jsx',
  '!./serviceCarDetails/Goa/Rohini.jsx',
  '!./serviceCarDetails/Goa/Saket.jsx',
]);

/**
 * Robust slugify that handles:
 * - Spaces: "Andaman and Nicobar" → "andaman-and-nicobar"
 * - CamelCase: "ConnaughtPlace" → "connaught-place"
 * - Compound words: "JammuandKashmir" → "jammu-and-kashmir"
 * - Pradesh states: "AndhraPradesh" → "andhra-pradesh"
 */
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
  // Check explicit overrides first
  if (SLUG_OVERRIDES[name]) return SLUG_OVERRIDES[name];

  return name
    // Insert space before uppercase letters (camelCase split)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

// Convert file paths to route definitions
// e.g. './state/Mumbai/Andheri.jsx' -> { path: '/mumbai/andheri', Component }
export const stateRoutes = Object.entries(stateModules)
  .map(([filePath, importFn]) => {
    const match = filePath.match(/^\.\/state\/(.+?)\/(.+?)\.jsx$/);
    if (!match) return null;

    const [, stateName, cityName] = match;
    const stateSlug = slugify(stateName);
    const citySlug = slugify(cityName);

    return {
      path: `/${stateSlug}/${citySlug}`,
      Component: lazy(importFn),
    };
  })
  .filter(Boolean);

// Convert serviceCarDetails file paths to service-detail route definitions
// e.g. './serviceCarDetails/Delhi/ConnaughtPlace.jsx'
//   -> { path: '/delhi/connaught-place/service/:id', Component }
export const serviceDetailRoutes = Object.entries(serviceDetailModules)
  .map(([filePath, importFn]) => {
    // Match: ./serviceCarDetails/<State>/<City>.jsx
    const match = filePath.match(/^\.\/serviceCarDetails\/(.+?)\/(.+?)\.jsx$/);
    if (!match) return null;

    const [, stateName, cityName] = match;
    const stateSlug = slugify(stateName);
    const citySlug  = slugify(cityName);

    return {
      path: `/${stateSlug}/${citySlug}/service/:id`,
      Component: lazy(importFn),
    };
  })
  .filter(Boolean);
