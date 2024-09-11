import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const GoogleAdsComparisionComponent = () => {
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
        <Stack useFlexGap>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              mb: 2,
            }}
          >
            AdEthix Competitor - Google Ads
          </Typography>
          <p>Why AdEthix is the Ideal Ethical Alternative to Google Ads</p>
          <p>
            In the ever-evolving world of online advertising, businesses are
            continuously searching for platforms that align with their values
            and deliver results without compromising user trust. Google Ads has
            long been a dominant force in digital marketing, but as concerns
            around data privacy and intrusive ad experiences grow, more and more
            companies are seeking alternatives that prioritize ethics and
            transparency.
          </p>
          <p>Introducing AdEthix: Advertising with Integrity</p>
          <p>
            At AdEthix, we understand the importance of maintaining user trust
            while delivering effective advertising solutions. Unlike traditional
            platforms that often prioritize profit over user experience, we are
            committed to offering a service that respects privacy, promotes
            transparency, and ensures that your brand is associated with
            positive, ethical values.
          </p>
          <p>Why Choose AdEthix?</p>
          <p>
            1. Privacy-First Approach: In a world where data is increasingly
            valuable, users are more concerned than ever about how their
            information is used. AdEthix never tracks users or engages in
            invasive data collection practices. We believe that effective
            advertising does not require compromising user privacy.
          </p>
          <p>
            2. Transparent Ad Placements: Our platform ensures that ads are
            placed in relevant, high-quality environments where your message can
            resonate without the clutter of intrusive banners or misleading
            clickbait. Every placement is carefully vetted to align with ethical
            standards and ensure maximum engagement.
          </p>
          <p>
            3. Support Ethical Content: By choosing AdEthix, you’re not just
            advertising; you’re supporting a movement towards a more ethical
            internet. We partner with websites and publishers that share our
            commitment to creating a positive, respectful online experience.
          </p>
          <p>
            4. Customizable Campaigns: Tailor your campaigns to reach your
            target audience without compromising on your brand’s values. Our
            intuitive platform allows you to manage your ad spend, track
            performance, and adjust strategies in real-time, all while adhering
            to strict ethical guidelines.
          </p>
          <p>
            5. No Hidden Fees: Transparency extends to our pricing model as
            well. With AdEthix, what you see is what you get—no hidden fees, no
            surprises. Our goal is to help you maximize your return on
            investment while staying true to your principles.
          </p>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mt: 2, mb: 2 }}
            variant="h6"
          >
            Join the Ethical Advertising Revolution
          </Typography>
          <p>
            As more consumers become aware of the ethical implications of their
            digital interactions, the demand for responsible advertising is
            growing. AdEthix is leading the charge by providing an alternative
            to traditional ad networks that respects users and promotes a
            healthier online ecosystem.
          </p>
          <p>
            If you&apos;re ready to take your brand to the next level while
            making a positive impact, it’s time to make the switch to AdEthix.
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
};

export default GoogleAdsComparisionComponent;
