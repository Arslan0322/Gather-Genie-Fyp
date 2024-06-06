import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useIsMobile } from "../../contexts/isMobile";
import CategoriesCard from "../../Components/CategoriesCard";

export default function VendorCategories() {
  const isMobile = useIsMobile();

  return (
    <Container sx={{ marginTop: "4rem" }}>
      <Stack direction="row" justifyContent="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          marginTop={8}
          marginBottom={6}
        >
          Explore Our Vendors
        </Typography>
      </Stack>
      <Grid
        container
        spacing={2}
        marginBottom={6}
        justifyContent={!isMobile ? "left" : "center"}
      >
        <CategoriesCard />
      </Grid>
    </Container>
  );
}
