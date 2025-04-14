import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, ShoppingBag, CreditCard } from "lucide-react";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <MetaData title="Confirm Order" />
      
      <div className="max-w-3xl mx-auto">
        <CheckoutSteps activeStep={1} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Shipping Info and Cart Items */}
          <div className="space-y-8">
            {/* Shipping Info Card */}
            <Card className="w-full shadow-lg border-0 overflow-hidden">
              <CardHeader className="bg-primary/5 p-6 border-b">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{shippingInfo.phoneNo}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items Card */}
            <Card className="w-full shadow-lg border-0 overflow-hidden">
              <CardHeader className="bg-primary/5 p-6 border-b">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                  Your Cart Items
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {cartItems && cartItems.map((item) => (
                    <div key={item.product} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.product}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">
                            {item.quantity} x ${item.price}
                          </Badge>
                          <span className="font-semibold">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="w-full shadow-lg border-0 overflow-hidden sticky top-8">
              <CardHeader className="bg-primary/5 p-6 border-b">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Charges</span>
                    <span className="font-medium">${shippingCharges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">${tax}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">${totalPrice}</span>
                </div>
                
                <Button 
                  onClick={proceedToPayment}
                  className="w-full mt-4 transition-all hover:shadow-md"
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
