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
  import React,{ useEffect } from "react";
  
  const DecorType = [
    { _id: 1, title: "Birthday Decor" },
    { _id: 2, title: "Wedding Decor" },
    { _id: 3, title: "Party Decor" },
    { _id: 4, title: "Meeting Arrangements" },
  ];
  
  export default function DropdownDecorType({
    selectedDecor,
    setSelectedDecor,
    form,
    setForm,
  }) {
    const { decorType } = form;
  
    const handleChange = (e) => {
      setSelectedDecor(e.target.value); // Update selectedEquipment with the new selection
      setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    };
  
    const selectedTagsText = (selected) => {
      if (selected) {
        const selectedTitles = selected
          .map((tagID) => {
            const selectedData = DecorType.find((tag) => tag.title === tagID);
            return selectedData ? selectedData.title : null;
          })
          .filter((title) => title !== null);
  
        return selectedTitles.join(",");
      }
      return "";
    };
  
    useEffect(() => {
      if (decorType) {
        setSelectedDecor(decorType);
      } else {
        setSelectedDecor([]);
      }
    }, [decorType]);
  
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
            Select Decor Type
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            required
            id="demo-multiple-checkbox"
            multiple
            name="decorType"
            label="Select Decor Type"
            value={selectedDecor || []}
            onChange={handleChange}
            input={
              <OutlinedInput sx={{ height: "100%" }} label="Select Decor Type" />
            }
            renderValue={(selected) => selectedTagsText(selected)}
          >
            {DecorType.map((item) => (
              <MenuItem key={item._id} value={item.title}>
                <Checkbox checked={selectedDecor?.indexOf(item.title) > -1} />
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }  