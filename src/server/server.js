import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import express from 'express'
import helmet from 'helmet';

dotenv.config();

const app = express()
// Validate MongoDB connection string
if (!process.env.MONGODB_URI || !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
  console.error('Invalid MongoDB connection string.');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Implement rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Validate input data
app.use(helmet());

export default mongoose;
