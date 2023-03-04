import express from  'express'
//use express router  
const router = express.Router()
import Stripe from 'stripe'


//stripe here \
const stripePromise  = new Stripe("sk_test_51JRZ0KH8R1pU2TcbKCj97mQuZ8tZcAoerac8RMAg37KSJDx7EDeAq91O76WBDd5qwLqoEziOa2V6bzMTUdJy90cp00mSWQsN3C"); 
const stripe = await stripePromise;
router.post('/api/checkout', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { name ,amount, quantity,description, successUrl, cancelUrl } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card','alipay', 'wechat'],
      line_items: [
        { 
          name,
          description,  
          amount,
          currency:'ZMW',
          quantity,
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


export default router


/* import express from 'express';
import Stripe from 'stripe';

// Use express router
const router = express.Router();

// Stripe setup
const stripe = new Stripe('sk_test_51JRZ0KH8R1pU2TcbKCj97mQuZ8tZcAoerac8RMAg37KSJDx7EDeAq91O76WBDd5qwLqoEziOa2V6bzMTUdJy90cp00mSWQsN3C');

// Checkout endpoint
router.post('/api/checkout', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const {
    name,
    amount,
    currency,
    paymentMethodTypes,
    quantity,
    description,
    successUrl,
    cancelUrl,
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: [
        {
          name,
          description,
          amount,
          currency,
          quantity,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

export default router;
 */