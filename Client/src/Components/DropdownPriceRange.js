import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PriceData = [
  { _id: 1, title: "Below 10000" },
  { _id: 2, title: "10000-20000" },
  { _id: 3, title: "20000-30000" },
  { _id: 4, title: "30000-40000" },
  { _id: 5, title: "40000-50000" },
  { _id: 6, title: "50000-60000" },
  { _id: 7, title: "60000 onwards" },
];

export function DropdownPrice({ form, setForm, disableOnChange }) {
  const { price } = form;

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
        <InputLabel id="demo-simple-select-label">
          Select Price Range
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="price"
          value={price}
          label="Select Price Range"
          onChange={handleChange}
        >
          {PriceData.map((values) => (
            <MenuItem key={values._id} value={values.title}>
              {values.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
