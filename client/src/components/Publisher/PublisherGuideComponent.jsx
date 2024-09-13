import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  MenuItem,
  Chip,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  alpha,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function PublisherGuideComponent() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    audienceCategory: [],
    monthlyPageView: "",
    note: "",
    referralCode: "",
    acceptTerms: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormValues({
      ...formValues,
      acceptTerms: e.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    if (!formValues.acceptTerms) {
      alert(
        "You must accept Terms of Service and Privacy Policy to join our Advertising Network"
      );
    } else {
      // console.log(formValues);

      let url = `${import.meta.env.VITE_BACKEND_API_URL}/api/publisher/signup`;
      try {
        let response = await axios.post(url, formValues);

        if (response?.status === 200) {
          // console.log(response.data)
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response.data.message.replace(/"/g, ""));
      }
    }
  };

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
        <Stack
          spacing={2}
          useFlexGap
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Publisher&apos;s Guide
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Get setup with Adethix and maximize your site&apos;s ad revenue
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ margin: "auto", height: "100%" }}>
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Step #1: Apply
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    The first step is applying to be a publisher. We're actively
                    seeking developer-focused sites with 50k+ monthly pageviews.
                    Once accepted, you'll have access to our publisher dashboard
                    with reporting.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ margin: "auto", height: "100%" }}>
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Step #2: Setup
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Setup the EthicalAds ad client on your site with your custom
                    ID from our publisher dashboard. Out of the box you'll serve
                    unpaid ads until your site is approved for paid ads.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ margin: "auto", height: "100%" }}>
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Step #3: Approval
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    After configuring our ad client and seeing your first ad,
                    the last step is to request approval for paid ads and
                    configure how you'd like to be paid.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
              Getting approved
            </Typography>
            <Box sx={{ maxWidth: "600px" }}>
              <ul>
                <li>
                  Adethix should be the only ad on the page (your own promotions
                  are fine).
                </li>
                <li>
                  The ad should be above the fold on both desktop and mobile.
                  You can disable the ad on mobile if this isn't possible.
                </li>
                <li>
                  The ad should not disrupt the natural reading flow of the
                  page. It should be placed above, beside or below the main
                  content, not within it.
                </li>
              </ul>
              <Typography sx={{ textAlign: "center" }}>
                For more details, see our{" "}
                <RouterLink sx={{ cursor: "pointer" }} to={"/publisher-policy"}>
                  publisher policy.
                </RouterLink>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
              Maximize UX & Revenue
            </Typography>
            <Typography sx={{ mb: 2 }}>
              To ensure your site generates as much revenue from ads as
              possible, you need to make sure your ad placement and targeting
              complement your content.
            </Typography>
            <Box sx={{ maxWidth: "600px" }}>
              <ul>
                <li>
                  Choose the right ad placement for your site. There are options
                  for vertical, horizontal, text-only, floating placements or
                  video ad.
                </li>
                <li>
                  Our site crawler will periodically crawl your site and index
                  your pages so we can serve the best ad on any individual page
                  with AI-powered contextual targeting. However, on single-page
                  apps (SPAs) or publishers using our API, you can pass
                  page-specific keywords to ensure you get the best ad
                  targeting.
                </li>
                <li>
                  We have support for SPAs to help improve targeting and dynamic
                  ad rotation.
                </li>
                <li>
                  There are easy ways to show your own promotions when we do not
                  have a paid ad to show or to fallback to another ad network.
                </li>
              </ul>
              {/* <Typography sx={{ textAlign: "center" }}>
              For more details, see our{" "}
              <RouterLink sx={{ cursor: "pointer" }} to={"/publisher-policy"}>
              publisher policy.
              </RouterLink>
              </Typography> */}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
              More questions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="h5">How much will I make?</Typography>
                  <Typography>
                    Try our{" "}
                    <RouterLink to="/publishers/calculator">
                      publisher calculator
                    </RouterLink>{" "}
                    to get an estimate of your monthly payout. Generally
                    publishers see around $2.50 per 1,000 pageviews (CPM),
                    assuming most of your traffic is from the EU & North
                    America. These numbers will vary based on your audience and
                    topics that you write about.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="h5">How can I be paid?</Typography>
                  <Typography>
                    We currently support payment via a bank transfer (via
                    Razorpay). Our minimum payment to publishers is currently
                    $50, so you need that amount to receive a payment.
                  </Typography>
                  <Typography>
                    See our full{" "}
                    <RouterLink to="/publisher-policy">
                      Payout Policy
                    </RouterLink>
                    .
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              Have even more questions? Our{" "}
              <RouterLink to="/publishers/faq">Publisher FAQ</RouterLink> has
              more answers!
            </Typography>
          </Box>

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
