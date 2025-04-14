import React from "react";
import Hero from "../layout/Hero";
import Services from "../layout/Services";
import Banner from "../layout/Banner";
import AppStore from "../layout/AppStore";
import Books from "../layout/Books";
import Testimonial from "../layout/Testimonial";

const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Hero handleOrderPopup={handleOrderPopup} />
      <Services handleOrderPopup={handleOrderPopup} />
      <Banner/>
      <AppStore/>
      <Books/>
      <Testimonial/>
    </div>
  );
};

export default Home;
