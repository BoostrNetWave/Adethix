/* eslint-disable react/prop-types */
import { Typography, Button, Link, Box, Grid } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import { BarChartOutlined } from "@ant-design/icons";

import MainCard from "../../MainCard";
import AdvertisementTable from "./AdvertisementTable";
import styles from "./Campaign.module.css";
import Analytic from "./Analytic";

function Campaign({ campaign, ads, adInfo, campaignInfo }) {
  useDocumentTitle(campaign?.name ? campaign.name : "Advertisement Platform");
  // console.log(campaign);
  // console.log(ads);
  // console.log(adInfo);
  // console.log(campaignInfo);

  function calculateCTR(views, clicks) {
    if (views === 0) {
      return `${0} %`;
    } else {
      return `${((clicks / views) * 100).toFixed(3)} %`;
    }
  }

  function cpm(totalViews, totalViewsCost) {
    if (totalViews === 0) {
      return `$ ${0}`;
    } else {
      //toFixed(3)
      return `$ ${((totalViewsCost / totalViews) * 1000).toFixed(3)}`;
    }
  }

  return (
    <Box>
      <Typography variant="h6" mb={1}>
        Campaign: {campaign?.name}
      </Typography>
      <Box mb={2}>
        Topics:{" "}
        {campaign?.topics &&
          campaign.topics.map((topic, index) => {
            if (index === 0) {
              return <span key={index}>{topic}</span>;
            } else {
              return <span key={index}>, {topic}</span>;
            }
          })}
      </Box>

      {ads && ads.length > 0 && (
        <Grid container rowSpacing={2} columnSpacing={2.75} mb={1}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic title="Total Views" count={campaignInfo?.totalViews} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic title="Total Clicks" count={campaignInfo?.totalClicks} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic
              title="CPM"
              count={cpm(
                campaignInfo?.totalViews,
                campaignInfo?.totalViewsCost
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic
              title="CTR"
              count={calculateCTR(
                campaignInfo?.totalViews,
                campaignInfo?.totalClicks
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic
              title="Spend"
              count={`$ ${campaignInfo?.totalAdvertiserCost.toFixed(3)}`}
            />
          </Grid>
        </Grid>
      )}

      <Typography variant="h6">
        Total amount: {campaign?.totalAmount}
      </Typography>
      <Typography variant="h6">
        Balance amount: {campaign?.balanceAmount.toFixed(3)}
      </Typography>

      {/* Show in table */}
      {ads && ads.length > 0 ? (
        <Box>
          <Box sx={{display: "flex", gap: 2}}>
            <Link component={RouterLink} relative="path" to="report">
              <Button
                variant="outlined"
                sx={{ textTransform: "none", mt: 2 }}
                startIcon={<BarChartOutlined />}
              >
                See full report
              </Button>
            </Link>
            <Link component={RouterLink} relative="path" to="add-money">
              <Button
                variant="outlined"
                sx={{ textTransform: "none", mt: 2 }}
                startIcon={<AddIcon />}
              >
                Add Money
              </Button>
            </Link>
          </Box>
          {/* className={styles.container} */}
          <Box className={styles.container}>
            <Typography variant="h6" mb={1} pt={2} sx={{ fontSize: "16px" }}>
              Advertisements
            </Typography>

            {/* <Box sx={{ textAlign: "right" }}> */}
            <Link component={RouterLink} to={"create"}>
              <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                startIcon={<AddIcon />}
              >
                Create advertisement
              </Button>
            </Link>
            {/* </Box> */}
          </Box>
          <Grid item xs={12} md={7} mt={0} lg={8}>
            <MainCard sx={{ mt: 2 }} content={false}>
              <AdvertisementTable ads={ads} adInfo={adInfo} />
            </MainCard>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">No advertisement found!</Typography>
          <Box>
            <Link component={RouterLink} to={"create"}>
              <Button
                variant="outlined"
                sx={{ textTransform: "none", mt: 2 }}
                startIcon={<AddIcon />}
              >
                Create advertisement
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Campaign;
