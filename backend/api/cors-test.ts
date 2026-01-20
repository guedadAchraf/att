import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://att-manageo.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle actual request
  if (req.method === 'POST') {
    return res.json({
      message: 'CORS test successful',
      method: req.method,
      body: req.body,
      timestamp: new Date().toISOString()
    });
  }

  return res.json({
    message: 'CORS test endpoint',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}