import React from "react";
import DropdownAddOns from "../AddOnsDropdown";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
export const AddOnData = [
  { _id: 1, title: "DJ" },
  { _id: 2, title: "Decorated Stage" },
  { _id: 3, title: "Air Condition Charges" },
  { _id: 4, title: "Decor Services(Flowers,Fancy Lights)" },
  { _id: 5, title: "Heaters" },
  { _id: 6, title: "Catering Services" },
  { _id: 7, title: "Dance Floor" },
];
export default function VenueAddOns({
  form,
  setForm,
  addOnsData,
  setAddOnsData,
  isEdit
}) {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  const onChangeText = (e, item) => {
    const { value } = e.target;
    const existingDataIndex = addOnsData.findIndex(
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
 
  const onChangeMenu = (e, item) => {
    const { value } = e.target;
    const existingDataIndex = addOnsData.findIndex(
      (data) => data?.title === item
    );

    if (existingDataIndex !== -1) {
      // If the add-on data exists, update the price
      const updatedData = addOnsData?.map((data, index) => {
        if (index === existingDataIndex) {
          return { ...data, menu: value };
        } else {
          return data;
        }
      });

      setAddOnsData(updatedData);
    } else {
      // If the add-on data doesn't exist, add a new entry
      setAddOnsData((prevData) => [...prevData, { title: item, menu: value }]);
    }
  };

  React.useEffect(() => {
    // Remove objects from addOnsData that are not in selectedAddOns
    // if(addOnsData && selectedAddOns?.length !== 0){
    //   let selectedTitles = selectedAddOns?.map(addOn => addOn?.title);
    //   const filteredData = addOnsData?.filter(addOn => selectedTitles?.includes(addOn?.title));
      
    //   setAddOnsData(filteredData)
    //   // setAddOnsData((prevData) =>
    //   //   prevData?.filter((data) => selectedAddOns.includes(data.title))
    //   // );
    // }

    if(selectedAddOns && isEdit){
      setAddOnsData(selectedAddOns)
    }
  }, [selectedAddOns, isEdit]);

  return (
    <>
      <Grid item xs={12} md={6} mt={2}>
        <DropdownAddOns
          {...{ selectedAddOns, setSelectedAddOns, setForm, form, AddOnData,addOnsData,setAddOnsData }}
        />
      </Grid>
      {/* {selectedAddOns} */}
      {selectedAddOns?.length > 0 && selectedAddOns[0]?.title
        ? selectedAddOns?.map((items, index) => (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id={`price-${items?.title}`}
                  label={`Price of ${items?.title}`}
                  value={
                    (
                      addOnsData.find((data) => data.title === items?.title) ||
                      {}
                    ).price
                  }
                  onChange={(e) => onChangeText(e, items?.title)}
                />
              </Grid>
              {items?.title === "Catering Services" && (
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={`menu-${items?.title}`}
                    label={`Menu of ${items?.title}`}
                    value={
                      (addOnsData.find((data) => data.title === items?.title) || {})
                        .menu || ""
                    }
                    onChange={(e) => onChangeMenu(e, items?.title)}
                  />
                </Grid>
              )}
            </>
          ))
        : selectedAddOns?.map((items, index) => (
            <>
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
              {items === "Catering Services" && (
                <Grid item xs={12} md={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id={`menu-${items}`}
                    label={`Menu of ${items}`}
                    value={
                      (addOnsData.find((data) => data.title === items) || {})
                        .menu || ""
                    }
                    onChange={(e) => onChangeMenu(e, items)}
                  />
                </Grid>
              )}
            </>
          ))}
    </>
  );
}
