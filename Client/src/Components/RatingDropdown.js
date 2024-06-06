import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const RatingData = [
  { _id: 1, title: "1 Star", value: 1 },
  { _id: 2, title: "2 Stars", value: 2 },
  { _id: 3, title: "3 Stars", value: 3 },
  { _id: 4, title: "4 Stars", value: 4 },
  { _id: 5, title: "5 Stars", value: 5 },
];

export default function RatingDropdown({ form, setForm }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { rating } = form;

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
        <InputLabel id="demo-controlled-open-select-label">
          Select Rating
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={rating}
          name="rating"
          label="Select Rating"
          onChange={handleChange}
        >
          {RatingData.map((values) => (
            <MenuItem key={values._id} value={values.value}>
              {values.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
