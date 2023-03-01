import express from 'express'
import Stripe from 'stripe'
const  router = express.Router()


//stripe here \
const stripePromise  = new Stripe("sk_test_51JRZ0KH8R1pU2TcbKCj97mQuZ8tZcAoerac8RMAg37KSJDx7EDeAq91O76WBDd5qwLqoEziOa2V6bzMTUdJy90cp00mSWQsN3C"); 
const stripe = await stripePromise;
router.post('/api/checkout', async (req, res) => {
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