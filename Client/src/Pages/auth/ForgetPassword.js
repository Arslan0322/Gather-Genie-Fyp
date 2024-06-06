import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../store/usersSlice";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [form, setForm] = useState({
    email: "",
  });

  const [forgetPassword, {isLoading}] = useForgetPasswordMutation()

  const onChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await forgetPassword(form.email);

    if(data?.error){
      toast.error("User not found")
    } else {
      toast.success("Email has been send.")
      setForm({email:""})
    }



  };

  return (
    <Container component="main" maxWidth="xs">
      <Card
        elevation={2}
        sx={{
          marginTop: "8rem",
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
            Forget Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item md={11} xs={11}>
                <Typography variant="body1" textAlign="left">
                  Enter your email here to reset your password
                </Typography>
              </Grid>
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
              <Grid item xs={6} md={6} mt={2}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontFamily: "Semibold" }}
                >
                  Send Email
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
