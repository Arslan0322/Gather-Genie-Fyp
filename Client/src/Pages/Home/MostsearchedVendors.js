import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { SolidButton } from "../../Components/SolidButton";
import { useIsMobile } from "../../contexts/isMobile";
import VendorCard from "../../Components/VendorCard";
import { useGetMostSearchedVendorsQuery } from "../../store/servicesSlice";
import Loader from "../../Components/Loader";

export default function MostsearchedVendors() {
  const isMobile = useIsMobile();
  const [searched, setSearched] = useState('All');
  const [filterData, setFilterData] = useState([])
  const { data, isLoading } = useGetMostSearchedVendorsQuery();

  const handleClick = (value) => {
    setSearched(value)
  };

  useEffect(() => {
    if (searched === 'All') {
      setFilterData(data)
    } else {
      const updatedData = data?.filter(items => items?.userId?.vendor === searched);
      setFilterData(updatedData);
    }
  }, [searched, data])

  if (isLoading) return <Loader />;

  return (
    <Container sx={{ marginTop: "4rem" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4} md={2}>
          <SolidButton
            label="Venues"
            onClick={() => handleClick("Venue")}
            btnwidth={isMobile ? "90%" : "60%"}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <SolidButton
            label="Photographer"
            onClick={() => handleClick("Photographer")}
            btnwidth={isMobile ? "100%" : "70%"}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <SolidButton
            label="Caterer"
            onClick={() => handleClick("Caterer")}
            btnwidth={isMobile ? "100%" : "60%"}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <SolidButton
            label="Decors"
            onClick={() => handleClick("Decor")}
            btnwidth={isMobile ? "90%" : "60%"}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <SolidButton
            label="event Planner"
            onClick={() => handleClick("Event Planner")}
            btnwidth={isMobile ? "100%" : "71%"}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <SolidButton
            label="Car Rental"
            onClick={() => handleClick("Car Rental")}
            btnwidth={isMobile ? "100%" : "60%"}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <SolidButton
            label="All"
            onClick={() => handleClick("All")}
            btnwidth={isMobile ? "90%" : "60%"}
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          marginTop={8}
          marginBottom={6}
        >
          Most Searched Vendors
        </Typography>
      </Stack>
      <Grid
        container
        spacing={2}
        marginBottom={6}
        justifyContent={!isMobile ? "left" : "center"}
      >
        <VendorCard data={filterData || []} />
      </Grid>
    </Container>
  );
}
