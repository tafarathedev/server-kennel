const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

require('./server/server.js');

//router pages
const BlogRouter = require('./routes/BlogRouter.js');
const UserRouter = require('./routes/UserRouter.js');
const ProductRouter = require('./routes/ProductRouter.js');
const DogsRouter = require('./routes/DogsRouter.js');
const AdminUser = require('./routes/Admin/api/AdminRouter.js');
const CartRouter = require('./routes/CartRouter.js');
const Page = require('./routes/Admin/Pages.js')


dotenv.config();
//express function
const app = express();

//port
const port = process.env.PORT;
const viewsDirectory = path.join(__dirname, '../templates/views');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(express.static('static'));
app.set('views', viewsDirectory);
// Set the partials directory
app.set('partials', __dirname + '../templates/partials');
app.set('view engine', 'ejs');

// router routes
app.use(UserRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(DogsRouter);
app.use(AdminUser);
app.use(BlogRouter);
app.use(Page)


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
