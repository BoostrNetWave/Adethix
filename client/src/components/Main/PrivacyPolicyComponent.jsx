import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function PrivacyPolicyComponent() {
  return (
    <Box
      id="privacy-policy"
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
        <Stack useFlexGap>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              mb: 4,
            }}
          >
            Privacy Policy
          </Typography>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            1. Introduction
          </Typography>
          <p>
            Adethix is committed to protecting your privacy. This policy
            outlines how we collect, use, and safeguard your information.
          </p>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            2. Data We Collect
          </Typography>
          <ul>
            <li>
              Personal Information: Name, email address, payment details, etc.
            </li>
            <li>
              Usage Data: IP address, browser type, pages visited, etc., to
              improve our services.
            </li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            3. How We Use Your Data
          </Typography>
          <ul>
            <li>To personalize your experience and improve our platform.</li>
            <li>To process transactions and send relevant information.</li>
            <li>
              To communicate with you about updates, new features, and
              marketing.
            </li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            4. Sharing Your Information
          </Typography>
          <p>
            We do not sell or share your personal data with third parties
            without your consent, except to comply with legal obligations or
            protect our rights.
          </p>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            5. Data Security
          </Typography>
          <p>
            We implement security measures to protect your data. However, no
            method of transmission over the internet is 100% secure.
          </p>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            6. Your Rights
          </Typography>
          <p>
            You can request access, correction, or deletion of your personal
            data by contacting us.
          </p>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            7. Changes to This Policy
          </Typography>
          <p>
            We may update this policy from time to time. Check this page for
            updates.
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
