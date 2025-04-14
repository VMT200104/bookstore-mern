import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyUser } from "@/actions/userAction";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isVerified } = useSelector((state) => state.user);

  const activationToken = localStorage.getItem("activationToken");

  useEffect(() => {
    if (isVerified) {
      navigate("/login");
    }
    if (error) {
      alert(error);
    }
  }, [isVerified, error, navigate]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length === 6 && activationToken) {
      dispatch(verifyUser(Number(otp), activationToken));
    } else {
      alert("Invalid OTP. Please enter a 6-digit code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center">Verify Account</h2>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Enter the OTP sent to your email
          </p>

          <form className="space-y-6" onSubmit={handleVerify}>
            <div className="flex flex-col items-center">
              <Label htmlFor="otp">OTP</Label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="flex justify-center gap-2 mt-2"
              >
                <InputOTPGroup className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <InputOTPSlot key={i + 3} index={i + 3} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Go to {" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition-all"
            >
              Login
            </Link>{" "}
            page
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
