import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function AboutUsComponent() {
  return (
    <Box
      id="about-us"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 14 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={4} useFlexGap>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            About Us
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mb: -2 }}
            variant="h6"
          >
            Our Mission
          </Typography>
          <p>
            At Adethix, we are dedicated to bridging the gap between innovative
            developers and the tools, platforms, and services they need to
            succeed. Our mission is to provide a highly targeted advertising
            platform that connects developers with resources that enhance their
            productivity and creativity.
          </p>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mb: -2 }}
            variant="h6"
          >
            What We Do
          </Typography>
          <p>
            Our platform is designed specifically for developers, ensuring that
            the advertisements you see are pertinent to your professional growth
            and project needs. From coding tools and software libraries to cloud
            services and educational resources, our ads are curated to help you
            stay ahead in the ever-evolving tech landscape.
          </p>

          <Box
            textAlign="center"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
              gap: { xs: 2, md: 5 },
            }}
          >
            <Button
              color="primary"
              variant="text"
              size="medium"
              LinkComponent={RouterLink}
              to="/join-as-advertiser"
            >
              Run a Advertising Campaign
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              LinkComponent={RouterLink}
              to="/join-as-publisher"
            >
              Earn money from website
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
