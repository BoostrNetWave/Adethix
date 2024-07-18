/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  Link,
  Checkbox,
  FormLabel,
  FormHelperText,
  Stack,
  Box,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

import useDocumentTitle from "../../../useDocumentTitle";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdvertisementEdit({ ad }) {
  useDocumentTitle(ad?.name ? `Edit: ${ad.name}` : "Advertisement Platform");
  const { campaignId, adId } = useParams();
  //   console.log(ad);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (ad) {
      setFormData({
        ...formData,
        name: ad.name,
        isActive: ad.isActive,
        linkUrl: ad.linkUrl,
        content: ad.content,
        options: {
          image: ad.options.image,
          textOnly: ad.options.textOnly,
          sidebar: ad.options.sidebar,
          custom: ad.options.custom,
        },
      });
    }
  }, []);

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
        const response = await axiosInstance.put(
          `/api/advertiser/campaign/${ad.campaign._id}/${ad._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
        if (response?.status === 200) {
          //   const data = response.data;
          //   console.log(data);
          toast.success(response.data.message);
          navigate(-1);
        } else {
          console.error("Failed to fetch quiz details:", response.status);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb={3}>
        Edit Advertisement: {ad?.name}
      </Typography>

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
          </Grid>
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
                sx={{ mb: 2 }}
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
    </Box>
  );
}

export default AdvertisementEdit;
