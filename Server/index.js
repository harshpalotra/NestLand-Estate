import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import userRouter from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js';
import listingRouter from './Routes/listing.router.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
