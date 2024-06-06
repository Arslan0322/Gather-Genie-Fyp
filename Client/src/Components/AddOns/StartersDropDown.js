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

export const StartersData = [
  { _id: 1, title: "Prawns" },
  { _id: 2, title: "Soup" },
  { _id: 3, title: "Crakers" },
];
export default function StartersDropDown({
  selectedStarters,
  setSelectedStarters,
  addOnsData,
  setAddOnsData,
}) {
  const handleChange = (e) => {
    setSelectedStarters(e.target.value);
    // We will filter the e.target.value if it is twice clicked
  };

  const selectedTagsText = (selected) =>
    selected?.map((tagID) => {
      if (tagID?.title) {
        return StartersData?.find((tag) => tag?.title === tagID?.title)?.title;
      } else {
        return StartersData?.find((tag) => tag?.title === tagID)?.title;
      }
    });

  useEffect(() => {
    const filteredArray = addOnsData?.map((items) => {
      if (items?.title === "Starters") {
        // Filter out items that are already in selectedStarters
        const filteredCategory = items?.category.filter((data) =>
          selectedStarters.includes(data?.title)
        );

        return {
          ...items,
          category: [...filteredCategory],
        };
      } else {
        return items;
      }
    });
  }, [selectedStarters, addOnsData]);

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
        <InputLabel id="demo-multiple-checkbox-label">Starters</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="selectedStarters"
          value={selectedStarters || []}
          label="Starters"
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="Starters" />}
          renderValue={(selected) => selectedTagsText(selected).join(", ")}
        >
          {StartersData.map((item, index) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox
                checked={
                  selectedStarters[index]?.title
                    ? selectedStarters.findIndex(
                        (addon) => addon.title === item?.title
                      ) > -1
                    : selectedStarters.indexOf(item?.title) > -1
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
