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

export const DesertsData = [
  { _id: 1, title: "Halwa" },
  { _id: 2, title: "Kheer" },
  { _id: 3, title: "Ice Cream" },
];
export default function DesertsDropdown({
  selectedDeserts,
  setSelectedDeserts,
  addOnsData,
  setAddOnsData,
}) {

  const handleChange = (e) => {
    setSelectedDeserts(e.target.value);
    // We will filter the e.target.value if it is twice clicked
  };

  const selectedTagsText = (selected) =>
    selected?.map((tagID) => {
      if (tagID?.title) {
        return DesertsData?.find((tag) => tag?.title === tagID?.title)?.title;
      } else {
        return DesertsData?.find((tag) => tag?.title === tagID)?.title;
      }
    });

  useEffect(() => {
    const filteredArray = addOnsData?.map((items) => {
      if (items?.title === "Deserts") {
        // Filter out items that are already in selectedDeserts
        const filteredCategory = items?.category?.filter((data) =>
          selectedDeserts?.includes(data?.title)
        );

        return {
          ...items,
          category: [...filteredCategory],
        };
      } else {
        return items;
      }
    });
  }, [selectedDeserts, addOnsData]);

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
        <InputLabel id="demo-multiple-checkbox-label">Deserts</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          required
          id="demo-multiple-checkbox"
          multiple
          name="selectedDeserts"
          value={selectedDeserts || []}
          label="Deserts"
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "100%" }} label="Deserts" />}
          renderValue={(selected) => selectedTagsText(selected).join(", ")}
        >
          {DesertsData.map((item, index) => (
            <MenuItem key={item._id} value={item.title}>
              <Checkbox
                checked={
                  selectedDeserts && selectedDeserts[index]?.title
                    ? selectedDeserts.findIndex(
                        (addon) => addon.title === item?.title
                      ) > -1
                    : selectedDeserts && selectedDeserts.indexOf(item?.title) > -1
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
