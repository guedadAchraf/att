import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Routes
import authRoutes from '../src/routes/auth';
import userRoutes from '../src/routes/users';
import formRoutes from '../src/routes/forms';
import excelRoutes from '../src/routes/excel';
import testRoutes from '../src/routes/test';

// Middleware
import { errorHandler } from '../src/middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));

// CORS middleware - simplified to work with Vercel headers
app.use((req, res, next) => {
  // Set CORS headers explicitly (Vercel headers might not work for all cases)
  res.header('Access-Control-Allow-Origin', 'https://att-manageo.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ATT Forms API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: 'production',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      forms: '/api/forms',
      excel: '/api/excel',
      test: '/api/test'
    }
  });
});

// Health check - MUST come before other routes
app.get('/api/health', (req, res) => {
  const origin = req.headers.origin || 'no-origin';
  const allowOriginHeader = res.getHeader('Access-Control-Allow-Origin') || 'not-set';
  const allowCredentialsHeader = res.getHeader('Access-Control-Allow-Credentials') || 'not-set';
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DATABASE_URL ? 'Connected' : 'Not configured',
    cors: 'Enabled',
    version: '1.0.0',
    origin: origin,
    headers: {
      'access-control-allow-origin': allowOriginHeader,
      'access-control-allow-credentials': allowCredentialsHeader
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  const origin = req.headers.origin || 'no-origin';
  const allowOriginHeader = res.getHeader('Access-Control-Allow-Origin') || 'not-set';
  
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    status: 'OK',
    cors: {
      origin: origin,
      method: req.method,
      allowedOrigin: allowOriginHeader
    }
  });
});

// CORS test endpoint
app.post('/api/cors-test', (req, res) => {
  const origin = req.headers.origin || 'no-origin';
  
  res.json({
    message: 'CORS POST test successful',
    timestamp: new Date().toISOString(),
    origin: origin,
    body: req.body
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/test', testRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      '/',
      '/api/health',
      '/api/auth/*',
      '/api/users/*',
      '/api/forms/*',
      '/api/excel/*',
      '/api/test/*'
    ]
  });
});

export default app;