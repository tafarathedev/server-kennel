import cors from 'cors'
import  stripe from 'stripe'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()
stripe(process.env.STRIPE_SECRET_KEY);

    router.post("/payments",cors(), async (req, res) => {
      const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "zmw"
      };
     try {
        const pay = await stripe.charges.create(body);

            res.status(200).send({ success: pay });
          
     } catch (error) {
        res.status(500).send({ error: error.message });
          
     }
  });
  
  router.get("/payments",cors(), (req, res) => {
 try {
    res.send({
        message: "Hello Stripe checkout server!",
        timestamp: new Date().toISOString()
      });
 } catch (error) {
   console.log(error.message)  
 }
})
 

  export default router