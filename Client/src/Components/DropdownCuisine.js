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
import { useEffect } from "react";

const CuisineData = [
  { _id: 1, title: "Italian" },
  { _id: 2, title: "Continental" },
  { _id: 3, title: "Asian" },
  { _id: 4, title: "Indian" },
  { _id: 5, title: "Chinese" },
];

export default function DropdownCuisine({
  selectedCuisine,
  setSelectedCuisine,
  form,
  setForm,
}) {
  const { cuisine } = form;

  const handleChange = (e) => {
    setSelectedCuisine(e.target.value);
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const selectedTagsText = (selected) => {
    if (selected) {
      const selectedTitles = selected
        .map((tagID) => {
          const selectedData = CuisineData.find((tag) => tag.title === tagID);
          return selectedData ? selectedData.title : null;
        })
        .filter((title) => title !== null);

      return selectedTitles.join(",");
    }
    return "";
  };

  useEffect(() => {
    if (cuisine) {
      setSelectedCuisine(cuisine);
    } else {
      setSelectedCuisine([]);
    }
  }, [cuisine]);

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
        <InputLabel id="demo-multiple-checkbox-label">
          Select Cuisine
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="cuisine"
          label="Select Cuisine"
          value={selectedCuisine || []}
          onChange={handleChange}
          input={
            <OutlinedInput sx={{ height: "100%" }} label="Select Cuisine" />
          }
          renderValue={(selected) => selectedTagsText(selected)}
        >
          {CuisineData.map((item) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox checked={selectedCuisine?.indexOf(item.title) > -1} />
              <ListItemText primary={item.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}