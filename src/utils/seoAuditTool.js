// Comprehensive SEO Performance & Audit Dashboard
// Real-time monitoring of SEO metrics and recommendations

export class SEOAuditTool {
  constructor(pageUrl = window.location.href) {
    this.pageUrl = pageUrl;
    this.issues = [];
    this.warnings = [];
    this.successes = [];
  }

  /**
   * Audit page title
   */
  auditTitle() {
    const titleTag = document.querySelector('title');
    const ogTitle = document.querySelector('meta[property="og:title"]');

    if (!titleTag || !titleTag.textContent) {
      this.issues.push({
        category: 'Title',
        severity: 'critical',
        message: 'Page title is missing',
        fix: 'Add a title tag with 55-60 characters'
      });
    } else if (titleTag.textContent.length < 30) {
      this.warnings.push({
        category: 'Title',
        severity: 'warning',
        message: `Title is too short (${titleTag.textContent.length} chars)`,
        fix: 'Aim for 55-60 characters to maximize SERP display'
      });
    } else if (titleTag.textContent.length > 60) {
      this.warnings.push({
        category: 'Title',
        severity: 'warning',
        message: `Title is too long (${titleTag.textContent.length} chars)`,
        fix: 'Keep titles under 60 characters to prevent truncation'
      });
    } else {
      this.successes.push({
        category: 'Title',
        message: `Title is optimized (${titleTag.textContent.length} chars)`
      });
    }
  }

  /**
   * Audit meta description
   */
  auditMetaDescription() {
    const metaDesc = document.querySelector('meta[name="description"]');

    if (!metaDesc || !metaDesc.content) {
      this.issues.push({
        category: 'Meta Description',
        severity: 'critical',
        message: 'Meta description is missing',
        fix: 'Add a meta description with 155-160 characters'
      });
    } else if (metaDesc.content.length < 120) {
      this.warnings.push({
        category: 'Meta Description',
        severity: 'warning',
        message: `Description is too short (${metaDesc.content.length} chars)`,
        fix: 'Aim for 155-160 characters for full SERP display'
      });
    } else if (metaDesc.content.length > 160) {
      this.warnings.push({
        category: 'Meta Description',
        severity: 'warning',
        message: `Description is too long (${metaDesc.content.length} chars)`,
        fix: 'Keep descriptions under 160 characters to prevent truncation'
      });
    } else {
      this.successes.push({
        category: 'Meta Description',
        message: `Description is optimized (${metaDesc.content.length} chars)`
      });
    }
  }

  /**
   * Audit headings hierarchy
   */
  auditHeadings() {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const h1Count = headings.filter(h => h.tagName === 'H1').length;

    if (h1Count === 0) {
      this.issues.push({
        category: 'Headings',
        severity: 'critical',
        message: 'Page has no H1 tag',
        fix: 'Add exactly one H1 tag as the main page heading'
      });
    } else if (h1Count > 1) {
      this.issues.push({
        category: 'Headings',
        severity: 'warning',
        message: `Page has ${h1Count} H1 tags (should have only one)`,
        fix: 'Keep only one H1 tag per page, use H2-H6 for subheadings'
      });
    } else {
      this.successes.push({
        category: 'Headings',
        message: 'Proper H1 tag found'
      });
    }

    // Check for heading hierarchy (no skipped levels)
    let previousLevel = 0;
    headings.forEach(h => {
      const level = parseInt(h.tagName[1]);
      if (previousLevel > 0 && level - previousLevel > 1) {
        this.warnings.push({
          category: 'Headings',
          severity: 'warning',
          message: `Heading level skipped from H${previousLevel} to H${level}`,
          fix: 'Use sequential heading levels (H1 > H2 > H3, etc.)'
        });
      }
      previousLevel = level;
    });
  }

  /**
   * Audit canonical URL
   */
  auditCanonical() {
    const canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      this.warnings.push({
        category: 'Canonical',
        severity: 'warning',
        message: 'Canonical URL is missing',
        fix: 'Add <link rel="canonical" href="URL"> to head'
      });
    } else {
      this.successes.push({
        category: 'Canonical',
        message: `Canonical URL set to ${canonical.href}`
      });
    }
  }

  /**
   * Audit Open Graph tags
   */
  auditOpenGraph() {
    const ogTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
    const missingTags = [];

    ogTags.forEach(tag => {
      const meta = document.querySelector(`meta[property="${tag}"]`);
      if (!meta || !meta.content) {
        missingTags.push(tag);
      }
    });

    if (missingTags.length > 0) {
      this.warnings.push({
        category: 'Open Graph',
        severity: 'warning',
        message: `Missing Open Graph tags: ${missingTags.join(', ')}`,
        fix: 'Add all Open Graph meta tags for social sharing'
      });
    } else {
      this.successes.push({
        category: 'Open Graph',
        message: 'All Open Graph tags present'
      });
    }
  }

  /**
   * Audit Twitter Card tags
   */
  auditTwitterCard() {
    const twitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
    const missingTags = [];

    twitterTags.forEach(tag => {
      const meta = document.querySelector(`meta[name="${tag}"]`);
      if (!meta || !meta.content) {
        missingTags.push(tag);
      }
    });

    if (missingTags.length > 0) {
      this.warnings.push({
        category: 'Twitter Card',
        severity: 'warning',
        message: `Missing Twitter Card tags: ${missingTags.join(', ')}`,
        fix: 'Add all Twitter Card meta tags for Twitter sharing'
      });
    } else {
      this.successes.push({
        category: 'Twitter Card',
        message: 'All Twitter Card tags present'
      });
    }
  }

  /**
   * Audit image optimization
   */
  auditImages() {
    const images = Array.from(document.querySelectorAll('img'));

    if (images.length === 0) {
      this.warnings.push({
        category: 'Images',
        severity: 'info',
        message: 'Page has no images',
        fix: 'Consider adding optimized images for better engagement'
      });
      return;
    }

    images.forEach(img => {
      if (!img.alt) {
        this.issues.push({
          category: 'Images',
          severity: 'warning',
          message: `Image missing alt text: ${img.src.substring(0, 50)}...`,
          fix: 'Add descriptive alt text to all images'
        });
      }

      if (!img.loading) {
        this.warnings.push({
          category: 'Images',
          severity: 'info',
          message: `Image not lazy-loaded: ${img.src.substring(0, 50)}...`,
          fix: 'Add loading="lazy" for below-the-fold images'
        });
      }
    });

    if (images.every(img => img.alt)) {
      this.successes.push({
        category: 'Images',
        message: `All ${images.length} images have alt text`
      });
    }
  }

  /**
   * Audit robots meta tag
   */
  auditRobots() {
    const robots = document.querySelector('meta[name="robots"]');

    if (!robots) {
      this.warnings.push({
        category: 'Robots',
        severity: 'warning',
        message: 'Robots meta tag is missing',
        fix: 'Add <meta name="robots" content="index, follow">'
      });
    } else if (!robots.content.includes('index')) {
      this.issues.push({
        category: 'Robots',
        severity: 'critical',
        message: 'Page is set to noindex',
        fix: 'Change robots meta to index this page'
      });
    } else {
      this.successes.push({
        category: 'Robots',
        message: 'Page is set to index and follow'
      });
    }
  }

  /**
   * Audit structured data (JSON-LD)
   */
  auditStructuredData() {
    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));

    if (jsonLdScripts.length === 0) {
      this.warnings.push({
        category: 'Structured Data',
        severity: 'warning',
        message: 'No structured data (JSON-LD) found',
        fix: 'Add JSON-LD structured data for better SERP features'
      });
    } else {
      this.successes.push({
        category: 'Structured Data',
        message: `${jsonLdScripts.length} JSON-LD scripts found`
      });
    }
  }

  /**
   * Audit internal links
   */
  auditInternalLinks() {
    const links = Array.from(document.querySelectorAll('a[href]'));
    const internalLinks = links.filter(l => {
      const href = l.getAttribute('href');
      return href.startsWith('/') || href.includes(window.location.hostname);
    });

    if (internalLinks.length === 0) {
      this.warnings.push({
        category: 'Internal Links',
        severity: 'warning',
        message: 'Page has no internal links',
        fix: 'Add internal links to related pages'
      });
    } else {
      const brokenLinks = internalLinks.filter(l => !l.textContent.trim());
      if (brokenLinks.length > 0) {
        this.warnings.push({
          category: 'Internal Links',
          severity: 'warning',
          message: `${brokenLinks.length} links with no anchor text`,
          fix: 'Ensure all links have descriptive anchor text'
        });
      } else {
        this.successes.push({
          category: 'Internal Links',
          message: `${internalLinks.length} internal links found`
        });
      }
    }
  }

  /**
   * Audit mobile responsiveness
   */
  auditMobileResponsiveness() {
    const viewport = document.querySelector('meta[name="viewport"]');

    if (!viewport) {
      this.issues.push({
        category: 'Mobile',
        severity: 'critical',
        message: 'Viewport meta tag is missing',
        fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">'
      });
    } else {
      this.successes.push({
        category: 'Mobile',
        message: 'Viewport meta tag is set'
      });
    }
  }

  /**
   * Audit page load performance
   */
  auditPerformance() {
    if (!window.performance || !window.performance.timing) {
      return;
    }

    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    const fcp = timing.responseStart - timing.navigationStart;

    if (pageLoadTime > 3000) {
      this.warnings.push({
        category: 'Performance',
        severity: 'warning',
        message: `Page load time is ${pageLoadTime}ms (should be < 3000ms)`,
        fix: 'Optimize images, minify CSS/JS, enable compression'
      });
    } else {
      this.successes.push({
        category: 'Performance',
        message: `Good page load time: ${pageLoadTime}ms`
      });
    }
  }

  /**
   * Run all audits
   */
  runFullAudit() {
    this.auditTitle();
    this.auditMetaDescription();
    this.auditHeadings();
    this.auditCanonical();
    this.auditOpenGraph();
    this.auditTwitterCard();
    this.auditImages();
    this.auditRobots();
    this.auditStructuredData();
    this.auditInternalLinks();
    this.auditMobileResponsiveness();
    this.auditPerformance();

    return this.getReport();
  }

  /**
   * Get audit report
   */
  getReport() {
    return {
      pageUrl: this.pageUrl,
      timestamp: new Date().toISOString(),
      summary: {
        criticalIssues: this.issues.filter(i => i.severity === 'critical').length,
        warnings: this.issues.length + this.warnings.length,
        successes: this.successes.length
      },
      issues: this.issues,
      warnings: this.warnings,
      successes: this.successes,
      score: this.calculateSEOScore()
    };
  }

  /**
   * Calculate SEO score (0-100)
   */
  calculateSEOScore() {
    const criticalIssues = this.issues.filter(i => i.severity === 'critical').length;
    const warnings = this.issues.filter(i => i.severity === 'warning').length;
    const successes = this.successes.length;

    let score = 100;
    score -= criticalIssues * 10;
    score -= warnings * 3;
    score += Math.min(successes * 2, 20);

    return Math.max(0, Math.min(100, score));
  }
}

/**
 * Export audit utility
 */
export const initSEOAudit = () => {
  const audit = new SEOAuditTool();
  return audit.runFullAudit();
};

export default SEOAuditTool;
