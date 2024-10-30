import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RiCrosshair2Fill } from "react-icons/ri";
import { BarChartOutlined } from "@ant-design/icons";
import { SiGoogleauthenticator } from "react-icons/si";

const items = [
  {
    // icon: <ViewQuiltRoundedIcon />,
    title: "Publishers",
    description:
      "Join our network of premium websites and maximise your revenue by delivering high-quality, targeted ads that drive engagement and connect with the developer community.",
    features: [
      {
        icon: <RiCrosshair2Fill />,
        title: "No cookie tracking",
        description:
          "We show ad according to the script. Privacy is our main concern, we do not set any cookie of your visitor.",
      },
      {
        icon: <BarChartOutlined />,
        title: "Detailed reporting",
        description:
          "Get in-depth analysis on the publisher dashboard, and keep track of your monthly payouts.",
      },
    ],
  },
  {
    // icon: <EdgesensorHighRoundedIcon />,
    title: "Advertisers",
    description:
      "Reach your target audience with precision by placing your ads on top-tier publisher websites, driving engagement, and achieving impactful results for your brand.",
    features: [
      {
        icon: <SiGoogleauthenticator />,
        title: "Authentic views",
        description:
          "Ads are published in hand-picks websites, that generate higher engagement.",
      },
      {
        icon: <BarChartOutlined />,
        title: "Detailed reporting",
        description:
          "Get in-depth analysis on the advertiser dashboard, and keep track of your spendings.",
      },
    ],
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8 } }}>
      {" "}
      {/*, sm: 16 */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Product features
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Explore smart features designed for businesses and startups to
              connect with their audience. Our platform offers accurate
              targeting to help you reach the right people, easy-to-understand
              analytics for tracking your ad performance, and smooth integration
              to make setting up ads simple. With Adethix, your ads will
              effectively reach the right community and deliver great results
              for your business.
            </Typography>
          </div>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "primary.light" : "";
                    }
                    return selectedItemIndex === index ? "primary.light" : "";
                  },
                  background: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "none" : "";
                    }
                    return selectedItemIndex === index ? "none" : "";
                  },
                  backgroundColor:
                    selectedItemIndex === index ? "primary.main" : "",
                  "& .MuiChip-label": {
                    color: selectedItemIndex === index ? "#fff" : "",
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: "auto", sm: "none" },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 280,
              }}
            >
              <Grid container spacing={1} sx={{ pb: 2 }}>
                {items[selectedItemIndex].features.map((item, index) => {
                  return (
                    <Grid key={index} item>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        pr={10}
                        pl={10}
                        gap={1}
                      >
                        <Typography textAlign="center" variant="h4">
                          {item.icon}
                        </Typography>
                        <Typography textAlign="center" variant="h5">
                          {item.title}
                        </Typography>
                        <Typography textAlign="center" variant="subtitle1">
                          {item.description}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color="text.primary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedFeature.title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedFeature.description}
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                  backgroundColor:
                    selectedItemIndex === index ? "action.selected" : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index
                        ? "primary.light"
                        : "grey.200";
                    }
                    return selectedItemIndex === index
                      ? "primary.dark"
                      : "grey.800";
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === "light") {
                          return selectedItemIndex === index
                            ? "primary.main"
                            : "grey.300";
                        }
                        return selectedItemIndex === index
                          ? "primary.main"
                          : "grey.700";
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: "none" }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", sm: "flex" },
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Grid container spacing={1} sx={{ pb: 2 }}>
              {items[selectedItemIndex].features.map((item, index) => {
                return (
                  <Grid key={index} item>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      pr={10}
                      pl={10}
                      gap={1}
                    >
                      <Typography textAlign="center" variant="h4">
                        {item.icon}
                      </Typography>
                      <Typography textAlign="center" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography textAlign="center" variant="subtitle1">
                        {item.description}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
