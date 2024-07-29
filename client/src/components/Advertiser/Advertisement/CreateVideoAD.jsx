import useDocumentTitle from "../../../useDocumentTitle";
import { Typography, TextField, Button, FormLabel, Grid } from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function CreateVideoAD() {
  const { campaignId } = useParams();
  useDocumentTitle("Create Video AD");

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    isActive: true,
    linkUrl: "",
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        video: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.linkUrl === "") {
      alert("Please fill all the field");
    } else if (!formData.video) {
      alert("Please add video");
    } else {
    //   console.log(formData);
      try {
        const response = await axiosInstance.post(
          `/api/advertiser/campaign/${campaignId}/createvideoad`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.status === 201) {
          toast.success(response.data.message);
          navigate(`/advertiser/campaings/${campaignId}`);
        } else {
          console.error(response);
        }
      } catch (err) {
        console.log(err);
        if (err?.response?.status) {
          if (err.response.status === 401 || err.response.status === 403) {
            // console.log(response.data.message);
            toast.error(err.response.data.message);
            toast.error("Login again");
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          } else if (err.response.status === 400) {
            toast.success(err.response.data.message);
          }
        }
      }
    }
  };

  return (
    <>
      <center>
        <Typography variant="h6" mb={3}>
          Create Video AD
        </Typography>
      </center>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormLabel component="legend" sx={{ mt: 1 }}>
              Give a name for your advertisement which is only visible to you
            </FormLabel>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="linkUrl"
              label="Link URL"
              value={formData.linkUrl}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormLabel component="legend" sx={{ mb: 2, mt: 1 }}>
              URL of your landing page. This may contain UTM parameters for
              tracking purpose.
            </FormLabel>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              // sx={{ mb: 2 }}
              startIcon={
                formData.video ? <CloudDoneIcon /> : <CloudUploadIcon />
              }
            >
              {formData.video ? "Added" : "Upload video"}
              <input type="file" hidden name="video" onChange={handleChange} />
            </Button>
            <FormLabel component="legend" sx={{ mb: 2, mt: 1 }}>
              {/* We recommend to Choose image of ratio 13:10 */}
            </FormLabel>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CreateVideoAD;
