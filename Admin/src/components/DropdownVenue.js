import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const VenueData = [
  { _id: 1, title: 'Indoor Hall' },
  { _id: 2, title: 'Marquee' },
  { _id: 3, title: 'Farm House' },
  { _id: 4, title: 'Outdoor Hall' },
];

export function DropdownVenue({ form, setForm }) {
  const { venuetype } = form;

  const handleChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <Box
      sx={{
        minWidth: 160,
        backgroundColor: 'white',
        borderRadius: '8px',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Venue</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="venuetype"
          value={venuetype}
          label="Venue"
          onChange={handleChange}
        >
          {VenueData.map((values) => (
            <MenuItem key={values._id} value={values.title}>
              {values.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
