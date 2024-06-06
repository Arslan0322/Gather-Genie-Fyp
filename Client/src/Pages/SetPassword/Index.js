import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useIsMobile } from "../../contexts/isMobile";
import { useState } from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {useSetPasswordMutation} from "../../store/usersSlice";

export default function SetPassword() {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const [setPassword] = useSetPasswordMutation()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    cnfrmpassword: "",
    password: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form?.password !== form?.cnfrmpassword) {
      toast.error("The password are not same");
    } else {
      const body = {
        id,
        password: form?.password
      }
      const responseData = await setPassword(body)
      if(responseData?.error?.status === 404){
        toast.error(responseData?.error?.data?.error);
      }else{
        toast.success("Password Updated Successfully");
        navigate("/login");
      }
    }
  };
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
              <LockResetIcon />
            </Avatar>
          </div>
          <Typography component="h1" variant="h5" textAlign="center">
            Set Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} justifyContent={"center"}>
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
              <Grid item xs={11} md={11} mt={2}>
                <FormControl
                  variant="outlined"
                  sx={{ width: isMobile ? "17rem" : "19rem" }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={onChange}
                    value={form.cnfrmpassword}
                    name="cnfrmpassword"
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontFamily: "Semibold" }}
                >
                  Set Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
