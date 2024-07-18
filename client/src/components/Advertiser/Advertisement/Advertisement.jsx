/* eslint-disable react/prop-types */
import {
  Typography,
  Button,
  Link,
  Box,
  Grid,
  Tooltip,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { BarChartOutlined } from "@ant-design/icons";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { TbReport } from "react-icons/tb";
import { GiSandsOfTime } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import Analytic from "./Analytic";

function Advertisement({ ad, adInfo }) {
  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  let [updatedAd, setUpdatedAd] = useState(ad);
  let [updatedAdInfo, setUpdatedAdInfo] = useState(adInfo);
  // console.log(updatedAd);
  // console.log(updatedAdInfo);
  useDocumentTitle(updatedAd?.name ? updatedAd.name : "Advertisement Platform");
  const { campaignId, adId } = useParams();
  // console.log(campaignId, adId);

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  useEffect(() => {
    if (ad) {
      setUpdatedAd(ad);
    }
    if (adInfo) {
      setUpdatedAdInfo(adInfo);
    }
  }, [ad, adInfo]);

  const handleMarkForReview = async () => {
    // console.log("marking for review");
    try {
      const response = await axiosInstance.post(
        `/api/advertiser/campaign/${campaignId}/${adId}/markforreview`,
        ad
      );
      // console.log(response);
      if (response?.status === 200) {
        // console.log(response.data)
        toast.success(response.data.message);
        setUpdatedAd(response.data.updatedAd);
      } else {
        console.error(response);
      }
    } catch (err) {
      console.error(err);
      if (err?.response?.status) {
        if (err.response.status === 401 || err.response.status === 403) {
          // console.log(response.data.message);
          toast.error(err.response.data.message);
          toast.error("Login again");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      }
    }
  };

  const handleReviewInProgessClick = () => {
    alert("Review in Progress");
  };

  const handleApprovedClick = () => {
    alert("Ad is approved in review ");
  };

  const handleRejectClick = () => {
    alert("Ad is rejected in review ");
  };

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
      <Typography variant="h6">Advertisement: {updatedAd?.name}</Typography>
      <Typography variant="h6">
        Campaign: {updatedAd?.campaign?.name}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={1}>
        <RouterLink relative="path" to="..">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mt: 2 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Go to campaign
          </Button>
        </RouterLink>

        <RouterLink relative="path" to="preview">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mt: 2 }}
            endIcon={<ArrowForwardIosIcon />}
          >
            Preview Ad
          </Button>
        </RouterLink>
      </Box>

      {updatedAd && updatedAdInfo && (
        <Grid container rowSpacing={2} columnSpacing={2.75} mt={0.5}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic title="Total Views" count={updatedAdInfo?.totalViews} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic title="Total Clicks" count={updatedAdInfo?.totalClicks} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic
              title="CPM"
              count={cpm(
                updatedAdInfo?.totalViews,
                updatedAdInfo?.totalViewsCost
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic
              title="CTR"
              count={calculateCTR(
                updatedAdInfo?.totalViews,
                updatedAdInfo?.totalClicks
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Analytic
              title="Spend"
              count={`$ ${updatedAdInfo?.totalAdvertiserCost?.toFixed(3)}`}
            />
          </Grid>
        </Grid>
      )}

      <Box>
        <RouterLink relative="path" to="report">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mt: 2 }}
            startIcon={<BarChartOutlined />}
          >
            See full report
          </Button>
        </RouterLink>
      </Box>

      {!updatedAd?.markForReview &&
        !updatedAd?.isReviewed &&
        !updatedAd?.isApproved &&
        !updatedAd?.isRejected && (
          <Box>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", mt: 2 }}
              startIcon={<TbReport />}
              onClick={handleMarkForReview}
            >
              Mark for review
            </Button>
          </Box>
        )}

      {updatedAd?.markForReview &&
        !updatedAd?.isReviewed &&
        !updatedAd?.isApproved &&
        !updatedAd?.isRejected && (
          <Box>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", mt: 2 }}
              startIcon={<GiSandsOfTime />}
              onClick={handleReviewInProgessClick}
            >
              Review in Progress
            </Button>
          </Box>
        )}

      {updatedAd?.markForReview &&
        updatedAd?.isReviewed &&
        updatedAd?.isApproved &&
        !updatedAd?.isRejected && (
          <Box>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", mt: 2 }}
              startIcon={<MdVerified />}
              onClick={handleApprovedClick}
            >
              Approved
            </Button>
          </Box>
        )}

      {updatedAd?.markForReview &&
        updatedAd?.isReviewed &&
        !updatedAd?.isApproved &&
        updatedAd?.isRejected && (
          <Box>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", mt: 2 }}
              startIcon={<CancelIcon />}
              onClick={handleRejectClick}
            >
              Rejected
            </Button>
          </Box>
        )}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Link URL:
        <Link
          component={RouterLink}
          to={updatedAd?.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ pl: 1 }}
        >
          {updatedAd?.linkUrl}
        </Link>
      </Typography>

      <Box variant="h6" sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" sx={{ pr: 1 }}>
          Content:
        </Typography>
        <Typography variant="h6">{updatedAd?.content}</Typography>
      </Box>

      <Typography variant="h6" sx={{ pr: 1 }}>
        Ad Types:
      </Typography>
      <List>
        {updatedAd?.options?.image && (
          <ListItem sx={{ mt: -2 }}>
            <ListItemText primary="Image + Text" />
          </ListItem>
        )}
        {updatedAd?.options?.textOnly && (
          <ListItem sx={{ mt: -2 }}>
            <ListItemText primary="Text Only" />
          </ListItem>
        )}
        {updatedAd?.options?.sidebar && (
          <ListItem sx={{ mt: -2 }}>
            <ListItemText primary="Sidebar" />
          </ListItem>
        )}
        {updatedAd?.options?.custom && (
          <ListItem sx={{ mt: -2 }}>
            <ListItemText primary="Custom" />
          </ListItem>
        )}
      </List>

      {updatedAd?.isApproved &&
        updatedAd?.isActive &&
        !updatedAd?.isRejected && (
          <>
            <Box
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mt: -2 }}
            >
              <Typography variant="h6" sx={{ pr: 1 }}>
                Currrent CPM:
              </Typography>
              <Typography variant="h6">
                {(updatedAd?.viewAdvertiserCost * 1000).toFixed(3)}
              </Typography>
            </Box>

            <Box variant="h6" sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ pr: 1 }}>
                Currrent CPC:
              </Typography>
              <Typography variant="h6">
                {updatedAd?.clickAdvertiserCost}
              </Typography>
            </Box>

            <Box variant="h6" sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ pr: 1 }}>
                Currrent CPTC:
              </Typography>
              <Typography variant="h6">
                {(updatedAd?.clickAdvertiserCost * 1000).toFixed(3)}
              </Typography>
            </Box>
          </>
        )}

      {/* <Box>
        <Link component={RouterLink} to="edit">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mt: 2 }}
            startIcon={<EditNoteIcon />}
          >
            Edit advertisement
          </Button>
        </Link>
      </Box> */}
    </Box>
  );
}

export default Advertisement;
