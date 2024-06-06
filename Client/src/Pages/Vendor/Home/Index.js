import React from "react";
import Navbar from "../../../Components/layout/Navbar";
import VendorServices from "./VendorServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function VendorHomePage() {
  const navigate = useNavigate()
  const id = useSelector((state) => state?.user?.userInfo?.data?._id);


  React.useEffect(()=>{
    if(!id) return navigate('/login')
  },[id])

  return (
    <>
      <Navbar />
      <VendorServices />
    </>
  );
}
