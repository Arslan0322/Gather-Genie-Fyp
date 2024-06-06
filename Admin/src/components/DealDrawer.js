import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DropdownCity from './DropdownCity';
import { Dropdown } from './Dropdown';
import { DealsData } from '../pages/Deals/DealsUtils';

const Content = ({ toggleDrawer }) => {
  const [isValidNumber, setIsValidNumber] = useState(null);
  const [form, setForm] = useState({
    dealname: '',
    eventplanner: '',
    decor: '',
    caterer: '',
    venue: '',
    carrental: '',
    photographer: '',
    city: '',
  });
  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const addDeal = () => {
    console.log(form);
    // toggleDrawer(false);
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: '3rem' }}>
        <Typography variant="h6">Add New Deal</Typography>
        <Box sx={{ cursor: 'pointer' }} onClick={() => toggleDrawer(false)}>
          <CloseIcon />
        </Box>
      </Stack>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Deal Name"
              placeholder="Enter Deal Name"
              name="dealname"
              value={form.dealname}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <DropdownCity {...{ form, setForm }} />
          </Grid>

          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <Dropdown {...{ form: form.venue, setForm, data: DealsData, title: 'Venue', name: 'venue' }} />
          </Grid>

          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <Dropdown {...{ form: form.caterer, setForm, data: DealsData, title: 'Caterer', name: 'caterer' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <Dropdown {...{ form: form.carrental, setForm, data: DealsData, title: 'Car Rental', name: 'carrental' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <Dropdown {...{ form: form.decor, setForm, data: DealsData, title: 'Decor', name: 'decor' }} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <Dropdown
              {...{ form: form.eventplanner, setForm, data: DealsData, title: 'Event Planner', name: 'eventplanner' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <Dropdown
              {...{ form: form.photographer, setForm, data: DealsData, title: 'Photographer', name: 'photographer' }}
            />
          </Grid>

          <Grid item md={6} xs={12} mt={2}>
            <TextField
              required
              id="outlined-required"
              label="Total Price"
              placeholder="Total deal Price"
              name="price"
              value={form.price}
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent={'flex-end'} sx={{ marginTop: '3rem' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              fontFamily: 'Semibold',
              width: '8rem',
            }}
            onClick={addDeal}
          >
            Add Deal
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default function DealsDrawer({ open, toggleDrawer }) {
  return (
    <React.Fragment key={'anchor'}>
      <Drawer
        sx={{
          display: { sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            overflowX: 'hidden',
            width: '50%',
          },
        }}
        anchor="right"
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        <Content toggleDrawer={() => toggleDrawer(false)} />
      </Drawer>
    </React.Fragment>
  );
}
