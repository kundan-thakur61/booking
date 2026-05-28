import React from 'react';

/**
 * Semantic HTML Heading Component
 * Ensures proper heading hierarchy for SEO
 * Prevents multiple H1s and maintains logical structure
 */
export const SemanticHeading = ({
  level = 1,
  children,
  id = null,
  className = '',
  as = null,
  keywords = []
}) => {
  const HeadingTag = as || `h${level}`;
  const defaultClasses = {
    h1: 'text-4xl font-bold leading-tight text-neutral-900',
    h2: 'text-3xl font-bold leading-tight text-neutral-900 mt-8 mb-4',
    h3: 'text-2xl font-semibold leading-snug text-neutral-900 mt-6 mb-3',
    h4: 'text-xl font-semibold leading-snug text-neutral-800 mt-4 mb-2',
    h5: 'text-lg font-medium text-neutral-800 mt-3 mb-2',
    h6: 'text-base font-medium text-neutral-800 mt-2 mb-1'
  };

  const finalClassName = className || defaultClasses[HeadingTag];

  // Add focus styles for accessibility
  const accessibilityClasses = 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

  return React.createElement(
    HeadingTag,
    {
      id: id || null,
      className: `${finalClassName} ${accessibilityClasses}`,
      'data-keywords': keywords.join(',')
    },
    children
  );
};

/**
 * Semantic Section Component
 * Wraps content in semantic <section> tag for better structure
 */
export const SemanticSection = ({
  title = null,
  headingLevel = 2,
  children,
  id = null,
  className = '',
  aria-labelledby = null,
  keywords = []
}) => {
  const sectionId = id || title?.toLowerCase().replace(/\s+/g, '-');
  const headingId = `${sectionId}-heading`;

  return (
    <section
      id={sectionId}
      className={className}
      aria-labelledby={aria-labelledby || (title ? headingId : null)}
      data-section-topic={title || ''}
    >
      {title && (
        <SemanticHeading
          level={headingLevel}
          id={headingId}
          keywords={keywords}
        >
          {title}
        </SemanticHeading>
      )}
      {children}
    </section>
  );
};

/**
 * Semantic Article Component
 * Wraps main content in <article> tag for proper semantic structure
 */
export const SemanticArticle = ({
  title = null,
  author = null,
  publishedDate = null,
  modifiedDate = null,
  children,
  id = null,
  className = ''
}) => {
  return (
    <article
      id={id || 'main-article'}
      className={className}
      itemScope
      itemType="https://schema.org/Article"
    >
      {title && (
        <h1 className="text-4xl font-bold mb-4" itemProp="headline">
          {title}
        </h1>
      )}

      {(author || publishedDate || modifiedDate) && (
        <div className="text-neutral-600 text-sm mb-6 border-b pb-4">
          {author && (
            <span itemProp="author" itemScope itemType="https://schema.org/Organization">
              By <span itemProp="name">{author}</span>
            </span>
          )}
          {publishedDate && (
            <time
              itemProp="datePublished"
              dateTime={new Date(publishedDate).toISOString()}
              className="ml-2"
            >
              Published: {new Date(publishedDate).toLocaleDateString()}
            </time>
          )}
          {modifiedDate && (
            <time
              itemProp="dateModified"
              dateTime={new Date(modifiedDate).toISOString()}
              className="ml-2"
            >
              Updated: {new Date(modifiedDate).toLocaleDateString()}
            </time>
          )}
        </div>
      )}

      <div itemProp="articleBody" className="prose prose-lg max-w-none">
        {children}
      </div>
    </article>
  );
};

/**
 * Semantic Navigation Component
 * Wraps navigation in <nav> tag with proper accessibility attributes
 */
export const SemanticNav = ({
  label = 'Main Navigation',
  children,
  className = '',
  ariaLabel = null
}) => {
  return (
    <nav
      className={className}
      aria-label={ariaLabel || label}
      role="navigation"
    >
      {children}
    </nav>
  );
};

/**
 * Semantic List Component
 * Creates properly structured lists for accessibility
 */
export const SemanticList = ({
  items = [],
  ordered = false,
  className = '',
  itemClassName = '',
  renderItem = null
}) => {
  const ListTag = ordered ? 'ol' : 'ul';

  return React.createElement(
    ListTag,
    { className },
    items.map((item, index) =>
      React.createElement(
        'li',
        {
          key: index,
          className: itemClassName
        },
        renderItem ? renderItem(item, index) : item
      )
    )
  );
};

/**
 * Semantic Link Component
 * Creates SEO-friendly links with proper attributes
 */
export const SemanticLink = ({
  href,
  text,
  title = null,
  rel = null,
  className = '',
  children = null,
  isInternal = true,
  aria-label = null,
  keywords = []
}) => {
  const relAttr = rel || (isInternal ? null : 'noopener noreferrer');
  const target = isInternal ? '_self' : '_blank';

  return (
    <a
      href={href}
      title={title || text}
      rel={relAttr}
      className={className}
      target={target}
      aria-label={aria_label || text}
      data-keywords={keywords.join(',')}
    >
      {children || text}
    </a>
  );
};

/**
 * Semantic Figure Component
 * Wraps images with proper semantic structure and captions
 */
export const SemanticFigure = ({
  src,
  alt,
  caption = null,
  title = null,
  width = null,
  height = null,
  className = '',
  imageClassName = ''
}) => {
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className={imageClassName}
        loading="lazy"
        decoding="async"
      />
      {caption && (
        <figcaption className="text-sm text-neutral-600 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

/**
 * Semantic Main Content Area
 * Wraps main content in <main> tag (only one per page)
 */
export const SemanticMain = ({
  children,
  id = 'main-content',
  className = ''
}) => {
  return (
    <main id={id} className={className} role="main">
      {children}
    </main>
  );
};

/**
 * Semantic Aside Component
 * Wraps supplementary content
 */
export const SemanticAside = ({
  children,
  className = '',
  aria-label = 'Sidebar'
}) => {
  return (
    <aside className={className} aria-label={aria_label} role="complementary">
      {children}
    </aside>
  );
};

/**
 * Semantic Footer Component
 * Wraps footer content
 */
export const SemanticFooter = ({
  children,
  className = ''
}) => {
  return (
    <footer className={className} role="contentinfo">
      {children}
    </footer>
  );
};

/**
 * Semantic Header Component
 * Wraps header content
 */
export const SemanticHeader = ({
  children,
  className = ''
}) => {
  return (
    <header className={className} role="banner">
      {children}
    </header>
  );
};

/**
 * Helper to ensure only one H1 per page
 */
export const validateHeadingHierarchy = (headings = []) => {
  const h1Count = headings.filter(h => h.level === 1).length;
  const issues = [];

  if (h1Count === 0) {
    issues.push({
      severity: 'error',
      message: 'Page has no H1 - add exactly one H1'
    });
  } else if (h1Count > 1) {
    issues.push({
      severity: 'warning',
      message: `Page has ${h1Count} H1s - should have only one`
    });
  }

  // Check for skipped levels (e.g., H1 → H3)
  let previousLevel = 0;
  headings.forEach(h => {
    if (h.level - previousLevel > 1) {
      issues.push({
        severity: 'warning',
        message: `Heading level skipped from H${previousLevel} to H${h.level}`
      });
    }
    previousLevel = h.level;
  });

  return issues;
};

export default {
  SemanticHeading,
  SemanticSection,
  SemanticArticle,
  SemanticNav,
  SemanticList,
  SemanticLink,
  SemanticFigure,
  SemanticMain,
  SemanticAside,
  SemanticFooter,
  SemanticHeader,
  validateHeadingHierarchy
};
