import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/userAction";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, User } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter(Boolean);
    const filteredPathnames = pathnames.filter((path) => path !== "admin");

    const pathMap = {
      // Dashboard
      "dashboard": "Dashboard",
      // Products
      "products": "Products",
      "product": "Product",
      "new": "New Product",
      // Orders
      "orders": "Orders",
      "order": "Order Details",
      // Users
      "users": "Users",
      "reviews": "Reviews",
      // Profile
      "me": "Profile",
      "update": "Update",
      // Categories
      "categories": "Book Categories",
      // Stats
      "stats": "Statistics",
    };

    return filteredPathnames.map((pathname, index) => {
      const routeTo = `/admin/${filteredPathnames
        .slice(0, index + 1)
        .join("/")}`;
      
      // Get mapped name or format the pathname
      const name = pathMap[pathname] || 
        pathname
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      return {
        name,
        route: routeTo,
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Breadcrumbs */}
        <Breadcrumb className="flex items-center space-x-2 text-sm">
          <span
            className="font-medium text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => navigate("/admin/dashboard")}
          >
            Home
          </span>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <span className="text-gray-400">/</span>
              <span
                className="font-medium text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                onClick={() => navigate(breadcrumb.route)}
              >
                {breadcrumb.name}
              </span>
            </React.Fragment>
          ))}
        </Breadcrumb>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell className="text-gray-600" size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-3 focus:outline-none">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium hidden md:block">
                  Hi Tân
                </span>
                <div className="relative">
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-all"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white shadow-lg rounded-lg border border-gray-200 mt-2">
              <DropdownMenuItem className="p-2 hover:bg-gray-50">
                <a
                  href="/profile"
                  className="flex items-center w-full text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 hover:bg-gray-50">
                <a
                  onClick={handleLogout}
                  className="flex items-center w-full text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
