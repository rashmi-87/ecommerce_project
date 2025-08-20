import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './config/db.js';
import productRoutes from './routes/products.js';
import paymentRoutes from './routes/payment.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
