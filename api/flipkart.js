import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });
  
  try {
    const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    
    // Flipkart blocks serverless IPs heavily. Use proxy if available.
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
       return res.status(200).json([]);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const items = [];

    // Flipkart's standard vertical layout cards
    $('div[data-id]').each((i, el) => {
      if (items.length >= 4) return;
      
      let title = $(el).find('div._4rR01T').text().trim() || $(el).find('a.IRpwTa').text().trim() || $(el).find('a.s1Q9rs').text().trim();
      let priceText = $(el).find('div._30jeq3').first().text().replace(/[₹,]/g, '');
      const price = parseInt(priceText, 10);
      const img = $(el).find('img._396cs4').attr('src') || $(el).find('img').attr('src');
      let link = $(el).find('a').attr('href');
      
      if (link && !link.startsWith('http')) {
        link = 'https://www.flipkart.com' + link;
      }
      
      if (title && price) {
        items.push({
          pl: 'flipkart',
          nm: title,
          p: price,
          currency: 'INR',
          img: img,
          url: link,
          del: '2-4 days',
          live: true
        });
      }
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
