import {
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DropdownWeddingEvent from "./WeddingEventTypeDropdwn";

const weddingTypeData = [
  { _id: 1, title: "Mehndi" },
  { _id: 2, title: "Barat" },
  { _id: 3, title: "Walima" },
  { _id: 4, title: "Dholki" },
  { _id: 5, title: "Other" },
];

export default function DropdownWeddingType({
  form, setForm, weddingType, setWeddingType, data
}) {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const onChangeText = (e, item) => {
    const { value } = e.target;
    const existingDataIndex = weddingType?.findIndex(
      (data) => data?.title === item
    );

    if (existingDataIndex !== -1) {
      // If the add-on data exists, update the price
      const updatedData = weddingType.map((data, index) => {
        if (index === existingDataIndex) {
          return { ...data, price: value }; // Create a new object with updated price
        } else {
          return data;
        }
      });

      setWeddingType(updatedData);
    } else {
      // If the add-on data doesn't exist, add a new entry
      setWeddingType((prevData) => [...prevData, { title: item, price: value }]);
    }
  };

  console.log('selectedAddOns:', selectedAddOns)


  React.useEffect(() => {
    console.log(data)
    if (data) {
      console.log(data)
      setSelectedAddOns(data?.weddingEvent)
    }
  }, [data])

  return (
    <>
      <DropdownWeddingEvent
        {...{ selectedAddOns, setSelectedAddOns, setForm, form, weddingTypeData }}
      />
      {selectedAddOns?.length > 0 && selectedAddOns[0]?.title
        ? selectedAddOns?.map((items, index) => (

          <TextField
            margin="normal"
            required
            fullWidth
            id={`price-${items?.title}`}
            label={`Price of ${items?.title}`}
            value={
              (weddingType?.find((data) => data.title === items?.title) || {})
                .price
            }
            onChange={(e) => onChangeText(e, items?.title, true)}
          />
        ))
        : selectedAddOns?.map((items, index) => (

          <TextField
            margin="normal"
            required
            fullWidth
            id={`price-${items}`}
            label={`Price of ${items}`}
            value={
              (weddingType.find((data) => data.title === items) || {})
                .price || ""
            }
            onChange={(e) => onChangeText(e, items, false)}
          />

        ))}</>
  );
}
