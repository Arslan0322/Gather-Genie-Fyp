import { Box, Grid, Stack, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import bg from "../../assests/bg.jpg";
import { SolidButton } from "../../Components/SolidButton";
import { DropdownVenue } from "../../Components/DropdownVenue";
import { DropdownVendor } from "../../Components/DropdownVendor";
import DropdownCity from "../../Components/DropdownCity";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useIsMobile } from "../../contexts/isMobile";
import { DropdownEventType } from "../../Components/EventTypeDropdown";
import { DropdownEvent } from "../../Components/EventDropdown";
import DropdownDecorType from "../../Components/DecorTypeDropdown";
import DropdownDecor from "../../Components/DecorDropdown";

function ExploreVendors() {
  const bgImg = `url(${bg})`;
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [search, setSearch] = useState();
  const handleClick = (e) => {
    if (
      (form.vendor === "Venue" && form.venueType && form.city) ||
      (form.vendor !== "Venue" && form.city)
    ) {
      localStorage.setItem("searchForm", JSON.stringify(form));

      setForm({
        vendor: "",
        city: "",
        venueType: "",
        decorType:""
      });
      navigate("/searchresult");
    } else {
      toast.error("Please select the all fields");
    }
  };

  const [form, setForm] = useState({
    vendor: "",
    city: "",
    venueType: "",
    eventType: "",
    decorType: "",
  });

  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        background: bgImg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "400px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          color="white"
          sx={{ marginBottom: "5px", fontWeight: "bolder" }}
        >
          Explore Vendors
        </Typography>
        <Grid container spacing={2} margin={2} justifyContent="center">
          <Grid
            item
            xs={10}
            md={
              form.vendor === "Venue" ||
              form.vendor === "Event Planner" ||
              form.vendor === "Photographer" ||
              form.vendor === "Decor"
                ? 4
                : 6
            }
            // marginRight={form.vendor === "Venue" || isMobile ? 0 : "-3rem"}
          >
            <DropdownVendor {...{ form, setForm }} />
          </Grid>

          {form.vendor === "Venue" && (
            <Grid item md={4} xs={10}>
              <DropdownVenue {...{ form, setForm }} />
            </Grid>
          )}
          {(form.vendor === "Event Planner" ||
            form.vendor === "Photographer") && (
            <Grid item md={4} xs={10}>
              <DropdownEvent {...{ form, setForm }} />
            </Grid>
          )}
          {form.vendor === "Decor" && (
            <Grid item md={4} xs={10}>
              <DropdownDecor {...{ form, setForm }} />
            </Grid>
          )}
          <Grid
            item
            xs={10}
            md={
              form.vendor === "Venue" ||
              form.vendor === "Event Planner" ||
              form.vendor === "Photographer" ||
              form.vendor === "Decor"
                ? 4
                : 6
            }
            // mr={form.vendor === "Venue" || isMobile ? 0 : "-0.5rem"}
          >
            <DropdownCity {...{ form, setForm }} />
          </Grid>
        </Grid>
        <Grid item md={12} justifyContent="center">
          <SolidButton
            label="Explore Vendors"
            onClick={handleClick}
            btnwidth="100%"
          />
        </Grid>
      </Box>
    </Stack>
  );
}

export default ExploreVendors;
