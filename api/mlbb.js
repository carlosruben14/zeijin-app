export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { endpoint, data } = req.body;

  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint required' });
  }

  try {
    const response = await fetch(`https://mlbb.rone.dev/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    
    // Try to parse as JSON
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse MLBB response:', text);
      return res.status(response.status).json({ 
        code: -1, 
        message: text || 'Invalid response from MLBB API' 
      });
    }

    return res.status(response.status).json(result);
  } catch (error) {
    console.error('MLBB API Error:', error);
    return res.status(500).json({ 
      code: -1, 
      error: error.message,
      message: 'Proxy error: ' + error.message 
    });
  }
}
