import * as React from "react";
// import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "../../components/Main/AppAppBar";
import Footer from "../../components/Main/Footer";
import getLPTheme from "./getLPTheme";
import useDocumentTitle from "../../useDocumentTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, TextField, Button } from "@mui/material";
import VerifyEmailComponent from "../../components/Main/VerifyEmailComponent";

function VerifyEmail() {
  useDocumentTitle("Verify email - Adethix");
  const [mode, setMode] = React.useState("light");
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  // const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    // let url = `${import.meta.env.VITE_BACKEND_API_URL}/api/publisher/signin`;
    try {
      let formData = {
        email: data.get("email"),
        password: data.get("password"),
      };
      console.log(formData);
      //   let response = await axios.post(url, sendingData);

      //   if (response?.status === 200) {
      //     // console.log(response.data)
      //     toast.success(response.data.message);
      //     localStorage.setItem("token", response.data.token);
      //     navigate("/publisher/dashboard");
      //   }
    } catch (err) {
      toast.error(err.response.data.message.replace(/"/g, ""));
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <VerifyEmailComponent />

      <Box sx={{ bgcolor: "background.default" }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default VerifyEmail;
