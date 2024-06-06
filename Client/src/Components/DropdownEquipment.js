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

const Equipment = [
  { _id: 1, title: "Photography" },
  { _id: 2, title: "Videography" },
  { _id: 3, title: "Drone" },
];

export default function DropdownEquipment({
  selectedEquipment,
  setSelectedEquipment,
  form,
  setForm,
}) {
  const { equipment } = form;

  const handleChange = (e) => {
    setSelectedEquipment(e.target.value); // Update selectedEquipment with the new selection
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const selectedTagsText = (selected) => {
    if (selected) {
      const selectedTitles = selected
        .map((tagID) => {
          const selectedData = Equipment.find((tag) => tag.title === tagID);
          return selectedData ? selectedData.title : null;
        })
        .filter((title) => title !== null);

      return selectedTitles.join(",");
    }
    return "";
  };

  useEffect(() => {
    if (equipment) {
      setSelectedEquipment(equipment);
    } else {
      setSelectedEquipment([]);
    }
  }, [equipment]);

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
          Select Equipment
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="equipment"
          label="Select Equipment"
          value={selectedEquipment || []} // Use selectedEquipment, not Equipment
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="Equipment" />}
          renderValue={(selected) => selectedTagsText(selected)}
        >
          {Equipment.map((item) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox checked={selectedEquipment?.indexOf(item.title) > -1} />
              <ListItemText primary={item.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
