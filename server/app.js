const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PyczFLgFSikZxwjjilfAawpMDfL3lv1SX8KznqEkFLxFk03RZw9V2xobZSwtDBVKZDM3XOtm5pmOm8ezC4DUnGb00EB7iNc3A');
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['POST', 'GET', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

// Enable CORS and JSON parsing
app.use(cors(corsOptions));
app.use(express.json());

app.post('/clientsecret', async (req, res) => {
  try {
    const {name, email, paymentMethodId, priceId, trial_end } = req.body;

    console.log(name, paymentMethodId, priceId);
    

    // Create a new customer
    const customer = await stripe.customers.create({
      name,
      email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_end: trial_end,
    });

    // Return the client secret for the payment
    const invoice = subscription.latest_invoice;
    res.json({ invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001')); 