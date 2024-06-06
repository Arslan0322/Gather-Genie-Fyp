import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
// import { ServicesData } from "../Home/ServiceData";

function BookingDetails() {
  return (
    <Card
      elevation={2}
      sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ m: 2 }} border={2} borderRadius={2} borderColor="#1a2b43">
        <Typography variant="h6" m={1}>
          Booking Details
        </Typography>
        <Box m={1}>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item md={12}>
              <Typography variant="body1">Event Date: 21/12/2022</Typography>
              <Typography variant="body1">Event Time: 07:00 PM</Typography>
              <Typography variant="body1">No. of Guests: 200</Typography>
              <Typography variant="body1">
                Event Description:VenueHub,pk helps you find and book your
                perfect event venue for free. We bring venues together in one
                place making it fast and simple to find somewhere that fits your
                exact needs and budget so that you can have your dream wedding.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* {ServicesData.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{ m: 2 }}
            border={2}
            borderRadius={2}
            borderColor="#1a2b43"
          >
            <Typography variant="h6" m={1}>
              Services Details
            </Typography>
            <Box m={1}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography variant="body1">
                    Service Name: {item.title}{" "}
                  </Typography>
                  <Typography variant="body1">Price: {item.price} </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      })} */}
    </Card>
  );
}

export default BookingDetails;
