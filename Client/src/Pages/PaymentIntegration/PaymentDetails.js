import {
  Box,
  Card,
  Container,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import cards from "../../assests/payment cards.png";
import BookingDetails from "./BookingDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function PaymentDetails() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const [form, setForm] = useState({
    fullname: "",
    cardnum: "",
    expirydate: "",
    phone: "",
    cvv: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    // dispatch(emptyCart());
    toast.success("Your order is placed successfully");
  };

  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Card
            elevation={2}
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Box
              sx={{ m: 6 }}
              component="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid md={6} xs={12}>
                  <Grid container spacing={3} alignItems="center" p={2}>
                    <Grid item>
                      <IconButton onClick={handleBackClick}>
                        <ArrowBackIosIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Payment Methods</Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ m: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6}>
                        <Typography variant="h6">Pay with</Typography>
                      </Grid>
                      <Grid item md={6} mt={0.5} xs={6}>
                        <img
                          src={cards}
                          alt="Logo"
                          style={{
                            width: 110,

                            alignItems: "flex-end",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={10}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="fullname"
                          value={form.fullname}
                          label="Full Name"
                          id="fullname"
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={10} mt={2}>
                        <FormControl
                          variant="outlined"
                          sx={{ width: "17.5rem" }}
                        >
                          <InputLabel htmlFor="outlined-adornment-cardnum">
                            Card Number
                          </InputLabel>
                          <OutlinedInput
                            onChange={onChange}
                            value={form.cardnum}
                            name="cardnum"
                            id="outlined-adornment-cardnum"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <LockOpenOutlinedIcon />
                                  ) : (
                                    <LockOutlinedIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Card Number"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={10}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="expirydate"
                          label="Expiry Date"
                          name="expirydate"
                          value={form.expirydate}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item xs={6} md={10}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="cvv"
                          label="CVV"
                          name="cvv"
                          onChange={onChange}
                          value={form.cvv}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid md={6} xs={12}>
                  <BookingDetails />
                </Grid>
                <Grid item md={12} xs={12} textAlign="center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontFamily: "Semibold",
                      width: "10rem",
                    }}
                    // href="/bookings"
                  >
                    Pay Now
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentDetails;
