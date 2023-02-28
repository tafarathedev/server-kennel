import express from 'express'
import cors from  'cors'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import stripe from 'stripe'

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
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

app.post('/api/checkout', async (req, res) => {
  const { name ,amount, currency, paymentMethodTypes, quantity,description, successUrl, cancelUrl } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types:paymentMethodTypes,
      line_items: [
        {
          name,
          description,
          amount,
          currency,
          quantity
        }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl
    });

    res.json({ sessionId: session.id });
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});




app.listen(port, ()=>console.log('listening on '+port))