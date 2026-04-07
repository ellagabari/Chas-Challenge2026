import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Håll Sverige Rent API is running! 🌍✨');
});

// Test route to check if .env is working
app.get('/config-test', (req: Request, res: Response) => {
  res.json({
    port: PORT,
    db_connected: !!process.env.DATABASE_URL
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});