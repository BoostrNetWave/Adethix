import {
  Stack,
  Box,
  Typography,
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
} from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AdvertiserFAQComponent() {
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
            Advertiser FAQ
          </Typography>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">How are ads priced?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Our prices differ by topic.</Typography>
                <Typography>
                  Ads are priced in cost per thousand impressions (CPM).
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">
                  Can I post an ad promoting my job openings?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Absolutely. Hiring developers is one of the most popular
                  reasons for advertising with us. We put your job right in
                  front of developers using your technology.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">How can I target my ads?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  In line with our advertising approach, we believe that ads can
                  be well targeted while respecting users&apos; privacy. We only
                  target based on a user&apos;s country and the content of the
                  page where the ad is served.
                </Typography>
                <Typography>
                  Advertisers may also target ads by topics. Currently, these
                  topics are:
                </Typography>
                <ul>
                  <li>AI and machine learning</li>
                  <li>Backend web development</li>
                  <li>Frontend web development</li>
                  <li>Security and privacy</li>
                  <li>DevOps</li>
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">
                  What are the ad specifications?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  There are three main ad placements across the AdEthix network.
                  Publishers choose which placement best fits with their site
                  and we have seen great performance for advertisers and
                  publishers with both types.
                </Typography>
                <ul>
                  <li>
                    We support unobtrusive text & image placements which use a
                    140 * 140 px image and up to 100 characters of supporting
                    text.
                  </li>
                  <li>
                    There&apos;s also a text-only placement that uses up to 100
                    characters without an image.
                  </li>
                  <li>
                    And video only ad which consist only video without any text.
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">What about ad blockers?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Ad blockers are a fact of life when it comes to internet
                  advertising and developers block ads at an even higher rate
                  than the general public. Our privacy focus helps us get
                  through some ad blockers but not all of them. However, our ads
                  are still blocked sometimes but advertisers never pay for ads
                  that aren&apos;t viewed and that includes ads that are
                  blocked.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">Where do the ads link to?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The ads can link to any URL. Typically they will link to your
                  landing page on your website. You may include UTM parameters
                  or other URL parameters to know that the traffic came from
                  your ad on our site.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">
                  Can I run my ad JavaScript?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  In order to respect our users&apos; privacy, we do not allow
                  any third-party ad scripts.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">
                  How can I see how my ads are performing?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Once you become an advertiser with us, you will have access to
                  view live reports on the performance of your ads including how
                  many times they were viewed and clicked. We count a viewable
                  impression when the ad comes into the browser viewport.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">How can I manage my ads?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  After you become an advertiser, you will get access to our
                  advertising platform where you can create, change, or turn off
                  your ads as well as see live reports broken down by each ad.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">How can I optimize my ads?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  For all but the smallest campaigns, we recommend running
                  multiple ads in your campaign. These A/B tests will usually
                  show that some ads perform better than others. After
                  you&apos;ve collected enough data, turn the lower performing
                  variant off to maximize your performance.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">Where do my ads appear?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Ads appear on sites that belong to our publisher network.
                  Placement is customizable based on their requirements, but we
                  always ensure a valuable placement.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">
                  What type of ads are acceptable?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We want ads that are of interest to our audience of millions
                  of software developers.
                </Typography>
                <Typography>
                  AdEthix has final approval for all ads with respect to
                  editorial and creative content but generally this isn&apos;t
                  an issue.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">
                  How can I get started advertising?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We thought you&apos;d never ask. Simply fill out our{" "}
                  <Link to="/join-as-advertiser">
                    advertising information form
                  </Link>
                  . A member of our team will contact you with a detailed
                  prospectus and will walk you through the process of getting
                  started advertising on AdEthix.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <Box
            textAlign="center"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
              gap: { xs: 2, md: 5 },
              mt: 4
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
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
