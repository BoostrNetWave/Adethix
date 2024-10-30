/* eslint-disable react/prop-types */
import { Typography, Box, Button, Link } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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

function AuthorizeAdvertiserReview({ data }) {
  useDocumentTitle("Review Advertiser");
  //   console.log(data);
  const { advertiserId } = useParams();

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  // const [approvalStatus, setApprovalStatus] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [comments, setComments] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  const handleApprovalChange = (event) => {
    if (event.target.value === "approve") {
      setIsApproved(true);
    } else if (event.target.value === "reject") {
      setPassword("");
      setIsApproved(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      comments,
      isApproved,
    };
    // console.log(data);

    try {
      const response = await axiosInstance.post(
        `/api/admin/authorize-advertisers/${advertiserId}/review`,
        data
      );
      // console.log(response);
      if (response?.status === 200) {
        // console.log(response.data)
        toast.success(response.data.message);
        navigate(-1);
      } else {
        console.error(response);
      }
    } catch (err) {
      console.error(err);
      if (err?.response?.status) {
        if (err.response.status === 401 || err.response.status === 403) {
          toast.error(err.response.data.message);
          toast.error("Login again");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else if (err.response.status === 500) {
          toast.error(err.response.data.message);
        } else if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Review Advertiser
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
        <RouterLink relative="path" to="../..">
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            startIcon={<ArrowBackIosIcon />}
          >
            Authorize Advertisers
          </Button>
        </RouterLink>
      </Box>

      {data && data?.advertiser && !data?.advertiser?.isReviewed ? (
        <>
          <Box>
            <Typography variant="h6">
              First Name: <span>{data.advertiser.user.firstName}</span>
            </Typography>
            <Typography variant="h6">
              Last Name: <span>{data.advertiser.user.lastName}</span>
            </Typography>
            <Typography variant="h6">
              Email Address: <span></span>
              <a id="hire" href={`mailto:${data.advertiser.user.email}`}>
                <span>{data.advertiser.user.email}</span>
              </a>
            </Typography>
            <Typography variant="h6">
              Average monthly budget:{" "}
              <span>{data.advertiser.monthlyBudget}</span>
            </Typography>
            <Typography variant="h6">
              Company: <span>{data.advertiser.company}</span>
            </Typography>
            <Typography variant="h6">
              Advertising goal: <span>{data.advertiser.note}</span>
            </Typography>
            <Typography variant="h6">Topics:</Typography>
            <List>
              {data.advertiser.topicFocus.map((topic, idx) => (
                <ListItem key={idx} sx={{ mt: -2 }}>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
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
                checked={!isApproved}
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
              fullWidth
              margin="normal"
              multiline
            />

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

export default AuthorizeAdvertiserReview;
