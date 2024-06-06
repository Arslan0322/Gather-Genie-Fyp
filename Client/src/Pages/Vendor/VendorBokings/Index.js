import React from "react";
import Navbar from "../../../Components/layout/Navbar";
import VendorBookingTabs from "./VendorTabs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function VendorBookings() {
  const navigate = useNavigate()
  const id = useSelector((state) => state?.user?.userInfo?.data?._id);


  React.useEffect(()=>{
    if(!id) return navigate('/login')
  },[id])


  return (
    <>
      <Navbar />
      <VendorBookingTabs />
    </>
  );
}

export default VendorBookings;
