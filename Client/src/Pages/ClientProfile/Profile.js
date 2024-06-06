import React from "react";
import Navbar from "../../Components/layout/Navbar";
import ProfileDetailPage from "./ProfileDetailPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileDetails() {
  const navigate = useNavigate()
  const id = useSelector((state) => state?.user?.userInfo?.data?._id);


  React.useEffect(()=>{
    if(!id) return navigate('/login')
  },[id])

  return (
    <>
      <Navbar />
      <ProfileDetailPage />
    </>
  );
}

export default ProfileDetails;
