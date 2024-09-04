import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function PublisherPolicy() {
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
            }}
          >
            AdEthix Publisher Policy
          </Typography>
          <p>
            At AdEthix, we believe in promoting ethical, user-friendly
            advertising. Our mission is to help publishers monetize their
            content without compromising their audience&apos;s experience or
            privacy. This Publisher Policy outlines the requirements and
            guidelines for publishers participating in the AdEthix network.
          </p>
          <strong>1. Eligibility Criteria</strong>
          <strong>1.1 Quality Content</strong>
          <p>
            Publishers must provide high-quality content that is informative,
            original, and valuable to their audience. Sites that primarily
            consist of user-generated content, thin content, or duplicate
            content are not eligible.
          </p>
          <strong>1.2 Compliance with Laws and Regulations</strong>
          <p>
            Publishers must comply with all applicable laws, regulations, and
            industry standards, including privacy laws, advertising guidelines,
            and intellectual property rights.
          </p>
          <strong>1.3 Audience</strong>
          <p>
            AdEthix is focused on reaching ethical audiences. Sites targeting or
            containing content intended for children under 13, or audiences with
            questionable ethics, are not eligible.
          </p>

          <strong>2. Prohibited Content</strong>
          <strong>2.1 Hateful Content</strong>
          <p>
            Any content promoting hate speech, violence, or discrimination based
            on race, ethnicity, religion, gender, sexual orientation,
            disability, or age is strictly prohibited.
          </p>
          <strong>2.2 Illegal Content</strong>
          <p>
            Content that promotes or facilitates illegal activities, including
            but not limited to piracy, hacking, and drug use, is not allowed.
          </p>
          <strong>2.3 Adult Content</strong>
          <p>
            Sites containing or linking to adult content, including pornography,
            explicit material, or adult dating services, are prohibited.
          </p>
          <strong>2.4 Misleading or Harmful Content</strong>
          <p>
            Publishers must avoid content that is deceptive, misleading, or
            intended to harm or mislead the audience. This includes clickbait,
            fake news, and conspiracy theories.
          </p>

          <strong>3. Ad Placement and Behavior</strong>
          <strong>3.1 User Experience</strong>
          <p>
            Ads should not interfere with the user experience. Pop-ups,
            auto-playing videos with sound, and other disruptive ad formats are
            not allowed. Ads must be clearly distinguishable from content and
            should not be disguised as editorial content.
          </p>
          <strong>3.2 Ad Density</strong>
          <p>
            The number of ads on a page should be reasonable and not detract
            from the user experience. Publishers should avoid excessive ad
            placement that clutters the page.
          </p>
          <strong>3.3 No Incentivized Clicks</strong>
          <p>
            Publishers may not encourage users to click on ads or use deceptive
            tactics to increase ad clicks. This includes offering rewards,
            misleading labels, or exaggerated calls to action.
          </p>

          <strong>4. Data Privacy and Security</strong>
          <strong>4.1 User Privacy</strong>
          <p>
            AdEthix is committed to protecting user privacy. Publishers must
            comply with our privacy policy and applicable data protection laws.
            Collecting, storing, or sharing personal information without user
            consent is strictly prohibited.
          </p>
          <strong>4.2 Secure Sites</strong>
          <p>
            Publishers must ensure that their sites are secure and free from
            malware, viruses, or other harmful software. Sites using HTTPS are
            strongly preferred.
          </p>

          <strong>5. Termination and Enforcement</strong>
          <strong>5.1 Violation of Policy</strong>
          <p>
            Failure to comply with this Publisher Policy may result in the
            suspension or termination of your account and the removal of ads
            from your site.
          </p>
          <strong>5.2 Reporting Violations</strong>
          <p>
            If you believe a publisher in the AdEthix network is violating this
            policy, please report it to us at{" "}
            <a href="mailto:compliance@adethix.com">compliance@adethix.com</a>{" "}
            We will investigate all reports and take appropriate action.
          </p>

          <strong> 6. Modifications to the Policy</strong>
          <p>
            AdEthix reserves the right to update or modify this Publisher Policy
            at any time. We will notify publishers of any significant changes
            via email or through our platform.
          </p>
          <strong>7. Contact Information</strong>
          <p>
            For any questions or concerns regarding this Publisher Policy,
            please contact us at{" "}
            <a href="mailto:contact@boostrnetwave.com">
              contact@boostrnetwave.com
            </a>
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
