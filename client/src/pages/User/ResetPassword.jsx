import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword, clearErrors } from "@/actions/userAction";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md w-full p-6">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
          <CardDescription className="text-lg">
            Enter a new password to reset your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={resetPasswordSubmit}>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-lg">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter a new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 text-lg"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="confirm-password" className="text-lg">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 text-lg"
              />
            </div>
            <Button type="submit" className="w-full p-3 text-lg">
              Reset Password
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-black-500 hover:underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;