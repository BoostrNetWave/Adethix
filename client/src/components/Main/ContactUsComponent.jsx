import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function ContactUsComponent() {
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
            Contact Us
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mb: -2 }}
            variant="h6"
          >
            We&apos;re Here to Help!
          </Typography>
          <p>
            At Adethix, we value open communication and are always here to
            assist you. Whether you have questions, need support, or want to
            share your feedback, don't hesitate to reach out to us.
          </p>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mb: -2 }}
            variant="h6"
          >
            How to Reach Us
          </Typography>
          <p>
            Email: For general inquiries, partnerships, or support, please email
            us at [email@example.com]. We strive to respond to all emails within
            24 hours.
          </p>
          <p>
            Phone: You can also call us at [Phone Number]. Our support team is
            available Monday through Friday, from 9:00 AM to 5:00 PM (Your Time
            Zone).
          </p>
          <p>
            Mailing Address: [Your Company Name] [Street Address] [City, State,
            ZIP Code] [Country]
          </p>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mb: -2 }}
            variant="h6"
          >
            Connect with Us on Social Media
          </Typography>
          <p>
          Stay updated with the latest news, updates, and community events by following us on social media:
          </p>
          <ul>
            <li>Twitter: @YourCompany</li>
            <li>LinkedIn: YourCompany</li>
            <li>Facebook: YourCompany</li>
          </ul>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mb: -2 }}
            variant="h6"
          >
            Join Us
          </Typography>
          <p>
            Whether you are a developer looking for the latest tools and
            resources or a company aiming to reach a highly engaged audience,
            Adethix is here to help you connect and grow. Join us on this
            journey to empower the developer community and drive innovation
            forward.
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
              to="/advertiser/signup"
            >
              Run a Advertising Campaign
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              LinkComponent={RouterLink}
              to="/publisher/signup"
            >
              Earn money from website
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
