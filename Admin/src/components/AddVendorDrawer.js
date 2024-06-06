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
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { DropdownVendor } from './DropdownVendor';
import DropdownCity from './DropdownCity';
import { DropdownVenue } from './DropdownVenue';
import { useCreateVendorMutation } from '../store/registrationSlice';

const Content = ({ toggleDrawer, refetchAgain }) => {
  const [isValidNumber, setIsValidNumber] = useState(null);
  const [createVendor, { isSuccess, isLoading }] = useCreateVendorMutation();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    number: '',
    type: 'Vendor',
    vendor: '',
    city: '',
  });
  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const addVendor = async (e) => {
    e.preventDefault();
    const formData = {
      firstname: form.firstname,
      lastname: form.lastname,
      gender: form.gender,
      email: form.email,
      number: form.number,
      type: form.type,
      city: form.city,
      vendor: form.vendor,
    };
;
    const data = await createVendor(formData);
    
    if (data?.error?.status === 400) {
      toast.error(data?.error?.data?.message);
    }
    if (data?.error?.status === 500) {
      toast.error('Something went wrong.Please try again!');
    }
  };

  const handleChangePhone = (newValue) => {
    matchIsValidTel(newValue); // boolean
    setIsValidNumber(matchIsValidTel(newValue));
  };

  const closeToggleDrawer = ()=>{
    toggleDrawer(false);
  }

  useEffect(() => {
    if (isSuccess) {
      refetchAgain()
      closeToggleDrawer()
      toast.success('Vendor Created Successfully');
    }
  }, [isSuccess]);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: '3rem' }}>
        <Typography variant="h6">Add New Vendor</Typography>
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
              label="First Name"
              placeholder="Enter First Name"
              name="firstname"
              value={form.firstname}
              onChange={onChange}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              placeholder="Enter Last Name"
              name="lastname"
              value={form.lastname}
              onChange={onChange}
            />
          </Grid>{' '}
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" value={form.gender} onChange={onChange} row>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12} mt={2}>
            <TextField
              required
              id="outlined-required"
              label="Email Address"
              placeholder="Enter Email Address"
              name="email"
              value={form.email}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <DropdownVendor {...{ form, setForm }} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <DropdownCity {...{ form, setForm }} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={1.8}>
            <Box
              sx={{
                minWidth: 160,
                backgroundColor: 'white',
                borderRadius: '8px',
              }}
            >
              <MuiTelInput
                required
                id="outlined-required"
                label="Contact No"
                placeholder="Enter contact number"
                name="number"
                defaultCountry="PK"
                value={form.number}
                error={isValidNumber === false}
                helperText={isValidNumber === false && 'Incorrect entry.'}
                onChange={(newValue) => {
                  const event = {
                    target: { name: 'number', value: newValue },
                  };
                  onChange(event);
                  handleChangePhone(newValue);
                }}
                sx={{
                  padding: '3px',
                  '& .MuiInputLabel-root': {
                    padding: '3px',
                  },
                }}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent={'flex-end'} sx={{ marginTop: '3rem' }}>
          <Button
            type="submit"
            disable={isLoading}
            fullWidth
            variant="contained"
            sx={{
              fontFamily: 'Semibold',
              width: '8rem',
            }}
            onClick={addVendor}
          >
           {isLoading ? "Loading....." :  'Add Vendor'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default function AddVendorDrawer({ open, toggleDrawer, refetchAgain }) {
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
        <Content toggleDrawer={() => toggleDrawer(false)} refetchAgain={refetchAgain} />
      </Drawer>
    </React.Fragment>
  );
}
