import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${nodeEnv}` });
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo')
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`API ready (${nodeEnv}) on http://localhost:${port}`);
      console.log(`CORS origin: ${process.env.CLIENT_URL || '(any)'}`);
    });
  })
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
