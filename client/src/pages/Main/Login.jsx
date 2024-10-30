import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthLoginComponent from "../../components/Main/AuthLoginComponent";
import Box from "@mui/material/Box";
import Footer from "../../components/Main/Footer";
import AppAppBar from "../../components/Main/AppAppBar";
import CssBaseline from "@mui/material/CssBaseline";
import getLPTheme from "./getLPTheme";
import useDocumentTitle from "../../useDocumentTitle";

// const defaultTheme = createTheme();

function Login() {
  useDocumentTitle("Login - Adethix");
  const [mode, setMode] = React.useState("light");
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  // const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <AuthLoginComponent />

      <Box sx={{ bgcolor: "background.default" }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default Login;
