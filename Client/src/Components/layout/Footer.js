import { Box, Container, Grid, Link, Typography } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useIsMobile } from "../../contexts/isMobile";

function Footer() {
  const isMobile = useIsMobile();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
        p: 6,
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <div
              style={{
                border: "4px solid #dac287",
                padding: "16px",
                borderRadius: "8px",
                height: isMobile ? "18rem" : "14rem",
              }}
            >
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                At Gather Genie, we are passionate about creating unforgettable
                experiences. Our mission is to make event planning and
                management a seamless and stress-free process, allowing you to
                focus on what truly matters making your event a resounding
                success.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div
              style={{
                border: "4px solid #dac287",
                padding: "16px",
                borderRadius: "8px",
                height: "14rem",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                43 Lake City, Lahore, Pakistan
              </Typography>
              <Typography variant="body2">GatherGenie@gmail.com</Typography>
              <Typography variant="body2">Phone: 03354059257</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div
              style={{
                border: "4px solid #dac287",
                padding: "16px",
                borderRadius: "8px",
                height: "14rem",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Link href="https://www.facebook.com/">
                <FacebookIcon />
              </Link>
              <Link href="https://www.instagram.com/" sx={{ pl: 1, pr: 1 }}>
                <InstagramIcon />
              </Link>
              <Link href="https://www.twitter.com/">
                <TwitterIcon />
              </Link>
            </div>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
            Gather Genie
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
