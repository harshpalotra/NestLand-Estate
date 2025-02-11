import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js';
import cookieParser from "cookie-parser";
import listingRouter from './Routes/listing.router.js';
import path from 'path';
import inherits from 'inherits';
global.inherits = inherits;
import cors from 'cors';
import helmet from 'helmet';
dotenv.config();


// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log('Error connecting to MongoDB:', err.message);
});

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: 'https://nestland-estate.onrender.com', credentials: true }));


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter)
app.use('/api/listing',listingRouter)




app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// To manage error we making err middleware 
app.use((err, req, res, next) =>{
const statusCode = err.statusCode || 500;
const message = err.message || 'Internal server Error';
return res.status(statusCode).json({
  success: false,
  statusCode,
  message
});
});
