export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action, role_id, zone_id, vc } = req.body;

  try {
    if (action === 'send-vc') {
      // Send verification code
      const response = await fetch('https://mlbb.rone.dev/api/user/auth/send-vc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role_id: parseInt(role_id),
          zone_id: parseInt(zone_id),
        }),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } else if (action === 'login') {
      // Login with verification code
      const response = await fetch('https://mlbb.rone.dev/api/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role_id: parseInt(role_id),
          zone_id: parseInt(zone_id),
          vc: parseInt(vc),
        }),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } else if (action === 'get-info') {
      // Get user info
      const jwt = req.body.jwt;
      const response = await fetch('https://mlbb.rone.dev/api/user/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to process request' });
  }
}
