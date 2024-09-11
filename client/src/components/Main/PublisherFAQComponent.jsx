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

export default function PublisherFAQComponent() {
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
            Publisher FAQ
          </Typography>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">
                  What data can I see about the ads?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>We have reports for the following data:</Typography>
                <ul>
                  <li>
                    Revenue - This shows the total revenue per day. The most
                    important report :)
                  </li>
                  <li>
                    Advertisers - Top advertisers on your site, and how much
                    revenue you&apos;re getting from each
                  </li>
                  <li>
                    Placements - Allows you to track different ad placements
                    across your site (eg. homepage, blog sidebar)
                  </li>
                </ul>
                <Typography>
                  Each report will have the following metrics:
                </Typography>
                <ul>
                  <li>
                    Views: The number of views that your ads had. You can filter
                    by paid, community, or house ads.
                  </li>
                  <li>Clicks: The number of clicks that your ads had.</li>
                  <li>
                    Click-through rate (CTR): The ratio of Clicks to Views. We
                    generally expect this to be 0.1% or higher.
                  </li>
                  <li>
                    View Rate: The ratio of Views to Offers (ads requested from
                    our server).
                  </li>
                  <li>Revenue: The amount of money that you have made.</li>
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
                  How do I improve View Rate?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  View Rate will never be 100% because some users will close the
                  browser after the ad is requested, but before the ad is
                  viewed. If you have an ad that is loaded outside of the users
                  viewport, it won&apos;t be counted as viewed until the user
                  scrolls to see it.{" "}
                  <strong>
                    Having the ad visible by default on page load ("above the
                    fold") is the most effective way to have a high view rate.
                  </strong>
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
                  Does it matter if I use text or image ads?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We sell a mix of CPC (paid per click) and CPM (paid per view)
                  ads. Ads that are viewed and clicked more get more revenue.
                  The better and more visible the placement, generally the more
                  money we both make. Some of our best performing publishers use
                  the text ad format, but in places that are very visible or
                  persistent in the page design.
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
                  Any restrictions on ad placements?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, please read our full{" "}
                  <Link to="/publisher-policy">Publisher Policy</Link> on ad
                  display.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">How much will I make?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  These numbers will vary based on your audience and topics that
                  you write about since advertisers prices vary by geography and
                  by topic. In addition, the performance of your ad placements
                  are a factor since some advertisers pay per click rather than
                  per impression. Generally, publishers see around $2.00 per
                  1,000 pageviews (CPM). North American pageviews usually bring
                  in a little more than this. Traffic from Europe, Australia, or
                  New Zealand is typically right about $2 while ads shown to
                  users in the rest of the world usually bring in less.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5">How can I be paid?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Please read our full{" "}
                  <Link to="/publisher-policy">Publisher Policy</Link> on
                  payouts.
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
                  Will I need to sign a contract?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  There is no contract to sign. If you decide you no longer want
                  to show Adethix on your site, you can just remove the ad
                  client code. If you decide to remove Adethix, we would
                  appreciate it if you let us know why you went in a different
                  direction. This feedback is how we improve our product.
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
                  Analytics shows more pageviews than you're showing ad views.
                  Why?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  There are a number of reasons why this might happen.
                </Typography>
                <ul>
                  <li>
                    Ads have to be in the viewport for a full second in order to
                    count as viewed. If the user navigates away, scrolls past
                    the ad, or the ad isn't in the viewport for some reason like
                    it requires scrolling to the ad on mobile, then we do not
                    count an ad view and don't bill the advertise
                  </li>
                  <li>
                    Your "view rate" in our reporting is the ratio of ads viewed
                    to ads requested. Improving your view rate will close this
                    gap.
                  </li>
                  <li>
                    Notably, we do not bill advertisers for ads viewed by bots
                    or over VPNs. We do our best to only charge advertisers when
                    real people view and click their ads.
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
                <Typography variant="h5">
                  This sounds great, how do I sign up?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Simply fill out our{" "}
                  <Link to="/join-as-publisher">publisher application</Link> form
                  with some information, and we'll get back to you right away.
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
              mt: 4,
            }}
          >
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
