import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { VendorBookings } from "./VendorBookings";
import { useNavigate } from "react-router-dom";
import { useGetVendorBookingQuery } from "../../../store/bookingsSlice";
import Loader from "../../../Components/Loader";
import { useGetReviewQuery } from "../../../store/reviewsSlice";

function VendorBookingTabs() {
  const [currentTab, setCurrentTab] = useState("upcoming");

  const { data, isLoading, refetch, isFetching } = useGetVendorBookingQuery(currentTab);
  const { data: reviewData, isLoading: reviewLoading } = useGetReviewQuery();
  const navigate = useNavigate();

  const refetchAgain = () => {
    refetch();
  };

  const handleCurrentBookings = () => {
    setCurrentTab("current");
  };
  const handleUpcomingBookings = () => {
    setCurrentTab("upcoming");
  };
  const handleCompletedBookings = () => {
    setCurrentTab("completed");
  };
  const handleCancelledBookings = () => {
    setCurrentTab("cancelled");
  };


  const handleBackClick = () => {
    navigate(-1);
  };

  React.useEffect(()=>{
    refetch()
  },[currentTab])

  if ((isLoading && reviewLoading) || isFetching) return <Loader />;

  return (
    <>
      <Container>
        <Box sx={{ m: 4 }}>
          <Grid container spacing={2}>
            <Grid md={6} xs={12}>
              <Grid container spacing={3} alignItems="center" p={2}>
                <Grid item>
                  <IconButton onClick={handleBackClick}>
                    <ArrowBackIosIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6">Bookings</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Box
              border={2}
              borderRadius={8}
              width={"60rem"}
              borderColor="#1a2b43"
            >
              <Grid container spacing={2} textAlign="center">
                <Grid item md={3} xs={12}>
                  {" "}
                  <Button
                    type="submit"
                    sx={{
                      fontFamily: "Semibold",
                      width: "12rem",
                      ml: 1,
                      backgroundColor:
                        currentTab === "upcoming" ? "#1a2b43" : "",
                      color: currentTab === "upcoming" ? "white" : "",
                      "&:hover": {
                        backgroundColor:
                          currentTab === "upcoming" ? "white" : "",
                        color: currentTab === "upcoming" ? "#1a2b43" : "",
                      },
                    }}
                    onClick={(e) => handleUpcomingBookings(e)}
                  >
                    Upcoming Bookings
                  </Button>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Button
                    type="submit"
                    sx={{
                      fontFamily: "Semibold",
                      width: "12rem",
                      backgroundColor:
                        currentTab === "current" ? "#1a2b43" : "",
                      color: currentTab === "current" ? "white" : "",
                      "&:hover": {
                        backgroundColor:
                          currentTab === "current" ? "white" : "",
                        color: currentTab === "current" ? "#1a2b43" : "",
                      },
                    }}
                    onClick={(e) => handleCurrentBookings(e)}
                  >
                    Current Bookings
                  </Button>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Button
                    type="submit"
                    sx={{
                      fontFamily: "Semibold",
                      width: "12rem",
                      backgroundColor:
                        currentTab === "completed" ? "#1a2b43" : "",
                      color: currentTab === "completed" ? "white" : "",
                      "&:hover": {
                        backgroundColor:
                          currentTab === "completed" ? "white" : "",
                        color: currentTab === "completed" ? "#1a2b43" : "",
                      },
                    }}
                    onClick={(e) => handleCompletedBookings(e)}
                  >
                    Completed Bookings
                  </Button>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Button
                    type="submit"
                    sx={{
                      fontFamily: "Semibold",
                      width: "12rem",
                      backgroundColor:
                        currentTab === "cancelled" ? "#1a2b43" : "",
                      color: currentTab === "cancelled" ? "white" : "",
                      "&:hover": {
                        backgroundColor:
                          currentTab === "cancelled" ? "white" : "",
                        color: currentTab === "cancelled" ? "#1a2b43" : "",
                      },
                    }}
                    onClick={(e) => handleCancelledBookings(e)}
                  >
                    Cancelled Bookings
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <VendorBookings currentTab={currentTab} data={data || []} refetchAgain={refetchAgain} reviewData={reviewData} />
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default VendorBookingTabs;
