/* eslint-disable react/prop-types */
import { Typography, Box, Button, Link } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

// import styles from "./AuthorizeAdsReview.module.css"

function AuthorizeAdsReview({ data }) {
  useDocumentTitle(
    data.adInfo.content ? `Review: ${data.adInfo.content}` : "Review Ad"
  );

  // console.log(data);
  const { reviewId } = useParams();

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  // const [approvalStatus, setApprovalStatus] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [isRejected, setIsRejected] = useState(false);
  const [comments, setComments] = useState("");

  const [viewAdvertiserCost, setViewAdvertiserCost] = useState("");
  const [viewPublisherRevenue, setViewPublisherRevenue] = useState("");

  const [clickAdvertiserCost, setClickAdvertiserCost] = useState("");
  const [clickPublisherRevenue, setClickPublisherRevenue] = useState("");

  const [error, setError] = useState({
    comments: false,
    viewAdvertiserCost: false,
    viewPublisherRevenue: false,
    clickAdvertiserCost: false,
    clickPublisherRevenue: false,
  });

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  const handleApprovalChange = (event) => {
    // setApprovalStatus(event.target.value);
    if (event.target.value === "approve") {
      setIsApproved(true);
      setIsRejected(false);
      setViewAdvertiserCost("");
      setViewPublisherRevenue("");

      setClickAdvertiserCost("");
      setClickPublisherRevenue("");
    } else if (event.target.value === "reject") {
      setIsRejected(true);
      setIsApproved(false);
      setViewAdvertiserCost(0);
      setViewPublisherRevenue(0);

      setClickAdvertiserCost(0);
      setClickPublisherRevenue(0);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      comments,
      viewAdvertiserCost,
      viewPublisherRevenue,
      clickAdvertiserCost,
      clickPublisherRevenue,
      isApproved,
      isRejected,
    };
    // console.log(data)

    try {
      const response = await axiosInstance.post(
        `/api/admin/applying-reviews/${reviewId}`,
        data
      );
      // console.log(response);
      if (response?.status === 200) {
        // console.log(response.data)
        toast.success(response.data.message);
        navigate("/admin/authorize-ads");
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

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Review Ad
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
        <RouterLink relative="path" to="..">
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            startIcon={<ArrowBackIosIcon />}
          >
            Authorize Ads
          </Button>
        </RouterLink>

        <RouterLink relative="path" to="preview">
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            endIcon={<ArrowForwardIosIcon />}
          >
            Preview All Types of Ad
          </Button>
        </RouterLink>
      </Box>
      {data && data.isOpen ? (
        <>
          {/* <Box mb={2} className={styles.fixedAd} >
        <div id="boostr-netwave-ads" className={styles.adContainer}>
          <span>
            <span className="ad-wrap">
              <a
                href={data.adInfo.linkUrl}
                className={styles.adImg}
                target="_blank"
                rel="sponsored"
              >
                <img
                  src={data.adInfo.image.url}
                  alt="ads via Boostr Netwave"
                  border="0"
                  height="100"
                  width="130"
                  style={{ maxWidth: "130px" }}
                />
              </a>
              <a
                href={data.adInfo.linkUrl}
                className={styles.adText}
                target="_blank"
                rel="sponsored"
              >
                {data.adInfo.content}
              </a>
            </span>
            <a
              href={import.meta.env.VITE_SPONSOR}
              className={styles.company}
              target="_blank"
              rel="sponsored"
            >
              ads via Boostr Netwave
            </a>
          </span>
        </div>
      </Box> */}

          <Box>
            <Typography variant="h6" sx={{ fontSize: "17px", pr: 1, mb: 1 }}>
              Link URL:
              <Link
                component={RouterLink}
                to={data.adInfo.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontSize: "15px", pl: 1 }}
              >
                {data.adInfo.linkUrl}
              </Link>
            </Typography>

            {/* <Box
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Typography variant="h6" sx={{ fontSize: "17px", pr: 1 }}>
                Content:
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
                {data.adInfo.content}
              </Typography>
            </Box>
            <Typography>Ad Types:</Typography>
            <List>
              {data.adInfo.options.image && (
                <ListItem sx={{ mt: -2 }}>
                  <ListItemText primary="Image + Text" />
                </ListItem>
              )}
              {data.adInfo.options.textOnly && (
                <ListItem sx={{ mt: -2 }}>
                  <ListItemText primary="Text Only" />
                </ListItem>
              )}
              {data.adInfo.options.sidebar && (
                <ListItem sx={{ mt: -2 }}>
                  <ListItemText primary="Sidebar" />
                </ListItem>
              )}
              {data.adInfo.options.custom && (
                <ListItem sx={{ mt: -2 }}>
                  <ListItemText primary="Custom" />
                </ListItem>
              )}
            </List> */}
            {(data.adInfo?.options?.image ||
        data.adInfo?.options?.textOnly ||
        data.adInfo?.options?.sidebar ||
        data.adInfo?.options?.custom) && (
        <>
          <Box variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ pr: 1 }}>
              Content:
            </Typography>
            <Typography variant="h6">{data.adInfo?.content}</Typography>
          </Box>

          <Typography variant="h6" sx={{ pr: 1}}>
            Ad Types:
          </Typography>
          <List sx={{mb: -2}}>
            {data.adInfo?.options?.image && (
              <ListItem sx={{ mt: -2 }}>
                <ListItemText primary="Image + Text" />
              </ListItem>
            )}
            {data.adInfo?.options?.textOnly && (
              <ListItem sx={{ mt: -2 }}>
                <ListItemText primary="Text Only" />
              </ListItem>
            )}
            {data.adInfo?.options?.sidebar && (
              <ListItem sx={{ mt: -2 }}>
                <ListItemText primary="Sidebar" />
              </ListItem>
            )}
            {data.adInfo?.options?.custom && (
              <ListItem sx={{ mt: -2 }}>
                <ListItemText primary="Custom" />
              </ListItem>
            )}
          </List>
        </>
      )}
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ color: "red" }}>
              Action
            </Typography>
            <RadioGroup onChange={handleApprovalChange}>
              <Typography component="legend" sx={{ mb: -0.5, mt: 1 }}>
                Review status
              </Typography>
              <FormControlLabel
                value="approve"
                control={<Radio />}
                label="Approve"
                checked={isApproved}
              />
              <FormControlLabel
                value="reject"
                checked={isRejected}
                control={<Radio />}
                label="Reject"
              />
            </RadioGroup>

            <FormLabel component="legend" sx={{ mb: -0.5, mt: 1 }}>
              Add a comment
            </FormLabel>
            <TextField
              label="Comment"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
              error={error.comments}
              helperText={error.comments && "Comments are required"}
              fullWidth
              margin="normal"
              multiline
            />

            {isApproved && (
              <>
                <FormLabel component="legend" sx={{ mb: -0.5, mt: 1 }}>
                  Add Advertiser Cost for 1,000 views in dollar ($)
                </FormLabel>
                <TextField
                  label="Advertiser Cost $"
                  value={viewAdvertiserCost}
                  type="number"
                  onChange={(e) => setViewAdvertiserCost(e.target.value)}
                  required={isApproved}
                  fullWidth
                  margin="normal"
                />
                <FormLabel component="legend" sx={{ mb: -0.5, mt: 1 }}>
                  Add Publisher Revenue for 1,000 views in dollar ($)
                </FormLabel>
                <TextField
                  label="Publisher Revenue $"
                  value={viewPublisherRevenue}
                  type="number"
                  onChange={(e) => setViewPublisherRevenue(e.target.value)}
                  required={isApproved}
                  fullWidth
                  margin="normal"
                />
                <FormLabel component="legend" sx={{ mb: -0.5, mt: 1 }}>
                  Add Advertiser Cost for 1,000 clicks in dollar ($)
                </FormLabel>
                <TextField
                  label="Advertiser Cost $"
                  value={clickAdvertiserCost}
                  type="number"
                  onChange={(e) => setClickAdvertiserCost(e.target.value)}
                  required={isApproved}
                  fullWidth
                  margin="normal"
                />
                <FormLabel component="legend" sx={{ mb: -0.5, mt: 1 }}>
                  Add Publisher Revenue for 1,000 clicks in dollar ($)
                </FormLabel>
                <TextField
                  label="Publisher Revenue $"
                  value={clickPublisherRevenue}
                  type="number"
                  onChange={(e) => setClickPublisherRevenue(e.target.value)}
                  required={isApproved}
                  fullWidth
                  margin="normal"
                />
              </>
            )}

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <center>
          <Typography variant="h6" mt={5}>
            Already reviewed
          </Typography>
        </center>
      )}
    </Box>
  );
}

export default AuthorizeAdsReview;
