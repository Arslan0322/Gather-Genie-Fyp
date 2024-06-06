import React from "react";
import Navbar from "../../Components/layout/Navbar";
import Footer from "../../Components/layout/Footer";
import VendorCategoryCards from "./VendorCategoryCards";
import { useGetAllServiceQuery } from "../../store/servicesSlice";
import {useGetOverallReviewQuery} from "../../store/reviewsSlice"
import Loader from "../../Components/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VendorIndex() {
  const { name } = useParams();
  const navigate = useNavigate()
  const id = useSelector((state) => state?.user?.userInfo?.data?._id);


  const { data, isLoading } = useGetAllServiceQuery(name);
  const {data: overallReviewsData, isLoading: isOverallReviewData} = useGetOverallReviewQuery()
  
  React.useEffect(()=>{
    if(!id) return navigate('/login')
  },[id])

  if (isLoading && isOverallReviewData) return <Loader />;
  return (
    <>
      <Navbar />
      <VendorCategoryCards data={data || []} name={name} overallReviewData={overallReviewsData || []} />
      <Footer />
    </>
  );
}
