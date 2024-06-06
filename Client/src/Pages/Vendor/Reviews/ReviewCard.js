import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useIsMobile } from "../../../contexts/isMobile";
import { ReviewsData, generateReviewElements } from "./ReviewUtils";
import ReviewModal from "../../../Components/ReviewModal";

export default function ReviewCard({ data, reviewData, cartData }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [bookingID, setBookingID] = useState(null)
  const [modalID, setModalID] = useState(null)

  const handleClick = (id, bookingId) => {
    setBookingID(bookingId)
    setModalID(id);
    setOpen(!open);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent={isMobile ? "center" : "left"}>
        <Box width={isMobile ? "90%" : "50rem"}>
          <Grid md={10} xs={12}>
            <Card
              elevation={2}
              sx={{
                marginTop: 6,
                display: "flex",
                flexDirection: "column",
                marginBottom: 2,
              }}
            >
              <Grid
                container
                spacing={2}
                margin={2}
              // justifyContent={isMobile ? "center" : "left"}
              >
                {ReviewsData.map((item) => (
                  <Grid item md={6} xs={12} key={item}> {/* Make sure to add a unique key */}
                    <Typography variant="body1">{item}</Typography>
                    <Typography >{generateReviewElements(item, cartData, reviewData)}</Typography>
                  </Grid>
                ))}
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mr: 2,
                    fontFamily: "Semibold",
                    width: "11rem",
                  }}
                  onClick={() => handleClick(cartData._id, data._id)}
                >
                  Review to Client
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Box>
      </Grid>
      <ReviewModal open={open} setOpen={setOpen} data={reviewData} bookingID={bookingID} id={modalID} isClient={false} />
    </>
  );
}
