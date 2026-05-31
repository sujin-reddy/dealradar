import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });
  
  try {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    
    // Amazon heavily blocks serverless IPs. Without a proxy, this might return 503 on Vercel.
    const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY; 
    let fetchUrl = url;
    if (SCRAPER_API_KEY) {
      fetchUrl = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(url)}`;
    }

    const response = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
       // If blocked, just return empty array instead of failing the whole page
       return res.status(200).json([]);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const items = [];

    // Parse Amazon search results
    $('div[data-component-type="s-search-result"]').each((i, el) => {
      if (items.length >= 4) return;
      
      const title = $(el).find('h2 a span').text().trim();
      let priceText = $(el).find('.a-price-whole').first().text().replace(/[,.]/g, '');
      const price = parseInt(priceText, 10);
      const img = $(el).find('img.s-image').attr('src');
      let link = $(el).find('h2 a').attr('href');
      
      if (link && !link.startsWith('http')) {
        link = 'https://www.amazon.in' + link;
      }
      
      if (title && price) {
        items.push({
          pl: 'amz',
          nm: title,
          p: price,
          currency: 'INR',
          img: img,
          url: link,
          del: '1-2 days',
          live: true
        });
      }
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
