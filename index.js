const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 6001;
require('dotenv').config();
const dbConnect = require('./config/dbConnect');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());

// jwt authentications
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr'
  });
  res.send({ token });
});

// import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const paymentRoutes = require('./api/routes/paymentRoutes');

dbConnect();

app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use("/users", userRoutes);
app.use("/payments",paymentRoutes)

// stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { price, customer } = req.body;
  const amount = price * 100;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      description: "Payment for order in your application",
      payment_method_types: ["card"],
      shipping: {
        name: customer.name,
        address: {
          line1: customer.address.line1,
          line2: customer.address.line2,
          city: customer.address.city,
          state: customer.address.state,
          postal_code: customer.address.postal_code,
          country: customer.address.country,
        },
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
