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

export const BeveragesData = [
  { _id: 1, title: "Coffee" },
  { _id: 2, title: "Tea" },
  { _id: 3, title: "Green Tea" },
];
export default function BeveragesDropdown({
  selectedBeverages,
  setSelectedBeverages,
  addOnsData,
  setAddOnsData,
}) {
  const handleChange = (e) => {
    setSelectedBeverages(e.target.value);
    // We will filter the e.target.value if it is twice clicked
  };

  const selectedTagsText = (selected) =>
    selected?.map((tagID) => {
      if (tagID?.title) {
        return BeveragesData?.find((tag) => tag?.title === tagID?.title)?.title;
      } else {
        return BeveragesData?.find((tag) => tag?.title === tagID)?.title;
      }
    });

  useEffect(() => {
    const filteredArray = addOnsData?.map((items) => {
      if (items?.title === "Beverages") {
        // Filter out items that are already in selectedDeserts
        const filteredCategory = items?.category.filter((data) =>
          selectedBeverages.includes(data?.title)
        );

        return {
          ...items,
          category: [...filteredCategory],
        };
      } else {
        return items;
      }
    });
  }, [selectedBeverages, addOnsData]);

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
        <InputLabel id="demo-multiple-checkbox-label">Beverages</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="selectedBeverages"
          value={selectedBeverages || []}
          label="Beverages"
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="Beverages" />}
          renderValue={(selected) => selectedTagsText(selected).join(", ")}
        >
          {BeveragesData?.map((item, index) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox
                checked={
                  selectedBeverages && selectedBeverages[index]?.title
                    ? selectedBeverages.findIndex(
                        (addon) => addon.title === item?.title
                      ) > -1
                    : selectedBeverages && selectedBeverages.indexOf(item?.title) > -1
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
