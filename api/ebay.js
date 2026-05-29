export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });
  const clientId = process.env.EBAY_CLIENT_ID;
  const clientSecret = process.env.EBAY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return res.status(500).json({ error: 'Missing eBay credentials' });
  try {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenRes = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Basic ${authString}` },
      body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
    });
    const tokenData = await tokenRes.json();
    const searchRes = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=4`, {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}`, 'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US' }
    });
    const searchData = await searchRes.json();
    const items = (searchData.itemSummaries || []).map(item => ({
      pl: 'ebay', nm: item.title, price: parseFloat(item.price?.value) || null,
      currency: item.price?.currency, img: item.image?.imageUrl,
      url: item.itemWebUrl, condition: item.condition, del: '5-7 days', live: true
    }));
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
}
