import React, { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import {
  IconButton,
  Card,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Link,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import DropdownCity from "../../Components/DropdownCity";
import { DropdownVendor } from "../../Components/DropdownVendor";
import { useIsMobile } from "../../contexts/isMobile";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/usersSlice";
import { vendorCreationNotificationAdmin } from "../../utils";
import { useCreateNotificationMutation } from "../../store/notificationsSlice";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

export default function SignUp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Integrating the registratiom api
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const [createNotification] = useCreateNotificationMutation();

  const [isValidNumber, setIsValidNumber] = useState(null);
  const [experience, setExperience] = useState(null);
  const [form, setForm] = useState({
    account: "",
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    phone: "",
    city: "",
    vendor: "",
    type: "",
    password: "",
    cnfrmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const isMobile = useIsMobile();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePhone = (newValue) => {
    matchIsValidTel(newValue); // boolean
    setIsValidNumber(matchIsValidTel(newValue));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));

    // Validation logic
    let errorMessages = { ...errors };
    if (name === "firstname" || name === "lastname") {
      if (value.length < 3) {
        errorMessages[name] = "Must be at least 3 characters";
      } else {
        delete errorMessages[name];
      }
    } else if (name === "email") {
      if (!value.includes("@")) {
        errorMessages[name] = "Invalid email address";
      } else {
        delete errorMessages[name];
      }
    }
    setErrors(errorMessages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form?.password !== form?.cnfrmpassword) {
      toast.error("The passwords are not the same");
    } else {
      const formData = {
        firstname: form.firstname,
        lastname: form.lastname,
        gender: form.gender,
        email: form.email,
        number: form.phone,
        city: form.city,
        type: form.type,
        password: form.password,
        experience: null,
      };

      if (form.vendor) {
        formData.vendor = form.vendor;
        formData.account = form.account;
        formData.experience = experience;
      }

      let data;
      if ((form.type === "Vendor" && experience) || form.type === "Client") {
        data = await register(formData);
      } else {
        toast.error("Please upload resume!");
      }

      if (data?.data?._id && form.type === "Vendor") {
        const notificationData = vendorCreationNotificationAdmin(
          data?.data?._id,
          data?.data?.name
        );
        await createNotification(notificationData);
      }
      if (data?.error?.status === 400) {
        toast.error(data?.error?.data?.message);
      }
      if (data?.error?.status === 500) {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setExperience(selectedFile);
  };

  const handleUploadButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  // useEffect will run when api will be successfully hit
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Created");
      return navigate("/login");
    }
  }, [isLoading, isSuccess]);

  return (
    <Container component="main" maxWidth="sm">
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
          <Grid container spacing={2}>
            <Grid md={12} xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </div>
              <Typography component="h1" variant="h5" textAlign="center">
                Sign Up
              </Typography>
            </Grid>
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container>
              <Grid item xs>
                <Typography fontSize={14}>
                  Already have an account? {"  "}
                  <Link href="/login">Sign In</Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent={isMobile ? "center" : "left"}
            >
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  value={form.firstname}
                  name="firstname"
                  onChange={onChange}
                  error={Boolean(errors.firstname)}
                  helperText={errors.firstname}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  value={form.lastname}
                  label="Last Name"
                  name="lastname"
                  onChange={onChange}
                  error={Boolean(errors.lastname)}
                  helperText={errors.lastname}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={form.gender}
                    onChange={onChange}
                    row
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  value={form.email}
                  label="Email Address"
                  name="email"
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box
                  sx={{
                    minWidth: 160,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                  marginTop={2}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Registration Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form.type}
                      label="Select Registration Type"
                      onChange={onChange}
                      name="type"
                    >
                      <MenuItem key="vendor" value="Vendor">
                        Vendor
                      </MenuItem>
                      <MenuItem key="client" value="Client">
                        Client
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {form.type === "Vendor" ? (
                <>
                  <Grid item xs={12} sm={6} md={6} marginTop={2}>
                    <DropdownVendor {...{ form, setForm }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="account"
                      value={form.account}
                      label="Account Number"
                      name="account"
                      onChange={onChange}
                    />
                  </Grid>
                </>
              ) : (
                <></>
              )}

              <Grid item xs={12} sm={6} md={6} marginTop={2}>
                <DropdownCity {...{ form, setForm }} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} marginTop={1.8}>
                <Box
                  sx={{
                    minWidth: 160,
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <MuiTelInput
                    required
                    id="outlined-required"
                    label="Contact No"
                    placeholder="Enter contact number"
                    name="phone"
                    defaultCountry="PK"
                    value={form.phone}
                    error={isValidNumber === false}
                    helperText={isValidNumber === false && "Incorrect entry."}
                    onChange={(newValue) => {
                      const event = {
                        target: { name: "phone", value: newValue },
                      };
                      onChange(event);
                      handleChangePhone(newValue);
                    }}
                    sx={{
                      padding: "3px",
                      "& .MuiInputLabel-root": {
                        padding: "3px",
                      },
                    }}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} mt={2}>
                <FormControl
                  variant="outlined"
                  sx={{ width: isMobile ? "19rem" : "15rem" }}
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
              <Grid item xs={12} md={6} mt={2}>
                <FormControl
                  variant="outlined"
                  sx={{ width: isMobile ? "19rem" : "15rem" }}
                >
                  <InputLabel htmlFor="outlined-adornment-cnfrmpassword">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    value={form.cnfrmpassword}
                    onChange={onChange}
                    name="cnfrmpassword"
                    id="outlined-adornment-cnfrmpassword"
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
                    label="Confirm Password"
                  />
                </FormControl>
              </Grid>

              {form.type === "Vendor" && (
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      border: "1px solid grey",
                      borderRadius: "8px",
                      height: "3.5rem",
                      mt: 2,
                    }}
                  >
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      id="experience"
                      name="experience"
                    />

                    <Button
                      onClick={handleUploadButtonClick}
                      fullWidth
                      variant="contained"
                      sx={{
                        m: 1,
                        fontFamily: "Semibold",
                        width: "10rem",
                      }}
                    >
                      Upload Resume
                    </Button>
                    <Typography
                      sx={{
                        mt: "-2.5rem",
                        ml: "11rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {experience?.name}
                    </Typography>
                  </Box>
                </Grid>
              )}

              <Grid item md={12} textAlign="center">
                <Button
                  disabled={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontFamily: "Semibold",
                    width: "8rem",
                  }}
                >
                  {isLoading ? "Loading..." : "Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
