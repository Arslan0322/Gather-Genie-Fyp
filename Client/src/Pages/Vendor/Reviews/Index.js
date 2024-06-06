import React from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Navbar from "../../../Components/layout/Navbar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReviewCard from "./ReviewCard";
import { useGetReviewQuery } from "../../../store/reviewsSlice";
import { useGetVendorBookingQuery } from "../../../store/bookingsSlice";

export function VendorReviews() {

  const { data, isLoading } = useGetReviewQuery()
  const { data: VendorBooking, isLoading: vendorLoading } = useGetVendorBookingQuery("completed");


  if (isLoading && vendorLoading) return <p>Loading...</p>
  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ m: 4 }}>
          <Grid container spacing={2}>
            <Grid md={6} xs={12}>
              <Grid container spacing={3} alignItems="center" p={2}>
                <Grid item>
                  <IconButton>
                    <ArrowBackIosIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Reviews</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {VendorBooking?.map(item => (
              item?.cartId?.map((cartData) => (
                <Grid item md={6}>
                  <ReviewCard data={item} reviewData={data} cartData={cartData} />
                </Grid>
              ))
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
