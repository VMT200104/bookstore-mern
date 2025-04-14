import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { removeFromFavorite } from "@/actions/favoriteAction";
import { toast } from "sonner";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favoriteItems } = useSelector((state) => state.favorite);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorite(id));
    toast.success("Removed from favorites");
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-500 mb-6">You need to be logged in to view your favorites.</p>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Card>
      </div>
    );
  }

  if (favoriteItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Favorites is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any books to your favorites yet.</p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteItems.map((item) => (
          <Card key={item.product} className="p-4 hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain rounded-lg"
              />
              <button
                onClick={() => handleRemoveFavorite(item.product)}
                className="absolute top-4 right-4 bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow text-red-500"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold line-clamp-2">{item.name}</h3>
              <p className="text-xl font-bold mt-2">${item.price}</p>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {renderRating(item.ratings)}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({item.numOfReviews} Reviews)
                </span>
              </div>
              <Button
                onClick={() => navigate(`/product/${item.product}`)}
                className="w-full mt-4"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 