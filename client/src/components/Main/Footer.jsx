import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";

import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import siteLogo from "../../assets/logo.png";

const logoStyle = {
  width: "150px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link component={RouterLink} to={import.meta.env.VITE_HOME_PAGE}>
        Adethix&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 4 },
        pb: { xs: 4, sm: 5 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      {/* section - 2 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
          // flexWrap: {xs: "wrap"}
          alignItems: { xs: "center", sm: "start" },
          borderTop: "1px solid",
          borderColor: "divider",
          pt: 3,
        }}
      >
        {/* brand */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: 4,
            alignItems: "start",
            textAlign: "start",
            // minWidth: {  sm: "60%" },
            minWidth: { xs: "300px", sm: "300px" },
          }}
        >
          {/* <Box sx={{ width: { sm: "60%" } }}> */}
          <Box sx={{ width: { xs: "300px", sm: "300px" } }}>
            {/* brand logo */}
            <Box sx={{ ml: "-15px" }}>
              
              <img src={siteLogo} alt="adethix" style={logoStyle}/>
            </Box>

            {/* brand links */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pt: { xs: 1, sm: 1 },
                width: "100%",
                // borderTop: "1px solid",
                // borderColor: "divider",
              }}
            >
              {/* <Box>
                <Link component={RouterLink} color="text.secondary" to="privacy-policy">
                  Privacy Policy
                </Link>
                <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
                  &nbsp;•&nbsp;
                </Typography>
                <Link component={RouterLink} color="text.secondary" to="terms-of-service">
                  Terms of Service
                </Link>
              </Box> */}
              <Copyright />
              <Stack
                direction="row"
                justifyContent="left"
                spacing={1}
                useFlexGap
                sx={{
                  color: "text.secondary",
                }}
                mt={1}
              >
                <IconButton
                  color="inherit"
                  // href="https://github.com/mui"
                  aria-label="GitHub"
                  sx={{ alignSelf: "center" }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  // href="https://x.com/MaterialUI"
                  aria-label="X"
                  sx={{ alignSelf: "center" }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  // href="https://www.linkedin.com/company/mui/"
                  aria-label="LinkedIn"
                  sx={{ alignSelf: "center" }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Links */}
        <Box
          sx={{
            display: "flex",
            // display: { xs: "flex", sm: "flex" },
            flexDirection: "row",
            gap: { xs: 3, sm: 5 },
            flexWrap: { sm: "wrap" },
            mt: { xs: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              // display: { xs: "flex", sm: "flex" },
              flexDirection: "column",
              gap: 1,
              textAlign: "start",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Publisher
            </Typography>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/publisher/dashboard"}
            >
              Dashboard
            </Link>
            {/* <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/publisher/privacy-policy"}
            >
              Publisher Policy
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/publisher/ad-placement"}
            >
              Ad placement
            </Link> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              // display: { xs: "flex", sm: "flex" },
              flexDirection: "column",
              gap: 1,
              textAlign: "start",
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Advertiser
            </Typography>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="/advertiser/dashboard"
            >
              Dashboard
            </Link>
            {/* <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="/advertiser/privacy-policy"
            >
              Advertiser Policy
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="/advertiser/campaign-terms"
            >
              Campaign Terms
            </Link> */}
          </Box>

          <Box
            sx={{
              display: "flex",
              // display: { xs: "flex", sm: "flex" },
              flexDirection: "column",
              gap: 1,
              textAlign: "start",
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Company
            </Typography>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="about-us"
            >
              About us
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="contact-us"
            >
              Contact us
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="team"
            >
              Our Team
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
