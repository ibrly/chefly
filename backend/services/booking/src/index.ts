import express from 'express';
import dotenv from 'dotenv';
import bookingRoutes from './routes/booking.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config({ path: '../../../.env' });

const app = express();
const PORT = process.env.PORT_BOOKING || 3003;

app.use(express.json());

// Routes
app.use('/', bookingRoutes);
app.use('/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'booking' });
});

app.listen(PORT, () => {
  console.log(`📅 Booking Service running on port ${PORT}`);
});

export default app;

