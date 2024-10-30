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
            At Adethix, our mission is to help businesses and startups succeed
            by providing an easy-to-use advertising platform. We focus on
            delivering effective and honest advertising solutions that truly
            connect brands with their audience.
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
            We bring together advertisers and publishers on our platform, making
            it simple for businesses to reach the right people. Our tools allow
            advertisers to place ads where they’ll be most effective, while
            publishers can easily earn money by displaying ads that fit their
            content.
          </p>
          <p>
            We’re committed to making advertising better for everyone involved.
            By continuously improving our services, we aim to support both
            advertisers and publishers in growing their businesses and achieving
            their goals together.
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
