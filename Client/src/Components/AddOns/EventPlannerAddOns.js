import React from "react";
import DropdownAddOns from "../AddOnsDropdown";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
export const AddOnData = [
  { _id: 1, title: "Bridle Dress Ideas" },
  { _id: 2, title: "Wedding Card Ideas" },
];
export default function EventPlannerAddOns({
  form,
  setForm,
  addOnsData,
  setAddOnsData,
}) {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
console.log(selectedAddOns,"addOns selected")
console.log(addOnsData,"addondata")
  const onChangeText = (e, item) => {
    const { value } = e.target;
    const existingDataIndex = addOnsData?.findIndex(
      (data) => data?.title === item
    );

    if (existingDataIndex !== -1) {
      // If the add-on data exists, update the price
      const updatedData = addOnsData?.map((data, index) => {
        if (index === existingDataIndex) {
          return { ...data, price: value };
        } else {
          return data;
        }
      });

      setAddOnsData(updatedData);
    } else {
      // If the add-on data doesn't exist, add a new entry
      setAddOnsData((prevData) => [...prevData, { title: item, price: value }]);
    }
  };


  return (
    <>
      <Grid item xs={12} md={6} mt={2}>
        <DropdownAddOns
          {...{ selectedAddOns, setSelectedAddOns, setForm, form, AddOnData ,addOnsData,setAddOnsData}}
        />
      </Grid>
      {/* {selectedAddOns} */}
      {selectedAddOns?.length > 0 && selectedAddOns[0]?.title
        ? selectedAddOns?.map((items, index) => (
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id={`price-${items?.title}`}
                label={`Price of ${items?.title}`}
                value={
                  (addOnsData?.find((data) => data.title === items?.title) || {})
                    .price
                }
                onChange={(e) => onChangeText(e, items?.title)}
              />
            </Grid>
          ))
        : selectedAddOns?.map((items, index) => (
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id={`price-${items}`}
                label={`Price of ${items}`}
                value={
                  (addOnsData.find((data) => data.title === items) || {})
                    .price || ""
                }
                onChange={(e) => onChangeText(e, items)}
              />
            </Grid>
          ))}
    </>
  );
}
