import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CityData = [
  { _id: 1, title: "Lahore" },
  { _id: 2, title: "Karachi" },
  { _id: 3, title: "Peshawar" },
  { _id: 4, title: "Multan" },
  { _id: 5, title: "Islamabad" },
  { _id: 6, title: "Gujranwala" },
];

function DropdownCity({ form, setForm }) {
  const { city } = form;

  const handleChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <Box
      sx={{
        minWidth: 160,
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    >
      <FormControl fullWidth>
        <InputLabel htmlFor="demo-simple-select">Select City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="city"
          value={city}
          label="Select City"
          onChange={handleChange}
        >
          {CityData.map((values) => (
            <MenuItem key={values._id} value={values.title}>
              {values.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
export default DropdownCity;
