import express from "express";
import { isAuth } from "../middleware/auth.js";
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payment/process", isAuth, processPayment);
router.get("/stripeapikey", sendStripeApiKey);

export default router;
