/* eslint-disable react/prop-types */
import { Typography, Box, Button, Link } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EmailIcon from "@mui/icons-material/Email";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

function AuthorizePublisherActivation({ data }) {
  useDocumentTitle("Publisher Activation");
  // console.log(data);
  // console.log(data?.approvalreview);
  const { publisherId } = useParams();

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  // const [approvalStatus, setApprovalStatus] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  const handleStatusChange = (event) => {
    if (event.target.value === "approve") {
      setIsChecked(true);
    } else if (event.target.value === "reject") {
      setIsActive(false);
      setIsChecked(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      comments,
      isActive,
      isChecked,
    };
    console.log(data);

    try {
      const response = await axiosInstance.post(
        `/api/admin/authorize-publishers/${publisherId}/activate`,
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
        Publisher Activation
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={2}>
        <RouterLink relative="path" to="../..">
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            startIcon={<ArrowBackIosIcon />}
          >
            Activate Publishers
          </Button>
        </RouterLink>
      </Box>

      {data &&
      data.publisher &&
      data.publisher.isApproved &&
      !data.publisher.isActive ? (
        <>
          <Box>
            <Typography variant="h6">
              First Name: <span>{data.publisher.user.firstName}</span>
            </Typography>
            <Typography variant="h6">
              Last Name: <span>{data.publisher.user.lastName}</span>
            </Typography>
            <Typography variant="h6">
              Email Address: <span></span>
              <a id="hire" href={`mailto:${data.publisher.user.email}`}>
                <span>{data.publisher.user.email}</span>
              </a>
            </Typography>
            <Typography variant="h6">
              Average monthly page views:{" "}
              <span>{data.publisher.monthlyPageView}</span>
            </Typography>
            <Typography variant="h6">
              Website:
              <Link
                component={RouterLink}
                to={
                  data.publisher.website.startsWith("http")
                    ? data.publisher.website
                    : `https://${data.publisher.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontSize: "15px", pl: 1 }}
              >
                {data.publisher.website}
              </Link>
            </Typography>
            {data.publisher.note && (
              <Typography variant="h6">
                Note: <span>{data.publisher.note}</span>
              </Typography>
            )}
            <Typography variant="h6">Audience Category:</Typography>
            <List>
              {data.publisher.audienceCategory.map((category, idx) => (
                <ListItem key={idx} sx={{ mt: -2 }}>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" mt={-1.5}>
              Share the password with the publisher:{" "}
              <span>{data?.approvalreview.reviewDetails.password}</span>
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ color: "red" }}>
              Action
            </Typography>
            <RadioGroup onChange={handleStatusChange}>
              <Typography component="legend" sx={{ mb: -0.5, mt: 1 }}>
                Ad placement
              </Typography>
              <FormControlLabel
                value="approve"
                control={<Radio />}
                label="Checked"
                checked={isChecked}
              />
              <FormControlLabel
                value="reject"
                checked={!isChecked}
                control={<Radio />}
                label="Not Checked"
              />
            </RadioGroup>

            {isChecked && (
              <>
                <FormLabel component="legend" sx={{ mt: 1, mb: -0.5 }}>
                  Please mark this checkbox to turn on paid ads in the site
                </FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      name="isActive"
                    />
                  }
                  label="Activate Paid Ads"
                />
              </>
            )}

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
            Already activated
          </Typography>
        </center>
      )}
    </Box>
  );
}

export default AuthorizePublisherActivation;
