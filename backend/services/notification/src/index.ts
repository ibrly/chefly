import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import notificationRoutes from './routes/notification.routes';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') }); // backend/.env, from src/ or dist/

const app = express();
const PORT = process.env.PORT_NOTIFICATION || 3006;

app.use(express.json());

// Routes
app.use('/', notificationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification' });
});

app.listen(PORT, () => {
  console.log(`🔔 Notification Service running on port ${PORT}`);
});

export default app;

