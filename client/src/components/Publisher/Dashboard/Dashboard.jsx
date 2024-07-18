/* eslint-disable react/prop-types, no-unused-vars */
// material ui
import { Typography, Box, Grid } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import InfoBox from "./InfoBox.jsx";
import styles from "./Dashboard.module.css";
import Analytic from "./Analytic.jsx";

function Dashboard({ data }) {
  useDocumentTitle("Dashboard - Last Seven Day Overview");
  let views;
  let clicks;
  let totalRevenue;
  let ctr;
  // console.log(data)

  if (
    data?.clicks &&
    data.clicks?.length > 0 &&
    data.clicks[0] &&
    data.clicks[0]?.totalClicks
  ) {
    clicks = data.clicks[0].totalClicks;
  } else {
    clicks = 0;
  }

  if (
    data?.views &&
    data.views?.length > 0 &&
    data.views[0] &&
    data.views[0]?.totalViews
  ) {
    views = data.views[0].totalViews;
  } else {
    views = 0;
    clicks = 0;
  }

  if (views === 0) {
    ctr = 0;
  } else {
    ctr = (clicks / views) * 100;
  }

  // ============ total revenue ============
  if (
    data?.clicks &&
    data?.clicks?.length > 0 &&
    data.clicks[0] &&
    data.clicks[0]?.totalClicks &&
    data?.views &&
    data.views?.length > 0 &&
    data.views[0] &&
    data.views[0]?.totalViews
  ) {
    totalRevenue =
      data.clicks[0].totalPublisherRevenue +
      data.views[0].totalPublisherRevenue;
    // console.log(totalRevenue);
  } else if (
    data?.clicks &&
    data.clicks?.length > 0 &&
    data.clicks[0] &&
    data.clicks[0]?.totalClicks
  ) {
    totalRevenue = data.clicks[0].totalPublisherRevenue;
    // console.log(totalRevenue);
  } else if (
    data?.views &&
    data.views?.length > 0 &&
    data.views[0] &&
    data.views[0]?.totalViews
  ) {
    totalRevenue = data.views[0].totalPublisherRevenue;
    // console.log(totalRevenue);
  }
  // ============ total revenue ============
  return (
    <>
      <Box>
        <Typography variant="h6" mb={2}>
          Dashboard - Last Seven Day Overview
        </Typography>
      </Box>

      {data && (
        <Grid container rowSpacing={4.5} columnSpacing={2.75} mb={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic title="Total Views" count={views} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic title="Total Clicks" count={clicks} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic title="CTR" count={`${ctr.toFixed(3)} %`} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {totalRevenue ? (
              <Analytic
                title="Revenue"
                count={`$ ${totalRevenue.toFixed(3)}`}
              />
            ) : (
              <Analytic title="Revenue" count={`No Revenue`} />
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Dashboard;
