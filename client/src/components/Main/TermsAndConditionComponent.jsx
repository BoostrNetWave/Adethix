import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function TermsAndConditionComponent() {
  return (
    <Box
      id="terms-and-condition"
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
            Terms and Conditions
          </Typography>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            1. Introduction
          </Typography>
          <p>
            Welcome to Adethix. By using our services, you agree to comply with
            and be bound by the following terms and conditions. Please review
            them carefully.
          </p>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            2. Use of Our Platform
          </Typography>
          <ul>
            <li>You must be 18 years or older to use Adethix services.</li>
            <li>
              You agree to use our platform responsibly and not to misuse it for
              any illegal activities.
            </li>
            <li>
              We reserve the right to modify, suspend, or terminate your access
              to our platform at any time for any reason.
            </li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            3. Account Registration
          </Typography>
          <p>
            You are responsible for maintaining the confidentiality of your
            account information. Any activity under your account is your
            responsibility. Report any unauthorized use immediately.
          </p>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            4. Advertiser and Publisher Obligations
          </Typography>
          <ul>
            <li>
              Advertisers must ensure their ads comply with all applicable laws
              and regulations.
            </li>
            <li>
              Publishers agree to host ads in accordance with our guidelines and
              not manipulate ad performance data.
            </li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            5. Payment and Billing
          </Typography>
          <ul>
            <li>
              Advertisers agree to pay all fees and charges associated with
              using our platform as per the selected pricing model.
            </li>
            <li>
              Payments are nonrefundable except as expressly stated in our
              refund policy.
            </li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            6. Liability and Indemnification
          </Typography>
          <ul>
            <li>
              Adethix is not liable for any damages resulting from the use or
              inability to use our platform.
            </li>
            <li>
              You agree to indemnify us against any claims, damages, or losses
              arising from your use of our platform.
            </li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            7. Changes to Terms
          </Typography>
          <p>
            We may update these terms periodically. Your continued use of our
            services implies acceptance of the new terms.
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
