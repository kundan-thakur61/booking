import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  ClipboardList,
  Copy,
  Gauge,
  HelpCircle,
  Link as LinkIcon,
  Network,
  Search,
  Trophy
} from 'lucide-react';
import Header from '../components/Header';
import SEO from '../components/SEO';

const initialForm = {
  websitePage: '',
  targetKeyword: '',
  secondaryKeywords: '',
  targetLocation: '',
  businessNiche: '',
  mainGoal: 'Leads'
};

const goalOptions = ['Leads', 'Traffic', 'Sales', 'Local SEO', 'Blog ranking'];

const requiredFields = [
  { key: 'websitePage', label: 'What exact URL or page should be optimized?' },
  { key: 'targetKeyword', label: 'What is the main keyword you want to rank for?' },
  { key: 'targetLocation', label: 'Which country, city, or service area should the page target?' },
  { key: 'businessNiche', label: 'What is the business type or niche?' },
  { key: 'mainGoal', label: 'What is the main SEO goal?' }
];

const normalizeList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formatLocation = (location) => location || 'your target location';
const formatNiche = (niche) => niche || 'your niche';

const makeTitle = ({ targetKeyword, targetLocation, businessNiche }) => {
  const location = formatLocation(targetLocation);
  const niche = formatNiche(businessNiche);
  return `${targetKeyword} in ${location} | Trusted ${niche} Guide`;
};

const makeDescription = ({ targetKeyword, targetLocation, businessNiche, mainGoal }) => {
  const location = formatLocation(targetLocation);
  const niche = formatNiche(businessNiche);
  return `Compare trusted ${niche} options for ${targetKeyword} in ${location}. See services, proof, FAQs, and clear next steps for ${mainGoal.toLowerCase()}.`;
};

const buildPlan = (form) => {
  const secondary = normalizeList(form.secondaryKeywords);
  const keyword = form.targetKeyword.trim();
  const location = formatLocation(form.targetLocation.trim());
  const niche = formatNiche(form.businessNiche.trim());
  const slug = slugify(`${keyword} ${location}`);
  const locationLower = location.toLowerCase();
  const keywordLower = keyword.toLowerCase();
  const isLocal = form.mainGoal === 'Local SEO' || keywordLower.includes('near me') || keywordLower.includes(locationLower);

  const longTailKeywords = [
    `best ${keyword} in ${location}`,
    `${keyword} near me`,
    `${keyword} price in ${location}`,
    `trusted ${keyword} ${location}`,
    `${niche} services in ${location}`,
    `${keyword} reviews ${location}`
  ];

  const semanticKeywords = [
    'verified provider',
    'pricing',
    'reviews',
    'service area',
    'availability',
    'booking process',
    'comparison',
    'trust signals',
    'customer support',
    'FAQ'
  ];

  const title = makeTitle(form);
  const description = makeDescription(form);

  return [
    {
      title: 'Keyword Strategy',
      icon: Search,
      items: [
        `Search intent: ${isLocal ? 'local commercial intent' : 'commercial investigation intent'}. The page should help users compare options, trust the provider, and take action.`,
        `Primary keyword usage: place "${keyword}" in the title, H1, first 100 words, one H2, image alt text, FAQ answers, and internal anchor text without repeating it unnaturally.`,
        `Secondary keywords: ${secondary.length ? secondary.join(', ') : longTailKeywords.slice(0, 3).join(', ')}.`,
        `Long-tail targets: ${longTailKeywords.join(', ')}.`,
        `Semantic/NLP terms: ${semanticKeywords.join(', ')}.`,
        `Difficulty assumption: ${isLocal ? 'medium if the city/service page is specific and competitors are directories; high if national aggregators dominate.' : 'medium to high because broad commercial keywords need strong authority and proof.'}`,
        'Content gaps to close: add real proof, pricing context, service-area details, comparison tables, safety/trust details, fresh update dates, and objection-handling FAQs.'
      ]
    },
    {
      title: 'On-Page SEO',
      icon: ClipboardList,
      items: [
        `SEO title: ${title}`,
        `Meta description: ${description}`,
        `Suggested H1: ${keyword} in ${location}`,
        `H2 structure: Why choose this ${niche} option, services available in ${location}, pricing and packages, how the process works, verification and trust, FAQs.`,
        `H3 structure: areas served, user benefits, proof points, comparison criteria, booking steps, common concerns.`,
        `URL slug: /${slug}`,
        'Internal links: link from the home page, relevant city/service pages, help center, safety page, blog guides, and sitemap using descriptive anchor text.',
        `Image alt text: "${keyword} service in ${location}", "${niche} option comparison in ${location}", and "${keyword} booking process".`,
        'Schema markup: use WebPage, BreadcrumbList, FAQPage, LocalBusiness or Service, Review/AggregateRating only when reviews are real, and Organization schema.'
      ]
    },
    {
      title: 'Content Optimization',
      icon: HelpCircle,
      items: [
        `Improved outline: short intent-matching intro, proof section, ${location} service-area details, comparison criteria, pricing guidance, process steps, safety/trust section, FAQs, and a focused CTA.`,
        `Topics to add: best options in ${location}, what affects price, how to choose safely, response time, service availability, guarantees, refund/cancellation rules, and competitor comparison factors.`,
        `FAQ section: What is the best ${keyword} in ${location}? How much does ${keyword} cost? How do I verify the provider? What areas are covered? How fast can I book?`,
        'E-E-A-T improvements: add author/editor details, last updated date, real business details, policies, customer support information, original photos, screenshots, testimonials, and transparent review collection rules.',
        'How to beat competitors: answer the query faster, show stronger local proof, include clearer pricing context, add unique FAQs competitors missed, improve internal links, and keep the page freshly updated.'
      ]
    },
    {
      title: 'Technical SEO',
      icon: Gauge,
      items: [
        'Page speed: compress hero images, lazy-load below-fold images, preload the LCP image, remove unused JavaScript, and check Lighthouse after each major layout change.',
        'Mobile optimization: keep CTA buttons above the fold, use 44px touch targets, avoid intrusive popups, and make comparison tables scroll cleanly on small screens.',
        'Indexing and crawlability: confirm the page is not blocked by robots.txt, returns 200 status, is included in XML and HTML sitemaps, and has internal links from crawlable pages.',
        'Core Web Vitals: target LCP under 2.5s, INP under 200ms, and CLS under 0.1. Give images fixed dimensions and avoid late-loading banners.',
        `Canonical tag: point to the final clean URL, for example https://example.com/${slug}.`,
        'Structured data: validate JSON-LD in Google Rich Results Test and avoid fake ratings, fake availability, or duplicated FAQ answers.'
      ]
    },
    {
      title: 'Off-Page SEO',
      icon: Network,
      items: [
        `Backlink strategy: earn links from ${niche} directories, local business lists, partner pages, resource pages, interviews, and data-led guides related to ${location}.`,
        `Guest post ideas: "${location} buyer guide for ${niche}", "how to choose trusted ${niche} providers", and "pricing guide for ${keyword}".`,
        `Local citations: create consistent NAP listings for ${location} on Google Business Profile if eligible, Bing Places, Apple Business Connect, and relevant local directories.`,
        'Digital PR ideas: publish a useful local market report, safety checklist, pricing trends page, or original survey that journalists and bloggers can cite.',
        'Authority-building steps: build topical clusters, interlink every related guide, update old pages quarterly, collect real reviews, and monitor brand mentions for link opportunities.'
      ]
    },
    {
      title: 'Competitor Analysis',
      icon: Trophy,
      items: [
        'What top competitors likely do better: more backlinks, stronger topical coverage, better internal linking, fresher content, faster mobile pages, and clearer trust signals.',
        `How to outrank them: create a page that is more complete for "${keyword}", more locally specific to ${location}, faster on mobile, and easier to act on than the top 5 results.`,
        'Content angle opportunities: compare providers, publish transparent pricing, add a local area guide, include safety/verification proof, and answer high-intent FAQs directly near the top of the page.',
        'Manual SERP check: review the current top 10 pages, record their title/H1/content depth/backlinks/schema/FAQs, then build a page that closes the biggest missing trust and intent gaps.'
      ]
    }
  ];
};

const buildPlainTextPlan = (form, plan) => {
  const header = [
    'Master SEO Ranking Plan',
    `Website/page: ${form.websitePage}`,
    `Target keyword: ${form.targetKeyword}`,
    `Secondary keywords: ${form.secondaryKeywords || 'Not provided'}`,
    `Target location: ${form.targetLocation}`,
    `Business/niche: ${form.businessNiche}`,
    `Main goal: ${form.mainGoal}`,
    ''
  ];

  const body = plan.flatMap((section, index) => [
    `${index + 1}. ${section.title}`,
    ...section.items.map((item) => `- ${item}`),
    ''
  ]);

  return [...header, ...body].join('\n');
};

const MasterSEORanking = () => {
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);

  const missingFields = requiredFields.filter((field) => !form[field.key].trim());
  const canGenerate = missingFields.length === 0;
  const plan = useMemo(() => (canGenerate ? buildPlan(form) : []), [canGenerate, form]);
  const planText = useMemo(() => buildPlainTextPlan(form, plan), [form, plan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleCopy = async () => {
    if (!canGenerate) return;

    try {
      await navigator.clipboard.writeText(planText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Master SEO Ranking Planner | BookEase"
        description="Build a practical SEO ranking plan with keyword strategy, on-page SEO, content optimization, technical SEO, off-page SEO, and competitor analysis."
        canonical="https://www.escortmumbaii.in/master-seo-ranking"
        entityType="webpage"
        lang="en-IN"
      />

      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase text-primary-700">
              SEO ranking workspace
            </p>
            <h1 className="mb-2 text-3xl font-bold text-neutral-900 md:text-4xl">
              Master SEO Ranking Planner
            </h1>
            <p className="max-w-3xl text-neutral-700">
              Fill in the core page details first. The planner will ask for missing inputs before showing recommendations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!canGenerate}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy Plan'}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h2 className="mb-0 text-xl font-bold text-neutral-900">Page Inputs</h2>
                <p className="mb-0 text-sm text-neutral-600">Required fields for accurate SEO advice.</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-neutral-800">Website/page</span>
                <input
                  name="websitePage"
                  value={form.websitePage}
                  onChange={handleChange}
                  placeholder="https://example.com/service-page"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-neutral-800">Target keyword</span>
                <input
                  name="targetKeyword"
                  value={form.targetKeyword}
                  onChange={handleChange}
                  placeholder="best booking service"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-neutral-800">Secondary keywords</span>
                <textarea
                  name="secondaryKeywords"
                  value={form.secondaryKeywords}
                  onChange={handleChange}
                  placeholder="keyword one, keyword two, keyword three"
                  rows={3}
                  className="w-full resize-y rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-neutral-800">Target country/location</span>
                <input
                  name="targetLocation"
                  value={form.targetLocation}
                  onChange={handleChange}
                  placeholder="Mumbai, India"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-neutral-800">Business type/niche</span>
                <input
                  name="businessNiche"
                  value={form.businessNiche}
                  onChange={handleChange}
                  placeholder="booking platform, local service, SaaS"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-neutral-800">Main goal</span>
                <select
                  name="mainGoal"
                  value={form.mainGoal}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
                >
                  {goalOptions.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="space-y-5">
            {!canGenerate ? (
              <div className="rounded-lg border border-warning-500 bg-amber-50 p-5">
                <div className="mb-4 flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-warning-600" />
                  <div>
                    <h2 className="mb-1 text-xl font-bold text-neutral-900">
                      Questions to Answer First
                    </h2>
                    <p className="mb-0 text-neutral-700">
                      These missing details are needed before the ranking recommendations can be accurate.
                    </p>
                  </div>
                </div>

                <ul className="mb-0 space-y-2 text-neutral-800">
                  {missingFields.map((field) => (
                    <li key={field.key} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-600" />
                      <span>{field.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <div className="rounded-lg border border-success-500 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success-600" />
                    <div>
                      <h2 className="mb-1 text-xl font-bold text-neutral-900">SEO Plan Ready</h2>
                      <p className="mb-0 text-neutral-700">
                        Recommendations below are tailored to the page, keyword, niche, location, and ranking goal you entered.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  {plan.map((section, index) => {
                    const Icon = section.icon;

                    return (
                      <article key={section.title} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-100 text-neutral-800">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h2 className="mb-0 text-xl font-bold text-neutral-900">
                            {index + 1}. {section.title}
                          </h2>
                        </div>

                        <ul className="mb-0 space-y-3 text-neutral-700">
                          {section.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <LinkIcon className="h-5 w-5 text-blue-700" />
                    <h2 className="mb-0 text-xl font-bold text-neutral-900">Immediate Next Steps</h2>
                  </div>
                  <ol className="mb-0 space-y-2 text-neutral-700">
                    <li>Audit the current top 10 search results for your target keyword.</li>
                    <li>Rewrite title, meta description, H1, URL slug, and intro around the confirmed intent.</li>
                    <li>Add proof, FAQs, internal links, schema, and mobile speed fixes before building links.</li>
                  </ol>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default MasterSEORanking;
