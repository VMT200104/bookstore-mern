import React from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <MetaData title="Order Success" />
      
      <div className="max-w-3xl mx-auto">
        <Card className="w-full shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-primary/5 p-6 border-b text-center">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Order Placed Successfully!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 text-center space-y-6">
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button asChild className="flex items-center gap-2">
                <Link to="/orders">
                  <ShoppingBag className="h-4 w-4" />
                  View My Orders
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
