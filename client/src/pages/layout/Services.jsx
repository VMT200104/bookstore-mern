import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { getProduct } from "../../actions/productAction.jsx";
import { addItemsToCart } from "../../actions/cartAction.jsx";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addItemsToCart(product._id, 1));
  };

  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Trending Books
            </p>
            <h1 className="text-3xl font-bold">Best Books</h1>
            <p className="text-xs text-gray-400">
              Discover our collection of best-selling books and new releases
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {products && products.slice(0, 3).map((product) => (
              <div
                key={product._id}
                data-aos="zoom-in"
                className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
              >
                <div className="h-[100px]">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="max-w-[100px] block mx-auto transform -translate-y-14 group-hover:scale-105 duration-300 shadow-md"
                  />
                </div>
                <div className="p-4 text-center h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="w-full flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < product.ratings ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <button
                    className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full group-hover:bg-white group-hover:text-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
