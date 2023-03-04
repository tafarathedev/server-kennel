import express from  'express'
//use express router  
const router = express.Router()
import Stripe from 'stripe'


//stripe here \
const stripePromise  = new Stripe("sk_test51JRZ0KH8R1pU2TcbKCj97mQuZ8tZcAoerac8RMAg37KSJDx7EDeAq91O76WBDd5qwLqoEziOa2V6bzMTUdJy90cp00mSWQsN3C"); 
const stripe = await stripePromise;




router.post('/create-checkout-session', async (req, res) => {
  const {products , cancelUrl , successUrl} = req.body;

  const lineItems = products.map(product => {
    return {
      price_data: {
        currency: 'ZMW',
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  res.json({ id: session.id });
});



export default router