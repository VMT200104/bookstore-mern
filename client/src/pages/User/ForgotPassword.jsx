import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import MetaData from "../layout/MetaData";
import { forgotPassword, clearErrors } from "@/actions/userAction";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <MetaData title="Forgot Password" />
          <div className="p-4 rounded-md">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>
          <form
            className="space-y-6 p-4 rounded-md"
            onSubmit={forgotPasswordSubmit}
          >
            <div className="p-4 rounded-md">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 flex items-center justify-center rounded-md ${
                loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              } text-white`}
            >
              {loading ? (
                <Loader size="small" color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <div className="flex justify-center p-2 rounded-md">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
