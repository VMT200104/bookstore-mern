import TryCatch from "../middleware/TryCatch.js";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config({ path: "./config/.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = TryCatch(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "USD",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = TryCatch(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY });
});
