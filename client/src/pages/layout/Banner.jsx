import React from "react";
import BooksStack from "../../assets/website/library.jpg";
import Vector from "../../assets/vector3.png";
import { Book, Truck, CreditCard, Gift } from "lucide-react";

const Banner = () => {
  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };
  return (
    <>
      <div className="min-h-[550px]">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div data-aos="slide-up" className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Image section */}
              <div>
                <img
                  src={BooksStack}
                  alt="books stack"
                  className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  Your Personal Library Awaits
                </h1>
                <p className="text-sm text-gray-500 tracking-wide leading-5">
                  Discover a world of knowledge at your fingertips. Browse through
                  our extensive collection of books, from timeless classics to
                  contemporary bestsellers.
                  <br />
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Book className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                    <p>Wide Selection of Books</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Truck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                    <p>Fast & Reliable Delivery</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <CreditCard className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                    <p>Secure Payment Options</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Gift className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                    <p>Special Book Discounts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
