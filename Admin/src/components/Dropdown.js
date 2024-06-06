import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function Dropdown({ form, setForm, title, name, data }) {
  const handleChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <Box
      sx={{
        minWidth: 160,
        backgroundColor: 'white',
        borderRadius: '8px',
        marginBottom: '10px',
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select {title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={form}
          label={title}
          onChange={handleChange}
        >
          {data.map((item) => (
            <MenuItem key={item._id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
