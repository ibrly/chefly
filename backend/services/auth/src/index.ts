import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config({ path: '../../../.env' });

const app = express();
const PORT = process.env.PORT_AUTH || 3001;

app.use(express.json());

// Routes
app.use('/', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth' });
});

app.listen(PORT, () => {
  console.log(`🔐 Auth Service running on port ${PORT}`);
});

export default app;

