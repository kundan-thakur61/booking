// Variant gallery data - maps variant IDs to image galleries
const variantGalleries = {};

export function getVariantGallery(variantId) {
  return variantGalleries[variantId] || [];
}

export default variantGalleries;
