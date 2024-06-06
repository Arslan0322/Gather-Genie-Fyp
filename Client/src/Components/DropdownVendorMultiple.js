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
import React from "react";

const VendorTypeData = [
  { _id: 1, title: "Venue" },
  { _id: 2, title: "Photographer" },
  { _id: 3, title: "Event Planner" },
  { _id: 4, title: "Decor" },
  { _id: 5, title: "Car Rental" },
  { _id: 6, title: "Caterer" },
];

export default function DropdownVendorMultiple({
  selectedVendor,
  setSelectedVendor,
  form,
  setForm,
}) {
  const { vendor } = form;
  const handleChange = (e) => {
    setSelectedVendor(e.target.value);
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const selectedTagsText = (selected) =>
    selected?.map((tagID) => {
      return VendorTypeData?.find((tag) => tag.title === tagID).title;
    });

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
        <InputLabel id="demo-multiple-checkbox-label">Vendor Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="vendor"
          value={vendor || []}
          label="Vendor Type"
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="Vendor Type" />}
          renderValue={(selected) => selectedTagsText(selected).join(", ")}
        >
          {VendorTypeData.map((item) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox checked={vendor.indexOf(item.title) > -1} />
              <ListItemText primary={item.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
