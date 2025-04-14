import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutDashboard, Box, PlusCircle, ShoppingCart, Users, Star, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    // Exact match for specific routes
    if (path === 'dashboard') {
      return location.pathname === '/admin/dashboard';
    }
    if (path === 'products') {
      return location.pathname === '/admin/products';
    }
    if (path === 'new') {
      return location.pathname === '/admin/products/new';
    }
    // For other routes, use includes
    return location.pathname.includes(path);
  };

  return (
    <Card className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between shadow-xl">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          <Link to="/admin/dashboard">
            <Button 
              variant="ghost" 
              className={`w-full justify-start transition-all duration-200 ${
                isActive('dashboard') ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700'
              }`}
            >
              <LayoutDashboard className="mr-2" /> Dashboard
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button 
              variant="ghost" 
              className={`w-full justify-start transition-all duration-200 ${
                isActive('products') ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700'
              }`}
            >
              <Box className="mr-2" /> All Products
            </Button>
          </Link>
          <Link to="/admin/products/new">
            <Button 
              variant="ghost" 
              className={`w-full justify-start transition-all duration-200 ${
                isActive('new') ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700'
              }`}
            >
              <PlusCircle className="mr-2" /> Create Product
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button 
              variant="ghost" 
              className={`w-full justify-start transition-all duration-200 ${
                isActive('orders') ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700'
              }`}
            >
              <ShoppingCart className="mr-2" /> Orders
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button 
              variant="ghost" 
              className={`w-full justify-start transition-all duration-200 ${
                isActive('users') ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700'
              }`}
            >
              <Users className="mr-2" /> Users
            </Button>
          </Link>
          <Link to="/admin/reviews">
            <Button 
              variant="ghost" 
              className={`w-full justify-start transition-all duration-200 ${
                isActive('reviews') ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700'
              }`}
            >
              <Star className="mr-2" /> Reviews
            </Button>
          </Link>
        </nav>
      </div>
    </Card>
  );
};

export default Sidebar;