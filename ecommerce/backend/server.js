import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
import {connectDB} from './config/db.js';
import productRoutes from './routes/products.js';
import paymentRoutes from './routes/payment.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
