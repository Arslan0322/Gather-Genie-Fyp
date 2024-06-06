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
import { BookingCard } from "./BookingCard";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../../contexts/isMobile";
import { useGetClientBookingQuery } from "../../store/bookingsSlice";
import {useGetReviewQuery} from "../../store/reviewsSlice";
import Loader from "../../Components/Loader";

function BookingTabs() {
  const [currentTab, setCurrentTab] = useState("current");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { data, isLoading, refetch, isFetching } = useGetClientBookingQuery(currentTab);
  const { data: reviewData, isLoading: reviewLoading, refetch : refetchReview, isFetching: isFetchingReview } = useGetReviewQuery();


  const refetchAgain = () => {
    refetch()
 }

 const refetchReviewAgain = () => {
  refetchReview()
 }

  const handleCurrentBookings = () => {
    setCurrentTab("current");
  };

  const handlePreviousBookings = () => {
    setCurrentTab("previous");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  React.useEffect(()=>{
    refetch()
    refetchReview()
  },[currentTab])

  if ((isLoading || reviewLoading) || isFetching || isFetchingReview) return <Loader />;

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
          <Grid container spacing={2} justifyContent="center">
            <Box
              border={2}
              borderRadius={8}
              width={"25rem"}
              borderColor="#1a2b43"
            >
              <Grid container spacing={2}>
                <Grid item md={4} xs={12} textAlign="center">
                  {" "}
                  <Button
                    type="submit"
                    sx={{
                      fontFamily: "Semibold",
                      width: "12rem",
                      ml: isMobile ? 0 : 2,
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
                <Grid item md={4} xs={12}>
                  <Button
                    type="submit"
                    sx={{
                      fontFamily: "Semibold",
                      ml: 7,
                      width: "12rem",
                      backgroundColor:
                        currentTab === "previous" ? "#1a2b43" : "",
                      color: currentTab === "previous" ? "white" : "",
                      "&:hover": {
                        backgroundColor:
                          currentTab === "previous" ? "white" : "",
                        color: currentTab === "previous" ? "#1a2b43" : "",
                      },
                    }}
                    onClick={(e) => handlePreviousBookings(e)}
                  >
                    Previous Bookings
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <BookingCard currentTab={currentTab} data={data} refetchAgain={refetchAgain} reviewData={reviewData} refetchReviewAgain={refetchReviewAgain} />
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default BookingTabs;
