// Internal Linking Strategy & Optimization
// Builds topical clusters and contextual links for SEO

/**
 * Generate internal linking recommendations based on page topic
 */
export const generateInternalLinks = (currentPage = '', pageType = 'generic') => {
  const linkStrategies = {
    homepage: {
      priority: 'critical',
      links: [
        { text: 'Verified Escorts', url: '/verified-escort-services', type: 'category' },
        { text: 'Mumbai Escorts', url: '/mumbai', type: 'city' },
        { text: 'Delhi Escorts', url: '/delhi', type: 'city' },
        { text: 'Bangalore Escorts', url: '/bangalore', type: 'city' },
        { text: 'Pune Escorts', url: '/pune', type: 'city' },
        { text: 'How to Book', url: '/help-center', type: 'guide' },
        { text: 'Safety Tips', url: '/how-to-report-scam', type: 'guide' },
      ]
    },
    city: {
      priority: 'high',
      links: [
        { text: 'Back to Home', url: '/', type: 'breadcrumb' },
        { text: 'All Cities', url: '/find-all-city', type: 'breadcrumb' },
        { text: 'Popular Services', url: '/verified-escort-services', type: 'related' },
        { text: 'Safety Guide', url: '/security', type: 'related' }
      ]
    },
    service: {
      priority: 'high',
      links: [
        { text: 'Other Services', url: '/verified-escort-services', type: 'related' },
        { text: 'Browse by City', url: '/find-all-city', type: 'related' },
        { text: 'How to Book', url: '/help-center', type: 'guide' }
      ]
    },
    blog: {
      priority: 'medium',
      links: [
        { text: 'Back to Blog', url: '/blog', type: 'breadcrumb' },
        { text: 'Help Center', url: '/help-center', type: 'related' },
        { text: 'Safety Tips', url: '/how-to-report-scam', type: 'related' }
      ]
    },
    legal: {
      priority: 'low',
      links: [
        { text: 'Privacy Policy', url: '/privacy-policy', type: 'related' },
        { text: 'Terms & Conditions', url: '/terms-and-conditions', type: 'related' },
        { text: 'Cookie Policy', url: '/cookie-policy', type: 'related' }
      ]
    }
  };

  return linkStrategies[pageType] || linkStrategies.generic || [];
};

/**
 * Build topic cluster relationships for SEO authority
 */
export const buildTopicCluster = () => {
  return {
    pillarPages: [
      {
        title: 'Verified Escorts India - Complete Guide',
        url: '/verified-escort-services',
        description: 'Master guide for finding verified escorts in India',
        clusters: [
          'escort-safety-tips',
          'how-to-book-guide',
          'verification-process',
          'city-guides'
        ]
      },
      {
        title: 'Companion Services - Premium Bookings',
        url: '/companion-escort-services',
        description: 'Professional companion booking guide',
        clusters: [
          'companion-types',
          'booking-process',
          'pricing-guide'
        ]
      },
      {
        title: 'Safety First - Escort Service Security',
        url: '/security',
        description: 'Complete safety guide for escort services',
        clusters: [
          'scam-prevention',
          'verification-tips',
          'personal-safety'
        ]
      }
    ],
    clusterPages: [
      {
        id: 'escort-safety-tips',
        title: 'Safety Tips for Booking Escorts',
        url: '/blog/escort-safety-tips',
        parent: 'verified-escorts-guide',
        keywords: ['escort safety', 'safety tips', 'how to stay safe']
      },
      {
        id: 'how-to-book-guide',
        title: 'How to Book Your First Escort - Step by Step',
        url: '/blog/how-to-book-guide',
        parent: 'verified-escorts-guide',
        keywords: ['how to book', 'booking process', 'first time']
      },
      {
        id: 'verification-process',
        title: 'How BookEase Verifies Escorts',
        url: '/blog/verification-process',
        parent: 'verified-escorts-guide',
        keywords: ['verification', 'verified escorts', 'verification process']
      },
      {
        id: 'scam-prevention',
        title: 'How to Identify and Avoid Escort Scams',
        url: '/how-to-report-scam',
        parent: 'safety-first-guide',
        keywords: ['scam prevention', 'fake escorts', 'identify scams']
      }
    ]
  };
};

/**
 * Get contextual internal links for a page
 */
export const getContextualLinks = (keyword = '', pageType = 'generic') => {
  const contextLinks = {
    'mumbai escorts': [
      { text: 'Escorts in Mumbai', url: '/mumbai', anchor: 'primary' },
      { text: 'Mumbai Escort Services', url: '/mumbai-escort-services', anchor: 'secondary' },
      { text: 'Verified Mumbai Companions', url: '/verified-escort-services', anchor: 'tertiary' }
    ],
    'delhi escorts': [
      { text: 'Escorts in Delhi', url: '/delhi', anchor: 'primary' },
      { text: 'Delhi Companion Services', url: '/delhi-escort-services', anchor: 'secondary' },
      { text: 'Verified Delhi Profiles', url: '/verified-escort-services', anchor: 'tertiary' }
    ],
    'safe booking': [
      { text: 'How to Book Safely', url: '/help-center', anchor: 'primary' },
      { text: 'Security & Verification', url: '/security', anchor: 'secondary' },
      { text: 'Safety Tips & Guide', url: '/how-to-report-scam', anchor: 'tertiary' }
    ]
  };

  return contextLinks[keyword] || [];
};

/**
 * Analyze internal link structure for orphan pages
 */
export const detectOrphanPages = (allPages = [], linksMap = {}) => {
  const orphanPages = [];

  allPages.forEach(page => {
    const links = linksMap[page] || [];
    if (links.length === 0) {
      orphanPages.push({
        url: page,
        status: 'orphan',
        recommendation: 'Add internal links from pillar pages'
      });
    } else if (links.length < 2) {
      orphanPages.push({
        url: page,
        status: 'weak',
        linkCount: links.length,
        recommendation: 'Add more internal links for better crawlability'
      });
    }
  });

  return orphanPages;
};

/**
 * Calculate link juice distribution
 */
export const calculateLinkJuice = (fromPageAuthority = 50, linkCount = 10) => {
  // Simplified PageRank calculation
  const dampingFactor = 0.85;
  return (fromPageAuthority / linkCount) * dampingFactor;
};

/**
 * Generate XML sitemap links for crawlability
 */
export const generateSitemapLinks = (pages = []) => {
  return {
    urlset: {
      '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
      '@xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
      url: pages.map(page => ({
        loc: page.url,
        lastmod: page.modified || new Date().toISOString().split('T')[0],
        changefreq: page.changefreq || 'weekly',
        priority: page.priority || 0.5,
        mobile_mobile: page.isMobile ? 'true' : undefined,
        image_image: page.image ? {
          image_loc: page.image,
          image_title: page.imageTitle,
          image_caption: page.imageCaption
        } : undefined
      }))
    }
  };
};

/**
 * Internal link health check
 */
export const checkInternalLinkHealth = (links = []) => {
  const report = {
    totalLinks: links.length,
    goodLinks: 0,
    brokenLinks: 0,
    redirectLinks: 0,
    issues: []
  };

  links.forEach(link => {
    if (link.status === 200) {
      report.goodLinks++;
    } else if (link.status >= 300 && link.status < 400) {
      report.redirectLinks++;
      report.issues.push({
        url: link.url,
        type: 'redirect',
        status: link.status
      });
    } else {
      report.brokenLinks++;
      report.issues.push({
        url: link.url,
        type: 'broken',
        status: link.status
      });
    }
  });

  return report;
};

/**
 * Suggest anchor text improvements
 */
export const suggestAnchorText = (targetKeyword = '', currentAnchor = '') => {
  const suggestions = [
    { anchor: targetKeyword, type: 'exact-match', power: 'high' },
    { anchor: `${targetKeyword} guide`, type: 'partial-match', power: 'medium' },
    { anchor: `learn about ${targetKeyword}`, type: 'natural', power: 'medium' },
    { anchor: 'click here', type: 'generic', power: 'low' },
    { anchor: 'read more', type: 'generic', power: 'low' }
  ];

  // Filter and rank suggestions
  return suggestions.filter(s => s.anchor.toLowerCase() !== currentAnchor.toLowerCase())
    .sort((a, b) => {
      const powerRank = { high: 3, medium: 2, low: 1 };
      return powerRank[b.power] - powerRank[a.power];
    })
    .slice(0, 3);
};

export default {
  generateInternalLinks,
  buildTopicCluster,
  getContextualLinks,
  detectOrphanPages,
  calculateLinkJuice,
  generateSitemapLinks,
  checkInternalLinkHealth,
  suggestAnchorText
};
