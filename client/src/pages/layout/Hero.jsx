import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Vector from "../../assets/website/blue-pattern.png";

const Hero = ({ handleOrderPopup }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [currentProductIndex, setCurrentProductIndex] = React.useState(0);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (products && products.length > 0) {
        setCurrentProductIndex((prevIndex) => 
          prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [products]);

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  if (loading || !products || products.length === 0) {
    return (
      <div className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">
        <div className="container pb-8 sm:pb-0">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const currentProduct = products[currentProductIndex];

  return (
    <>
      <div
        className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold"
              >
                {currentProduct.name}
              </h1>
              <p
                data-aos="slide-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="text-sm "
              >
                {currentProduct.description}
              </p>
              <div>
                <button
                  onClick={handleOrderPopup}
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                >
                  Order Now
                </button>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                <img
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay="100"
                  data-aos-once="true"
                  data-aos-easing="ease-in-out"
                  src={currentProduct.images[0]?.url}
                  alt={currentProduct.name}
                  className="w-[280px] h-[280px] sm:h-[400px] sm:w-[400px] object-contain mx-auto hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-white rounded-full">
                {products.slice(0, 3).map((product, index) => (
                  <img
                    key={product._id}
                    data-aos="zoom-in"
                    data-aos-once="true"
                    src={product.images[0]?.url}
                    onClick={() => setCurrentProductIndex(index)}
                    alt={product.name}
                    className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200 cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/20 hover:border-2 hover:border-primary rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
