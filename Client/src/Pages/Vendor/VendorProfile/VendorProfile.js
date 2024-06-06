import React from "react";
import Navbar from "../../../Components/layout/Navbar";
import VendorProfileEdit from "./EditVendorProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function VendorProfileDetails() {
  const navigate = useNavigate()
  const id = useSelector((state) => state?.user?.userInfo?.data?._id);


  React.useEffect(()=>{
    if(!id) return navigate('/login')
  },[id])

  return (
    <>
      <Navbar />
      <VendorProfileEdit />
    </>
  );
}

export default VendorProfileDetails;
