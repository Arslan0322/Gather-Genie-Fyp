import React from "react";
import Navbar from "../../Components/layout/Navbar";
import Footer from "../../Components/layout/Footer";
import ServiceDetails from "./ServiceDetails";
import { useParams } from "react-router-dom";
import {
  useGetServiceByIDQuery,
  useGetAllServiceQuery
} from "../../store/servicesSlice";
import Loader from "../../Components/Loader";
import { useGetReviewByUserIdQuery } from "../../store/reviewsSlice";
import { useEffect } from "react";

export function ServiceDetailIndex() {
  const { id, uid } = useParams();
  const { data, isLoading, isFetching } = useGetServiceByIDQuery(id);
  const { data: allServices, isLoading: isLoadingService } = useGetAllServiceQuery(data?.userId?.vendor);
  const {data: allReview, isLoading: isLoadingReview, refetch} = useGetReviewByUserIdQuery(data?._id)

  const filteredData = allServices?.filter((item) => item._id !== id);

  useEffect(()=>{
    refetch()
  },[])

  if (isLoading || isLoadingService || isFetching || isLoadingReview) return <Loader />;
  return (
    <>
      <Navbar />
      <ServiceDetails id={id} userId={uid} data={data || []} allServices={filteredData} allReview={allReview || []} />
      <Footer />
    </>
  );
}
