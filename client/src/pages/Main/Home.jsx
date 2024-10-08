import * as React from "react";
// import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AppAppBar from "../../components/Main/AppAppBar";
import Hero from "../../components/Main/Hero"; //
import LogoCollection from "../../components/Main/LogoCollection"; //
import Highlights from "../../components/Main/Highlights"; //
import Pricing from "../../components/Main/Pricing"; //
import Features from "../../components/Main/Features"; //
import Testimonials from "../../components/Main/Testimonials"; //
import FAQ from "../../components/Main/FAQ"; //
import Footer from "../../components/Main/Footer";
import getLPTheme from "./getLPTheme";
import useDocumentTitle from "../../useDocumentTitle";

// function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100dvw",
//         position: "fixed",
//         bottom: 24,
//       }}
//     >
//       <ToggleButtonGroup
//         color="primary"
//         exclusive
//         value={showCustomTheme}
//         onChange={toggleCustomTheme}
//         aria-label="Platform"
//         sx={{
//           backgroundColor: "background.default",
//           "& .Mui-selected": {
//             pointerEvents: "none",
//           },
//         }}
//       >
//         <ToggleButton value>
//           <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
//           Custom theme
//         </ToggleButton>
//         <ToggleButton value={false}>Material Design 2</ToggleButton>
//       </ToggleButtonGroup>
//     </Box>
//   );
// }

// ToggleCustomTheme.propTypes = {
//   showCustomTheme: PropTypes.shape({
//     valueOf: PropTypes.func.isRequired,
//   }).isRequired,
//   toggleCustomTheme: PropTypes.func.isRequired,
// };

export default function Home() {
  useDocumentTitle("Adethix");
  const [mode, setMode] = React.useState("light");
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  // const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // const toggleCustomTheme = () => {
  //   setShowCustomTheme((prev) => !prev);
  // };

  return (
    // <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: "background.default" }}>
        {/* <LogoCollection /> */}
        <Divider />
        <Features />
        <Divider />
        {/* <Testimonials /> */}
        <Highlights />
        {/* <Divider /> */}
        {/* <Pricing /> */}
        {/* <Divider /> */}
        {/* <FAQ /> */}
        {/* <Divider /> */}
        <Footer />
      </Box>
      {/* <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
    </ThemeProvider>
  );
}
