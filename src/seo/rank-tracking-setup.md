# Rank Tracking Setup Guide

**Target Keyword:** Companion Services  
**Secondary Keywords:** 10+ variants  
**Target Location:** India  
**Last Updated:** January 18, 2026

---

## 🎯 Keywords to Track

### Primary Keywords (High Priority)
| Keyword | Search Volume (Est.) | Competition | Target Position |
|---------|---------------------|-------------|-----------------|
| companion services | 12,000-18,000 | Medium | #1 |
| companion services india | 4,000-6,000 | Medium | #1 |
| professional companion services | 1,500-2,500 | Low | Top 3 |
| companion services near me | 3,000-5,000 | Medium | Top 5 |

### Secondary Keywords (Medium Priority)
| Keyword | Search Volume (Est.) | Target Position |
|---------|---------------------|-----------------|
| girlfriend experience | 8,000-12,000 | Top 5 |
| girlfriend experience india | 2,000-4,000 | Top 3 |
| travel companion services | 1,000-2,000 | Top 3 |
| social companion | 800-1,500 | Top 5 |
| companion booking | 500-1,000 | Top 3 |

### Long-Tail Keywords (Track for Snippets)
| Keyword | Target |
|---------|--------|
| what are companion services | Featured Snippet |
| how much do companion services cost | Featured Snippet |
| types of companion services | Featured Snippet |
| how to book companion services | Featured Snippet |
| companion services rates india | Featured Snippet |

### City-Specific Keywords
| Keyword | Target Position |
|---------|-----------------|
| companion services mumbai | Top 5 |
| companion services delhi | Top 5 |
| companion services bangalore | Top 5 |
| companion services pune | Top 3 |

---

## 🛠️ Recommended Rank Tracking Tools

### Option 1: Semrush (Premium - Recommended)
**Best for:** Comprehensive competitor analysis + rank tracking

**Setup Steps:**
1. Go to [Semrush.com](https://www.semrush.com)
2. Start free trial or subscribe
3. Create new project for `escortmumbaii.in`
4. Go to **Position Tracking**
5. Add keywords from list above
6. Set location: **India**
7. Set device: **Mobile** (primary) + **Desktop** (secondary)
8. Enable daily tracking

**Features:**
- ✅ Daily rank updates
- ✅ SERP feature tracking (snippets)
- ✅ Competitor comparison
- ✅ Email alerts for rank changes

---

### Option 2: Ahrefs (Premium)
**Best for:** Backlink monitoring + rank tracking

**Setup Steps:**
1. Go to [Ahrefs.com](https://ahrefs.com)
2. Create project for your domain
3. Go to **Rank Tracker**
4. Add all keywords
5. Set country: **India**
6. Schedule weekly tracking

---

### Option 3: Serpstat (Budget-Friendly)
**Best for:** Affordable alternative with good features

**Setup Steps:**
1. Go to [Serpstat.com](https://serpstat.com)
2. Create rank tracker project
3. Add keywords
4. Set region: **India**
5. Enable notifications

---

### Option 4: Free - Google Search Console + Sheets
**Best for:** Zero budget, basic tracking

**Manual Tracking Process:**

1. Create Google Sheet with columns:
   - Date
   - Keyword
   - Position
   - Impressions
   - Clicks
   - CTR

2. Weekly data collection:
   - Go to GSC → Performance
   - Filter by keyword
   - Record position
   - Export to sheet

---

## 📊 Automated Rank Tracking Script

Create file: `scripts/rank-tracker.js`

```javascript
/**
 * Companion Services Rank Tracker
 * Uses free Google SERP checking (limited)
 * For production, use Semrush/Ahrefs API
 */

const https = require('https');
const fs = require('fs');

const KEYWORDS = [
  'companion services',
  'companion services india',
  'girlfriend experience',
  'travel companion services',
  'social companion',
  'companion booking',
  'what are companion services',
  'companion services rates',
  'companion services mumbai',
  'companion services delhi'
];

const TARGET_DOMAIN = 'escortmumbaii.in';
const TRACKING_FILE = './reports/rank-tracking.json';

// Load existing data or create new
function loadTrackingData() {
  try {
    return JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
  } catch {
    return { history: [], lastUpdated: null };
  }
}

// Save tracking data
function saveTrackingData(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(data, null, 2));
}

// Manual rank entry (for free tracking)
function addManualRankEntry(rankings) {
  const data = loadTrackingData();
  
  data.history.push({
    date: new Date().toISOString().split('T')[0],
    rankings: rankings
  });
  
  saveTrackingData(data);
  console.log('Rank data saved successfully!');
}

// Generate rank report
function generateReport() {
  const data = loadTrackingData();
  
  if (data.history.length < 2) {
    console.log('Need at least 2 data points for comparison');
    return;
  }
  
  const latest = data.history[data.history.length - 1];
  const previous = data.history[data.history.length - 2];
  
  console.log('\n📊 RANK TRACKING REPORT');
  console.log('========================\n');
  console.log(`Date: ${latest.date}`);
  console.log(`Previous: ${previous.date}\n`);
  
  console.log('Keyword                          | Current | Previous | Change');
  console.log('-'.repeat(70));
  
  for (const keyword of Object.keys(latest.rankings)) {
    const current = latest.rankings[keyword] || '-';
    const prev = previous.rankings[keyword] || '-';
    let change = '-';
    
    if (typeof current === 'number' && typeof prev === 'number') {
      const diff = prev - current;
      if (diff > 0) change = `↑ ${diff}`;
      else if (diff < 0) change = `↓ ${Math.abs(diff)}`;
      else change = '→ 0';
    }
    
    console.log(`${keyword.padEnd(32)} | ${String(current).padEnd(7)} | ${String(prev).padEnd(8)} | ${change}`);
  }
}

// Export functions
module.exports = {
  KEYWORDS,
  TARGET_DOMAIN,
  loadTrackingData,
  saveTrackingData,
  addManualRankEntry,
  generateReport
};

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === 'report') {
    generateReport();
  } else if (args[0] === 'add') {
    // Example: node rank-tracker.js add '{"companion services": 5, "gfe": 8}'
    try {
      const rankings = JSON.parse(args[1]);
      addManualRankEntry(rankings);
    } catch (e) {
      console.log('Usage: node rank-tracker.js add \'{"keyword": position}\'');
    }
  } else {
    console.log('Commands:');
    console.log('  report - Generate rank comparison report');
    console.log('  add \'{"keyword": position}\' - Add manual rank entry');
  }
}
```

---

## 📈 Tracking Dashboard Template

Create a Google Sheet or Excel with these tabs:

### Tab 1: Weekly Rankings
| Date | companion services | companion services india | girlfriend experience | ... |
|------|-------------------|-------------------------|----------------------|-----|
| 2026-01-18 | - | - | - | |
| 2026-01-25 | | | | |
| 2026-02-01 | | | | |

### Tab 2: SERP Features
| Date | Keyword | Featured Snippet | People Also Ask | Image Pack | Video |
|------|---------|------------------|-----------------|------------|-------|
| 2026-01-18 | companion services | ❌ | ❌ | ❌ | ❌ |

### Tab 3: Competitor Tracking
| Date | Our Position | Competitor 1 | Competitor 2 | Competitor 3 |
|------|-------------|--------------|--------------|--------------|
| | | | | |

---

## ⏰ Tracking Schedule

| Frequency | Action |
|-----------|--------|
| **Daily** | Check primary keyword (companion services) |
| **Weekly** | Full keyword tracking + report |
| **Bi-weekly** | Competitor position analysis |
| **Monthly** | Comprehensive report + strategy review |

---

## 🎯 Rank Goals by Phase

### Days 1-30: Foundation
| Keyword | Starting | Target |
|---------|----------|--------|
| companion services | Not ranked | Page 2-3 (11-30) |
| companion services india | Not ranked | Page 2 (11-20) |

### Days 31-60: Momentum
| Keyword | Target |
|---------|--------|
| companion services | Page 1 (5-10) |
| companion services india | Page 1 (5-10) |
| girlfriend experience | Top 20 |

### Days 61-90: Dominance
| Keyword | Target |
|---------|--------|
| companion services | Top 3 |
| companion services india | Top 3 |
| girlfriend experience | Top 10 |
| Featured Snippet | Captured |

---

## ✅ Setup Checklist

- [ ] Choose rank tracking tool (Semrush/Ahrefs/Free)
- [ ] Add all 20+ keywords
- [ ] Set location to India
- [ ] Set device to Mobile (primary)
- [ ] Enable email alerts for significant changes
- [ ] Create baseline report
- [ ] Schedule weekly check-ins
- [ ] Set up Google Sheet dashboard

---

*Next: PageSpeed Insights optimization*
