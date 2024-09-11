import { alpha, Button, Slider } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";

export default function RevenueCalculatorComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageviews, setPageviews] = useState(20000);
  const [cpm, setCPM] = useState(1);
  const [adImpression, setAdImpression] = useState(6000);
  const [estimatedPayout, setEstimatedPayout] = useState(6);

  const handleChange = (event, newValue) => {
    setPageviews(newValue);
    setSearchParams({ cpm, pageviews: newValue });
  };

  const haldleCPMChange = (event, newValue) => {
    setCPM(newValue);
    setSearchParams({ cpm: newValue, pageviews });
  };

  useEffect(() => {
    const cpmSearch = searchParams.get("cpm");
    const pageviewsSearch = searchParams.get("pageviews");
    if (pageviewsSearch) {
      setPageviews(Number(pageviewsSearch));
    }
    if (cpmSearch) {
      setCPM(Number(cpmSearch));
    }
  }, [searchParams]);

  useEffect(() => {
    let impression = Math.round(pageviews * 0.3);
    setAdImpression(impression);
  }, [pageviews]);

  useEffect(() => {
    let payout = (adImpression / 1000) * cpm;
    let roundOff = Math.round(payout * 100) / 100;
    setEstimatedPayout(roundOff);
  }, [adImpression, cpm]);

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
            Revenue Calculator: How Much You&apos;ll Earn with Adethix
          </Typography>
          <p>
            There&apos;s a few important variables that determine how much
            you&apos;ll make with Adethix. We built this calculator so you know
            what kind of a monthly payout to expect.
          </p>

          <Box sx={{ display: "flex", gap: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                
                justifyContent: "space-between"
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Monthly site pageviews
                </Typography>
                <p>
                  How many pageviews your site gets is the most important input
                  into how much you&apos;ll earn with us. Use "unique pageviews"
                  if that is broken out in your analytics.
                </p>

                <Slider
                  value={pageviews}
                  onChange={handleChange}
                  min={20000}
                  max={25000000}
                  step={10000}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 20000, label: "20K" },
                    { value: 25000000, label: "25M" },
                  ]}
                />
                {/* <Typography variant="h6">
                  Selected Value: {pageviews.toLocaleString()}
                </Typography> */}
              </Box>

              <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Estimated CPM
                </Typography>
                <p>
                  Most publishers on our network earn between $2.25 and $2.75
                  CPM. You earn 70% of what we charge advertisers which varies
                  based on site topic and the geography of your audience. Our
                  standard CPM numbers assume more than half of your audience is
                  located in North America and Western Europe.
                </p>
                <Slider
                  value={cpm}
                  onChange={haldleCPMChange}
                  min={1}
                  max={5}
                  step={0.01}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 1, label: "$1" },
                    { value: 5, label: "$5" },
                  ]}
                />
                {/* <Typography variant="h6">
                  Selected Value: {cpm.toLocaleString()}
                </Typography> */}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  pt: 1,
                  minWidth: "300px",
                  border: "1px solid black",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#506690",
                  color: "white",
                  borderRadius: "0.5rem",
                }}
              >
                <p>Monthly pageviews</p>
                <p>{pageviews}</p>
                <p>Estimated CPM</p>
                <p>{cpm}</p>
                <p>Estimated ad impressions</p>
                <p>{adImpression}</p>
                <p>Estimated monthly payout</p>
                <p>${estimatedPayout}</p>
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                LinkComponent={RouterLink}
                to="/join-as-publisher"
              >
                Apply to become publisher
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
