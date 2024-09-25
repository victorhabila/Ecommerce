const express = require("express");
const stripe = require("stripe")(
  "sk_test_51Q1YHuLRSLUIttA5SbafhXwmEJxavm6hPAZQcvwcalTLqfMe2BEWaZer6RPb2CqBEaKFBLoNbjMVoRssnGWXehHI00iyfjyHPq"
);
const router = express.Router();

//payment intent route

router.post("/intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "EUR",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
