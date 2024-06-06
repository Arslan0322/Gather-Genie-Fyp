import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect } from "react";

export default function CateringAddOnsDropdown({
  form,
  setForm,
  selectedAddOns,
  setSelectedAddOns,
  AddOnData,
  setAddOnsData,
  addOnsData,
}) {
  const { addOns } = form;
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedAddOn = {
      title:
        selectedValue[
          selectedValue.length === 0 ? 0 : selectedValue.length - 1
        ],
      category: [],
    };

    // Check if the same object is already in the array
    const isDuplicate = selectedAddOns.some(
      (addon) => addon.title === selectedAddOn.title
    );


    if (!isDuplicate) {
      // If not a duplicate, add the new object
      setSelectedAddOns([...selectedAddOns, selectedAddOn]);
      setAddOnsData([...selectedAddOns, selectedAddOn]);

      // Update the form
      setForm((form) => ({
        ...form,
        [e.target.name]: [...selectedAddOns, selectedAddOn],
      }));
    } else {
      // If a duplicate, remove it from the array
      const filteredArray = selectedAddOns.filter(
        (addon) => addon.title !== selectedAddOn.title
      );

      setSelectedAddOns(filteredArray);
      setAddOnsData(filteredArray);
      setForm(() => ({ ...form, addOns: filteredArray }));
    }
  };

  const selectedTagsText = (selected) =>
    selected?.map((tagID) => {
      if (tagID?.title) {
        return AddOnData?.find((tag) => tag?.title === tagID?.title)?.title;
      } else {
        return AddOnData?.find((tag) => tag?.title === tagID)?.title;
      }
    });

  useEffect(() => {
    if (addOns) {
      setSelectedAddOns(addOns);
    }
  }, [addOns]);

  return (
    <Box
      sx={{
        minWidth: 160,
        backgroundColor: "white",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Add Ons</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="addOns"
          value={addOns || []}
          label="AddOns"
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="AddOns" />}
          renderValue={(selected) => selectedTagsText(selected).join(", ")}
        >
          {AddOnData?.map((item, index) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox
                checked={
                 addOns && addOns.findIndex((addon) => addon.title === item?.title) > -1
                }
              />
              <ListItemText primary={item.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
