import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from "@/actions/favoriteAction";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { favoriteItems } = useSelector((state) => state.favorite);
  const { isAuthenticated } = useSelector((state) => state.user);

  const isFavorite = favoriteItems.some((item) => item.product === product._id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add to favorites");
      return;
    }
    if (isFavorite) {
      dispatch(removeFromFavorite(product._id));
      toast.success("Removed from favorites");
    } else {
      dispatch(addToFavorite(product._id));
      toast.success("Added to favorites");
    }
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

  return (
    <Link to={`/product/${product._id}`} className="productCard h-full">
      <Card className="hover:shadow-lg transition-shadow border rounded-lg overflow-hidden bg-white group relative w-full h-full flex flex-col max-w-[280px]">
        <div className="relative p-3 flex-shrink-0">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-48 object-contain rounded-lg"
          />
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              isFavorite ? "text-red-500" : "text-gray-500 hover:text-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 transition-colors ${isFavorite ? "fill-red-500" : ""}`} />
          </button>
        </div>
        <CardContent className="p-2 flex flex-col flex-grow">
          <div className="flex flex-col flex-grow space-y-1">
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
            <p className="text-sm text-gray-600categoryamp-1">{product.category}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex">
                {renderRating(product.ratings)}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                ({product.numOfReviews} Reviews)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard; 