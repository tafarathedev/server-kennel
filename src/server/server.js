import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
  process.exit(1); // Exit the Node.js process with a non-zero exit code
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

export default mongoose;
