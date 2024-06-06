import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { SolidButton } from "../../../Components/SolidButton";
import ServicesTabs from "./ServicesTabs";
import { useIsMobile } from "../../../contexts/isMobile";
import { useNavigate } from "react-router-dom";
import { useGetServiceQuery } from "../../../store/servicesSlice";
import Loader from "../../../Components/Loader";
import { useSelector } from "react-redux";

export default function VendorServices() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const vendor = useSelector(state=>state?.user?.userInfo?.data?.vendor)
  const { data, isLoading, refetch } = useGetServiceQuery();

  const showPackage = (vendor === "Photographer" || vendor === "Decor") ? "Packages" : "Services"

  const refetchAgain = () => {
    refetch();
  };

  // console.log(data,"data")

  // if(data){
  //   const dataToParse = data[0].multipleImages;
  //   const parsedData = JSON.parse(dataToParse)
  //   console.log(parsedData)
  // }
  const handleClick = () => {
    navigate("/addservices");
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Container>
      <Box sx={{ m: 8 }}>
        <Grid
          container
          spacing={2}
          mt={4}
          justifyContent={isMobile ? "center" : "right"}
        >
          <Grid md={12} xs={12}>
            <Typography variant="h6">{showPackage}</Typography>
          </Grid>
          <Grid item>
            <SolidButton
              label={showPackage === "Packages" ? "Create New Package" : "Create New Service"}
              onClick={handleClick}
              btnwidth="100%"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <ServicesTabs data={data || []} refetchAgain={refetchAgain} showPackage={showPackage} />
        </Grid>
      </Box>
    </Container>
  );
}
