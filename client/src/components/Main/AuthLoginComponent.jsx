// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        component={RouterLink}
        color="inherit"
        to={import.meta.env.VITE_HOME_PAGE}
        sx={{ textDecoration: "none" }}
      >
        Adethix
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

function AuthLoginComponent() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    let url = `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/login`;
    try {
      let sendingData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      let response = await axios.post(url, sendingData);

      if (response?.status === 200) {
        // console.log(response.data)
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate(-1);
      }
    } catch (err) {
      toast.error(err.response.data.message.replace(/"/g, ""));
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              LOGIN
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AuthLoginComponent;
