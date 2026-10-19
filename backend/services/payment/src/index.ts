import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import paymentRoutes from './routes/payment.routes';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') }); // backend/.env, from src/ or dist/

const app = express();
const PORT = process.env.PORT_PAYMENT || 3005;

app.use(express.json());

// Routes
app.use('/', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'payment' });
});

app.listen(PORT, () => {
  console.log(`💳 Payment Service running on port ${PORT}`);
});

export default app;

