import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const VendorTypeData = [
  { _id: 1, title: "Venue" },
  { _id: 2, title: "Photographer" },
  { _id: 3, title: "Event Planner" },
  { _id: 4, title: "Decor" },
  { _id: 5, title: "Car Rental" },
  { _id: 6, title: "Caterer" },
];

export function DropdownVendor({ form, setForm, disableOnChange }) {
  const { vendor } = form;

  const handleChange = (e) => {
    if (!disableOnChange) {
      setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    }
  };

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
        <InputLabel id="demo-simple-select-label">Select Vendor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="vendor"
          value={vendor}
          label="Select Vendor"
          onChange={handleChange}
        >
          {VendorTypeData.map((values) => (
            <MenuItem key={values._id} value={values.title}>
              {values.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
