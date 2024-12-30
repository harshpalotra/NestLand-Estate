import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/user.route.js';
import authRouter from './Routes/auth.route.js';
import cookieParser from "cookie-parser";
dotenv.config();


// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log('Error connecting to MongoDB:', err.message);
});

const app = express();
app.use(cookieParser());
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter)

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