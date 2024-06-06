import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const eventTypeData = [
  { _id: 1, title: "Wedding" },
  { _id: 2, title: "Birthday Party" },
  { _id: 3, title: "Parties" },
  { _id: 4, title: "Meetings" },
  { _id: 5, title: "Exhibitions" },
  { _id: 6, title: "Other Events" },
];

export function DropdownEvent({ form, setForm }) {
  const { eventType  } = form;

  const handleChange = (e) => {

   
    setForm((form) => ({ ...form, eventType: e.target.value }))
   
  };

  
  return (
    <>
      <Box
        sx={{
            minWidth: 160,
            backgroundColor: "white",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Event Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="eventType"
            value={eventType}
            label="Select Event Type"
            onChange={handleChange}
          >
            {eventTypeData.map((values) => (
              <MenuItem key={values._id} value={values.title}>
                {values.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        </>)
        }