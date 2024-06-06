import { Box, Card, Grid, TextField, Typography } from "@mui/material";

import React from "react";
import { useIsMobile } from "../contexts/isMobile";

function BookForm({ bookingForm, setBookingForm }) {
  const isMobile = useIsMobile();

  const onChange = (e) => {
    setBookingForm((bookingForm) => ({
      ...bookingForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card
      sx={{
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: isMobile ? "310px" : "400px",
      }}
    >
      <Box sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid md={12} xs={12} mt={2}>
            <Typography component="h1" variant="h5" textAlign="center">
              Book Form
            </Typography>
          </Grid>
        </Grid>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid
            container
            spacing={2}
            ml={isMobile ? 2 : 1}
            mr={isMobile ? 2 : 1}
          >
            <Grid item xs={10} md={11}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="guests"
                label="Number of Guests"
                name="guests"
                value={bookingForm.guests}
                onChange={onChange}
              />
            </Grid>

            <Grid item md={12} xs={10}>
              <TextField
                margin="normal"
                required
                multiline
                rows={4}
                id="description"
                label="Description"
                name="description"
                value={bookingForm.description}
                onChange={onChange}
                sx={{ width: isMobile ? "300px" : "350px" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
}

export default BookForm;
