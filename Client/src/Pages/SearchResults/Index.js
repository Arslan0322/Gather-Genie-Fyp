import React, {useState, useEffect} from "react";
import Navbar from "../../Components/layout/Navbar";
import Footer from "../../Components/layout/Footer";
import { Container, Grid, Stack, Typography } from "@mui/material";
import VendorCard from "../../Components/VendorCard";
import { useIsMobile } from "../../contexts/isMobile";
import {useGetAllServicesForSearchQuery} from "../../store/servicesSlice";
import Loader from "../../Components/Loader";

export default function SearchedResultIndex() {
  const isMobile = useIsMobile();
  const {data, isLoading} = useGetAllServicesForSearchQuery();

  const [resultData, setResultData] = useState([])

  useEffect(() => {
    const searchForm = JSON.parse(localStorage.getItem("searchForm")) || {};

    if (data && searchForm && searchForm.vendor !== undefined) {
      if (searchForm.vendor === "Venue" ) {
        const filteredData = data?.filter(item => (
          item?.city === searchForm.city &&
          item?.userId?.vendor === searchForm.vendor &&
          item?.venueType === searchForm.venueType 
        ));

        setResultData(filteredData);
      } else if(searchForm.vendor === 'Event Planner'|| searchForm.vendor=== 'Photographer'){
        const filteredData = data?.filter(item => (
          item?.city === searchForm.city &&
          item?.userId?.vendor === searchForm.vendor &&
          item?.eventType[0]?.title === searchForm.eventType
        ));
        setResultData(filteredData);

        }else{
        const filteredData = data?.filter(item => (
          item?.city === searchForm.city && item.userId?.vendor === searchForm?.vendor
        ));

        // const check = filteredData.filter(item => (
          
        // ))

        // console.log(check)
        setResultData(filteredData);
      }
    }
  }, [data]);
  

  if(isLoading) return <Loader />
  return (
    <>
      <Navbar />
      <Container>
        <Stack direction="row" justifyContent="center">
          <Typography
            variant="h4"
            fontWeight="bold"
            marginTop={8}
            marginBottom={6}
          >
            Search Results
          </Typography>
        </Stack>
        <Grid
          container
          spacing={2}
          marginBottom={6}
          justifyContent={!isMobile ? "left" : "center"}
        >
        {resultData.length > 0 ?
          <VendorCard data={resultData}  />  : 
          <Typography variant="h6" textAlign="center" mt={4} sx={{display:"flex", justifyContent:"center"}}>
          No Data Availabe
        </Typography>
          }
          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
