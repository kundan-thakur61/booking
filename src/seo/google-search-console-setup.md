# Google Search Console Setup & Indexing Guide

**Target Page:** /companion-escort-services  
**Domain:** www.escortmumbaii.in  
**Last Updated:** January 18, 2026

---

## 📋 Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Select your property: `https://www.escortmumbaii.in`

---

## 📤 Step 2: Submit Updated Sitemap

### 2.1 Verify Sitemap Includes the Page

The page should be in your sitemap. Check:

```
https://www.escortmumbaii.in/sitemap-pages.xml
```

Ensure this entry exists:
```xml
<url>
  <loc>https://www.escortmumbaii.in/companion-escort-services</loc>
  <lastmod>2026-01-18</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

### 2.2 Submit/Resubmit Sitemap

1. In GSC, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap-index.xml` or `sitemap.xml`
3. Click **Submit**
4. Check status shows "Success"

---

## 🔗 Step 3: Request Indexing for Specific Page

### 3.1 URL Inspection Tool

1. In GSC, click **URL Inspection** in the top search bar
2. Enter: `https://www.escortmumbaii.in/companion-escort-services`
3. Press Enter

### 3.2 Analyze Results

You'll see one of these statuses:

| Status | Meaning | Action |
|--------|---------|--------|
| **URL is on Google** | Already indexed | Check if using latest version |
| **URL is not on Google** | Not indexed yet | Request indexing |
| **Crawled - currently not indexed** | Found but not indexed | Improve content quality |

### 3.3 Request Indexing

1. Click **"REQUEST INDEXING"** button
2. Wait for live URL test to complete (30-60 seconds)
3. Confirm the request

**Note:** Indexing typically takes 24-72 hours, but can take up to 2 weeks.

---

## 📊 Step 4: Monitor Performance

### 4.1 Set Up Performance Tracking

1. Go to **Performance** in left sidebar
2. Click **+ New** → **Query**
3. Add filters for:
   - Query: "companion services"
   - Query: "companion services india"
   - Query: "girlfriend experience"
   - Query: "travel companion"
   - Query: "social companion"

### 4.2 Export Baseline Data

1. Select date range: Last 28 days
2. Click **Export** → **Download CSV**
3. Save as `companion-services-baseline-2026-01-18.csv`

---

## 🔍 Step 5: Verify Rich Results

### 5.1 Test Schema Markup

1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter: `https://www.escortmumbaii.in/companion-escort-services`
3. Click **Test URL**

### 5.2 Expected Rich Results

You should see these detected:

- ✅ **FAQ** - 10 questions
- ✅ **Breadcrumb** - 3 levels
- ✅ **Article** - With author
- ⚠️ **Review snippet** - May show warning (expected)

### 5.3 Fix Any Errors

If errors appear:
1. Note the specific error message
2. Check schema in CompanionEscortServices.jsx
3. Fix and redeploy
4. Retest

---

## 📈 Step 6: Set Up Search Console Alerts

### 6.1 Email Notifications

1. Go to **Settings** (gear icon)
2. Click **Email preferences**
3. Enable:
   - ✅ Coverage issues
   - ✅ Enhancement issues
   - ✅ Security issues
   - ✅ Manual actions

### 6.2 Track Specific Metrics

Monitor these weekly:

| Metric | Target | Action if Below |
|--------|--------|-----------------|
| Impressions | Growing weekly | Check keyword rankings |
| CTR | > 5% | Improve meta title/description |
| Avg Position | < 10 | Content optimization needed |
| Indexed Pages | All pages indexed | Fix crawl issues |

---

## 🛠️ Step 7: API Integration (Optional - Advanced)

### 7.1 Enable Search Console API

```bash
# Install Google API client
npm install googleapis
```

### 7.2 Create Automated Indexing Script

Create file: `scripts/request-indexing.js`

```javascript
const { google } = require('googleapis');

// Set up authentication (requires service account)
const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/service-account.json',
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

async function requestIndexing(url) {
  const indexing = google.indexing({ version: 'v3', auth });
  
  try {
    const result = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    console.log(`Indexing requested for: ${url}`);
    console.log('Response:', result.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Request indexing for companion services page
requestIndexing('https://www.escortmumbaii.in/companion-escort-services');
```

---

## ✅ Checklist

- [ ] Verified property ownership in GSC
- [ ] Submitted updated sitemap
- [ ] Requested indexing via URL Inspection
- [ ] Tested rich results (FAQ, Breadcrumb, Article)
- [ ] Set up performance filters for target keywords
- [ ] Enabled email notifications
- [ ] Exported baseline performance data

---

## 📅 Follow-Up Schedule

| Day | Action |
|-----|--------|
| Day 1 | Submit for indexing |
| Day 3 | Check if indexed (URL Inspection) |
| Day 7 | Review initial impressions/clicks |
| Day 14 | Full performance analysis |
| Day 30 | Compare to baseline |

---

*Next: Set up rank tracking with tools below*
