import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/user.routes';
import chefRoutes from './routes/chef.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') }); // backend/.env, from src/ or dist/

const app = express();
const PORT = process.env.PORT_USER || 3002;

app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/chefs', chefRoutes);
app.use('/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user' });
});

app.listen(PORT, () => {
  console.log(`👤 User Service running on port ${PORT}`);
});

export default app;

