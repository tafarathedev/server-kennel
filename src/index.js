import express from 'express'
import cors from  'cors'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import stripe from 'stripe'
stripe(process.env.STRIPE_SECRET_KEY); 
import './server/server.js'
//router pages
import UserRouter from './routes/UserRouter.js'
import ProductRouter from './routes/ProductRouter.js'
import DogsRouter from './routes/DogsRouter.js'
import AdminUser from './routes/Admin/api/AdminRouter.js'
import CartRouter from './routes/CartRouter.js'

import BlogRouter from './routes/BlogRouter.js'



//express function
const app = express() 
//port 
const port = process.env.PORT 
 //middlewares
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* 
const whiteList= ['http://localhost:3000/', 'https://master--ubiquitous-granita-bcef3d.netlify.app/'] */

/* const corsOptions = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error())
      }
    }
  } */
app.use(cors({
      origin:'*',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))






// router routes
app.use(UserRouter)
app.use(ProductRouter)
app.use(CartRouter)
app.use(DogsRouter)
app.use(AdminUser)
app.use(BlogRouter)
//checkout session
//stripe here \
app.post('/create-payment-intent', async (req, res) => {
  const { amount, name, email, address1, address2, city, state, postalCode, country } = req.body;


  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'zmw',
    billing_details: {
      name: name,
      email: email,
      address: {
        line1: address1,
        line2: address2,
        city: city,
        state: state,
        postal_code: postalCode,
        country: country,
      },
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});





app.listen(port, ()=>console.log('listening on '+port))