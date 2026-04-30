# ⚡ DealRadar

> Free price comparison across Amazon, Flipkart, eBay, Blinkit, Zepto, Myntra, Meesho, Nykaa and more.

---

## 📁 Project Files

```
dealradar/
├── index.html          → Main app (search, results, coupons)
├── about.html          → About page (required for affiliate approval)
├── privacy.html        → Privacy policy (required for affiliate approval)
├── contact.html        → Contact page (required for affiliate approval)
├── affiliate-config.js → ⭐ THE ONLY FILE YOU EDIT FOR AFFILIATE SETUP
├── vercel.json         → Vercel deployment config
└── README.md           → This file
```

---

## 🚀 Step 1 — Deploy to Vercel (Do This First)

1. Go to **https://vercel.com** and sign up free
2. Click **"Add New Project"**
3. Upload this entire folder OR push to GitHub first then import
4. Click **Deploy**
5. You get a live URL like → `https://dealradar.vercel.app`

**That URL is your website. Use it for all affiliate applications.**

---

## 💰 Step 2 — Apply for Affiliate Programs

Apply to these in order. Use your Vercel URL as your website.

### Amazon Associates (Most Important)
- India: https://affiliate-program.amazon.in
- Global: https://affiliate-program.amazon.com
- When asked "website URL" → paste your Vercel URL
- When asked "how do you drive traffic" → say "product price comparison website"
- Approval: Usually instant or within 24 hours
- You get an ID like: `dealradar-21`

### Flipkart Affiliate
- URL: https://affiliate.flipkart.com
- Same process as Amazon
- You get an affiliate ID

### eBay Partner Network
- URL: https://partnernetwork.ebay.com
- Approval within 24 hours
- You get a Campaign ID (numbers only)

### Nykaa Affiliate
- URL: https://www.nykaa.com/affiliate-program

### CJ Affiliate (100+ global brands)
- URL: https://www.cj.com
- One account → access to Walmart, ASOS, Target and many more

---

## 🔧 Step 3 — Fill in Your Affiliate IDs

Open `affiliate-config.js` and fill in your IDs:

```javascript
const AFFILIATE_CONFIG = {
  amazon: {
    india:  "YOUR_AMAZON_ID",    // e.g. "dealradar-21"
    global: "YOUR_GLOBAL_ID",
  },
  flipkart: {
    id: "YOUR_FLIPKART_ID",
  },
  ebay: {
    campaignId: "YOUR_EBAY_CAMPAIGN_ID",
  },
  nykaa: {
    id: "YOUR_NYKAA_ID",
  },
};
```

Save the file → redeploy to Vercel → **every Buy Now button on the site now earns you money.**

---

## 📊 Where to Check Earnings

| Platform  | Dashboard URL |
|-----------|--------------|
| Amazon    | affiliate-program.amazon.in/home |
| Flipkart  | affiliate.flipkart.com/dashboard |
| eBay      | partnernetwork.ebay.com |
| Nykaa     | nykaa.com/affiliate-program |

---

## ⚠️ Important: Amazon 180-Day Rule

Amazon requires **3 qualifying sales within 180 days** of signup.
If you don't hit this → they deactivate the account.
**Solution:** Get the site live fast. You can reapply immediately if deactivated.

---

## 🛠️ How to Add Real API Data Later (Phase 2)

Right now the site uses demo product data.
To connect real APIs, tell your AI assistant:
> "Connect the eBay Browse API to DealRadar using my eBay App ID: [YOUR_ID]"

The eBay Browse API is free and returns real live product data including prices, images, ratings and direct product links.

---

## 📈 Growth Plan

```
Week 1-2  → Deploy on Vercel, apply for affiliates
Week 3    → Get approved, plug in IDs, site is earning
Month 2   → Real users via Google search
Month 3+  → Approach Myntra, Meesho, Blinkit for direct deals
Month 6+  → Browser extension (the real product)
```

---

Built with ❤️ to save people money.
