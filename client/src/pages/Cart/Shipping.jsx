import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom"; // Using useNavigate for React Router v6
import { toast } from "sonner"; // Import Sonner toast
import MetaData from "../layout/MetaData"; // Import MetaData component
import CheckoutSteps from "./CheckoutSteps"; // Import CheckoutSteps component

// Thư viện từ Shadcn UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

// Icon từ lucide-react
import { Home, Building, MapPin, Phone, Globe, ArrowRight } from "lucide-react";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
    toast.success("Shipping information saved successfully");
    navigate("/order/confirm");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <MetaData title="Shipping Details" />
      
      <div className="max-w-3xl mx-auto">
        <CheckoutSteps activeStep={0} />
        
        <Card className="w-full shadow-lg border-0 overflow-hidden mt-8">
          <CardHeader className="bg-primary/5 p-6 border-b">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center text-gray-700">
                    <Home className="inline-block mr-2 h-4 w-4 text-gray-500" /> 
                    Address
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center text-gray-700">
                    <Building className="inline-block mr-2 h-4 w-4 text-gray-500" /> 
                    City
                  </Label>
                  <Input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center text-gray-700">
                    <MapPin className="inline-block mr-2 h-4 w-4 text-gray-500" /> 
                    Pin Code
                  </Label>
                  <Input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center text-gray-700">
                    <Phone className="inline-block mr-2 h-4 w-4 text-gray-500" /> 
                    Phone Number
                  </Label>
                  <Input
                    type="number"
                    placeholder="10-digit phone"
                    required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be 10 digits</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center text-gray-700">
                    <Globe className="inline-block mr-2 h-4 w-4 text-gray-500" /> 
                    Country
                  </Label>
                  <Select 
                    value={country} 
                    onValueChange={(val) => setCountry(val)} 
                    required
                  >
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {Country.getAllCountries().map((c) => (
                        <SelectItem key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {country && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center text-gray-700">
                      <MapPin className="inline-block mr-2 h-4 w-4 text-gray-500" /> 
                      State
                    </Label>
                    <Select 
                      value={state} 
                      onValueChange={(val) => setState(val)} 
                      required
                    >
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {State.getStatesOfCountry(country).map((s) => (
                          <SelectItem key={s.isoCode} value={s.isoCode}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t mt-6">
                <Button 
                  type="submit" 
                  disabled={!state} 
                  className="w-full md:w-auto transition-all hover:shadow-md flex items-center justify-center gap-2"
                >
                  Continue to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-xs text-gray-500 mt-3">
                  By continuing, you agree to our terms and conditions for processing your order
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shipping;