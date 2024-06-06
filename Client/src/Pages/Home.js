import React, { useEffect } from "react";
import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import ExploreVendors from "./Home/ExploreVendors";
import WhyChooseUs from "./Home/WhyChooseUs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VendorCategories from "./Home/VendorCategories";
import MostsearchedVendors from "./Home/MostsearchedVendors";
import TestimonialsSlider from "./Home/TestimonialsSlider";

function Home() {
  const navigate = useNavigate();
  const vendor = useSelector((state) => state.user?.userInfo?.data?.vendor);

  useEffect(() => {
    if (vendor) {
      navigate("/home");
    }
  }, [vendor]);

  return (
    <>
      <Navbar />
      <ExploreVendors />
      <WhyChooseUs />
      <VendorCategories />
      <MostsearchedVendors />
      <TestimonialsSlider />
      <Footer />
    </>
  );
}

export default Home;
