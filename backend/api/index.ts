import express from 'express';
import cors from 'cors';
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

// CORS configuration - MUST be before other middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          'https://att-manageo.vercel.app',
          'https://att-manageo-git-main-abderazzakatt.vercel.app'
        ]
      : ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5173'];
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.includes(origin);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length'],
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Additional CORS headers for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? ['https://att-manageo.vercel.app', 'https://att-manageo-git-main-abderazzakatt.vercel.app']
    : ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5173'];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ATT Forms API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
   // environment: process.env.NODE_ENV || 'production',
    environment:'production',
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