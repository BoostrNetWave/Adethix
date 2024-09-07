import * as React from "react";
// import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "../../components/Main/AppAppBar";
import GoogleAdsComparisionComponent from "../../components/Main/GoogleAdsComparisionComponent";
import Footer from "../../components/Main/Footer";
import getLPTheme from "./getLPTheme";
import useDocumentTitle from "../../useDocumentTitle";

export default function GoogleAdsComparision() {
  useDocumentTitle("Google ads comparision - Adethix");
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
      <GoogleAdsComparisionComponent />
      <Box sx={{ bgcolor: "background.default" }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}