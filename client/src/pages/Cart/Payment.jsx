import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, Key } from "lucide-react";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { clearCart } from "../../actions/cartAction";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import axiosInstance from "@/utils/axiosConfig";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const { data } = await axiosInstance.post(
        "/api/payment/process",
        paymentData,
      );

      console.log("data", data);

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          dispatch(clearCart());
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      const errorMsg = error?.response?.data?.message || error.message || "Payment failed";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (!orderInfo) {
      navigate("/cart");
    }

    if (!user || !user._id) {
      toast.error("Please log in to continue with payment");
      navigate("/login");
    }
  }, [orderInfo, navigate, user]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutSteps activeStep={2} />
        <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 mt-8">
          <Card className="w-full max-w-md p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Card Info</h2>
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <div className="border rounded-lg p-3 pl-12">
                    <CardNumberElement className="w-full" />
                  </div>
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <div className="border rounded-lg p-3 pl-12">
                    <CardExpiryElement className="w-full" />
                  </div>
                </div>

                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <div className="border rounded-lg p-3 pl-12">
                    <CardCvcElement className="w-full" />
                  </div>
                </div>
              </div>

              <Button
                ref={payBtn}
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Pay - ${orderInfo && orderInfo.totalPrice}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;