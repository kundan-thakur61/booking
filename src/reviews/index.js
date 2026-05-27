// Central export for all reviews data
// Usage: import { getReviewsForLocation } from '../reviews';

export { reviews as andamanIslandsReviews } from './AndamanandNicobar/AndamanIslandsreviews';
export { reviews as nicobarIslandsReviews } from './AndamanandNicobar/NicobarIslandsreviews';

// Add more states here as you create them, e.g.
// export { reviews as ranchiReviews } from './Jharkhand/Ranchireviews';

export function getReviewsForLocation(stateFolder, locationFileName) {
  // Dynamic import helper (for future use)
  // Example: getReviewsForLocation('AndamanandNicobar', 'AndamanIslands')
  console.warn('getReviewsForLocation is a placeholder. Import directly for now.');
  return [];
}
