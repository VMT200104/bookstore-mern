import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { getProduct } from "../../actions/productAction";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);
  const [currentIndex, setCurrentIndex] = useState(0);
  const booksPerPage = 4;

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + booksPerPage >= highRatedBooks.length ? 0 : prevIndex + booksPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - booksPerPage < 0 ? highRatedBooks.length - booksPerPage : prevIndex - booksPerPage
    );
  };

  const highRatedBooks = products?.filter(book => book.ratings >= 4) || [];
  const visibleBooks = highRatedBooks.slice(currentIndex, currentIndex + booksPerPage);

  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto px-4">
        {/* header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-medium">
            Top Books for you
          </p>
          <h1 className="text-3xl font-bold mt-2">Top Books</h1>
          <p className="text-xs text-gray-400 mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis delectus architecto error nesciunt,
          </p>
        </div>

        {/* Body section */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex flex-col items-center space-y-3">
                  <Skeleton className="h-[220px] w-[150px] rounded-md" />
                  <div className="space-y-2 text-center">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[100px]" />
                    <Skeleton className="h-3 w-[60px] mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                {visibleBooks.map(({ _id, images, name, ratings, category }) => (
                  <div 
                    key={_id} 
                    className="flex flex-col items-center w-[150px] h-[320px] group cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative overflow-hidden rounded-md">
                      <img
                        src={images[0]?.url}
                        alt={name}
                        className="h-[220px] w-[150px] object-cover rounded-md shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                    </div>
                    <div className="flex flex-col justify-between h-[100px] w-full px-2 text-center transform transition-transform duration-300 group-hover:-translate-y-1">
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-300 line-clamp-2 overflow-hidden">{name}</h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300 line-clamp-1">{category}</p>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="text-yellow-500 w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm group-hover:font-medium transition-all duration-300">{ratings}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 rounded-full shadow-lg bg-white hover:bg-gray-100 transition-all duration-300 hover:scale-110 hidden"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 rounded-full shadow-lg bg-white hover:bg-gray-100 transition-all duration-300 hover:scale-110 hidden"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Button 
            onClick={() => navigate('/products')}
            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            View All Books
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Books;
