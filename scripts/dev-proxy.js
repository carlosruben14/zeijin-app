import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const MLBB_API = 'https://mlbb.rone.dev';

app.post('/mlbb', async (req, res) => {
  try {
    const { action, role_id, zone_id, vc, jwt } = req.body;
    let endpoint = '';
    let body = {};

    switch (action) {
      case 'send-vc':
        endpoint = '/api/user/auth/send-vc';
        body = { role_id, zone_id };
        break;
      case 'login':
        endpoint = '/api/user/auth/login';
        body = { role_id, zone_id, vc };
        break;
      case 'get-info':
        endpoint = '/api/user/info';
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    const response = await fetch(`${MLBB_API}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
      body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Dev proxy server running on http://localhost:3001');
});
