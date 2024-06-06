import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
// components
import Iconify from '../../../components/iconify';
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    if (form.email === account.email && form.password === account.password) {
      const localStorageObject = {id: 1234,isLogin:true}
      localStorage.setItem('isLogin', JSON.stringify(localStorageObject));
      // localStorage.setitem('id', '2');

      navigate('/home/app', { replace: true });
      toast.success('Login Successful');
    }
  };

  return (
    <>
      <Stack spacing={3} mb={4}>
        <TextField name="email" label="Email address" value={form.email} onChange={handleChange} />

        <TextField
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
