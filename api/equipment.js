export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Proxy request to MLBB API
    const response = await fetch('https://mlbb-wiki-api.vercel.app/api/equipment', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `MLBB API returned status ${response.status}`,
        status: response.status
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Equipment API error:', error);
    res.status(500).json({
      error: 'Failed to fetch equipment data',
      message: error.message
    });
  }
}
