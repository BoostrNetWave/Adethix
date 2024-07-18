import useDocumentTitle from "../../../useDocumentTitle";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  // TextareaAutosize,
  Button,
  Stack,
  FormGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  // Input,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function CreateAdvertisement() {
  const { campaignId } = useParams();
  // console.log(campaignId);
  useDocumentTitle("Create Advertisement");

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
    content: "",
    image: null,
    options: {
      image: true,
      textOnly: true,
      sidebar: true,
      custom: true,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "file") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.options.image &&
      !formData.options.sidebar &&
      !formData.options.custom &&
      !formData.options.textOnly
    ) {
      alert("You must select display type");
      return;
    } else if (
      (formData.options.image ||
        formData.options.sidebar ||
        formData.options.custom) &&
      formData.image === null
    ) {
      alert("Select image for the advertisement");
      return;
    } else {
      if (
        !formData.options.image &&
        !formData.options.sidebar &&
        !formData.options.custom
      ) {
        formData.image = null;
      }
      // console.log(formData);
      try {
        const response = await axiosInstance.post(
          // `/upload`,
          `/api/advertiser/campaign/${campaignId}/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
        if (response?.status === 201) {
          const data = response.data;
          console.log(data);
          // console.log(data.campaignId);
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
          } else if(err.response.status === 400){
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
          Create Advertisement
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
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
              }
              label="Live"
            />
            <FormLabel component="legend" sx={{ mb: 2, mt: 0 }}>
              Uncheck to disable this advertisement
            </FormLabel>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              {/* <FormLabel component="legend" sx={{ mb: -0.5, color: 'inherit'}}>
                Ads display types
              </FormLabel> */}
              <Typography
                component="legend"
                sx={{ mb: -0.5, color: "inherit" }}
              >
                Ads display types
              </Typography>
              <FormGroup>
                <Stack sx={{ width: "100%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.options.image}
                        onChange={handleOptionChange}
                        name="image"
                      />
                    }
                    label="Image + Text"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.options.textOnly}
                        onChange={handleOptionChange}
                        name="textOnly"
                      />
                    }
                    label="Text Only"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.options.sidebar}
                        onChange={handleOptionChange}
                        name="sidebar"
                      />
                    }
                    label="Sidebar"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.options.custom}
                        onChange={handleOptionChange}
                        name="custom"
                      />
                    }
                    label="Custom"
                  />
                  {!formData.options.image &&
                    !formData.options.sidebar &&
                    !formData.options.custom &&
                    !formData.options.textOnly && (
                      <FormHelperText sx={{ mt: -0.5, color: "red" }}>
                        You must select display type
                      </FormHelperText>
                    )}
                </Stack>
              </FormGroup>
            </FormControl>
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
            <TextField
              name="content"
              label="Content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              required
              multiline
              minRows={1}
            />
            <FormLabel component="legend" sx={{ mb: 2, mt: 1 }}>
              Choose the content carefully that describes your ad. This will be
              visible to site visitors.
            </FormLabel>
          </Grid>

          {(formData.options.image ||
            formData.options.sidebar ||
            formData.options.custom) && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                // sx={{ mb: 2 }}
                startIcon={
                  formData.image ? <CloudDoneIcon /> : <CloudUploadIcon />
                }
              >
                {formData.image ? "Added" : "Upload Image"}
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  name="image"
                  onChange={handleChange}
                />
              </Button>
              <FormLabel component="legend" sx={{ mb: 2, mt: 1 }}>
                We recommend to Choose image of ratio 13:10
              </FormLabel>
            </Grid>
          )}

          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                accept="image/*"
                id="upload-file"
                type="file"
                hidden
                onChange={handleChange}
              />
              <label htmlFor="upload-file">
                <Button variant="contained" component="span">
                Upload Image
                </Button>
              </label>
            </Grid>
          </Grid> */}

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

export default CreateAdvertisement;
