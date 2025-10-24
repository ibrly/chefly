import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.routes';
import { initializeSocketServer } from './socket';

dotenv.config({ path: '../../../.env' });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:8081',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT_CHAT || 3004;

app.use(express.json());

// HTTP routes (for message history)
app.use('/', chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'chat' });
});

// Initialize Socket.io
initializeSocketServer(io);

httpServer.listen(PORT, () => {
  console.log(`💬 Chat Service (HTTP + Socket.io) running on port ${PORT}`);
});

export default app;

