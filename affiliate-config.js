// ============================================================
//  DEPLOYMENT CHECKLIST
//  1. This file MUST be in the same folder as index.html on Vercel.
//  2. Fill your affiliate IDs below after getting approved.
//  3. Redeploy to Vercel after filling IDs — all buttons update instantly.
// ============================================================

// ============================================================
//  DEALRADAR — AFFILIATE CONFIG
//  Fill in your IDs here after getting approved.
//  This is the ONLY file you need to edit for affiliate setup.
//  Every button on the site uses these automatically.
// ============================================================

const AFFILIATE_CONFIG = {

  // Amazon Associates
  // Sign up: https://affiliate-program.amazon.in
  // Your ID looks like: "dealradar-21"
  amazon: {
    india:  "",   // e.g. "dealradar-21"
    global: "",   // e.g. "dealradar0f-20"
  },

  // Flipkart Affiliate
  // Sign up: https://affiliate.flipkart.com
  // Your ID looks like: "dealradar123"
  flipkart: {
    id: "",       // e.g. "dealradar123"
  },

  // eBay Partner Network
  // Sign up: https://partnernetwork.ebay.com
  // Your Campaign ID looks like: "5338123456"
  ebay: {
    campaignId: "", // e.g. "5338123456"
  },

  // Nykaa Affiliate
  // Sign up: https://www.nykaa.com/affiliate-program
  nykaa: {
    id: "",
  },

  // CJ Affiliate (covers 100+ global brands)
  // Sign up: https://www.cj.com
  cj: {
    id: "",
  },

};

// ============================================================
//  HOW LINKS ARE BUILT — DO NOT EDIT BELOW THIS LINE
// ============================================================

function buildAffiliateLink(platform, query, region = "india") {
  const q = encodeURIComponent(query);
  const cfg = AFFILIATE_CONFIG;

  switch (platform) {
    case "amazon":
      const amzTag = region === "india" ? cfg.amazon.india : cfg.amazon.global;
      const amzBase = region === "india" ? "https://www.amazon.in" : "https://www.amazon.com";
      return amzTag
        ? `${amzBase}/s?k=${q}&tag=${amzTag}`
        : `${amzBase}/s?k=${q}`;

    case "flipkart":
      return cfg.flipkart.id
        ? `https://www.flipkart.com/search?q=${q}&affid=${cfg.flipkart.id}`
        : `https://www.flipkart.com/search?q=${q}`;

    case "ebay":
      return cfg.ebay.campaignId
        ? `https://www.ebay.com/sch/i.html?_nkw=${q}&campid=${cfg.ebay.campaignId}`
        : `https://www.ebay.com/sch/i.html?_nkw=${q}`;

    case "blinkit":
      return `https://blinkit.com/s/?q=${q}`;

    case "zepto":
      return `https://www.zeptonow.com/search?query=${q}`;

    case "myntra":
      return `https://www.myntra.com/${q.replace(/%20/g, "-")}`;

    case "meesho":
      return `https://www.meesho.com/search?q=${q}`;

    case "nykaa":
      return cfg.nykaa.id
        ? `https://www.nykaa.com/search/result/?q=${q}&ref=${cfg.nykaa.id}`
        : `https://www.nykaa.com/search/result/?q=${q}`;

    default:
      return "#";
  }
}
