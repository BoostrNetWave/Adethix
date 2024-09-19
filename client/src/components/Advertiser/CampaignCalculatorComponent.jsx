import {
  alpha,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";

export default function CampaignCalculatorComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [campaignBudget, setCampaignBudget] = useState(1000);
  const [ctr, setCTR] = useState(0.12);
  const [cpm, setCPM] = useState(3.0);
  const [region, setRegion] = useState("network");
  const [topic, setTopic] = useState("all-developers");
  const [expectedImpression, setExpectedImpression] = useState(333333);
  const [expectedClicks, setExpectedClicks] = useState(1000);

  const combinationData = [
    { region: "network", topic: "security", amount: 4.33 },
    { region: "network", topic: "datascience", amount: 4.25 },
    { region: "network", topic: "devops", amount: 4.0 },
    { region: "network", topic: "frontend", amount: 4.1 },
    { region: "network", topic: "backend", amount: 3.6 },
    { region: "network", topic: "all-developers", amount: 3.0 },

    { region: "eng", topic: "security", amount: 6.75 },
    { region: "eng", topic: "datascience", amount: 6.5 },
    { region: "eng", topic: "devops", amount: 6.25 },
    { region: "eng", topic: "frontend", amount: 6.5 },
    { region: "eng", topic: "backend", amount: 5.75 },
    { region: "eng", topic: "all-developers", amount: 5.0 },

    { region: "blend", topic: "security", amount: 5.5 },
    { region: "blend", topic: "datascience", amount: 5.37 },
    { region: "blend", topic: "devops", amount: 5.12 },
    { region: "blend", topic: "frontend", amount: 5.25 },
    { region: "blend", topic: "backend", amount: 4.62 },
    { region: "blend", topic: "all-developers", amount: 4.0 },

    { region: "weu", topic: "security", amount: 4.25 },
    { region: "weu", topic: "datascience", amount: 4.25 },
    { region: "weu", topic: "devops", amount: 4.0 },
    { region: "weu", topic: "frontend", amount: 4.0 },
    { region: "weu", topic: "backend", amount: 3.5 },
    { region: "weu", topic: "all-developers", amount: 3.0 },

    { region: "eeu-apac", topic: "security", amount: 2.0 },
    { region: "eeu-apac", topic: "datascience", amount: 2.0 },
    { region: "eeu-apac", topic: "devops", amount: 1.75 },
    { region: "eeu-apac", topic: "frontend", amount: 1.75 },
    { region: "eeu-apac", topic: "backend", amount: 1.5 },
    { region: "eeu-apac", topic: "all-developers", amount: 1.1 },

    { region: "global", topic: "security", amount: 0.7 },
    { region: "global", topic: "datascience", amount: 0.8 },
    { region: "global", topic: "devops", amount: 0.7 },
    { region: "global", topic: "frontend", amount: 0.7 },
    { region: "global", topic: "backend", amount: 0.6 },
    { region: "global", topic: "all-developers", amount: 0.5 },
  ];

  const regionFullName = {
    network: "Run of Network",
    eng: "US, Canada, UK, Australia, New Zealand, Ireland",
    blend: "Blend: W. Europe, US, Canada, UK, Australia, New Zealand",
    weu: "Western Europe",
    "eeu-apac": "Eastern EU, Asia Pacific",
    global: "Global",
  };

  const topicFullName = {
    security: "Security & privacy",
    datascience: "AI & machine learning",
    devops: "DevOps",
    frontend: "Frontend web development",
    backend: "Backend web development",
    "all-developers": "All developers",
  };

  const handleChange = (event, newValue) => {
    setCampaignBudget(newValue);
    setSearchParams({
      budget: newValue,
      region: region,
      topic: topic,
      ctr: ctr,
    });
  };

  const haldleCTRChange = (event, newValue) => {
    setCTR(newValue);
    setSearchParams({
      budget: campaignBudget,
      region: region,
      topic: topic,
      ctr: newValue,
    });
  };

  useEffect(() => {
    const regionSearch = searchParams.get("region");
    const topicSearch = searchParams.get("topic");
    const budgetSearch = searchParams.get("budget");
    const ctrSearch = searchParams.get("ctr");

    if (topicSearch) {
      setTopic(topicSearch);
    }
    if (regionSearch) {
      setRegion(regionSearch);
    }
    if (budgetSearch) {
      setCampaignBudget(Number(budgetSearch));
    }
    if (ctrSearch) {
      setCTR(Number(ctrSearch));
    }
  }, [searchParams]);

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setSearchParams({
      budget: campaignBudget,
      region: event.target.value,
      topic: topic,
      ctr: ctr,
    });
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
    setSearchParams({
      budget: campaignBudget,
      region: region,
      topic: event.target.value,
      ctr: ctr,
    });
  };

  // check cpm on changing region or topic
  useEffect(() => {
    combinationData.forEach((data) => {
      if (data.topic === topic && data.region === region) {
        // console.log(data);
        setCPM(Number(data.amount));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, topic]);

  // calculating number of impression and clicks on changing budget, ctr or cpm
  useEffect(() => {
    let impression = (1000 / cpm) * campaignBudget;
    let roundOffImpression = Math.round(impression);
    setExpectedImpression(roundOffImpression);
  }, [campaignBudget, cpm]);

  useEffect(() => {
    let clicks = expectedImpression * ctr / 100;
    let roundOffClicks = Math.round(clicks);
    setExpectedClicks(roundOffClicks);
  }, [expectedImpression, ctr]);

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
            Campaign Calculator
          </Typography>
          <p>
            The campaign calculator can help you estimate and appropriately size
            and price your campaign based on your targeting parameters and
            desired conversions. Change different audiences or metrics, and
            choose the budget that is right for you.
          </p>

          <Box
            sx={{
              display: "flex",
              gap: 5,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "space-between",
              }}
            >
              <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Geographic focus
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup value={region} onChange={handleRegionChange}>
                    <FormControlLabel
                      value="network"
                      control={<Radio />}
                      label="Run of Network"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="eng"
                      control={<Radio />}
                      label="US, Canada, UK, Australia, New Zealand, Ireland"
                      sx={{
                        sm: {
                          marginBottom: -1.5,
                        },
                      }}
                    />
                    <FormControlLabel
                      value="blend"
                      control={<Radio />}
                      label="Blend: W. Europe, US, Canada, UK, Australia, New Zealand"
                      sx={{
                        sm: {
                          marginBottom: -1.5,
                        },
                      }}
                    />
                    <FormControlLabel
                      value="weu"
                      control={<Radio />}
                      label="Western Europe"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="eeu-apac"
                      control={<Radio />}
                      label="Eastern EU, Asia Pacific"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="global"
                      control={<Radio />}
                      label="Global"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Topic focus
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup value={topic} onChange={handleTopicChange}>
                    <FormControlLabel
                      value="security"
                      control={<Radio />}
                      label="Security & privacy"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="datascience"
                      control={<Radio />}
                      label="AI & machine learning"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="devops"
                      control={<Radio />}
                      label="DevOps"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="frontend"
                      control={<Radio />}
                      label="Frontend web development"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="backend"
                      control={<Radio />}
                      label="Backend web development"
                      sx={{ marginBottom: -1.5 }}
                    />
                    <FormControlLabel
                      value="all-developers"
                      control={<Radio />}
                      label="All developers"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Campaign budget
                </Typography>
                <p>
                  This budget could be over just a few weeks or as long as a
                  quarter. There is an automatic discount of 10% for campaigns
                  over $3k and 15% for campaigns over $25k. Set your monthly or
                  quarterly campaign to renew automatically and receive an
                  additional 10% discount.
                </p>

                <Slider
                  value={campaignBudget}
                  onChange={handleChange}
                  min={500}
                  max={25000}
                  step={100}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 500, label: "$500" },
                    { value: 25000, label: "$25k" },
                  ]}
                />
                {/* <Typography variant="h6">
                  Selected Value: {pageviews.toLocaleString()}
                </Typography> */}
              </Box>

              <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Ad click-through rate
                </Typography>
                <p>
                  How often do visitors who see your ads click on them. This can
                  vary widely based on how finely targeted your campaign is and
                  how tuned the ads are to our audience. Our network average is
                  about 0.12%. Extremely focused campaigns can do as high as
                  0.3-0.5%.
                </p>
                <Slider
                  value={ctr}
                  onChange={haldleCTRChange}
                  min={0.0}
                  max={1.0}
                  step={0.01}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0.0, label: "0.0%" },
                    { value: 1.0, label: "1.0%" },
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
                  px: 2,
                  textAlign: "center",
                }}
              >
                <Typography>Region</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {regionFullName[region]}
                </Typography>

                <Typography>Topic</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {topicFullName[topic]}
                </Typography>

                <Typography>Budget</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {campaignBudget}
                </Typography>

                <Typography>CTR</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {ctr.toFixed(2)}%
                </Typography>

                <Typography>CPM</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  ${cpm.toFixed(2)}
                </Typography>

                <Typography>Number of impressions</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {expectedImpression.toLocaleString()}
                </Typography>

                <Typography>Number of clicks</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {expectedClicks.toLocaleString()}
                </Typography>
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                LinkComponent={RouterLink}
                to="/join-as-advertiser"
              >
                Start your campaign
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
