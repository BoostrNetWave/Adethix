import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

function CancellationRefundPolicyComponent() {
  return (
    <Box
      id="cancellation-refund-policy"
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
            Cancellation/Refund Policy
          </Typography>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            1. Subscription and Payment Terms
          </Typography>
          <ul>
            <li>
              Subscriptions are billed on a recurring basis as per the selected
              pricing model.
            </li>
            <li>Once you pay fees are nonrefundable.</li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            2. Refund Policy
          </Typography>
          <ul>
            <li>
              Refunds are not available once a payment has been processed.
            </li>
            <li>
              If you experience issues, please contact support to discuss a
              resolution. Refund requests are reviewed on a case-by-case basis.
            </li>
          </ul>

          <Typography color="text.secondary" variant="h5" sx={{ mb: 1 }}>
            3. Contact Information
          </Typography>
          <p>
            If you have questions about our cancellation or refund policy,
            please reach out to our support team.
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

export default CancellationRefundPolicyComponent;
