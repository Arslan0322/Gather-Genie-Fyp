import { Container, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import VendorCard from "../../Components/VendorCard";
import { useIsMobile } from "../../contexts/isMobile";
import { DropdownPrice } from "../../Components/DropdownPriceRange";
import DropdownCity from "../../Components/DropdownCity";
import { filterServiceDetail } from "./functions";
import RatingDropdown from "../../Components/RatingDropdown";

function VendorCategoryCards({ data, name, overallReviewData }) {
  const isMobile = useIsMobile();
  const [filteredData, setFilteredData] = useState([]);
  const [form, setForm] = useState({
    city: "",
    price: "",
    rating: null,
    town: ""
  });

  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const filterData = filterServiceDetail(data, form, overallReviewData)

    if(form.town !== "" && (form.city === "" && form.price === '' && form.rating === null)){
      const filteredObjects = data.filter(obj =>
        obj?.town?.toLowerCase().includes(form?.town?.toLowerCase())
      );

      setFilteredData(filteredObjects);

    } else if(form.town !== "" && (form.city !== "" || form.price !== '' || form.rating !== null)){
      const filteredObjects = filterData.filter(obj =>
        obj?.town?.toLowerCase().includes(form?.town?.toLowerCase())
      );
      setFilteredData(filteredObjects);

    }else{
      setFilteredData(filterData);
    }
  }, [data, form, overallReviewData]);


  return (
    <Container sx={{ marginTop: "1rem" }}>
      <Stack direction="row" justifyContent="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          marginTop={8}
          marginBottom={6}
        >
          {name === "Car-Rental" || name === "Event-Planner"
            ? name.replace("-", " ")
            : name}{" "}
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={10} md={2}>
          <DropdownPrice {...{ form, setForm }} />
        </Grid>

        <Grid item xs={10} md={2}>
          <DropdownCity {...{ form, setForm }} />
        </Grid>

        <Grid item xs={10} md={2}>
          <RatingDropdown {...{ form, setForm }} />
        </Grid>
        <Grid item xs={10} md={2}>
          <TextField
            sx={{
              minWidth: 160,
              backgroundColor: "white",
              borderRadius: "8px",
              margin:"0px !important"
            }}
            required
            fullWidth
            id="town"
            label="Search Town"
            value={form.town}
            name="town"
            onChange={onChange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        my={4}
        justifyContent={!isMobile ? "left" : "center"}
      >
        {filteredData?.length > 0 ? (
          <VendorCard data={filteredData} />
        ) : (
          <Typography
            variant="h6"
            text
            Align="center"
            mt={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            No Data Availabe
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default VendorCategoryCards;
