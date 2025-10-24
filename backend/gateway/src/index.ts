import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT_GATEWAY || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8081',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Chefly API Gateway',
    version: '1.0.0',
    services: [
      { name: 'Auth', path: '/auth', description: 'Authentication and user management' },
      { name: 'Users', path: '/users', description: 'User profiles and chef management' },
      { name: 'Bookings', path: '/bookings', description: 'Booking system' },
      { name: 'Chat', path: '/chat', description: 'Real-time messaging' },
      { name: 'Payments', path: '/payments', description: 'Payment processing' },
      { name: 'Notifications', path: '/notifications', description: 'Push notifications' },
    ],
    docs: '/health',
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gateway', timestamp: new Date().toISOString() });
});

// Service routes with proxy
const services = [
  { path: '/auth', target: `http://localhost:${process.env.PORT_AUTH || 3001}` },
  { path: '/users', target: `http://localhost:${process.env.PORT_USER || 3002}` },
  { path: '/bookings', target: `http://localhost:${process.env.PORT_BOOKING || 3003}` },
  { path: '/chat', target: `http://localhost:${process.env.PORT_CHAT || 3004}` },
  { path: '/payments', target: `http://localhost:${process.env.PORT_PAYMENT || 3005}` },
  { path: '/notifications', target: `http://localhost:${process.env.PORT_NOTIFICATION || 3006}` },
];

services.forEach(({ path, target }) => {
  app.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${path}`]: '',
      },
      onError: (err, req, res) => {
        console.error(`Proxy error for ${path}:`, err.message);
        res.status(503).json({
          success: false,
          error: 'Service temporarily unavailable',
          service: path,
        });
      },
    })
  );
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Gateway error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚪 Gateway running on port ${PORT}`);
  console.log(`📡 Proxying to services:`, services.map(s => s.path).join(', '));
});

