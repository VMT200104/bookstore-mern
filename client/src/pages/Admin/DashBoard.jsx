import React, { useEffect } from "react";
import { ShoppingCart, Box, Users, Star } from "lucide-react";
import Chart from "../../components/ui/barChart";
import AdminLayout from "./AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "@/actions/productAction";
import { getAllOrders } from "@/actions/orderAction";
import { getAllUsers } from "@/actions/userAction";
import PieChartComponent from "@/components/ui/pieChart";

const DashBoard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect (() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    // Calculate total value of all products (price * stock)
    let initialAmount = 0;
    products &&
      products.forEach((item) => {
        initialAmount += item.price * item.Stock;
      });

    const lineState = [
      {
        name: "Product Value",
        "Initial Amount": initialAmount,
        "Amount Earned": 0
      },
      {
        name: "Total Revenue",
        "Initial Amount": initialAmount,
        "Amount Earned": totalAmount
      }
    ];

  const stockData = [
    { name: "Out of Stock", value: outOfStock || 0 },
    { name: "In Stock", value: (products?.length || 0) - (outOfStock || 0) }
  ];

  return (
    <AdminLayout title="Dashboard - Admin Panel">
      {/* Stats Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Review Product */}
        <div className="flex flex-col bg-white text-black rounded-xl shadow-sm p-6 hover:shadow-md transform hover:scale-105 transition-all">
          <div className="flex items-center space-x-2">
            <Star className="text-3xl text-blue-600" />
            <h4 className="text-gray-800 font-medium">Review Product</h4>
          </div>
          <h2 className="text-3xl font-semibold">{products?.reduce((acc, product) => acc + (product.reviews?.length || 0), 0) || 0}</h2>
        </div>

        {/* Total Orders */}
        <div className="flex flex-col bg-white text-black rounded-xl shadow-sm p-6 hover:shadow-md transform hover:scale-105 transition-all">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="text-3xl text-green-600" />
            <h4 className="text-gray-800 font-medium">Total Orders</h4>
          </div>
          <h2 className="text-3xl font-semibold">{orders?.length || 0}</h2>
        </div>

        {/* Total Products */}
        <div className="flex flex-col bg-white text-black rounded-xl shadow-sm p-6 hover:shadow-md transform hover:scale-105 transition-all">
          <div className="flex items-center space-x-2">
            <Box className="text-3xl text-yellow-500" />
            <h4 className="text-gray-800 font-medium">Total Products</h4>
          </div>
          <h2 className="text-3xl font-semibold">{products?.length || 0}</h2>
        </div>

        {/* Total Users */}
        <div className="flex flex-col bg-white text-black rounded-xl shadow-sm p-6 hover:shadow-md transform hover:scale-105 transition-all">
          <div className="flex items-center space-x-2">
            <Users className="text-3xl text-purple-600" />
            <h4 className="text-gray-800 font-medium">Total Users</h4>
          </div>
          <h2 className="text-3xl font-semibold">{users?.length || 0}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="col-span-1 h-full">
          <Chart data={lineState} />
        </div>
        <div className="col-span-1 h-full">
          <PieChartComponent data={stockData} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashBoard;
