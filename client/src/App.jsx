import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import Verify from "./pages/Auth/Verify";
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import UpdatePassword from "./pages/User/UpdatePassword";
import ProtectedRoute from "./pages/Route/ProtectedRoute";
import { loadUser } from "./actions/userAction";
import ProfileCard from "./pages/User/Profile";
import WebFont from "webfontloader";
import DashBoard from "./pages/Admin/DashBoard";
import UpdateProfile from "./pages/User/UpdateProfile";
import UsersList from "./pages/Admin/UsersList";
import UpdateUser from "./pages/Admin/UpdateUser";
import ProductList from "./pages/Admin/ProductList";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import NewProduct from "./pages/Admin/NewProduct";
import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Product/Products";
import ProductDetails from "./pages/Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Payment from "./pages/Cart/Payment";
import OrderSuccess from "./pages/Cart/OrderSuccess";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import MyOrders from "./pages/Order/MyOrders";
import OrderDetails from "./pages/Order/OrderDetails";
import OrderList from "./pages/Admin/OrderList";
import ProcessOrder from "./pages/Admin/ProcessOrder";
import ProductReviews from "./pages/Admin/ProductReviews";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const isAdminRoute = isAuthenticated && user?.role === "admin";

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
    }

    getStripeApiKey();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className={`${!isAdminRoute ? "pt-16" : ""} flex-grow`}>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/account" element={<ProfileCard />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            {stripeApiKey && (
              <Route
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/users/:id" element={<UpdateUser />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/:id" element={<UpdateProduct />} />
            <Route path="/admin/products/new" element={<NewProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
