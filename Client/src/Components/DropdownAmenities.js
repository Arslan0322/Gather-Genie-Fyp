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

const Amenities = [
  { _id: 1, title: "Audio Visual Equipment" },
  { _id: 2, title: "Valet Parking" },
  { _id: 3, title: "Dance Floor" },
];

export default function DropdownAmenities({
  selectedAmenities,
  setSelectedAmenities,
  form,
  setForm,
}) {
  const { amenities } = form;

  const handleChange = (e) => {
    setSelectedAmenities(e.target.value); // Update selectedAmenities with the new selection
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const selectedTagsText = (selected) => {
    if (selected) {
      const selectedTitles = selected
        .map((tagID) => {
          const selectedAmenity = Amenities.find((tag) => tag.title === tagID);
          return selectedAmenity ? selectedAmenity.title : null;
        })
        .filter((title) => title !== null);

      return selectedTitles.join(",");
    }
    return "";
  };

  useEffect(() => {
    if (amenities) {
      setSelectedAmenities(amenities);
    }
  }, [amenities]);

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
          Select Amenities
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="amenities"
          label="Select Amenities"
          value={selectedAmenities || []} // Use selectedAmenities, not amenities
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="Amenities" />}
          renderValue={(selected) => selectedTagsText(selected)}
        >
          {Amenities.map((item) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox checked={selectedAmenities?.indexOf(item.title) > -1} />
              <ListItemText primary={item.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
