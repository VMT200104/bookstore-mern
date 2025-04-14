import Loader from "@/components/ui/loader";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false }) => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;