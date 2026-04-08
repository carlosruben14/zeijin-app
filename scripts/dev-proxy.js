// Simple local proxy for MLBB API during development
// Run with: node scripts/dev-proxy.js
// Then test with localhost:3001/mlbb

import http from 'http';
import https from 'https';
import { URL } from 'url';

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/mlbb') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { endpoint, data } = JSON.parse(body);

        if (!endpoint) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Endpoint required' }));
          return;
        }

        // Forward to MLBB API
        const options = {
          hostname: 'mlbb.rone.dev',
          path: `/api/${endpoint}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(data)),
          },
        };

        const proxyReq = https.request(options, (proxyRes) => {
          let responseData = '';

          proxyRes.on('data', (chunk) => {
            responseData += chunk.toString();
          });

          proxyRes.on('end', () => {
            res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
            res.end(responseData);
          });
        });

        proxyReq.on('error', (error) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        });

        proxyReq.write(JSON.stringify(data));
        proxyReq.end();
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Dev proxy running on http://localhost:${PORT}`);
  console.log(`📡 Proxying MLBB API requests to https://mlbb.rone.dev`);
  console.log(`\nUpdate your frontend to call http://localhost:${PORT}/mlbb in development`);
});

