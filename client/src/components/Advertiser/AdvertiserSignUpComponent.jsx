import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  MenuItem,
  Chip,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        component={RouterLink}
        color="inherit"
        to={import.meta.env.VITE_HOME_PAGE}
        sx={{ textDecoration: "none" }}
      >
        Adethix
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function AdvertiserSignUpComponent() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    topicFocus: [],
    monthlyBudget: "",
    note: "",
    acceptTerms: true,
    referralCode: ''
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    if (!formValues.acceptTerms) {
      alert(
        "You must accept Terms of Service and Privacy Policy to join our Advertising Network"
      );
    } else {
      // console.log(formValues);

      let url = `${import.meta.env.VITE_BACKEND_API_URL}/api/advertiser/signup`;
      try {
        let response = await axios.post(url, formValues);

        if (response?.status === 200) {
          // console.log(response.data)
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response.data.message.replace(/"/g, ""));
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Join as Advertiser
          </Typography>
          <Box
            component="form"
            // noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel component="legend">Your First Name</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel component="legend">Your Last Name</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormLabel component="legend">
                  Your Working Email Address
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormLabel component="legend">Your company</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="company"
                  label="Company"
                  id="company"
                  value={formValues.company}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Audience category */}
              <Grid item xs={12}>
                <FormLabel component="legend">
                  Tell us your advertisement topic
                </FormLabel>
                <FormControl variant="outlined" required fullWidth>
                  <InputLabel id="select-audience-category-label">
                    Topic Focus
                  </InputLabel>
                  <Select
                    labelId="select-audience-category-label"
                    name="topicFocus"
                    multiple
                    value={formValues.topicFocus}
                    onChange={handleInputChange}
                    label="Topic Focus"
                    input={<OutlinedInput label="Audience category" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                          // <Chip key={value} label={topicsAbbreviation[value]} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="" disabled>
                      Audience category
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
                    <MenuItem value="Security / Privacy">
                      Security / Privacy
                    </MenuItem>
                    <MenuItem value="DevOps">DevOps</MenuItem>
                    <MenuItem value="Data science / Machine learning">
                      Data science / Machine learning
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {/* monthlyPageView */}
                <FormLabel component="legend">
                  Tell us about your average monthly budget
                </FormLabel>
                <FormControl variant="outlined" required fullWidth>
                  <InputLabel id="select-monthly-page-view-label">
                    Monthly Budget
                  </InputLabel>
                  <Select
                    labelId="select-monthly-page-view-label"
                    name="monthlyBudget"
                    value={formValues.monthlyBudget}
                    onChange={handleInputChange}
                    label="Monthly Budget"
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Monthly Budget
                    </MenuItem>
                    <MenuItem value="$10 - $100">$10 - $100</MenuItem>
                    <MenuItem value="$100 - $500">$100 - $500</MenuItem>
                    <MenuItem value="$500 - $1000">$500 - $1000</MenuItem>
                    <MenuItem value="$1000 & more">$1000 & more</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormLabel component="legend">
                  Describe your advertisement goals
                </FormLabel>
                <TextField
                  fullWidth
                  required
                  name="note"
                  label="Note"
                  id="note"
                  multiline
                  value={formValues.note}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormLabel component="legend">
                  If you have a referral code please enter here
                </FormLabel>
                <TextField
                  fullWidth
                  name="referralCode"
                  label="Referral Code"
                  id="referralCode"
                  value={formValues.referralCode}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptTerms"
                        color="primary"
                        onChange={handleCheckboxChange}
                        checked={formValues.acceptTerms}
                      />
                    }
                    label="I accept Terms of Service and Privacy Policy"
                  />
                  {!formValues.acceptTerms && (
                    <FormHelperText
                      sx={{ mb: 1, color: !formValues.acceptTerms && "red" }}
                    >
                      You must accept Terms of Service and Privacy Policy to
                      join our Advertising Network
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Join as Advertiser
            </Button>
            <Grid container justifyContent="flex-end" sx={{mb: 5}}>
              <Grid item>
                <Link
                  component={RouterLink}
                  to={"/advertiser/signin"}
                  variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5, mb: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
