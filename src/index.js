import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import './server/server.js';

//router pages
import BlogRouter from './routes/BlogRouter.js';
import UserRouter from './routes/UserRouter.js';
import ProductRouter from './routes/ProductRouter.js';
import DogsRouter from './routes/DogsRouter.js';
import AdminUser from './routes/Admin/api/AdminRouter.js';
import CartRouter from './routes/CartRouter.js';
import Payment from './routes/payment.js';

dotenv.config();

//express function
const app = express();

//port
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);

// router routes
app.use(UserRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(DogsRouter);
app.use(AdminUser);
app.use(BlogRouter);
app.use(Payment);

//checkout session
// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// start the server
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
