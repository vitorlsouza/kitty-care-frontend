const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51QFWycRvq7cJuaoz9IgfRsJl2ttVQyGbfiANw9ZMRhxxYieI1lt0sXu3OKP5ZW45p0MdhOJysZjfPn7Idr2h2hHZ00qGjJaJSk');
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
    const { amount, currency } = req.body;
    console.log({amount, currency});
    
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001')); 