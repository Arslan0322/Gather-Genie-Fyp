import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, Card, FormControl, InputLabel } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useIsMobile } from "../../contexts/isMobile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/usersSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../store/authSlice";
import Loader from "../../Components/Loader";

export default function Login() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Integrating login api
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await login(form);

    if (response?.error?.status === 401) {
      // Display the error message for invalid email or password
      toast.error(response?.error?.data?.message);
      return; // Exit the function to prevent further execution
    }

    // Check for other conditions and navigate accordingly
    dispatch(setCredentials({ ...response }));

    if (response?.data?.vendor === null) {
      return navigate("/");
    } else if (response?.data?.vendor !== null) {
      return navigate("/home");
    }
  };

  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("You have logged in successfully");
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Card
        elevation={2}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ m: 4 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <Typography component="h1" variant="h5" textAlign="center">
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item md={11} xs={11}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={11} md={11} mt={2}>
                <FormControl
                  variant="outlined"
                  sx={{ width: isMobile ? "17rem" : "19rem" }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={onChange}
                    value={form.password}
                    name="password"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6} mt={2}>
                <Button
                  disable={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontFamily: "Semibold" }}
                >
                  {isLoading ? "Loading..." : "Log In"}
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ fontSize: "12px" }}>
              <Grid item xs>
                <Typography sx={{ fontSize: "11px" }}>
                  Don't have an account? {"  "}
                  <br />
                  <Link href="/signup">Sign Up</Link>
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography sx={{ fontSize: "11px", textAlign: "right" }}>
                  <Link href="/forgetpass">Forget Password?</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
