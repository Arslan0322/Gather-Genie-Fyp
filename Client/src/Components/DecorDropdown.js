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
  
  export default function DropdownDecor({
    form,
    setForm,
  }) {
    const { decorType } = form;
  
    const handleChange = (e) => {
      setForm((form) => ({ ...form, decorType : e.target.value }));
    };
  
    return (
      <Box
      sx={{
        minWidth: 160,
        backgroundColor: "white",
        marginBottom: "10px",
        borderRadius: "8px",
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
            name="decorType"
            label="Select Decor Type"
            value={decorType}
            onChange={handleChange}
          >
            {DecorType.map((item) => (
              <MenuItem key={item._id} value={item.title}>
               {item.title} 
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }  