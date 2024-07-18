// Material ui
import { Typography, Grid, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useDocumentTitle from "../../../useDocumentTitle";

import { Link } from "react-router-dom";

// Project import
import styles from "./ManageCampaign.module.css";
import MainCard from "../../MainCard";
import CampaignTable from "./CampaignTable";

function index({ data }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useDocumentTitle("Manage Advertising Campaigns");
  // console.log(data)
  return (
    <>
      <Box className={styles.container}>
        <Typography variant="h6" mb={1}>
          Manage Advertising Campaigns
        </Typography>
        <Link to={"new"}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            startIcon={<AddIcon />}
          >
            Create campaign
          </Button>
        </Link>
      </Box>

      {/* Show in table */}
      {data?.campaigns && data.campaigns?.length > 0 ? (
        <Grid item xs={12} md={7} mt={2} lg={8}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <CampaignTable campaigns={data.campaigns} />
          </MainCard>
        </Grid>
      ) : (
        <Typography variant="h4">No Data</Typography>
      )}
    </>
  );
}

export default index;
