// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

function VerifyEmailComponent() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const emailVerifyToken = searchParams.get("token");
    setToken(emailVerifyToken);
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(token);
    let url = `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/verify-email`;

    try {
      let response = await axios.post(url, { token });

      if (response?.status === 200) {
        // console.log(response.data);
        toast.success("Email verified! Our team will contact you soon.");
        navigate("/");
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
            Verify Email
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
              name="token"
              label="Token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              id="token"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Verify Email
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 4, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default VerifyEmailComponent;
