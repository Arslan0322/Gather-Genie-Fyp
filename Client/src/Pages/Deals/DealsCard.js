import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VendorCard from "../../Components/VendorCard";
import { useIsMobile } from "../../contexts/isMobile";
import { SolidButton } from "../../Components/SolidButton";
import DealsDrawer from "./DealsDrawer";
import { useNavigate } from "react-router-dom";

export default function DealsCard() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  // handle
  const toggleDealsDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Container>
        <Box sx={{ m: 4 }}>
          <Grid container spacing={2}>
            <Grid md={12} xs={12}>
              <Grid container spacing={2} p={2} justifyContent="right">
                <Grid container spacing={2}>
                  <Grid item>
                    <IconButton onClick={handleBackClick}>
                      <ArrowBackIosIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">Deals</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <SolidButton
                    label="Custom Deal Request"
                    onClick={toggleDealsDrawer}
                    btnwidth="100%"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              marginBottom={6}
              mt={2}
              justifyContent={!isMobile ? "left" : "center"}
              marginLeft={isMobile ? 0 : 0}
            >
              <VendorCard />
            </Grid>
          </Grid>
        </Box>
        <DealsDrawer toggleDrawer={toggleDealsDrawer} open={open} />
      </Container>
    </>
  );
}
