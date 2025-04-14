import React, { useEffect, Fragment } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  BookmarkIcon, 
  ShoppingCart, 
  Heart, 
  Pencil, 
  BookIcon,
  TrendingUp,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/ui/loader";
import MetaData from "@/pages/layout/MetaData";
import { logout } from "@/actions/userAction";
import { toast } from "sonner";

const ProfileCard = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock data for reading statistics - In a real app, this would come from the backend
  const readingStats = {
    booksRead: 12,
    currentlyReading: 2,
    wishlist: 5,
    favoriteGenres: ["Fiction", "Mystery", "Science"],
    readingGoal: 24,
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
            <Card className="w-full max-w-6xl p-8 bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row gap-8">
              {/* Left Panel */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-10 rounded-3xl flex flex-col items-center justify-between w-full lg:w-1/3 shadow-lg relative">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-xl transition-transform transform hover:scale-105">
                      <AvatarImage src={user.avatar.url} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <button
                      className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
                      onClick={() => navigate("/me/update")}
                    >
                      <Pencil className="text-gray-700" size={18} />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold tracking-wide text-center">{user.name}</h2>
                  <p className="text-sm opacity-90 mt-1">{user?.role || "Reader"}</p>
                </div>

                <div className="w-full space-y-4 mt-8">
                  <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-medium transition flex items-center gap-2"
                    onClick={() => navigate("/orders")}
                  >
                    <ShoppingCart size={18} />
                    My Orders
                  </Button>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-medium transition flex items-center gap-2"
                    onClick={() => navigate("/wishlist")}
                  >
                    <Heart size={18} />
                    Wishlist
                  </Button>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-medium transition flex items-center gap-2"
                    onClick={() => navigate("/currently-reading")}
                  >
                    <BookOpen size={18} />
                    Currently Reading
                  </Button>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-medium transition flex items-center gap-2"
                    onClick={() => navigate("/password/update")}
                  >
                    <BookmarkIcon size={18} />
                    Update Password
                  </Button>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-medium transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>

              {/* Right Panel */}
              <CardContent className="w-full lg:w-2/3 p-6 flex flex-col justify-between space-y-6">
                {/* User Information */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    Reader Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600">Full Name</h4>
                      <p className="text-gray-700">{user.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600">Email</h4>
                      <p className="text-gray-700">{user?.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600">Member Since</h4>
                      <p className="text-gray-700">{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600">Reading Goal</h4>
                      <p className="text-gray-700">{readingStats.readingGoal} books this year</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Reading Statistics */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Reading Statistics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                      <BookIcon className="text-blue-600" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Books Read</p>
                        <p className="text-lg font-semibold text-gray-800">{readingStats.booksRead}</p>
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg flex items-center gap-3">
                      <TrendingUp className="text-indigo-600" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Currently Reading</p>
                        <p className="text-lg font-semibold text-gray-800">{readingStats.currentlyReading}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                      <Star className="text-blue-600" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Wishlist</p>
                        <p className="text-lg font-semibold text-gray-800">{readingStats.wishlist}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reading Preferences */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Favorite Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {readingStats.favoriteGenres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfileCard;
