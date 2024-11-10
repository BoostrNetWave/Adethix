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
import footerLogo from "../../assets/footer-logo.png";

const logoStyle = {
  width: "120px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link component={RouterLink} to="/">
        Adethix
      </Link>{" "}
      powered by{" "}
      <Link component={RouterLink} to="https://boostrnetwave.com/contact-us/">
        Boostr Netwave Solutions
      </Link>
      &nbsp;
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
            <Box>
              <img src={footerLogo} alt="adethix" style={logoStyle} />
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
                  href="https://github.com/BoostrNetWave/Adethix"
                  aria-label="GitHub"
                  about="_blank"
                  sx={{ alignSelf: "center" }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://www.linkedin.com/company/boostr-netwave"
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
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/publisher-policy"}
            >
              Publisher Policy
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/publishers/guide"}
            >
              Publisher Guide
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/publishers/faq"}
            >
              Publisher FAQ
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/publishers/calculator"}
            >
              Revenue Calculator
            </Link>
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
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="/pricing"
            >
              Pricing
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/advertisers/faq"}
            >
              Advertiser FAQ
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to={"/advertisers/calculator"}
            >
              Campaign Calculator
            </Link>
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
              to="/about-us"
            >
              About us
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="/contact-us"
            >
              Contact us
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="/team"
            >
              Our Team
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              to="/terms-and-conditions"
            >
              Terms and Conditions
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              to="/cancellation-refund-policy"
            >
              Cancellation/Refund Policy
            </Link>
            <Link
              component={RouterLink}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
              to="/alternative-to-google-ads"
            >
              Google Ads Comparison
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
