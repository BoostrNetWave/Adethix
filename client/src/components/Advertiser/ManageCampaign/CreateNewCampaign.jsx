
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../../useDocumentTitle";

// material ui
import {
  InputLabel,
  //   Input,
  FormHelperText,
  Stack,
  Select,
  MenuItem,
  TextField,
  Typography,
  OutlinedInput,
  Chip,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Box,
} from "@mui/material";

function CreateNewCampaign() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useDocumentTitle("Create Advertising Campaign");

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  const [formValues, setFormValues] = useState({
    name: "",
    expectedBudget: "",
    topics: [],
    acceptTerms: true,
  });

  //   const topicsAbbreviation = {
  //     backend : "Backend web development",
  //     frontend: "Frontend web development",
  //     security : "Security / Privacy",
  //     devops : "DevOps",
  //     datascience: "Data science / Machine learning"
  //   }

  const [errors, setErrors] = useState({
    acceptTerms: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormValues({
      ...formValues,
      acceptTerms: e.target.checked,
    });
    setErrors({
      ...errors,
      acceptTerms: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.acceptTerms) {
      alert("Accept terms");
      return;
    } else {
      //   console.log("Form data:", formValues);
      try {
        const response = await axiosInstance.post(
          "/api/advertiser/campaign",
          formValues
        );
        // console.log(response);
        if (response?.status === 201) {
          // const data = response.data;
          // console.log(data);
          toast.success(response.data.message);
          navigate(`/advertiser/campaings/${response.data.createdCampaign._id}/create`);
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
          }
        }
      }
    }
  };

  return (
    <>
      <center>
        <Typography variant="h6" mb={1}>
          Create Advertising Campaign
        </Typography>
      </center>
      <Box
        component="form"
        sx={{ m: 1 }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Stack sx={{ width: "100%" }}>
          <FormLabel component="legend" sx={{ mt: 2, mb: 2 }}>
            Give a name for your advertising campaign
          </FormLabel>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ width: "100%" }}
            required
            fullWidth
          />

          {/* campaign topic */}
          <FormLabel component="legend" sx={{ mt: 2, mb: 2 }}>
            Choose topic(s) for your advertising campaign
          </FormLabel>
          <FormControl variant="outlined" required>
            <InputLabel id="select-topic-label">Topics</InputLabel>
            <Select
              labelId="select-topic-label"
              name="topics"
              multiple
              value={formValues.topics}
              onChange={handleInputChange}
              label="Topics"
              input={<OutlinedInput label="Topics" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                    // <Chip key={value} label={topicsAbbreviation[value]} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="" disabled>
                Topics
              </MenuItem>
              <MenuItem value="Frontend web development">
                Frontend web development
              </MenuItem>
              <MenuItem value="Backend web development">
                Backend web development
              </MenuItem>
              <MenuItem value="Full stack web development">
                Full stack web development
              </MenuItem>
              <MenuItem value="Cloud service / Web hosting service">
                Cloud service / Web hosting service
              </MenuItem>
              <MenuItem value="Security / Privacy">Security / Privacy</MenuItem>
              <MenuItem value="DevOps">DevOps</MenuItem>
              <MenuItem value="Data science / Machine learning">
                Data science / Machine learning
              </MenuItem>
              
            </Select>
          </FormControl>

          {/* Campaign budget */}
          <FormLabel component="legend" sx={{ mt: 2, mb: 2 }}>
            Choose an expected budget for your advertising campaign
          </FormLabel>
          <FormControl variant="outlined" required>
            <InputLabel id="select-budget-label">Expected Budget</InputLabel>
            <Select
              labelId="select-budget-label"
              name="expectedBudget"
              value={formValues.expectedBudget}
              onChange={handleInputChange}
              label="Expected Budget"
            >
              <MenuItem value="" disabled>
                Expected Budget
                {/* <em>Select</em> */}
              </MenuItem>
              <MenuItem value="$10 - $100">$10 - $100</MenuItem>
              <MenuItem value="$100 - $500">$100 - $500</MenuItem>
              <MenuItem value="$500 - $1000">$500 - $1000</MenuItem>
              <MenuItem value="$1000 & more">$1000 & more</MenuItem>
            </Select>
          </FormControl>

          {/* accept terms checkbox */}
          <FormControl
            required
            error={!errors.acceptTerms}
            component="fieldset"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.acceptTerms}
                  onChange={handleCheckboxChange}
                  name="acceptTerms"
                  color="primary"
                />
              }
              label="I accept the terms and conditions"
              //   sx={{ m: 1 }}
            />
            {!errors.acceptTerms && (
              <FormHelperText
                sx={{ mb: 1, color: !errors.acceptTerms && "red" }}
              >
                You must accept the terms and conditions
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Button type="submit" variant="contained" color="primary" sx={{ m: 1 }}>
          Submit
        </Button>
      </Box>
    </>
  );
}

export default CreateNewCampaign;
