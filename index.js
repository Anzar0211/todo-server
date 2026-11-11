import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo')
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('API ready')))
  .catch((e) => { console.error(e.message); process.exit(1); });
