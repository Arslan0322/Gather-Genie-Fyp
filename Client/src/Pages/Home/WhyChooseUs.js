import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import DiamondIcon from "@mui/icons-material/Diamond";

function WhyChooseUs() {
  return (
    <Container
      sx={{ textAlign: "center", marginBottom: "20px", marginTop: "8rem" }}
    >
      <Typography variant="h5" marginBottom={2}>
        Why Choose Us?
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4} sx={{ border: "4px" }}>
          <ThumbUpOffAltIcon color="primary" />
          <Typography variant="h6" gutterBottom>
            Reliability
          </Typography>
          <Typography variant="p" fontSize={12}>
            Our Gather Genie system is built on a robust and reliable
            platform. We understand that events are significant and require
            smooth execution. With our system, you can trust that your event
            planning and execution process will be seamless, eliminating any
            worries about technical glitches or disruptions.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ border: "4px" }}>
          <QueryBuilderIcon color="primary" />
          <Typography variant="h6" gutterBottom>
            Save Time and Effort
          </Typography>
          <Typography variant="p" fontSize={12}>
            Time is precious, especially when it comes to event planning. Gather
            Genie is designed to streamline the entire process, from event
            creation and promotion to registration and attendee management.
            You'll save valuable hours that can be redirected towards refining
            event details, engaging attendees, or focusing on other important
            tasks.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ border: "4px" }}>
          <DiamondIcon color="primary" />
          <Typography variant="h6" gutterBottom>
            Free Service
          </Typography>
          <Typography variant="p" fontSize={12}>
            We're proud to offer a free version of our Gather Genie web app
            that doesn't compromise on essential features. This means you can
            access tools such as event creation, attendee management, and basic
            reporting without any cost. Our goal is to help you succeed without
            adding financial strain.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WhyChooseUs;
